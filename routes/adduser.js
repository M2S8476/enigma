var express = require('express');
var router = express.Router();
const adduserCtrl = require ('../controllers/adduser');

router.get('/', adduserCtrl.viewusers);

module.exports = router;