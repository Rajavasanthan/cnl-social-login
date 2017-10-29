const mongoose = require('mongoose');
// The actual database of users

var Schema = mongoose.Schema;

const StorySchema = new Schema({
    title:String,
    content: String,
    react: [{
        UserId: { type: Schema.Types.ObjectId, ref: 'User' },
        status: Number,
    }],
    date: { type: Date, default: Date.now },
    ownerId:{ type: Schema.Types.ObjectId, ref: 'User' },
})

var Story = mongoose.model('Story', StorySchema);
module.exports = Story;

