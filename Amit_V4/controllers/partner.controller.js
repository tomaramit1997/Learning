console.log("inside partner controller file...");
const { validationResult } = require('express-validator/check');
const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { someSchema } = require('../schema/schema-suit');
const PartnerBiz = require('../biz/partner.biz');
const tableObject = require('../models/partner.model')
const bcrypt = require('bcryptjs');

class PartnerController {
    register(app) {
        app.route('/partner/user')
            .put(async (request, response, next) => {
                try {
                    const errors = validationResult(request);
                    if (!errors.isEmpty()) {
                        const error = new Error("Validation Failed");
                        error.statusCode = 422;
                        throw error;
                    }

                    const partnerBiz = new PartnerBiz(() => { });
                    const result = await partnerBiz.findEmployeeById(request.body.id);
                    const user_entered_password = request.body.old_password;
                    const user_original_password = result.old_password;
                    const compare_password = await bcrypt.compare(user_entered_password, user_original_password)

                    if (compare_password) {
                        const id = request.body.id;
                        const updated_name = request.body.name;
                        const updated_email = request.body.email;
                        const updated_mobile_no = request.body.mobile_no;
                        const new_password = await bcrypt.hash(request.body.new_password, 12);
                        const BothPasswordMatched = await bcrypt.compare(request.body.repeat_password, new_password)
                        const updated_partner_active = request.body.partner_type;
                        const updated_partner_type = request.body.partner_type;
                        const updated_dsa_role = request.body.dsa_role;
                        if (!BothPasswordMatched) {
                            const error = new Error("Password and confirm password doesn't match. Kindly enter the valid password!!")
                            error.statusCode = 403;
                            throw error;
                        }

                        tableObject.findByPk(id).then(result => {
                            result.id = id;
                            result.name = updated_name;
                            result.email = updated_email;
                            result.mobile_no = updated_mobile_no;
                            result.old_password = new_password;
                            result.partner_active = updated_partner_active;
                            result.partner_type = updated_partner_type;
                            result.dsa_role = updated_dsa_role;
                            return result.save();


                        }).then(result => {
                            console.log("Saved")
                            response.json({ message: result }, "Data Added Successfully!!")
                        }

                        ).catch(err => {
                            console.log(err)
                            next(err)
                        })
                    }
                    else {
                        const error = new Error("Please enter the correct old password!!")
                        error.statusCode = 422;
                        throw err;

                    }
                }
                catch (err) {
                    console.log(err)
                    next(err)
                }

            })

            .post(async (request, response, next) => {
                console.log("Inside Post")
                try {
                    const reqBody = request.body;
                    const partnerBiz = new PartnerBiz();
                    const result = await partnerBiz.createPartnerData(reqBody);
                    response.json({ message: result }, 'Created Partner Sucessfully !!', []);

                } catch (err) {
                    console.log(err)
                    next(err);
                }

            })

    }

}

module.exports = PartnerController;