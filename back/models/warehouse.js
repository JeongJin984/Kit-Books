module.exports = (sequelize, DataTypes) => {
	const Warehouse = sequelize.define('warehouse', {
		title:{
			type: DataTypes.STRING(100),
			allowNull: false
		},
		stock:{
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})

	Warehouse.associate = (db) => {}
	return Warehouse
}