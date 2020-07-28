module.exports = (sequelize, DataTypes) => {
	const BookImage = sequelize.define('bookimage', {
		imagePath:{
			type: DataTypes.STRING(100),
			allowNull: false
		}
	}, {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})

	BookImage.associate = (db) => {
		db.BookImage.belongsTo(db.Book)
	}
	return BookImage
}