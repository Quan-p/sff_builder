var Category = require('../models/category');
var Components = require('../models/component');
const { body,validationResult, sanitize } = require('express-validator');
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
            category_components: results.category_components,
            category: results.category,
        } );
    });

};

// Display category create form on GET.
exports.category_create_get = function(req, res, next) {
    res.render('category_form', { title: 'Create Category' });
};

// Handle category create on POST.
exports.category_create_post = [
    // Validate and sanitize fields.
    body('title')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Category must be specified.'),
    body('description')
        .optional({ checkFalsy: true }),

    sanitize('title').escape(),
    sanitize('description').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('category_form', { title: 'Create Category', category: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create a Category object with escaped and trimmed data.
            var category = new Category(
                {
                    title: req.body.title,
                    description: req.body.description
                });
            category.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(category.url);
            });
        }
}];

// Display category delete form on GET.
exports.category_delete_get = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback)
        },
        category_components: function(callback) {
            Components.find({ 'category': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.category==null) {
            res.redirect('/categories');
        }
        res.render('category_delete', { 
            title: 'Delete Category',
            category: results.category,
            category_components: results.category_components 
        });
    }
    )
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