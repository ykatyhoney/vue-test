const path = require("path")
const router = require('express-promise-router')();
/* GET home page. */
router.route('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
module.exports = router;
