
const categoryRouter = require('./category');
const productRouter = require('./product');
const authRouter = require('./auth');
const siteRouter = require('./site');
const contractRouter = require('./contract');


function route(app){

    app.use('/api', authRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/contract', contractRouter);

    app.use('/', siteRouter);
    
}

module.exports = route