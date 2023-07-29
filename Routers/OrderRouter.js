
const router = require('express').Router()
const { Order } = require('../Schemas/OrderSchema')

const createOrder = async (req, res) => {
    try {

        // console.log('Body: ', req.body);

        let data = new Order({
            userId: req.body.userId,
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            selectedIngredient: req.body.selectedIngredient,
            price: req.body.price,
            address: req.body.address,
            paymentMethod: req.body.paymentMethod,
        })
        data = await data.save()
        console.log('Create order data: ', data);
        res.send({ message: 'Order saved successfully!', error: false, value: data })
    }
    catch (err) {
        res.send({ message: 'Something went wrong on createOrder', error: true })
    }

}

const getOrders = async (req, res) => {
    try {
        const id = req.params.id

        const data = await Order.find({ userId: id })
        // console.log(data);
        if (data.length === 0) {
            res.send({ message: 'No Order found', error: true })
        }
        else res.send({ message: 'All orders', error: false, value: data })
    }
    catch (err) {
        res.send({ message: 'Something went wrong on getOrders', error: true })
    }
}


router.post('/', createOrder)
router.get('/:id', getOrders)


module.exports = router