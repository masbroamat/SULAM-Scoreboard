import React, { useEffect, useState } from "react";
import axios from "axios";
import GroupColumn from "./GroupColumn";
import "./Scoreboard.css";

const Scoreboard = () => {
    const [scores, setScores] = useState([]);

    // Fetch scores from the server
    useEffect(() => {
        axios.get("https://sulamscoreboard-cff5595b9c96.herokuapp.com/scores")
            .then((response) => setScores(response.data))
            .catch((error) => console.error("Error fetching scores:", error));
    }, []);

    // Handle the update of the scores when the user edits a checkpoint
    const updateScore = (groupId, checkpointIndex, newScore) => {
        setScores(prevScores => 
            prevScores.map((score) =>
                score.id === groupId
                    ? {
                        ...score,
                        [`checkpoint_${checkpointIndex}`]: newScore
                    }
                    : score
            )
        );
    };

    // Handle saving the scores to the backend
    const saveScores = () => {
        scores.forEach((group) => {
            for (let i = 1; i <= 5; i++) {
                axios.put(`https://sulamscoreboard-cff5595b9c96.herokuapp.com/scores/${group.id}`, {
                    checkpointIndex: i,
                    newScore: group[`checkpoint_${i}`],
                });
            }
        });
        alert("Scores saved successfully!");
    };

    const resetScores = () => {
        axios.put("https://sulamscoreboard-cff5595b9c96.herokuapp.com/scores/reset")
            .then(() => {
                // After resetting on the server, reset scores to 0 in the frontend as well
                setScores(prevScores =>
                    prevScores.map((score) => ({
                        ...score,
                        checkpoint_1: 0,
                        checkpoint_2: 0,
                        checkpoint_3: 0,
                        checkpoint_4: 0,
                        checkpoint_5: 0,
                    }))
                );
                alert("Scores reset to 0!");
            })
            .catch((error) => console.error("Error resetting scores:", error));
    };
    

    // Listen for save and reset events
    useEffect(() => {
        const handleSaveScores = () => saveScores();
        const handleResetScores = () => resetScores();

        window.addEventListener("saveScores", handleSaveScores);
        window.addEventListener("resetScores", handleResetScores);

        return () => {
            window.removeEventListener("saveScores", handleSaveScores);
            window.removeEventListener("resetScores", handleResetScores);
        };
    }, [scores]);

    const sortedGroups = () => {
        return scores
            .map((group) => ({
                group: group.group_name,
                total:
                    group.checkpoint_1 +
                    group.checkpoint_2 +
                    group.checkpoint_3 +
                    group.checkpoint_4 +
                    group.checkpoint_5,
            }))
            .sort((a, b) => b.total - a.total);
    };

    const totalScores = scores.reduce((sum, group) => {
        return sum + (group.checkpoint_1 + group.checkpoint_2 + group.checkpoint_3 + group.checkpoint_4 + group.checkpoint_5);
    }, 0);

    return (
        <div className="scoreboard">
            <div className="groups">
                {[0, 5].map((startIndex) => (
                    <div className="group-row" key={startIndex}>
                        {scores.slice(startIndex, startIndex + 5).map((group) => (
                            <GroupColumn
                                key={group.id}
                                groupName={group.group_name}
                                scores={[
                                    group.checkpoint_1,
                                    group.checkpoint_2,
                                    group.checkpoint_3,
                                    group.checkpoint_4,
                                    group.checkpoint_5,
                                ]}
                                onUpdateScore={(checkpointIndex, newScore) =>
                                    updateScore(group.id, checkpointIndex, newScore)
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="ranking">
                <h2>Ranking  :-
                <span style={{ fontSize: "24px" }}>
                    Total Score: RM{totalScores.toLocaleString()}
                </span>
                </h2>
                <table className="ranking-table">
                    <thead>
                        <tr>
                            <th>#No</th>
                            <th>Group</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedGroups().map(({ group, total }, rank) => (
                            <tr key={rank}>
                                <td>{rank + 1}</td>
                                <td>{group}</td>
                                <td>RM{total.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Scoreboard;
