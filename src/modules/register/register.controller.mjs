import bcrypt from 'bcrypt';
import userModel from '../../../db/model/user.model.js';

export const register = (req, res, next) => {
    res.render('register', { session: req.session });
};

export const registerHandler = async (req, res, next) => {
    const { name, email, password } = req.body

    try {
        const userExist = await userModel.findOne({ email });

        // If user already exists, render the registration page with an error
        if (userExist) {
            return res.render('register', { error: 'Email already exists' });
        }

        // Hash the password asynchronously
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({ name, email, password: hashPassword });

        if (!user) {
            return res.render('register', { error: 'Error creating new user' });
        }

        return res.redirect('/signin');
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.render('register', { error: 'An unexpected error occurred' });
    }
};

