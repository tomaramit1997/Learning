console.log("Inside employee.biz.js file...");
const EventEmitterBiz = require('./helpers/eventEmitter.biz');
const {schema} = require('../validators/newValidator');
const repo = require('../repositories/mysqlquery.repository')

class EmployeeBiz {

    async createEmployee(employeeObject) {
        return new Promise(async (resolve, reject)=>{
            try {
                const name = employeeObject.name;
                const age = employeeObject.age;
                const phone = employeeObject.phone;
                const country = employeeObject.country;
                const position = employeeObject.position;
                const salary = employeeObject.salary;
    
                const params = [name, age, country, position, salary, phone];
                console.log(params);
                // Validation
                const isValid = await schema.validateAsync(employeeObject, { aboutEarly: false });
                // console.log("this is the isValid fn...",isValid);
                if (isValid) {
                    const result = await repo.createDB("INSERT INTO employees (name, age, country, position, salary, phone) VALUES (?,?,?,?,?,?)", params);
                    console.log("Employee Added Successfully!");
                    resolve(result);
                }
    
            } catch (err) {
                console.log(`a new error occured ${err}`);
                reject(err);
            }
        })
    }

    async readEmployeeData(){
        return new Promise(async (resolve, reject) =>{
            try {
                const result = repo.readDB("SELECT * FROM employees ORDER BY id DESC");
                resolve(result);
            } catch (error) {
                reject(error.message);
            }
        });
    }
}


module.exports = EmployeeBiz;
