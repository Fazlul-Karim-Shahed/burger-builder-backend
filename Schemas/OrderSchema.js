
const { Schema, model } = require('mongoose')

const Order = model('Orders', Schema({

    userId: Schema.Types.ObjectId,
    name: String,
    email: String,
    mobile: Number,
    selectedIngredient: Array,
    price: Number,
    address: String,
    paymentMethod: String,
    time: {
        type: Date,
        default: new Date().getTime()
    }

}))



exports.Order = Order