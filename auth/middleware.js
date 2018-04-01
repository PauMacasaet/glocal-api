function ensureLoggedIn (req, res, next) {
    if(req.signedCookies.user_id) {
        next();
    } else {
        res.status(401);
        next(new Error('Un-Authorized'));
    }
}

function allowIDAccess (req, res, next) {
    const obj = req.signedCookies.user_id;
    if(obj == req.params.userid) {
        next();
    } else {
        res.status(401);
        next(new Error('Un-Authorized'));
    }
}

function allowActivityAccess (req, res, next) {
    if(req.signedCookies.user_name == req.params.fullName) {
        next();
    } else {
        res.status(401);
        next(new Error('Un-Authorized User'));
    }
}

function allowPositionAsccess (req, res, next) {
    if(req.signedCookies.user_pos == req.params.position) {
        next();
    } else {
        res.status(401);
        next(new Error('ACCESS DENIED PAKYU KA'));
    } 
}

module.exports = {
    ensureLoggedIn,
    allowIDAccess,
    allowActivityAccess,
    allowPositionAsccess
};