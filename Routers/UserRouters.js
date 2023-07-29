
const router = require('express').Router()
const { User } = require('../Schemas/UserSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const adminCheck = require('../Middlewares/adminCheck')

const signup = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            res.send({ message: 'Email already exist', error: true })
        }
        else {
            let data = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(req.body.password, salt)
            data.password = hashedPass
            data = await data.save()
            console.log("Data: ", data);
            console.log("pass: ", data.password);
            const token = jwt.sign({
                _id: data._id,
                name: data.name,
                email: data.email,
                role: data.role
            }, 'SECRET_KEY', { expiresIn: '1h' })

            res.send({
                message: 'User created successfully',
                value: token,
                error: false
            })
        }
    }
    catch (err) {
        // console.log(err);
        res.send({ message: 'Signin failed', error: false })
    }
}


const signin = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {

                const token = jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }, 'SECRET_KEY', { expiresIn: '1h' })

                res.send({
                    message: 'Login successful',
                    value: token,
                    error: false
                })

            }
            else {
                res.send({ message: 'Password not matched', error: true })
            }

        }
        else {
            res.send({ message: 'Email not found', error: true })
        }

    } catch (err) {
        res.send({ message: 'Something went wrong!', error: true })
    }
}

const getUsers = async (req, res) => {
    const data = await User.find()
    res.send({ error: false, value: data, message: '' })
}

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/', adminCheck, getUsers)



module.exports = router