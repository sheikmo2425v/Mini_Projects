from flask import *
import json
import sqlite3 as ism
app = Flask(__name__)


@app.route('/')
def w2():
    return render_template("index.html")


@app.route('/out', methods=["POST"])
def out():
    a1 = request.form["a1"]
    a2 = request.form["a2"]
    a3 = request.form["a3"]
    a4 = request.form["a4"]
    con = ism.connect("ism_bank.db")
    con.execute("create table  if not exists bank_detail (ac int not null unique,name varchar(50) not null unique,password varchar(50) not null,ph int not null unique,bal int)")

    name = a1
    while True:
        password = a2
        c = 0
        s1 = 0
        s2 = 0
        s3 = 0
        s4 = 0
        for i in password:
            c = c+1
            if i.islower():
                s1 = 2
            elif i.isupper():
                s2 = 2
            elif i.isnumeric():
                s3 = 2
            else:
                s4 = 2
        if s1 == 2 and s2 == 2 and s3 == 2 and s4 == 2 and c >= 8:
            while True:
                re = a3
                if password != re:
                    return ("your does not match try again")
                else:
                    break
            break

        else:
            return ("please create valid password ")

    while True:
        ph = a4
        c = 0
        for i in ph:
            c = c+1
        if c == 10:
            ac = ph[6:]
            ac = "22"+"I"+ac
            ac = ac.zfill(10)
            break
        else:
            return ("invalid mobile number ")
    con.execute("insert into bank_detail values(?,?,?,?,?)",
                (ac, name, password, ph, 500))
    con.commit()
    return ("Account created successfully")


@app.route('/out2', methods=["POST"])
def out2():
    con = ism.connect("ism_bank.db")
    l1 = request.form["ph"]
    l2 = request.form["psw"]
    ph = l1
    password = l2
    detail = []
    while True:
        detail = list(con.execute(
            "select * from bank_detail where(ph=? and password=?)", (ph, password)))
        if detail == []:
            return ("No user found")
        else:
            detail = list(detail[0])
            e = "successfully"
            bal = detail[4]
            return render_template("bank.html", bal=bal, ph=ph)


@app.route('/out3', methods=["POST"])
def out3():
    con = ism.connect("ism_bank.db")
    detail = request.form['save']
    ph = request.form['ph']
    print(detail)
    con.execute("update bank_detail set bal=? where ph=?", (detail, ph))
    con.commit()
    y = con.execute("select *from bank_detail").fetchall()
    print(list(y))
    return ("saved successfully")


if __name__ == "__main__":
    app.run(debug=True)
