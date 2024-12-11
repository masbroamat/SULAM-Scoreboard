const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
// require('dotenv').config(); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// PostgreSQL connection pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "sulamscoreboard",
    password: "admin",
    port: 5432,
})

// app.get("/*", function(req, res) {
//     res.sendFile(
//         path.join(__dirname, "../frontend/index.html"),
//         function(err){
//             if(err){
//                 res.status(500).send(err);
//             }
//         }
//     )
// })

// Get all scores
app.get("/scores", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM scoreboard ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update score
app.put("/scores/:id", async (req, res) => {
    const { id } = req.params;
    const { checkpointIndex, newScore } = req.body;

    if (checkpointIndex < 1 || checkpointIndex > 5) {
        return res.status(400).json({ error: "Invalid checkpoint index" });
    }

    try {
        const column = `checkpoint_${checkpointIndex}`;
        const query = `UPDATE scoreboard SET ${column} = $1 WHERE id = $2`;
        await pool.query(query, [newScore, id]);
        res.json({ message: "Score updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Reset all scores to 0
app.put("/scores/reset", async (req, res) => {
    try {
        await pool.query(`
            UPDATE scoreboard
            SET checkpoint_1 = 0,
                checkpoint_2 = 0,
                checkpoint_3 = 0,
                checkpoint_4 = 0,
                checkpoint_5 = 0
        `);
        res.json({ message: "All scores reset successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
