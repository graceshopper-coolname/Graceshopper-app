const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    //for later, findall where status !== "Cart" (right now the data only has carts)
    const pastOrders = await Order.findAll({
      where: { userId: 2 },
      include: [{ all: true }]
    });
    //const pastOrders = await Order.findAll({ where: { userId: 1 } });
    res.json(pastOrders);
  } catch (error) {
    next(error);
  }
});
