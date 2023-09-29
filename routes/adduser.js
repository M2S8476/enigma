var express = require('express');
var router = express.Router();
const adduserCtrl = require ('../controllers/adduser');

router.get('/', adduserCtrl.viewadduser);
router.post('/', adduserCtrl.postadduser);

module.exports = router;
