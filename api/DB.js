var host=process.env.DB_HOST||'localhost'
module.exports = {
    DB: 'mongodb://'+host+':27017/showcase'
};
