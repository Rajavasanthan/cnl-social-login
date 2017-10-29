const mongoose = require('mongoose');
// The actual database of users
const _ = require('lodash');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:String,
    provider: String,
    uid:String,
    photoUrl:String,
})

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
  
    return _.pick(userObject, ['uid', 'name','photoUrl','provider']);
  };
  
var User = mongoose.model('User', UserSchema);


module.exports = User;

