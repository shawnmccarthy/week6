// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
    function(username, password, done) {
        //hard coded
        var user = { name: "testuser" };
        if (username == user.name && password == "cu")
        {
            return done(null, user);
        }
        else
        {
            return done(null, false);
        }
    }
));

function BasicAuth(req, res, callback) {
    const $ = passport.authenticate('basic', { session: false}, function(error, user, info) {
        if (error) {
            var err = new Error('Error in basic authentication process');
            err.status = 500;
            return callback(err);
        }

        if (!user) {
            var err = new Error('Authentication failed,: ' + info);
            err.status = 401;
            return callback(err);
        }

        req.user = user;
        return callback();
    });

    $(req, null, callback);
}


module.exports = {
    BasicAuth
};