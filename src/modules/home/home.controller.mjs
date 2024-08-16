
export const getHome=async(req, res, next) => {
    res.render('home.ejs',{session:req.session});
}