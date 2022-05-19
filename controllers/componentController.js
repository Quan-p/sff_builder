var Components = require('../models/component');
var Category = require('../models/category');
const { body,validationResult, sanitize } = require('express-validator');
var async = require('async');

// Display list of all components.
exports.component_list = function(req, res, next) {
    Components.find({}, 'name')
      .sort({name : 1})
      .exec(function (err, list_component) {
        if (err) { return next(err); }
        //Successful, so render
    res.render('component_list', { title: 'Component List', component_list: list_component });
      });
};

// Display detail page for a specific component.
exports.component_detail = function(req, res, next) {
    async.parallel({
        component: function(callback) {
            Components.findById(req.params.id)
                .populate('name')
                .populate('description')
                .populate('category')
                .populate('price')
                .populate('stock')
                .populate('link')
                .exec(callback);
        },
        category: function(callback) {
            Category.find({ 'title': req.params.id })
            //.populate('title')
            .exec(callback);
        }, 
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.component==null) { // No results.
            var err = new Error('Component not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('component_detail', { 
            component: results.component,
            name: results.component.name, 
            description: results.component.description, 
            category: results.component.category,
            price: results.component.price, 
            stock: results.component.stock, 
            link: results.component.link
        } );
    });

};



// Display component create form on GET.
exports.component_create_get = function(req, res, next) {
    async.parallel(
        {
            categories: function(callback) {
                Category.find(callback);
            }
        },
        function(err, results) {
            if(err) next(err);

            res.render('component_form', {
                title: 'Create a new pc component',
                categories: results.categories
            });
        }
    )
    
};

// Handle component create on POST.
exports.component_create_post = [
    // Validate and sanitize fields.
    body('name', "Name must be at least 3 characters in length")
        .trim()
        //.isLength({ min: 3 })
        .escape(),
    body('category', "Category must not be empty")
        .trim()
        .escape(),
    body("price", "Price must be between $0 and $999999").isFloat({
        min: 0,
        max: 999999,
    }),
    body('stock', "Stock cannot be lower than 0")
        .isInt({ min: 0, max: 99999 }),
    body('description', "Name must be at least 3 characters in length")
        .trim()
        .isLength({ min: 1 })
        .escape(),    
    body('link')
        .trim()
        .isLength({ min: 1 }),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        var component = new Components(
            {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                stock: req.body.stock,
                description: req.body.description,
                link: req.body.link
            });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            async.parallel({
                categories: function(callback) {
                    Category.find(callback);
                }
            }, 
            function (err, results) {
                if (err) next(err);
      
                res.render("component_form", {
                  title: "Create a computer part",
                  categories: results.categories,
                  component: component,
                  errors: errors.array(),
                });
            }
            )
        }
        else {
            // Data from form is valid. Save component
            component.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(component.url);
            });
        }
}];

// Display component delete form on GET.
exports.component_delete_get = function(req, res, next) {
    Components.findById(req.params.id)
        .populate('name')
        .exec(function(err, components) {
            if(err) { return next(err); }
            if(components==null) {
                res.redirect('/components');
            }
            res.render('component_delete', {
                title: 'Delete Component',
                components: components
            })
        })
};

// Handle component delete on POST.
exports.component_delete_post = function(req, res, next) {
    Components.findByIdAndRemove(
        req.body.componentid, 
        function deleteComponent(err) {
            if(err) { return next(err); }
            //Success. so redirect to component list
            res.redirect('/components');
    });
};
    


// Display component update form on GET.
exports.component_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: component update GET');
};

// Handle component update on POST.
exports.component_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: component update POST');
};