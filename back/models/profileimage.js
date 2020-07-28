module.exports = (sequelize, DataTypes) => {
	const ProfileImage = sequelize.define( 'profileimage',
		{
			imagepath: {
				type: DataTypes.STRING(100),
				allowNull: false
			}
		}, {
			charset: 'utf8',
			collate: 'utf8_general_ci'
		})

		ProfileImage.associate = (db) => {
			db.ProfileImage.belongsTo(db.User)
		}

		return ProfileImage
}