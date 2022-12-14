const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id)
        .exec((err, category) => {
            if (err || !category) {
                return res.status(400)
                        .json({
                            error: 'No Data found in DB'
                        });
            }
        req.category = category;
    });
    next();
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err || !category) {
            return res.status(400)
                    .json({
                        error: 'Not able to store category in DB'
                    });
        }
        res.json(category);
    });
};

exports.getAllCategory = (req, res) => {
    Category.find()
        .exec((err, categories) => {
            if (err || !categories) {
                return res.status(400)
                        .json({
                            error: 'No Category found'
                        });
            }
            res.json(categories);
        })
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, category) => {
        if (err) {
            return res.status(400)
                    .json({
                        error: 'Unable to update category'
                    });
        }

        res.json(category);
    });
};

exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, category) => {
        if (err) {
            return res.status(400)
                .json({
                    error: 'Unable to remove category'
                });
        }
        res.json({
            message: 'Successfully deleted'
        });
    });
};