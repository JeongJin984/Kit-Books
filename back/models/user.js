const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('users', {
		email: {
			type: DataTypes.STRING(40),
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		nickname: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		phonenum: {
			type: DataTypes.STRING(30),
			allowNull: false
		}
	}, {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})
	User.associate = (db) => {
		db.User.belongsTo(db.College)
		db.User.hasMany(db.Book)
		db.User.hasMany(db.ProfileImage)
		db.User.belongsToMany(db.Book, { through: "Shoppingbasket", as: "Selected"})
	}
	return User
}