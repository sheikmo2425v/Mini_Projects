
from flask_cors import CORS
from flask import *
import json
import sqlite3 as sq
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/register', methods=["POST"], strict_slashes=False)
def register():
    r = request.json
    con = sq.connect("data.db")
    # con.execute("drop table login")
    # con.execute("create table if not exists login(id Integer primary key autoincrement,name varchar(1000) unique,password varchar(1000),phone varchar(10),role varchar(100))")
    # con.execute("insert into login(name,password,phone,role) values(?,?,?,?)",
    #             ("admin", "admin", "9952363956", "admin"))
    con.execute("insert into login(name,password,phone,role) values(?,?,?,?)",
                (r["user"].lower(), r["password"], r["phone"], "user"))
    con.commit()
    x = con.execute("select * from login").fetchall()
    print(x)
    return "register"


@app.route('/', methods=["POST"], strict_slashes=False)
def login():
    r = request.json
    con = sq.connect("data.db")
    print(r)
    x = con.execute("select * from login where name=? and password=?",
                    (r["user"].lower(), r["password"])).fetchall()
    print(x)
    if (len(x) == 1):
        # con.execute("drop table checking")
        con.execute(
            "create table if not exists checking(id int ,name varchar(1000),lid int,role varchar(100))")
        # con.execute("delete from checking")
        # con.commit()
        # con.execute("insert into checking(id,name,lid,role) values(?,?,?,?)",
        #             (1, r["user"], x[0][0], x[0][-1]))
        con.execute("update checking set name=?,lid=?,role=? where id=?",
                    (r['user'], x[0][0],  x[0][-1], 1))
        con.commit()
        xr = con.execute("select * from checking").fetchone()

        return json.dumps(xr)
    else:
        return "failed"


@app.route('/storedata', methods=["POST"], strict_slashes=False)
def storedata():
    r = request.json
    con = sq.connect("data.db")
    con.execute("create table if not exists longtitude(id Integer primary key autoincrement,name varchar(1000),long varchar(1000),lat varchar(100),sim varchar(50))")
    con.execute("insert into longtitude(name,long,lat,sim) values(?,?,?,?)",
                (r["place"], r["long"], r["lat"], r["set"]))
    con.commit()
    x = con.execute("select * from longtitude").fetchall()
    print(x)
    xr = con.execute("select * from checking").fetchall()[0]
    return json.dumps(xr)


@app.route('/delete', methods=["POST"], strict_slashes=False)
def deletedata():
    r = request.json
    print(r)
    con = sq.connect("data.db")
    con.execute("delete from longtitude where id=?", [r["id"]])
    con.commit()
    return "s"


@app.route('/getdata', methods=["POST"], strict_slashes=False)
def getata():
    con = sq.connect("data.db")
    x = con.execute("select * from longtitude").fetchall()
    return json.dumps(x)


@app.route('/checklogin', methods=["POST"], strict_slashes=False)
def checklogin():
    con = sq.connect("data.db")
    xr = con.execute("select * from checking").fetchall()
    print(xr)
    return json.dumps(xr[0])


@app.route('/logout', methods=["POST"], strict_slashes=False)
def logout():
    con = sq.connect("data.db")
    con.execute("update checking set name=?,lid=? where id=?", ("0", "0", 1))
    con.commit()
    xr = con.execute("select * from checking").fetchall()[0]
    return json.dumps(xr)


if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
