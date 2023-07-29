
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserRouter = require('./Routers/UserRouters')
const OrderRouter = require('./Routers/OrderRouter')
const dotenv = require('dotenv')
const compression = require('compression')
dotenv.config()

const app = express()
app.use(compression())
app.use(cors())
app.use(express.json())

const db = process.env.DATABASE_LINK.replace('<password>', process.env.MONGODB_PASS)

mongoose.connect(db)
    .then(data => console.log('Successfully connected to MongoDB Server'))
    .catch(err => console.log('Something went wrong with MongoDB Server : ', err))




//

app.use('/user', UserRouter)
app.use('/order', OrderRouter)

app.get('/', (req, res) => {
    res.send('Welcome to Burger Builder App')
})



const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

