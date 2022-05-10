var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        title: { type: String, required: true, maxlength: 100 },
        description: { type: String, maxlength: 400 },
    }
);

// Virtual
CategorySchema.virtual('url').get(function () {
    return '/category/' + this._id;
});

module.exports = mongoose.model('Category', CategorySchema);
