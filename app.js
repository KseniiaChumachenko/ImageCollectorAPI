const express = require('express');
const app = express();
//remenber to install package when use MORGAN(handling requests to console)
const morgan = require('morgan');
//remenber to install package when use body-parser(parse default jsons into nice form)
const bodyParser = require('body-parser');
//remenber to install package for database
const mongoose = require('mongoose');

const categoriesRoutes = require('./api/routes/categories');
const imagePostsRoutes = require('./api/routes/imagePosts');

mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@node-rest-imagecollector-8jo5r.mongodb.net/test');
mongoose.Promise = global.Promise;

//' + process.env.MONGO_ATLAS_PW + '

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
 });

app.use('/categories', categoriesRoutes);
app.use('/imagePosts', imagePostsRoutes);

//error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;