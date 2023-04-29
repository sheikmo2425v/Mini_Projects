from flask import *

import os

import mysql.connector
app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


def get_data(table, db):
    mydb = mysql.connector.connect(
        host="localhost", user="root",  password="",  database=db)
    mycursor = mydb.cursor()
    k = "select * from information_schema.columns  where table_schema = '%s'and table_name = '%s'" % (
        db, table)
    mycursor.execute(k)

    k = mycursor.fetchall()

    k = [x[3] for x in k]
    return (k)


def home(table, db):
    gk = get_data(table, db)
    a4 = 'e = "DELETE FROM %s WHERE %s =' % (table, gk[0])
    a4 += "'%s'"
    a4 += '"%(id)'
    a5 = 'y = "update %s set ' % (table)
    a6 = "'%s'"
    for k in gk[1:]:
        a5 += '%s=%s,' % (k, a6)
    a5 = a5[:-1] + ' WHERE id =%s"' % (a6)
    a5 += "% ("
    for x in range(len(gk[1:])):
        a5 += "value[%s]," % (x)
    a5 += 'sid)'

    a2 = ""
    for k in gk:
        a2 += """
    %s=request.form['%s']""" % (k, k)
    a3 = """
        e="insert into %s(""" % (table)
    for k in gk:
        a3 += "%s," % (k)
    a3 = a3[:-1]+")values("
    for k in gk:
        a3 += "'%s',"
    a3 = a3[:-1]+')"%('
    for k in gk:
        a3 += "%s," % (k)
    a3 = a3[:-1]+')'

    a = """
from flask import *
import mysql.connector
app=Flask(__name__)
@app.route('/')
def home():
    mydb = mysql.connector.connect(
        host="localhost", user="root",  password="",  database="%s")
    mycursor = mydb.cursor()
    e = "select*from %s"
    mycursor.execute(e)
    r = mycursor.fetchall()
    mydb.close()
    return render_template("index.html", r=r)


@app.route('/insert')
def insertpage():
    return render_template('insert.html')
@app.route('/%s', methods=["POST"])
def insert%s():
    %s
    try:
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="%s")
        mycursor = mydb.cursor()
            %s
        mycursor.execute(e)
        mydb.commit()
        e = "select*from %s"
        mycursor.execute(e)
        r = mycursor.fetchall()
        mydb.close()
        return render_template("index.html" ,r=r)
    except:  
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="%s")
        mycursor = mydb.cursor() 
        e = "select*from %s"
        mycursor.execute(e)
        r = mycursor.fetchall()
        mydb.close()
        return render_template("index.html" ,r=r)
@app.route('/delete', methods=["POST"])
def delete():
    id = request.form['sd']
    try:
        mydb = mysql.connector.connect(
           host="localhost", user="root",  password="",  database="%s")
        mycursor = mydb.cursor()
        %s
        mycursor.execute(e)
        mydb.commit()
        mydb.close()
        return ("deleted")
    except:
        return("this id is used as foreign key referrence or any other error")
@app.route('/update', methods=["POST"])
def update():
    sid = request.form['sid']
    value = request.form['xe']
    value = json.loads(value)
    value.reverse()
    try:
        mydb = mysql.connector.connect(
            host="localhost", user="root",  password="",  database="%s")
        mycursor = mydb.cursor()
        %s
        print(y)
        mycursor.execute(y)
        mydb.commit()
        mydb.close()
        return ("updated")
    except:
        return("error")


if __name__ == '__main__':
    app.run(debug=True)


    """ % (db, table, table, table, a2, db, a3, table, db, table, db, a4, db, a5)

    os.mkdir(os.path.join("C:\\Users\\SHEIK\\Desktop\\", table))
    x = open("C:\\Users\\SHEIK\\Desktop\\%s\\main.py" % (table), "w")
    x.write(a)
    x.close()
    # print(a)


