'use strict';

// DeliveryStops routes use deliverystops controller
var deliverystops = require('../controllers/deliverystops');
var authorization = require('./middlewares/authorization');

// DeliveryStop authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.deliverystop.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/deliverystops', deliverystops.all);
    app.post('/deliverystops', authorization.requiresLogin, deliverystops.create);
    app.get('/deliverystops/:deliverystopId', deliverystops.show);
    app.put('/deliverystops/:deliverystopId', authorization.requiresLogin, hasAuthorization, deliverystops.update);
    app.del('/deliverystops/:deliverystopId', authorization.requiresLogin, hasAuthorization, deliverystops.destroy);

    // Finish with setting up the deliverystopId param
    app.param('deliverystopId', deliverystops.deliverystop);

};