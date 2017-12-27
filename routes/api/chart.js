var express = require('express');
var Note = require('../../models/note');
var router = express.Router();

// CRUD


// CREATE
router.post('/', function(req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    Note.create({
	      id : 'test1',
        type: 'CHART',
	      title: title,        
	      content: content
    }, function(err, record) {
        res.json({status : 'OK', note: record});        
    });
    

});

// READ ALL 
router.get('/', function(req, res, next){
    Note.find({type: 'CHART'}, 'title content chart.current chart.total', function(err, records) {
        res.json({
            status : 'OK',
            notelist : records
        });            
    });
});


// READ
router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    Note.findById(id, function(err, record) {
        if (err) {
            res.json({status: 'ERROR'});
            return;
        } 
        res.json({
            status: 'OK', 
            note: record
        });
   });


});

// UPDATE
router.put('/:id', function(req, res, next) {



});

// DELETE
router.delete('/:id', function(req, res, next) {



});


module.exports = router;
