const User = require('./User')
const Table = require('./Table')

User.hasMany(Table, {
    foreignKey: 'dm'
})

Table.belongsTo(User, {
    foreignKey: 'dm'
})


module.exports = {
    User,
    Table
};