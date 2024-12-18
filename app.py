from flask import Flask, render_template, redirect, request, session, make_response
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import insert

app = Flask(__name__, template_folder="api")
#regenerate this when confirmed that database stuff works
app.secret_key = "abcdef"
#THIS IS NOT SECURE IN THE SLIGHTEST
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://neondb_owner:e4sUCIAg2Znw@ep-long-brook-a51teh6g.us-east-2.aws.neon.tech/neondb?sslmode=require"
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"

#CHECK TO MAKE SURE THAT THE DATABASE IS CONNECTED PROPERLY HAS TO THROW AN ERROR OTHERWISE

Session(app)

db = SQLAlchemy(app)

class users(db.Model):
    userid=db.Column(db.Integer, primary_key=True, nullable=False)
    username=db.Column(db.String(30), nullable=False)
    hash=db.Column(db.Text, nullable=False)
    
#class calendar(db.Model):

#class subcalendar(db.Model):

#class events(db.Model):

def cookiesCheck():
    session = requests.Session() 
    print(session)
    return session.cookies.get_dict()
    

@app.route("/home.html")
def index():
    return render_template("home.html")

@app.route("/aboutUs.html")
def aboutUs():
    return render_template("aboutUs.html")

@app.route("/calendar.html")
def calendar():
    return render_template("calendar.html")

@app.route("/howItWorks.html")
def howItWorks():
    return render_template("howItWorks.html")

@app.route("/login.html", methods=["GET", "POST"])
def page():
    session.clear()
    
    specialArray = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"]
    failReason = None
    correct = False
    
    if request.method == "POST" and request.form["submit"] == "Create an Account":
        userName = request.form.get("regUsername")
        print(userName)
        userPassword = request.form.get("regPassword")
        print(userPassword)
        userConf = request.form.get("confPassword")
        print(userConf)

        if not userName:
             failReason = "Error: A Username is Required."
             print(failReason)
        elif users.query.filter_by(username=userName).first():
             failReason = "Error: This Username is Already Taken! Please Select a New Username"
             print(failReason)
        elif not userPassword:
            failReason = "Error: A Password is Required."
            print(failReason)
        elif len(userPassword) < 7:
            failReason = "Error: Your Password Must Be 8 Characters or Longer."
            print(failReason)
        elif len(userPassword) > 31:
            failReason = "Error: Your Password Must be 30 Characters or Shorter."
            print(failReason)
        elif not any(char.isdigit() for char in userPassword):
            failReason = "Error: Your Password Must Include a Number."
            print(failReason)
        elif not any(char.isupper() for char in userPassword):
            failReason = "Error: Your Password Must Include an Uppercase Letter."
            print(failReason)
        elif not any(char.islower() for char in userPassword):
            failReason = "Error: Your Password Must Include a Lowecase Letter."
            print(failReason)
        elif not any(char in specialArray for char in userPassword):
            failReason = "Error: Your Password Must Include a Special Character From This List: !, @, #, $, %, ^, &, *, (, )."
            print(failReason)
        elif not userConf:
            failReason = "Error: A Password Confirmation is Required. Please Retype Your Password."
            print(failReason)
        elif userPassword != userConf:
            failReason = "Error: Your Password and Your Password Confirmation Do Not Match. Please Check Your Password and Password Confirmation."
            print(failReason)
        else:
            correct = True

        if correct == True:
            newUser = users(username=userName, hash=generate_password_hash(userPassword))
            db.session.add(newUser)
            db.session.commit()

            user = users.query.filter_by(username=userName).first()
            #CHECK TO MAKE SURE THINGS ADDED PROPERLY???
            resp = make_response(render_template("calendar.html"))
            resp.set_cookie('user_id', str(user.userid))
            resp.set_cookie('page', '', expires=0)
            return resp
        else:
            return render_template("login.html", error = failReason)
    elif request.method == "POST" and request.form["submit"] == "Log In":
        
        next = False
        correct = False
        
        userName = request.form.get("logUsername")
        print(userName)
        userPassword = request.form.get("logPassword")
        print(userPassword)

        if not userName:
             failReason = "Error: A Username is Required."
             print(failReason)
        elif users.query.filter_by(username=userName).first() == None:
             failReason = "Error: No Account With This Username. Please Check Your Username and Try Again."
             print(failReason)
        elif not userPassword:
            failReason = "Error: A Password is Required."
            print(failReason)
        else:
            next = True

        user = users.query.filter_by(username=userName).first()
        
        if next == True:
            if check_password_hash(user.hash, userPassword):
                correct = True
            else:
             failReason = "Error: Incorrect Password Provided. Please Check Your Password and Try Again."
             print(failReason)
        if correct == True:
            resp = make_response(render_template("calendar.html"))
            resp.set_cookie('user_id', str(user.userid))
            resp.set_cookie('page', '', expires=0)
            return resp
        else:
            return render_template("login.html", error = failReason)
            
    else: 
        if session.get("user_id"):
            req = make_response(redirect("/calendar.html"))
            return req
        else:
            return render_template("login.html")

@app.route ("/settings.html", methods=["GET", "POST"])
def settings():
    failReason = None
    correct = False
    
    if request.method == "POST":
        userName = request.form.get("deleteUser")
        deleteConf = request.form.get("deleteConf")
        user = users.query.filter_by(username=userName).first()

        failReason = "Error. This feature has not yet been implemented. Please check back soon!"
        #if not deleteConf:
            #failReason = "Error: Please type your username to confirm you want to delete your account."
            #print(failReason)
        #elif deleteConf != user:
            #failReason = "Error: Your username and confirmation do not match. Please type your username to confirm you want to delete your account."
            #print(failReason)
        #else:
            #correct = True

        if correct == True:
            db.session.delete(user)
            db.session.commit()
        else:
            return render_template("settings.html", error = failReason)
    else:
        return render_template("settings.html")
    
@app.route("/")
def fallback():
    return render_template("home.html")

@app.errorhandler(404)
def pageNotFound(error):
    return render_template("error.html"), 404


if __name__ == "__main__":
    db.create_all()
    app.run()
