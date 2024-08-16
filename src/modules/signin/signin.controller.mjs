import bcrypt from 'bcrypt';
import userModel from '../../../db/model/user.model.js';

export const signin = (req, res, next) => {
    res.render('signin.ejs', { error: req.query.error, session: req.session });
};


export const signinHandler = async (req, res, next) => {
    const { password, email } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('signin', { error: 'Invalid email or password' });
        }

        // // Regenerate session before setting user data
        // req.session.regenerate((err) => {
        //     if (err) {
        //         console.error('Error regenerating session:', err);
        //         return next(err);
        //     }

            // Set session data
            req.session.loggedIn = true;
            req.session.userId = user._id;
            req.session.userName = user.name;

            return res.redirect('/');
        // });

    } catch (error) {
        console.error('signin error:', error);
        return next(error);
    }
};

export const logOut = (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return next(err);
            }
            res.redirect('/signin');
        });
    }
};
