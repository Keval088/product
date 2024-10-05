module.exports = (sequelize, Sequelize) => {
    const Variant = sequelize.define('Variant', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        variantName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        options: {
            type: Sequelize.JSON,
            allowNull: false,
        },
        priceModifier: {
            type: Sequelize.FLOAT,
            allowNull: true,
            defaultValue: 0,
        }
    }, {
        timestamps: true,
    });

    return Variant;
};