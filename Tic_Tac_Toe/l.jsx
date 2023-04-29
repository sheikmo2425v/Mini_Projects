import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const L = () => {
  const [win, setwin] = useState("");
  const { state } = useLocation();
  const [name, setname] = useState(localStorage.getItem("name1"));
  const [name2, setname2] = useState(localStorage.getItem("name2"));
  const [again, setagain] = useState("");
  const [sh0, setsh0] = useState("none");
  const [sh1, setsh1] = useState("none");
  const nav = useNavigate();
  useEffect(() => {
    console.log(state);
    if (state === "X") {
      setwin("winner is " + name);
      setsh0("");
      setsh1("none");
    } else if (state === "O") {
      setwin("winner is " + name2);
      setsh0("");
      setsh1("none");
    } else if (state === "Draw") {
      setagain("Draw");
      setsh1("");
    }
  }, []);
  const n = () => {
    console.log(name, name2);
    localStorage.setItem("name1", name);
    localStorage.setItem("name2", name2);
    nav("/L");
  };
  return (
    <>
      <div className="mainbg">
        <br />
        <div
          style={{
            textAlign: "center",
            border: "3px solid",
            backgroundColor: "GrayText",
            display: sh0,
          }}
        >
          <h2>{win}</h2>
        </div>
        <br />
        <div
          style={{
            textAlign: "center",
            border: "3px solid",
            backgroundColor: "GrayText",
            display: sh1,
          }}
        >
          <h2>{again}</h2>
        </div>
        <div className="d">
          <label htmlFor="Name">
            <b>X- Player Name </b>
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            value={name}
            style={{ border: "3px solid", backgroundColor: "GrayText" }}
            onChange={(e) => setname(e.target.value)}
          />
          <label htmlFor="Name2">
            <b>O- Player Name </b>
          </label>
          <br />
          <input
            type="text"
            className="form-control"
            value={name2}
            style={{ border: "3px solid", backgroundColor: "GrayText" }}
            onChange={(e) => setname2(e.target.value)}
          />
          <br />
          <button className="btn btn-dark tce" onClick={() => n()}>
            play
          </button>
        </div>
      </div>
    </>
  );
};

export default L;
