const Joi = require('Joi');
const { join } = require('path');

const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    mobile_no: Joi.string().pattern(/^[0-9]+$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
    old_password: Joi.string().min(3).required(),
    new_password: Joi.string().min(3).required(),
    repeat_password: Joi.string().min(3).required(),
    partner_active: Joi.string(),
    partner_type: Joi.string(),
    dsa_role: Joi.string()
});

module.exports = { schema: schema };