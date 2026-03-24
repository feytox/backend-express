const express = require("express");
const router = express.Router();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mydb.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name text
)`);

const users = [
    { id: 1, name: "Булатов Александр" },
    { id: 2, name: "Рахимзянов Равиль" },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.json({
        items: users,
    });
});

router.post("/", function (req, res, next) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            error: "Name is required",
        });
    }
    const newUser = {
        id: users.length + 1,
        name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

module.exports = router;
