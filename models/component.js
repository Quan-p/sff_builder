var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ComponentSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 100 },
        description: { type: String, required: true, maxlength: 5000 },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        price: { type: Number, required: true, max: 99999, min: 0 },
        stock: { type: Number, required: true, max: 9999, min: 0 },
        link: { type: String, required: true, maxlength: 1000 }
    }
);

// Virtual
ComponentSchema.virtual('url').get(function () {
    return '/component/' + this._id;
});

module.exports = mongoose.model('Component', ComponentSchema);
