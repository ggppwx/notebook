var express = require('express');
var Note = require('../../models/note');
var router = express.Router();


/* create */
router.post('/', function(req, res, next) {
	console.log('CREATE api/note');
	console.log(req.body.content);
	let title = req.body.title;
	let content = req.body.content;
	let snapshot = req.body.snapshot;
	Note.create({
		id : 'test1', 
		title: title,
		content: content, 
		snapshot:snapshot
	}, function(err, obj) {


		console.log(obj);
	});


	res.json({status : 'OK'});
});

router.get('/', function(req, res) {
	console.log('LIST api/note');

	Note.find({}, 'title snapshot', function(err, objs) {
            res.json({
                    status : 'OK',
                    notelist : objs
            });
            
	});


});



/* get */
router.get('/:id', function(req, res) {
	console.log('GET api/note');
	let id = req.params.id;

	Note.findById(id, function(err, obj) {
		if (err) {
			res.json({status: 'ERROR'});
			return;
		} 
		res.json({
			status: 'OK', 
			note: obj
		});
		

	});

});

/* update */
router.put('/:id', function(req, res, next) {
	console.log('PUT api/note');
	let id = req.params.id;
	let title = req.body.title;
	let content = req.body.content;
	let snapshot = req.body.snapshot;
	console.log(id);
	console.log(content);

	Note.update({_id: id}, {
		title: title,
		content: content, 
		snapshot: snapshot
	}, function(err) {
		if(err) {
			console.log(err);
			res.json({status : 'ERROR'});
		} else {
			res.json({status : 'OK'});
		}
	});

});


/* delete */
router.delete('/:id', function(req, res, next) {
	console.log('DELETE api/note');
	let id = req.params.id;
	Note.deleteOne({ _id: id  }, function (err) {
		if(err) {
			console.log(err);
			res.json({status : 'ERROR'});
		} else {
			res.json({status: 'OK'});
		}		
	});
});


module.exports = router;
