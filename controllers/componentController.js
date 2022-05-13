var Component = require('../models/component');

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
    res.send('NOT IMPLEMENTED: component detail: ' + req.params.id);
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