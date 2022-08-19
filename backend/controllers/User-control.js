import User from "../modules/User";
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'

export const getAlluser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error)
    }
    if (!users) {
        return res.status(404).json({ message: "user not found" })
    }
    return res.status(200).json({ users });

}

export const signup = ([body('name', 'enter vaild name').isLength({ min: 3 }),
body('email', 'enter vaild email').isEmail(),
body('password', 'enter vaild password').isLength({ min: 5 })
], async (req, res, next) => {
    let existinguser;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        existinguser = await User.findOne({ email: req.body.email })
        if (existinguser) {
            return res.status(400).json({ message: "user is already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt)

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
            blogs:[]
        })
        user.save();
        return res.status(201).json({ user })

    } catch (error) {
        return console.log(error);
    }

});

export const login = ([
    body('email', 'enter vaild email').isEmail(),
    body('password', 'passwork cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct info" });
        }
        const passcom = await bcrypt.compare(password, user.password);
        if (!passcom) {
            return res.status(400).json({ error: "please try to login with correct info" });
        }
        

       return  res.status(200).json({ message:"login success",user:user})
    } catch (error) {
        console.log(error.message)
    }
})
