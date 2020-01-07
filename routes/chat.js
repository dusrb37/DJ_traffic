var express = require('express');
var router = express.Router();

/* Get users */
router.get('/', function (req, res, next) {
    res.render('chat', {title : 'Chat'});
})

module.exports = router;