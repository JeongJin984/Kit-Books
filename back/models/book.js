module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define('books', {
		publishername: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		authorname: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
	}, {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})
	Book.associate = (db) => {
		db.Book.belongsTo(db.User)
		db.Book.belongsToMany(db.User, { through: 'Shoppingbasket', as: 'Selector' })
		db.Book.belongsTo(db.College)
		db.Book.hasMany(db.BookImage)
	}
	return Book
}