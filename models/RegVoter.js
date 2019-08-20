var mongoose= require('mongoose');
var passportLocalMongoose= require('passport-local-mongoose');


var VoterSchema= new mongoose.Schema({
    adhar_id: {
        type: Number
    },
    fullName: {
        type: String
    },
    dob: {
        type: String
    },
    phone: {
        type: String,
        unique: true
    },
    email: {
        type: String,
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    password: {
    	type: String
    },
    secret: {
    	type: String
    }
});

VoterSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('RegVoter', VoterSchema);
