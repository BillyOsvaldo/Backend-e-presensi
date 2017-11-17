'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AbsenceSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
    	required: true
	},
	type_absence: {
		type: Number,
		required: true
	},
	start_date: {
		type: Date,
		required: true
	},
	end_date: {
		type: Date,
		required: true
	},
	info_absence: {
		type: String,
		required: true
	},
	attachment: {
		type: Buffer
	},
	status: {
		type: Number,
		required: true
	},
	created_at: { type: Date },
	updated_at: { type: Date }
});

AbsenceSchema.pre('save', function(next){
  var now = new Date()
  this.updated_at = now
  if ( !this.created_at ) {
    this.created_at = now
  }
  next()
});

AbsenceSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

module.exports = mongoose.model('Absence', AbsenceSchema);