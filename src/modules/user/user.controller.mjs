export const getUser = async (req, res, next) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect('/profile');
        }

        const msg = req.session.msg;
        req.session.msg = null; // Clear the message after rendering
        res.render('messages.ejs', { session: req.session, msg });
    } catch (error) {
        next(error);
    }
};