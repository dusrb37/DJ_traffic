var express = require('express');
var router = express.Router();
const request = require('request-promise-native')
const xml2js = require('xml-js')

var url = 'http://openapitraffic.daejeon.go.kr/traffic/rest/getTrafficInfoAll.do';

router.get('/', function(req, res, next) {
    res.redirect('/traffic/1');
})
router.get('/:id', function(req, res, next) {
    // res.render('traffic', {results: []});
    var queryParams = '?' + encodeURIComponent('ServiceKey') + '=It%2FGs1%2F5tUsZ9UsxHtRzLkvG36w6S9Z9wrO5xOgrRwjnZYV8VEjiJiJYM6wCL9XqBr0xXhA5Iiio7JZbqqaNbA%3D%3D'; /* Service Key*/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('20'); /* 한 페이지 결과 수 */
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(req.params.id); /* 페이지번호 */

    // request 비동기로 만들어야 함
    let jsonData = {};
    request({
        url: url + queryParams,
        method : 'GET'
    }, function (error, response, body) {
        // console.log('Status', response.statusCode);
        // console.log('Headers', JSON.stringify(response.headers));
        // console.log('Response received', body);
        jsonData = xml2js.xml2json(body, { compact: true, spaces: 4 });
    })
    .then(function() {
        console.log(JSON.parse(jsonData).response.body["TRAFFIC-LIST"].TRAFFIC);
        res.render('traffic', {title: "대전광역시 도로교통 실시간 정보 알리미", results: JSON.parse(jsonData).response.body["TRAFFIC-LIST"].TRAFFIC});
        console.log('요청 완료');
    })
    .catch(function() {
        console.log('요청 실패');
    });

});


module.exports = router;