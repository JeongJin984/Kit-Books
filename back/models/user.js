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
		password: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		userCode: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		jender: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		grade: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		birth: {
			type: DataTypes.DATE,
			allowNull: false
		},
		phonenum: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
	}, {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})
	User.associate = (db) => {
		db.User.belongsTo(db.College)
		db.User.hasMany(db.Book)
		db.User.hasMany(db.ProfileImage)
		db.User.belongsToMany(db.Book, { through: "Shoppingbasket", as: "Selected"})
		db.User.belongsToMany(db.ChatRoom, { through: "ChatRoomList", as: "ChatRooms", foreignKey: "userId"})
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
	}
	return User
}