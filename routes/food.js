const router = require("express").Router();
const Food = require("../models/Food");

router.get("/food", async (req, res) => {
    try {
        let id = req.query.id;

        if (!id) {
            throw new Error("ID is required!");
        }

        const food = await Food.find({ id });

        if (food.length === 0) {
            throw new Error("Item not found!");
        }

        const response = {
            error: false,
            food,
        };

        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({
            error: true,
            message: err.message,
        });
    }
});

module.exports = router;
