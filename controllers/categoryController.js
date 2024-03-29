var Category = require('../models/category');
var Components = require('../models/component');
const { body,validationResult, sanitize } = require('express-validator');
var async = require('async');

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
    async.parallel({
        category: function(callback) {
            Category.findById(req.body.categoryid).exec(callback)
        },
        category_components: function(callback) {
            Components.find({ 'category': req.body.categoryid }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (results.category_components.length > 0) {
            // Category still has components so render delete page again
            res.render('category_delete', {
                title: 'Delete Category',
                category: results.category,
                category_components: results.category_components
            });
            return;
        }
        else {
            // Category has no components so delete
            Category.findByIdAndRemove(
                req.body.categoryid,
                function deleteCategory(err) {
                    if(err) { return next(err); }
                    // Success - go to category list
                    res.redirect('/categories')
                })
        }
    }
    )
};

// Display category update form on GET.
exports.category_update_get = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).populate('title').populate('description').exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.category==null) {
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('category_form', { title: 'Update Category',  category: results.category, description: results.category.description });
    }
    )
    
};

// Handle category update on POST.
    exports.category_update_post = [
        body('title')
            .trim()
            .isLength({ min: 1 })
            .withMessage('Category must be given a name'),
        body('description').optional({ checkFalsy: true }),

        (req, res, next) => {
            const errors = validationResult(req);

            var category = new Category(
                {
                    title: req.body.title,
                    description: req.body.description,
                    _id: req.params.id,
                }
                
            );
            if (!errors.isEmpty()) {
                 // There are errors. Render the form again with sanitized values and error messages.
                res.render('category_form', { 
                    title: 'Update Category', 
                    category: category, 
                    errors: errors.array() 
                });
                return;
            } else {
                // Data is valid, update
                Category.findByIdAndUpdate(
                    req.params.id, 
                    category, 
                    {}, 
                    function(err, thecategory) {
                    if(err) { return next(err); }
                    res.redirect(thecategory.url)
                });
            }
        }
];