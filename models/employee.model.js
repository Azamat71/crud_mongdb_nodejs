const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
	fullname:{
		type: String
	},
	city:{
		type: String
	},
	email:{
		type: String
	}
});

mongoose.model('Employee', employeeSchema);