module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'BlacklistTokens',
        {
            refresh_token: {
                type: Sequelize.DataTypes.STRING(400),
                allowNull: false,
            },
            access_token: {
                type: Sequelize.DataTypes.STRING(400),
                allowNull: false,
            }
        },
        {
            sequelize,
            tableName: 'BlacklistTokens',
            timestamps: false,
        },
    );
};
