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

function allowPositionAsccess (req, res, next) {
    if(req.signedCookies.user_pos == req.params.position) {
        next();
    } else {
        res.status(401);
        next(new Error('Un-authorized Position'));
    } 
}

module.exports = {
    ensureLoggedIn,
    allowAccess,
    allowActivityAccess,
    allowPositionAsccess
};