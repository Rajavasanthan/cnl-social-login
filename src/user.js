const mongoose = require('mongoose');
// The actual database of users

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:String,
    provider: String,
    uid:String,
    photoUrl:String,
    storyId: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
})

var User = mongoose.model('User', UserSchema);
module.exports = User;

