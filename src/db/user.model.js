module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'User',
        {
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            id: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            refresh_token: {
                type: Sequelize.DataTypes.STRING,
                default: null,
            },
            created_at: {
                type: Sequelize.DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'User',
            timestamps: false,
        },
    );
};
