const mongoose = require('mongoose');

const imagePostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image: {
        type: String,
        requireed: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }   
});

module.exports = mongoose.model('Image', imagePostSchema);