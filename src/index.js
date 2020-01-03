const app = require('./app');
require('./database');

function init() {
    app.listen(3000);
    console.log('server start!');
}

init();