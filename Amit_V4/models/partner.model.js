const { flatMap } = require('lodash');
const Sequelize = require('sequelize');
const SqlBricks = require('sql-bricks');
const sequelize = require('../db/mysqlConnection');

const Product = sequelize.define('dsa_login', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile_no: {
        type: Sequelize.STRING,
        allowNull: false
    },
    old_password: {
        type: Sequelize.JSON,
        allowNull: false
    },

    partner_active: {
        type: Sequelize.STRING,
        allowNull: false
    },
    partner_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dsa_role: {
        type: Sequelize.STRING,
        allowNull: false
    }


})
module.exports = Product;
