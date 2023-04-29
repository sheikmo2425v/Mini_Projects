import axios from "axios";
import { useState } from "react";

const Main_compiler = () => {
  const [output, setOutput] = useState("");
  const [code, setcode] = useState("print('hello')");
  const [language, setlanguage] = useState("python3");

  const [st, setst] = useState([]);
  const [l, setl] = useState(0);
  const setvale = (e) => {
    setlanguage(e.target.value);
    var x = e.target.value;
    if (x === "java") {
      setcode(
        'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}'
      );
    } else if (x === "c") {
      setcode(
        '\n#include <stdio.h>\n\nint main() {\n  printf("Hello World!");\n  return 0;\n}'
      );
    } else if (x === "cpp") {
      setcode(
        '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World!";\n  return 0;\n}'
      );
    } else if (x === "python3") {
      setcode("print('hello')");
    } else if (x === "html") {
      setcode(`
                <!DOCTYPE html>
    <html>
    <head>
    <title>Page Title</title>
    </head>
    <body>
    
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
    
    </body>
    <script>
                alert("its me")
    </script>
    </html>`);
    }
    setlanguage(x);
    setOutput("");
  };
  const leave = () => {
    setl(1);
    var value = {
      sid: localStorage.getItem("sid"),
      wdate: wdate,
      edate: edate,
      reason: reason,
    };
    axios.post("http://127.0.0.1:5000/leave", value).then((Response) => {
      setl(0);
      alert(Response.data);
      setvalue(0);
      setwdate("");
      setedate("");
      setreason("");
    });
  };
  const compile = () => {
    setl(1);

    if (language !== "html") {
      if (language === "python3") {
        var t = 'File "jdoodle.py",';
      } else if (language === "cpp") {
        var t = "jdoodle.cpp:";
      } else if (language === "c") {
        var t = "jdoodle.c:";
      }

      const value = { code: code, language: language, stdin: "12 18" };

      axios.post("http://127.0.0.1:5000/compile", value).then((Response) => {
        setl(0);

        setOutput(Response.data["output"].replace(new RegExp(t, "g"), ""));
      });
    } else {
      document.querySelector("#out").innerHTML = code;
      setl(0);
    }
  };
  return (
    <>
      <div
        className="container-fluid bg-success p-4"
        style={{ height: "100%", position: "fixed", width: "100%" }}
      >
        {" "}
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Compiler</h3>
        </div>
        <select
          name="Languages"
          className="btn btn-dark"
          value={language}
          onChange={(e) => setvale(e)}
        >
          <option value="python3">python3</option>
          <option value="java">java</option>
          <option value="c">c</option>
          <option value="cpp">c++</option>
          <option value="html">Html</option>
        </select>
        <br />
        <br />
        <div className="row">
          <div className="col">
            <textarea
              className=" form-control rounded-top rounded-bottom bg-dark text-secondary"
              style={{ height: "46vh" }}
              value={code}
              rows="15 "
              cols="95"
              onChange={(e) => setcode(e.target.value)}
            />
            <br />
          </div>
          <div
            className="col  bg-dark  border rounded-top rounded-bottom text-secondary"
            style={{
              height: "46vh",
              marginRight: "1%",
              overflow: "auto",
            }}
          >
            {" "}
            <h2>Output:</h2>
            <hr />
            <br />
            <div id="out">{output}</div>
          </div>
        </div>
        <div>
          {" "}
          <button
            type="button"
            className="btn btn-warning btn-md"
            style={{ marginLeft: "40%", width: "20%" }}
            onClick={compile}
          >
            <b>Run</b>{" "}
          </button>{" "}
        </div>
      </div>
    </>
  );
};

export default Main_compiler;
