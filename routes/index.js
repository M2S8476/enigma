var express = require('express');
var router = express.Router();
const loginCtrl = require('../controllers/login');
router.get('/', loginCtrl.viewlogin);
router.post('/', loginCtrl.postlogin);
module.exports = router;
