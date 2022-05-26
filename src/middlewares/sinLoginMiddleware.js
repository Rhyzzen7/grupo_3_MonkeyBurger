function sinLoginMiddleware(req, res, next) {
    if (req.session.usuario) {
        return res.redirect('/users');
    }
    next();
}

module.exports = sinLoginMiddleware;
