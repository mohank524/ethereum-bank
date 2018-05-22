const routes = require('next-routes')();

routes
.add('/bank/new', '/bank/new')
.add('/bank/loan/new', '/bank/loan/new')
.add('/bank/loan/show', '/bank/loan/show')
.add('/bank/final', '/bank/final')
.add('/bank/show', '/bank/show');

module.exports = routes;
