var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var dateFormat = require('dateformat');

router.get('/', function (req, res, next) {
  res.redirect('boardList');
});

var config = {
  apiKey : "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storegeBucket: "",
  messagingSenderId: ""
};

firebase.initializeApp(config);

//boardList
router.get('/boardList', function (req, res, next) {
  firebase.database().ref('board').orderByKey().once('value', function (snapshot) {
    var rows = [];
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      childData.brddate = dateFormat(childData.brddate, "yyyy-mmdd");
      rows.push(childData);
    });
    res.render('board1/boardList', {rows: rows});
  });
});

//boardRead
router.get('/boardRead', function (req, res, next) {
  firebase.database().ref('board/'+req.query.brdno).once('value', function (snapshot) {
    var childData = snapshot.val();

    childData.brdno = snapshot.key;
    childData.brddate = dateFormat(childData.brddate, "yyyy-mm-dd");
    res.render('board1/boardRead', {row: childData});
  });
});

//boardForm
router.get('/', function (req, res, next) {
  res.redirect('boardList');
});

//boardSave
router.get('/', function (req, res, next) {
  res.redirect('boardList');
});

//boardDelete
router.get('/', function (req, res, next) {
  res.redirect('boardList');
});
