const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    listings: [{
        type: Schema.Types.ObjectId, ref: 'Listing'
    }]
}, { collection: 'users' });

module.exports = mongoose.model('user', userSchema);