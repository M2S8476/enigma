var express = require('express');
var router = express.Router();
let mongoConnection = require('../utilities/connections');
let constants = require('../utilities/constants');
let responseManager = require('../utilities/responseManager');
let userModel = require('../models/user.models');
const async = require('async');
/* GET users listing. */
router.get('/', async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        if (userData) {
            res.render('dashboard', { title: 'dashboard' });
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

module.exports = router;