var Category = require('../models/category');
var Components = require('../models/component');
var async = require('async');

exports.list = function(req, res, next) {
    
    res.render('list', { title: 'Part List' });
};

// Display list of all categories.
exports.category_list = function(req, res, next) {
    Category.find({}, 'title')
      .sort({title : 1})
    //   .populate('author')
      .exec(function (err, list_categories) {
        if (err) { return next(err); }
        //Successful, so render
    res.render('category_list', { title: 'Category List', category_list: list_categories });
      });
};

// Display detail page for a specific category.
exports.category_detail = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id)
                .populate('title')
                .populate('description')
                .exec(callback);
        }, 
        category_components: function(callback) {
          Components.find({ category: req.params.id })
          .populate('name')
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.category==null) { // No results.
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('category_detail', { 
            title: results.category.title, 
            description: results.category.description, 
            category_components: results.category_components
            //book_instances: results.book_instance 
        } );
    });

};

// Display category create form on GET.
exports.category_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Category create GET');
};

// Handle category create on POST.
exports.category_create_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Category create POST');
};

// Display category delete form on GET.
exports.category_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Category delete GET');
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Category delete POST');
};

// Display category update form on GET.
exports.category_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Category update GET');
};

// Handle category update on POST.
exports.category_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Category update POST');
};