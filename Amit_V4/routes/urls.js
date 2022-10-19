const express = require('express');
const HealthController = require('../controllers/health.controller');
const SomeController = require('../controllers/some.controller');
const EmployeesController = require("../controllers/employees.controller");
const PartnerController = require("../controllers/partner.controller");

const router = express.Router();


const healthController = new HealthController();
healthController.register(router);

const someController = new SomeController();
someController.register(router);

const employeesController = new EmployeesController();
employeesController.register(router);

const partnerController = new PartnerController();
partnerController.register(router)





module.exports = router;
