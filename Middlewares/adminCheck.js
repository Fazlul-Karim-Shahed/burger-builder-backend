
const jwt = require('jsonwebtoken')
const { User } = require('../Schemas/UserSchema')

const adminCheck = async (req, res, next) => {

    try {
        // console.log(req.headers.authorization);
        const data = await jwt.verify(req.headers.authorization, 'SECRET_KEY')
        if (data) {
            const user = await User.findOne({ email: data.email })
            if (user) {
                if (user.role === 'admin') {
                    req.user = user
                    console.log('verified')
                    // res.send('Verified')
                    next()
                }
                else {
                    res.send({ message: 'Not admin' , error: true})
                }
            }
            else {
                res.send({ message: 'User not found', error: true });
            }
        }
        else {
            req.send({ message: 'Not verified', error: true })
        }

    }
    catch (err) {
        res.send({ message: 'Something went wrong', error: true });
    }


}

module.exports = adminCheck