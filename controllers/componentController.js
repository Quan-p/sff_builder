var Component = require('../models/component');
var async = require('async');

// Display list of all components.
exports.component_list = function(req, res, next) {
    Component.find({}, 'name')
      .sort({name : 1})
    //   .populate('author')
      .exec(function (err, list_component) {
        if (err) { return next(err); }
        //Successful, so render
    res.render('component_list', { title: 'Component List', component_list: list_component });
      });
};

// Display detail page for a specific component.
exports.component_detail = function(req, res, next) {
        Component.findById(req.params.id)
            .populate('name')
            .populate('description')
            .populate('category')
            .populate('price')
            .populate('stock')
            .populate('link')
            .exec(function (err, detail_component) {
                if (err) { return next(err); }
        
        res.render('component_detail', { 
            component_detail: detail_component, 
            // description: results.component.description, 
            // category: results.component.category
        } );
    });
};



// Display component create form on GET.
exports.component_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: component create GET');
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