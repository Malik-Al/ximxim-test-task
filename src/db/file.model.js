module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'File',
        {
            file_id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            file_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mime_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER, 
                allowNull: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'File',
            timestamps: false,
        },
    );
};
