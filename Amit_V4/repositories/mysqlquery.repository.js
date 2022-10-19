
const { reject, result } = require("lodash");
const { PromiseProvider } = require("mongoose");
const { resolve } = require("path");
const { query } = require("../db/mysqlConnection");
const db = require("../db/mysqlConnection");
const tableObject = require('../models/partner.model')

function createDB(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, result) => {
            try {
                return resolve("Employee Added to your SQL Database.");
            } catch (error) {
                return reject(error);
            }
        })
    })
}

function readDB(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            try {
                return resolve(result);
            } catch (err) {
                return reject(err);
            }
        })
    })
}
function getDetails(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            try {
                return resolve(result);

            } catch (err) {
                return reject(err);
            }
        })


    })


}

function getDetailsById(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            try {
                return resolve(result);

            } catch (err) {
                return reject(err);
            }
        })
    })
}

function createDBForPartner(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            try {
                return resolve("Partner Added to your SQL Database.");
            }
            catch (err) {
                return reject(err)
            }
        })
    })
}

module.exports = { createDB, readDB, getDetails, createDBForPartner, getDetailsById };

//how to find value by id in SQL using nodejs?

