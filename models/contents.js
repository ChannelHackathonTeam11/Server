const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contents', {
    uuid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    user_image: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    text: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    text_image: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL(40,20),
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(40,20),
      allowNull: false
    },
    check: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'contents',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uuid" },
        ]
      },
    ]
  });
};
