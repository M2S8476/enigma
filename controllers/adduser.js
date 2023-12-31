var mongoose = require('mongoose');
var async = require('async');
const mongoConnection = require('../utilities/connections');
const constants = require('../utilities/constants');
const responseManager = require('../utilities/responseManager');
const helper = require('../utilities/helper');
var userModel = require('../models/user.models');

exports.viewadduser = async (req, res) => {
    if (req.session.userId) {
        let primary = mongoConnection.useDb(constants.DEFAULT_DB);
        let userData = await primary.model(constants.MODELS.users, userModel).findById(req.session.userId).lean();
        if (userData) {
            res.render('adduser', { title: 'adduser' });
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
};
exports.postadduser = async (req, res) => {

    if (Object.keys(req.body).length > 0) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
            let primary = mongoConnection.useDb(constants.DEFAULT_DB);
            let checkExisting = await primary.model(constants.MODELS.users, userModel).findOne({ email: req.body.email }).lean();
            if (checkExisting == null) {
                req.body.password = await helper.passwordEncryptor(req.body.password);
                let newuser = await primary.model(constants.MODELS.users, userModel).create({
                    createby: req.session.userId,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    gender: req.body.gender,

                });
                return responseManager.onSuccess('User Created Successfully..', newuser, res);
            } else {
                return responseManager.badrequest({ message: "Email id already exist, Please try again with new email..." }, res);
            }
        } else {
            return responseManager.badrequest({ message: "MMS Invalid email to create user, Please try again" }, res);
        }
    } else {
        return responseManager.badrequest({ message: "Invalid data to create user, Please try again" }, res);
    }
}