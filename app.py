from flask import Flask, render_template, redirect, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder="api")
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://neondb_owner:QWzy9o8xUFCY@ep-long-brook-a51teh6g-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)

db = SQLAlchemy(app)

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
    if request.method == "POST":
        username = request.form.get("username")
        userPassword = request.form.get("password")
        userConf = request.form.get("confPassword")

        if not userName:
             return "1"
        elif db.execute("SELECT username FROM users WHERE username = ?", username):
             return "2"
        elif not userPassword:
            return "3"
        elif not userConf:
            return "4"
        elif userPassword != userConf:
            return "5"

        db.execute("INSERT INTO users(username, hash) VALUES (?, ?)", username, generate_password_hash(userPassword))

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
    app.run()
