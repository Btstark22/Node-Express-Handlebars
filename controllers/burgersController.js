const router = require("express").Router();
const burger = require("../models/burger.js");

router.post("/api/burgers", function (req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
        //comes from the front end
        req.body.name, req.body.devoured
    ], function (result) {
        res.json({ id: result.insertId });
    });
});

router.get("/", function (req, res) {
    console.log("res: "+res);
    
    burger.read(function (data) {
        const burgers = {
            burgers: data
        };
        console.log(burgers);
        res.render("index", burgers);
    });
});

router.put("/api/burgers/:id", function (req, res) {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function (req, res) {
    const condition = "id = " + req.params.id;

    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;