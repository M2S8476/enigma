var express = require('express');
var router = express.Router();
const usersCtrl = require ('../controllers/users');

router.get('/', usersCtrl.viewusers);
router.post('/', usersCtrl.postusers);

module.exports = router;