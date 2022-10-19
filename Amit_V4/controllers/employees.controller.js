console.log("inside employees controller file...");

const RequestValidator = require('../validators/request.validator');
const ResponseDecorator = require('../validators/response.decorator');
const CONSTANTS = require('../constants/appConstants');
const { someSchema } = require('../schema/schema-suit');
const EmployeeBiz = require('../biz/employee.biz');

class EmployeesController {
	register(app) {
		/**
		 * @api {post} v1/some/ Create some
		 * @apiVersion 1.0.0
		 * @apiName CreateSome
		 * @apiGroup Some
		 * @apiPermission admin
		 *
		 * @apiDescription This endpoint will create a some!
		 *
		 * @apiHeader {String} client_code will be shared to you .
		 * @apiHeaderExample {Header} Header-Example
		 *     "client_code: client_code"
		 *
		 * @apiExample {bash} Curl example
		 * curl -X POST -H "client_code: client_code" -i https://console.flexiloans.com/v1/some
		 *
		 * @apiSuccess {String} result <code>created</code> if everything went fine.
		 * @apiSuccessExample {json} Success-Example
		 *     HTTP/1.1 201 CREATED
		 *      {
		 *			"success": true,
		 *			"event": "SOME_CREATED",
		 *			"message": "created some successfully.",
		 *			"uuid": "e043e090-758f-11eb-833e-1b36d8ab14c1",
		 *			"data": {}
		 *		}
		 *
		 * @apiError NoAccessRight Only authenticated Admins can access the data.
		 * @apiError UserNotFound   The <code>id</code> of the User was not found.
		 * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
		 *
		 * @apiErrorExample Response (example):
		 *     HTTP/1.1 401 Not Authenticated
		 *     {
		 *       "error": "NoAccessRight"
		 *     }
		 */

		app.route('/v1/employees')
			.post(async (request, response, next) => {
				try {
					console.log("Inside post route employees call")
					const {
						client_code
					} = request.header;

					// const validator = new RequestValidator(someSchema);
					// validator.create({...request.params,...request.body});

					const reqBody = request.body;

					const employeeBiz = new EmployeeBiz();
					const result = await employeeBiz.createEmployee(reqBody);

					// const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
					// const result = responseDecorator.decorate(_result);

					response.json({ response: result }, `created employee successfully.`, []);
				} catch (error) {
					next(error);
				}
			})
			.get(async (request, response, next) => {
				try {
					console.log("Inside get route employees call")
					const {
						client_code
					} = request.header;

					// const validator = new RequestValidator(someSchema);
					// validator.create({...request.params,...request.body});


					const employeeBiz = new EmployeeBiz();
					const _result = await employeeBiz.readEmployeeData();

					// const reslt = JSON.stringify(_result);

					// const responseDecorator = new ResponseDecorator({...request.params,...request.body,client_code});
					// const result = responseDecorator.decorate(_result);
					return response.json(
						{
							action: CONSTANTS.ACTION.SOME_CREATED,
							headers: { ...request.headers },
							request: { ...request.body },
							response: _result
						},
						"reading employee data successfully",
						[]
					);
				} catch (error) {
					next(error);
				}
			})

	}
}

module.exports = EmployeesController;


/*

async create(req, res, next) {
		// console.log("Inside create of employee controller...");
		try {
			const employeeBody = req.body;
			console.log(employeeBody);

			const result = await new employeeBiz().createEmployee(employeeBody);
			if (result) {
				return res.send(result);
			}
			// return res.send({ success: true, message: "employee added successfully" });
			return res.send("going towards ERRor inside Controller...");
		} catch (err) {
			console.log(`a new error occured ${err}`);
		}
		// next();
	}

	async read(req, res){
			try{
				const result = await new employeeBiz().readEmployeeData();
				res.send({success: true, result});
			}catch(err){
				res.send(err);
			}
	}

*/