import messageModel from '../../../db/model/message.model.js'
import QRCode from 'qrcode'






export const sendMessage = async (req, res, next) => {
    try {
        await messageModel.create({ content: req.body.content, user: req.session.userId });
        req.session.msg = 'sent';
        res.redirect(`/user/${req.session.userId}`);
    } catch (error) {
        next(error);
    }
};

export const getprofile = async (req, res, next) => {
    let url = `${req.protocol}://${req.get('host')}/user/${req.session.userId}`
    let qrCodeUrl;
    QRCode.toDataURL(url)
        .then(url => {
            qrCodeUrl = url
        }).catch(err => {
            console.error(err)
        });
    
    try {
        const messages = await messageModel.find({ user: req.session.userId });
        if (req.session.loggedIn) {
            res.render('profile.ejs', { session: req.session, messages, url, qrCodeUrl });

        }
    } catch (error) {
        next(error);
    }
};
