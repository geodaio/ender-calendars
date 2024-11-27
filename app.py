from flask import Flask, render_template, redirect, request, session, make_response
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import insert

app = Flask(__name__, template_folder="api")
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://neondb_owner:QWzy9o8xUFCY@ep-long-brook-a51teh6g-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)

db = SQLAlchemy(app)

class users(db.Model):
    userid=db.Column(db.Integer, primary_key=True, nullable=False)
    username=db.Column(db.String(30), nullable=False)
    hash=db.Column(db.Text, nullable=False)
    
#class calendar(db.Model):

#class subcalendar(db.Model):

#class events(db.Model):
    

@app.route("/home.html")
def index():
    return render_template("home.html")

@app.route("/aboutUs.html")
def aboutUs():
    return render_template("aboutUs.html")

@app.route("/calendar.html")
def calendar():
    if session.get("user_id") is None:
        req = make_response(redirect("/login.html"))
        req.set_cookie("page", "register")
        return req
    else:
        return render_template("calendar.html")

@app.route("/howItWorks.html")
def howItWorks():
    return render_template("howItWorks.html")

@app.route("/login.html", methods=["GET", "POST"])
def page():
    if request.method == "POST" and request.form["submit"] == "Create an Account":
        userName = request.form.get("regUsername")
        print(userName)
        userPassword = request.form.get("regPassword")
        print(userPassword)
        userConf = request.form.get("confPassword")
        print(userConf)

        if not userName:
             return "1"
        #elif users.query.filter_by(username=userName).first():
             #return "2"
        elif not userPassword:
            return "3"
        elif len(userPassword) < 9:
            return "4"
        #elif userPassword 
        elif not userConf:
            return "5"
        elif userPassword != userConf:
            return "6"
        newUser = users(username=userName, hash=generate_password_hash(userPassword))
        db.session.add(newUser)
        db.session.commit()

        return redirect("/")
    
    else: 
        return render_template("login.html")

@app.route("/")
def fallback():
    return render_template("home.html")

@app.errorhandler(404)
def pageNotFound(error):
    return render_template("error.html"), 404


if __name__ == "__main__":
    db.create_all()
    app.run()
