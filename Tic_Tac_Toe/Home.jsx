import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Home = () => {
  const [ma, setma] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [ma2, setma2] = useState(["", "", "", "", "", "", "", "", ""]);
  const [id, setid] = useState(1);
  const nav = useNavigate();
  const { state } = useLocation();
  const [name, setname] = useState(localStorage.getItem("name1"));
  const [name2, setname2] = useState(localStorage.getItem("name2"));
  const [n1, setn1] = useState("");
  const [n2, setn2] = useState("");

  const check = (e) => {
    if (ma2[e] === "") {
      if (id === 0) {
        ma2[e] = "X";

        setma2(ma2);
        setid(1);
        console.log(ma2);
        var k = ma;
        setma(k);
      } else if (id === 1) {
        ma2[e] = "O";
        setid(0);
        setma2(ma2);
        console.log(ma2);
        var k = ma;
        setma(k);
      }
    }
    var d1 = ma2.slice(0, 3);
    var d2 = ma2.slice(3, 6);
    var d3 = ma2.slice(6, 10);
    var c1 = [ma2[0], ma2[3], ma2[6]];
    var c2 = [ma2[1], ma2[4], ma2[7]];
    var c3 = [ma2[2], ma2[5], ma2[8]];
    var s1 = [ma2[0], ma2[4], ma2[8]];
    var s2 = [ma2[2], ma2[4], ma2[6]];
    var dsc = [d1, d2, d3, c1, c2, c3, s1, s2];
    dsc.map((d) => {
      var k = d.indexOf("");
      if (k === -1) {
        if (d[0] === d[1] && d[0] === d[2]) {
          console.log(d);
          nav("/", { state: d[0] });
        }
      }
    });
    var k = ma2.indexOf("");
    if (k === -1) {
      nav("/", { state: "Draw" });
    }
  };

  return (
    <>
      <div className="mainbg">
        <div className="btn-group ">
          <button className="btn btn-dark" onClick={() => nav("/")}>
            Back
          </button>
          <button
            className="btn btn-dark"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
        <div className="   row  border-0 p-3">
          <div
            className="col"
            style={{
              border: "3px solid",
              backgroundColor: n1,
              textAlign: "center",
            }}
          >
            <br />
            <h4>{name} -X</h4> <br />
          </div>
          <div
            className="col"
            style={{
              border: "3px solid",
              backgroundColor: n2,
              textAlign: "center",
            }}
          >
            <br />
            <h4>{name2} -O</h4>
            <br />
          </div>
        </div>
        <hr />
        <br />
        <div className="bor ">
          {ma.map((m) => {
            return (
              <>
                <div className="  box " style={{}} onClick={() => check(m)}>
                  <h1>{ma2[m]}</h1>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
