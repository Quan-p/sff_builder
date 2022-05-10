var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ComponentSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 100 },
        description: { type: String, required: true, maxlength: 500 },
        category: { type: String, required: true, maxlength: 100 },
        Price: { type: Number, required: true, max: 99999, min: 0 },
        Stock: { type: Number, required: true, max: 9999, min: 0 },
        URL: { type: String, required: true, maxlength: 500 },
    }
);

// Virtual
ComponentSchema.virtual('url').get(function () {
    return '/component/' + this._id;
});

module.exports = mongoose.model('Component', ComponentSchema);
