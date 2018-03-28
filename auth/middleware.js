function ensureLoggedIn (req, res, next) {
    if(req.signedCookies.user_id) {
        next();
    } else {
        res.status(401);
        next(new Error('Un-Authorized'));
    }
}

function allowAccess (req, res, next) {
    if(req.signedCookies.user_id == req.params.userid) {
        next();
    } else {
        res.status(401);
        next(new Error('Un-Authorized'));
    }
}

function allowActivityAccess (req, res, next) {
    if(req.signedCookies.engName == req.params.assignedSystemsEngineer) {
        next();
    } else {
        res.status(401);
        next(new Error('Un-Authorized User'));
    }
}

module.exports = {
    ensureLoggedIn,
    allowAccess,
    allowActivityAccess
};