const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    dialectOptions: {
        charset: 'utf8mb4'
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require('./product.model')(sequelize, Sequelize);
db.Variant = require('./variant.model')(sequelize, Sequelize);

db.Product.hasMany(db.Variant, { as: 'variants', foreignKey: 'productId' });
db.Variant.belongsTo(db.Product, { foreignKey: 'productId' });

sequelize.sync({ force: false }).then(() => {
    console.log('Database connected!');
}).catch(err => {
    console.error('Error: ' + err);
});

module.exports = db;
