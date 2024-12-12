import React from "react";
import Scoreboard from "./components/Scoreboard";
import "./App.css";
import logoisec from './assets/logoisec.png';
import logosulam from './assets/logosulam.png';
import logouitmwhite from './assets/logouitmwhite.png';

function App() {
    const handleSave = () => {
        // Trigger save event in Scoreboard
        const saveConfirmation = window.confirm("Are you sure you want save?");
        if (saveConfirmation) {
          const saveEvent = new Event("saveScores");
          window.dispatchEvent(saveEvent);
        }
    };

    const handleReset = () => {
        const confirmation = window.confirm("Are you sure you want to reset all scores to 0?");
        if (confirmation) {
            // Trigger reset event in Scoreboard
            const resetEvent = new Event("resetScores");
            window.dispatchEvent(resetEvent);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Leaderboard Scoreboard</h1>
                <div className="logos">
                    <img src={logoisec} alt="logoisec" />
                    <img src={logosulam} alt="logosulam" />
                    <img src={logouitmwhite} alt="logouitmwhite" /> 
                </div>
                <span className="buttons">
                    <button onClick={handleSave} className="save-button">Save</button>
                    {/* <button onClick={handleReset} className="reset-button">Reset</button> */}
                </span>
            </header>
            <Scoreboard />
            <p className="footer">UiTM JASIN x KOLEJ YAYASAN SAAD</p>
        </div>
    );
}

export default App;
