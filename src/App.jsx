import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [runs, setRuns] = useState([]);
  const [batters, setBatters] = useState([]);
  const [bowlers, setBowlers] = useState([]);
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [oversBowled, setOversBowled] = useState(0);
  const [totalOvers, setTotalOvers] = useState(0);
  const [totalBallsBowled, setTotalBallsBowled] = useState(0);
  const [crr, setCrr] = useState(0);
  const [ballByBall, setBallByBall] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);

  const reset = () => {
    setScore(0);
    setWickets(0);
    setOversBowled(0);
    setTotalOvers(20);
    setTotalBallsBowled(0);
    setCrr(0);
    setBallByBall([]);
    setSelectedButton(null);
  };

  useEffect(() => {
    setRuns(["0", "1", "2", "3", "4", "5", "6"]);
    setBatters([
      "Jhon1",
      "Jhon2",
      "Jhon3",
      "Jhon4",
      "Jhon5",
      "Jhon6",
      "Jhon7",
      "Jhon8",
      "Jhon9",
      "Jhon10",
      "Jhon11",
    ]);
    setBowlers([
      "Doe1",
      "Doe2",
      "Doe3",
      "Doe4",
      "Doe5",
      "Doe6",
      "Doe7",
      "Doe8",
      "Doe9",
      "Doe10",
      "Doe11",
    ]);
    setScore(6);
    setWickets(0);
    setOversBowled(1);
    setTotalOvers(20);
    setTotalBallsBowled(6);
    setCrr(6.0);
    setBallByBall([
      {
        ball: "0.1",
        score: "1",
      },
      {
        ball: "0.2",
        score: "1",
      },
      {
        ball: "0.3",
        score: "1",
      },
      {
        ball: "0.4",
        score: "1",
      },
      {
        ball: "0.5",
        score: "1",
      },
      {
        ball: "0.6",
        score: "1",
      },
    ]);
  }, []);

  const updateScore = () => {
    setScore(score + parseInt(selectedButton));
  };

  const updateBallByBall = () => {
    let currentBall = ballByBall.length
      ? parseFloat(ballByBall[ballByBall.length - 1].ball)
      : 0;

    Math.abs((currentBall % 1) - 0.6) < 0.0000001
      ? (currentBall += 0.5)
      : (currentBall += 0.1);

    currentBall = parseFloat(currentBall).toFixed(1);
    setBallByBall([
      ...ballByBall,
      {
        ball: currentBall,
        score: selectedButton,
      },
    ]);
  };

  const updateCRR = () => {
    setCrr(
      (
        ((score + parseInt(selectedButton)) / (totalBallsBowled + 1)) *
        6
      ).toFixed(2)
    );
  };

  const updateOversBowled = () => {
    let currentOver = parseFloat(oversBowled);

    Math.abs((currentOver % 1) - 0.5) < 0.0000001
      ? (currentOver += 0.5)
      : (currentOver += 0.1);

    setOversBowled(
      currentOver.toString().length > 1
        ? currentOver.toFixed(1)
        : currentOver.toFixed(0)
    );
  };

  const addRun = () => {
    if (selectedButton) {
      updateScore();

      updateBallByBall();

      updateCRR();

      setTotalBallsBowled(totalBallsBowled + 1);

      updateOversBowled();

      setSelectedButton(null);
    } else {
      alert("select any one button from run(s)!");
    }
  };

  const commingSoon = () => {
    alert("comming soon!");
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">Cricket Score Keeper</span>
      </nav>
      <div className="container main">
        <div className="match">
          <h3>Team A VS Team B</h3>
          <hr />
          <div className="row">
            <div className="col score">
              <p>Score</p>
              <h4>{`${score}/${wickets}`}</h4>
            </div>
            <div className="col rr">
              <p>CRR</p>
              <h4>{crr}</h4>
            </div>
            <div className="col overs">
              <p>Overs</p>
              <h4>{`${oversBowled}/${totalOvers}`}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col batters">
              <h5>{batters[0]}</h5>
              <h5>{batters[1]}</h5>
            </div>
            <div className="col bowler">
              <h5>{bowlers[0]}</h5>
            </div>
          </div>
          <div className="row">
            {ballByBall.map((obj, index) => {
              if (ballByBall.length - 10 <= index) {
                return (
                  <div className="col ball" key={index}>
                    <p> {Object.values(obj)[0]} </p>
                    <h5> {Object.values(obj)[1]} </h5>
                  </div>
                );
              }
              {
                Math.abs((Object.values(obj)[0] % 1) - 0.6) < 0.0000001 ? (
                  <div>|</div>
                ) : (
                  <div>/</div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="container options">
        <div className="row">
          <h3>Runs</h3>
        </div>
        <div className="row">
          {runs.map((run) => (
            <div className="col run" key={run}>
              <button
                className="btn btn-light rounded-circle border border-1 border-dark"
                value={run}
                onClick={(e) => setSelectedButton(e.target.value)}
              >
                {run}
              </button>
            </div>
          ))}
        </div>
        <hr />
        <div className="row">
          <div className="col extras">
            <h3>Extras</h3>
            <button className="btn btn-primary" onClick={commingSoon}>
              Wide
            </button>
            <button className="btn btn-primary" onClick={commingSoon}>
              No Ball
            </button>
          </div>
          <div className="col wicket">
            <h3>Wicket</h3>
            <button className="btn btn-primary" onClick={commingSoon}>
              Out
            </button>
            <button className="btn btn-primary" onClick={commingSoon}>
              Run Out
            </button>
          </div>
        </div>
      </div>
      <div className="container submit">
        <button className="btn btn-success" onClick={addRun}>
          Submit
        </button>
      </div>
      <div className="container end">
        <button className="btn btn-danger" onClick={reset}>
          End Match
        </button>
      </div>
    </div>
  );
};

export default App;
