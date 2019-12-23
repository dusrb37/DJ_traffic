var express = require('express');
var router = express.Router();
const fs = require('fs');

/* get table page */
router.get('/', function(req, res, next){
    // res.render('table',{});
    // res.json({msg: "success"});
    res.setHeader('Content-type', 'text/html');
    fs.readFile('leveltest.txt', 'utf8', function (err, data) {
      if (err) throw err;
      // var arr = data.toString().split("\n");
      // for (i in arr) {
      //   console.log(i + arr[i])
      // }
      res.write(data);
      res.end();
    })
});

router.post('/', function(req, res, next){
    // res.render('table',{});
    fs.open('leveltest.txt', 'a', function (err, fd) {
        if (err) throw err;
        var file_read = { ...req.body }
        var file_body = Object.values(file_read);
    
        fs.appendFileSync(fd, file_body.join(" ") + '\n', 'utf8', function (err) {
          fs.close(fd, function (err) {
            if (err) throw err;
          })
          if (err) throw err;
        });
        res.json({
          msg: "success"
        })
      });
});

module.exports = router;