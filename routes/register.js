var express = require('express');
var router = express.Router();
const registerCtrl = require ('../controllers/register');
router.get('/', registerCtrl.viewregister);
router.post('/', registerCtrl.postregister);

module.exports = router;