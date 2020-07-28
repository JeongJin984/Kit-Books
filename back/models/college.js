module.exports = (sequelize, DataTypes) => {
	const College = sequelize.define('college', {
		name:{
			type: DataTypes.STRING(10),
			allowNull: false
		}
	}, {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})

	College.associate = (db) => {
		db.College.hasMany(db.User)
		db.College.hasMany(db.Book)
	}
	return College
}