var Components = require('../models/component');
var Category = require('../models/category');
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
exports.component_create_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: component create POST');
};

// Display component delete form on GET.
exports.component_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: component delete GET');
};

// Handle component delete on POST.
exports.component_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: component delete POST');
};

// Display component update form on GET.
exports.component_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: component update GET');
};

// Handle component update on POST.
exports.component_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: component update POST');
};