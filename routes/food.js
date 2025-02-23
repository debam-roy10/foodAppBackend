const router = require("express").Router();
const Food = require("../models/Food");

router.get("/food", async (req, res) => {
    try {
        let id = req.query.id;

        if (!id) {
            throw new Error("ID is required!");
        }

        const food = await Food.find({ id });
        const response = {
            error: false,
            food,
        }

        res.status(200).json(response);
    } catch (err) {
        const response = {
            error: true,
            message: err.message,
        }
        res.status(404).json(response);
    }
});

module.exports = router;