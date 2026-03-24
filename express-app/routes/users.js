const express = require("express");
const router = express.Router();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mydb.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)`);

const users = [
    { id: 1, name: "Булатов Александр" },
    { id: 2, name: "Рахимзянов Равиль" },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: "Database error",
            });
        }
        res.json({"items": rows});
    });
});

router.get("/:id", function (req, res, next) {
    const { id } = req.params;
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: "Database error",
            });
        }
        if (!row) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        res.json(row);
    });
});

router.post("/", function (req, res, next) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            error: "Name is required",
        });
    }

    db.run(`INSERT INTO users (name) VALUES (?)`, [name], function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: "Database error",
            });
        }
        const newUser = {
            id: this.lastID,
            name,
        };
        res.status(201).json(newUser);
    });
});

module.exports = router;
