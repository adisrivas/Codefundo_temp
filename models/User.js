var mongoose= require('mongoose');
var passportLocalMongoose= require('passport-local-mongoose');

//user model schema
const UserSchema = new mongoose.Schema({
    adhar_id: {
        type: Number
    },
    Name: {
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
    }
});

UserSchema.plugin(passportLocalMongoose);

// Export user model
module.exports = mongoose.model('User', UserSchema);

