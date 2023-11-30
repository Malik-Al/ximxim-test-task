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
                unique: true,
            },
            refresh_token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DataTypes.TIME,
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
