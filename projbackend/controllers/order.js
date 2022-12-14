const {Order, ProductCart} = require('../models/order');

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price') // weird way of handling populate
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: 'Unable to find order in DB'
                });
            }
            req.order = order;
            next(); // Middleware
        })
}

exports.createOrder = (req, res) => {
    // TODO: this is something that needs to be looked thoroughly

    req.body.order.user = req.profile;
    const order = new Order(req.body);

    order.save((err, order) => {
        if (err) {
            return res.status(400).json({
                error: 'unable to create order in DB!'
            });
        }
        res.json(order);
    });

}

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: 'Unable to get all orders in DB!'
                });
            }

            res.json(orders);
        });
}

exports.getOrderStatus  = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
}

exports.updateStatus = (req, res) => {
    Order.updated(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: 'Unable to update status'
                });
            }
            return res.json(order);
        }
    );
}