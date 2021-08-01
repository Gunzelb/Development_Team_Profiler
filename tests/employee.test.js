const { describe, it, expect } = require("@jest/globals");
const Employee = require("../lib/employee");

describe("Employee", () => {
  describe("initialization", () => {
    it('should create an object with a name, id, and email if provided valid arguments', () => {
      const employee = new Employee('Brandon', 2, 'brandon@email.com');

      expect(employee.name).toEqual('Brandon');
      expect(employee.id).toEqual(2);
      expect(employee.email).toEqual('brandon@email.com');
    });

    it('should throw an error if provided no arguments', () => {
      const cb = () => new Employee();

      expect(cb).toThrow();
    });

    it('should throw an error if not provided an id', () => {
      const cb = () => new Employee('Brandon');
      const err = new Error('Expected parameter must be a non-negative number');

      expect(cb).toThrowError(err);
    });

    it("should throw an error if 'name' is not a string", () => {
      const cb = () => new Employee(2, 5, 'brandon@email.com');
      const err = new Error("Expected parameter 'name' to be a non-empty string");

      expect(cb).toThrowError(err);
    });

    it("should throw an error if 'email address' is not valid", () => {
      const cb = () => new Employee('Brandon', 2, 'this isnt an email');
      const err = new Error("Expected parameter 'email address' must be a valid email address");

      expect(cb).toThrowError(err);
    });

    it('should return the value of the name property when the getName method is called', () => {
      const employee = new Employee('Brandon', 2, 'brandon@email.com');

      expect(employee.getName()).toEqual('Brandon');
    });

    it('should return the value of the id property when the getId method is called', () => {
      const employee = new Employee('Brandon', 2, 'brandon@email.com');

      expect(employee.getId()).toEqual(2);
    });

    it('should return the value of the email property when the getEmail method is called', () => {
      const employee = new Employee('Brandon', 2, 'brandon@email.com');

      expect(employee.getEmail()).toEqual('brandon@email.com');
    });

    it("should return 'Employee' when the getRole method is called", () => {
      const employee = new Employee('Brandon', 2, 'brandon@email.com');

      expect(employee.getRole()).toEqual('Employee');
    });
  });
});
