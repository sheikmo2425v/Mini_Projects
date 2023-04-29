import sqlite3 as sm
import sys
import matplotlib
import urllib.request as ur
import matplotlib.pyplot as plt
import bs4
import collections
import xlsxwriter
import pandas as pd
import numpy as np
from rake_nltk import Rake
from nltk import tokenize
con = sm.connect("sm_data.db")
con.execute("create  table if not exists datas (ac int not null unique,name varchar(50) not null unique,password varchar(50) not null,ph int not null unique)")


def signup():
    name = input("Enter your name:")
    while True:
        password = input(
            "create your  password (your password should contain atleast 8 character in min 1uppercase and 1symbol and 1number):")
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
                re = input("retype your password:")
                if password != re:
                    print("your does not match try again")
                else:
                    break
            break

        else:
            print("please create valid password ")

    while True:
        ph = (input("Enter your  mobile number:"))
        c = 0
        for i in ph:
            c = c+1
        if c == 10:
            ac = ph[6:]
            ac = "22"+"I"+ac
            ac = ac.zfill(10)
            break
        else:
            print("invalid mobile number ")
    con.execute("insert into datas values(?,?,?,?)", (ac, name, password, ph))
    con.commit()
    print("Account created successfully")
    main()


def signin():
    ph = int(input("enter your phone number: "))
    password = input("enter your password: ")
    detail = []
    while True:
        detail = list(con.execute(
            "select * from datas where(ph=? and password=?)", (ph, password)))
        if detail == []:
            print("No user found")
            ph = int(input("enter your phone number: "))
            password = input("enter your password: ")

        else:
            detail = list(detail[0])
            data()
            break


def data():
    r = Rake()
    workbook = xlsxwriter.Workbook('repeted.xlsx')
    worksheet = workbook.add_worksheet()
    u = input("Paste your link here:")
    data = ur.urlopen(u)
    data = bs4.BeautifulSoup(data, "html.parser")
    print(data)
    ne = []
    data = data.get_text()
    data = str(data)
    data = ''.join(filter(lambda x: not x.isdigit(), data))
    r.extract_keywords_from_text(data)
    data = r.get_ranked_phrases()
    data = str(data)
    data = data.replace(',', '')
    data = data.replace('[', '')
    data = data.replace(']', '')
    data = data.replace(')', '')
    data = data.replace('(', '')
    d = data.split(' ')
    data = d[0:500]
    dt = []
    dc = []
    d = collections.defaultdict(int)
    for c in data:
        d[c] += 1
    row = 0
    col = 0
    for c in sorted(d, key=d.get, reverse=True):
        if d[c] > 1:
            worksheet.write(row, col, c)
            worksheet.write(row, col+1, d[c])
            row += 1
            dt.append(d[c])
            dc.append(c)
    chart = workbook.add_chart({'type': 'pie'})
    chart.add_series({'values': '=Sheet1!$B$1:$B$5'})
    worksheet.insert_chart('C1', chart)
    workbook.close()
    import os
    os.system('repeted.xlsx')
    da = len(dt)
    db = []
    for i in range(da):
        db.append(i)
    data = {"sn": db, "value": dt, "data": dc}
    df = pd.DataFrame(data, columns=['sn', 'value', 'data'])
    npx = df['sn'].to_numpy()
    npy = df['value'].to_numpy()
    print(df)
    xpoints = np.array(npx)
    ypoints = np.array(npy)
    plt.plot(xpoints, ypoints)
    plt.show
    print("hi")
    while True:
        f = input("if you want to coninue enter yes or exit- no :")
        if f == "yes":
            data()
            break
        elif f == "no":
            main()
            break
        else:
            print("please enter valid option")


def main():
    print("hi this ISM_data handler ")
    print("1.sign in ")
    print("2.signup")
    print("3.exit")
    option = int(input("enter the option:"))
    if option == 1:
        signin()
    elif option == 2:
        signup()
    elif option == 3:
        print("thank you for using us")
    else:
        print("invalid option try again")
        main()


main()
