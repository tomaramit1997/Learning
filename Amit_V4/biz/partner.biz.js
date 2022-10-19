console.log("Inside partner.biz.js file...");
const EventEmitterBiz = require('./helpers/eventEmitter.biz');
const { schema } = require('../validators/partnerValidator');
const repo = require('../repositories/mysqlquery.repository');
const { resolve } = require('path');
const { reject, result } = require('lodash');
const async = require('async');
const tableObject = require('../models/partner.model')
const bcrypt = require('bcryptjs');


class PartnerBiz {
    async createPartnerData(partnerObject) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashed_password = await bcrypt.hash(partnerObject.old_password, 12)
                partnerObject.old_password = hashed_password;
                const result = await tableObject.create(partnerObject);
                resolve(result);

            }
            catch (err) {
                console.log(`A new error occured ${err}`);
                reject(err);
            }
        })
    }
    //how to add in sql table using sequelize?

    async readEmployeeDate() {
        return new Promise(async, (resolve, reject) => {
            try {
                const result = repo.getDetails("SELECT * FROM dsa_login ORDER BY id DESC");
                resolve(result);
            }
            catch (error) {
                reject(err)
            }
        });
    }


    async findEmployeeById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("Inside findemployee By id")
                const postId = id;
                const result = tableObject.findByPk(postId);
                console.log(result)
                resolve(result)
            } catch (err) {
                console.log("Some Error Occured")
                reject(err);
            }
        })
    }

    async saveData() {
        return new Promise(async (resolve, reject) => {
            try {
                const saved = tableObject.save();
                console.log("Data Updated Succesfully");
                resolve(saved);
            }
            catch (err) {
                console.log("Some issue in saving the data");
                reject(err)
            }
        })
    }


}


module.exports = PartnerBiz;

