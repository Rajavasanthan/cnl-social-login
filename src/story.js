const mongoose = require('mongoose');
// The actual database of users

var Schema = mongoose.Schema;

const StorySchema = new Schema({
    title:String,
    content: String,
    react: {
        UserId: { type: Schema.Types.ObjectId, ref: 'User' },
        status: {type: String, 
            required: true, 
            enum: ['laugh', 'angry', 'sad', 'happy','like'], 
            default: 'like'},
    },
    date: { type: Date, default: Date.now },
})

var Story = mongoose.model('User', UserSchema);
module.exports = User;

