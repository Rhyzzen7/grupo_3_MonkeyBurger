function conLoginMiddleware(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/users/login');
    }
    next();
}

module.exports = conLoginMiddleware;
