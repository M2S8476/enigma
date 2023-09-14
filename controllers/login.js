const mongoConnection = require('../utilities/connections');
const constants = require('../utilities/constants');
const responseManager = require('../utilities/responseManager');
var userModel = require('../models/user.models');
const helprer = require('../utilities/helper');
var async = require('async');
exports.viewlogin = async (req, res) => {
    res.render('login', { layout: false, title: 'Express' });
};
exports.postlogin = async (req, res) => {
    console.log('req.body', req.body);
    if (Object.keys(req.body).length > 0) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) && req.body.password && req.body.password.trim() != '') {
            let primary = mongoConnection.useDb(constants.DEFAULT_DB);
            let checkExisting = await primary.model(constants.MODELS.users, userModel).findOne({ email: req.body.email }).lean();
            if (checkExisting != null) {
                let decPassword = await helprer.passwordDecryptor(checkExisting.password);
                if (decPassword == req.body.password) {
                    req.session.userId = checkExisting._id.toString();
                    return responseManager.onSuccess('login Successfully', 1, res);
                } else {
                    return responseManager.badrequest({ message: "Invalid Password, Please try again with valid Password..." }, res);
                }
            } else {
                return responseManager.badrequest({ message: "Invalid Password, Please try again with valid Password..." }, res);
            }
        } else {
            return responseManager.badrequest({ message: "invalid email and pass, Please try again with correct one..." }, res);
        }
    } else {
        return responseManager.badrequest({ message: "Invalid data to create user" }, res);
    }
};
