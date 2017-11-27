/**
 * Created by pc on 2017/10/23.
 */
var express = require('express');
var router = express.Router();
router.get('/user', function(req, res, next) {
   res.send('User');
});
module.exports = router;