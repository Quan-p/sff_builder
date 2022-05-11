var Component = require('../models/component');

// Display list of all components.
exports.component_list = function(req, res, next) {
    res.send('NOT IMPLEMENTED: COMPONENT LIST');
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