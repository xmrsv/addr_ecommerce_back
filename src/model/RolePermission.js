// Ruta: src/model/RolePermission.js
// Nombre del archivo: RolePermission.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RolePermission = sequelize.define('RolePermission', {
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Roles', // Nombre del modelo Role
      key: 'id'
    }
  },
  permissionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Permissions', // Nombre del modelo Permission
      key: 'id'
    }
  }
});

export default RolePermission;