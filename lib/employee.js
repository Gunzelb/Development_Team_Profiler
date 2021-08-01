const validator = require("email-validator");

class Employee {
  constructor(name, id, email) {
    if(!name || typeof name !== 'string') {
      throw "Expected parameter 'name' to be a non-empty string";
    } else if(!id || id < 0) {
      throw 'Expected parameter must be a non-negative number';
    } else if(!validator.validate(email)) {
      throw "Expected parameter 'email address' must be a valid email address";
    } 
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    if(this.officeNumber !== undefined) {
      return "Manager";
    }
    else if(this.github !== undefined) {
      return "Engineer";
    }
    else if(this.school !== undefined) {
      return "Intern";
    } else {
      return "Employee"
    };
  };
};

module.exports = Employee;
