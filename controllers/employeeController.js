const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
router.get('', (req, res) => {
	res.render('employee/addOrEdit', {
		viewTitle: 'Insert Employee'
	});
});
router.post('', (req, res) => {
	if(req.body._id == '')
		insertRecorder(req, res);
	else
		updateRecorder(req, res);
});
function updateRecorder(req, res){
	Employee.findOneAndUpdate({ _id: req.body._id }, req.body, {new: true}, (err, doc) => {
		if(!err)
			res.redirect('employee/list');
		else
			console.log(err);
	});
}

function insertRecorder(req, res){
	var employee = new Employee();
	employee.fullname = req.body.fullname;
	employee.city = req.body.city;
	employee.email = req.body.email;
	employee.save((err, doc) => {
		if(!err)
			res.redirect('employee/list');
		else
			console.log(err);
	});
}
router.get('/list', (req, res) => {
	Employee.find((err, docs) =>{
		if(!err)
			res.render('employee/list', {
				list: docs
			});
		else
			console.log(err);
	})
});

router.get('/:id', (req, res) => {
	Employee.findById(req.params.id, (err, doc) => {
		if(!err)
			res.render('employee/addOrEdit', {
				viewTitle: 'Update Employee',
				employee: doc
			});
	});
})

router.get('/delete/:id', (req, res) => {
	Employee.findByIdAndRemove(req.params.id, (err, doc) =>{
		if(!err)
			res.redirect('/employee/list');
		else
			console.log(err);
	});
});
module.exports = router;