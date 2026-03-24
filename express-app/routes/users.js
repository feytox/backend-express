const express = require("express");
const router = express.Router();

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

module.exports = router;