def html(table, db):
    dk = get_data(table, db)
    a1 = ""
    for k in dk:
        a1 += """<label for="%s">%s</label><br>
<input type="text" name ="%s" id="%s"><br>
""" % (k, k, k, k)

    a = """ <!DOCTYPE html>


<html lang = "en" >

<head >
    <meta charset = "UTF-8" >
    <meta http-equiv = "X-UA-Compatible" content = "IE=edge" >
    <meta name = "viewport" content = "width=device-width, initial-scale=1.0" >
    <title > index </title>
</head >

<body >
    <div class="container" style="background-color: grey;" >
    <h1>Enter data </h1>
        <form action = "%s" method = "post" >

            %s
            <button type = "submit" class = "btn btn-primary" > Submit </button>
        </form>

    </form>
    </div>

</body >
<script src="https://code.jquery.com/jquery-3.6.1.js"></script>
<link href = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel = "stylesheet" >
<script src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" > </script>


</html>""" % (table, a1)

    os.mkdir(os.path.join("C:\\Users\\SHEIK\\Desktop\\%s" %
             (table), "templates"))
    x = open("C:\\Users\\SHEIK\Desktop\\%s\\templates\\insert.html" %
             (table), "w")
    x.write(a)
    x.close()


def html2(table, db):

    dk = get_data(table, db)
    a1 = ""
    a2 = ""

    for k in dk:
        a1 += """<th>%s</th><br>""" % (k)
    a1 += """
    <th>Delete</th>
    <th>Edit</th>"""

    a2 = """{%for x in r%}
            <tr class="s1">    
    """
    for x in range(len(dk)):
        a2 += "<td>{{x[%s]}}</td>" % (x)

    a2 += """   <td><button>delete</button></td>
                <td><input type="checkbox" class="c"></td>
            </tr>

            {%endfor%}"""

    a = """ 
<!DOCTYPE html>
<html lang="en">

<head>

</head>

<body>
    <div class="container">
    <p></p>
    <table class="table">
        <thead>
            %s
        </thead>
        <tbody>
            
            



            %s
         
        </tbody>

    </table><br>
    </div>
   <div>
        <button><a href="/insert">insert</a></button>
    </div>

  
</body>
<script src="https://code.jquery.com/jquery-3.6.1.js"></script>
<script>
$(document).ready(function () {
  var tbody = document.querySelector("tbody");
    tbody.addEventListener("click", function (e) {
        if (e.target.innerHTML === "delete") {
            var tb = document.querySelector("tbody");
            var bt = e.target;

            var td = bt.parentElement;

            var tr = td.parentElement
            var sd = tr.children[0].innerHTML
            console.log(sd)



            $.post({
                url: "delete",
                data: { sd: sd },
                success: function (e) {
                    $("p").text(e);
                    if (e === "deleted") {
                            tb.removeChild(tr);
                        }


                }
            })
        }
        else if (e.target.className == "c") {
            var bt = e.target;
            var td = bt.parentElement;
            var tr = td.parentElement
            var chtr = tr.children;
            if (e.target.checked) {

                for (var i = %s; i > 0; i--) {
                    var ex = (chtr[i].innerHTML);
                    chtr[i].innerHTML = `<td>
                        <input type="text" value="${ex}" >
                        </td>`
                }
            }

            else {
                var xe = []
                var tb = document.querySelector("tbody");
                var bt = e.target;

                var td = bt.parentElement;

                var tr = td.parentElement
                var sid = tr.children[0].innerHTML
                console.log(sid)
                for (var i = %s; i > 0; i--) {
                    //td<input>
                    var ex = (chtr[i].children[0].value);
                    chtr[i].innerHTML = `<td>${ex}</td>`
                    
                    xe.push(ex)
                }
                xe = JSON.stringify(xe)
                $.post({
                    url: "update",
                    data: { xe: xe, sid: sid },
                    success: function (e) {
                        $("p").text(e);



                    }
                })

            }
        }
    })
     })
   
    

</script>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"> </script>

</html>""" % (a1, a2, len(dk)-1, len(dk)-1)

    x = open("C:\\Users\\SHEIK\Desktop\\%s\\templates\\index.html" %
             (table), "w")
    x.write(a)
    x.close()


@app.route('/home', methods=['POST'])
def homegd():
    db = request.form['db']
    table = request.form['table']
    try:
        get_data(table, db)
        home(table, db)
        html(table, db)
        html2(table, db)
        return ("created successfully check your desktop")
    except:
        return ("error or file already exit check your desktop")


if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)
