
exports.validateRegistration = function(req, res) {
        req.sanitize("password").trim();
        req.check("password", "Your password must be at least 6 characters long.").notEmpty().len(6);
        req.check("email", "Please enter a valid email.").notEmpty().isEmail();
        req.check("dob", "Please enter a dob.").notEmpty();
    }

exports.validateLogin = function(req, res) {
    req.sanitize("email").trim();
    req.sanitize("password").trim();
    req.check("email", "Invalid mandatory field [email].").notEmpty();
    req.check("password", "Invalid mandatory field [password].").notEmpty();
}

exports.validateLogout = function(req, res) {
}

