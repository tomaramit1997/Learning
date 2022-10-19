// const uuid = require('uuid/v1');
const { v1: uuidv1 } = require('uuid');
const httpContext = require('express-http-context');
const { EVENT,HEADER_VALIDATOR_EXCEPTOR } = require('../constants/appConstants');
const { pathToRegexp } = require("path-to-regexp");
const _ = require('lodash');
const HeaderValidator = require('../validators/header.validator');
const { header } = require('../schema/schema-suit');
module.exports = async (request, response, next) => {
	try {
		// setting unique uuid for each request
		httpContext.set('uuid', uuidv1());
		//setting event type based on endpoint
		let event = "";
		let url = request.url.split('?') && request.url.split('?')[0];
		for(const reg in EVENT){
			let regex = pathToRegexp(reg);
			if(regex.test(url)){ 
				try{
					event = EVENT[reg][request.method];
					break;
				}catch(err){
					break;
				}
			};
		}
		httpContext.set('event', event);
		// Do not remove this

		//validate header middleware
		if(!HEADER_VALIDATOR_EXCEPTOR.includes(event)){
			const validator = new HeaderValidator(header);
			validator.create({...request.headers});
			const clientCode = _.get(request.headers,'client_code',null);
			httpContext.set('client_code', clientCode);
		}

		next();
	} catch (error) {
		next(error);
	}
};
