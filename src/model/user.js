const mongoose = require('mongoose');
// The actual database of users

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:String,
    provider: String,
    uid:String,
    photoUrl:String,
})

var User = mongoose.model('User', UserSchema);
module.exports = User;

