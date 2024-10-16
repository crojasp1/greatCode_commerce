const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo para la tabla Local
const Local = sequelize.define('Local', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barrio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio_arrendamiento: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Local;
