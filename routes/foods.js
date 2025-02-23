const router = require("express").Router();
const Food = require("../models/Food");

router.get("/foods", async (req, res) => {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const search = req.query.search || "";
        let sort = req.query.sort || "rate";
        let category = req.query.category || "all";
        let tags = req.query.tags || "all";
        let type = req.query.type || "all";

        const categoriesOptions = [
            "bbqs", "breads", "burgers", "chocolates", "desserts", "drinks", "fried chicken", "ice creams", "pizzas", "porks", "sandwiches", "sausages", "steaks",
        ];

        const tagsOptions = [
            "dinner", "lunch", "breakfast", "snack", "dessert", "accom", "fast food",
        ];

        const typesOptions = ["veg", "nonveg"];

        category === "all"
            ? (category = [...categoriesOptions]) : (category = [category]);

        tags === "all"
            ? (tags = [...tagsOptions])
            : (tags = req.query.tags.split(","));

        type === "all" ? (type = [...typesOptions]) : (type = [type]);


        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const foods = await Food.find({ name: { $regex: search, $options: "i" } })
            .where("category")
            .in([...category])
            .where("type")
            .in([...type])
            .where("tags")
            .in([...tags])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        const total = await Food.countDocuments({
            category: { $in: [...category] },
            tags: { $in: [...tags] },
            type: { $in: [...type] },
            name: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            category: categoriesOptions,
            tags: tagsOptions,
            type: typesOptions,
            foods,
        };

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

module.exports = router;
