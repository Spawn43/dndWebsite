const {
    Model,
    DataTypes
} = require("sequelize")
const sequelize = require("../config/connection")



class Table extends Model {

}

Table.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,

    },
    dm: {
        type: DataTypes.STRING,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    noPlayers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    players:{
        type: DataTypes.JSON,
        allowNull: true
    }},

    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "table"
})

module.exports = Table