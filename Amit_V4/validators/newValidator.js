const Joi = require('Joi');

const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),  
    age: Joi.number().integer().min(18).max(100).required(),
    country: Joi.string().min(3).max(20).required(),
    position: Joi.string().min(3).max(20).required(),
    salary: Joi.number().integer().min(2).max(100).required(),
    // phone: Joi.string().length(10).pattern(/^[0-9]+$/),
    phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

module.exports = {schema:schema};



// const Joi = require('Joi');
// const validator = (schema) => (payload)=>{
//     schema.validate(payload, {abortEarly: false});   
// }