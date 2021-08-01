const { describe, it, expect } = require('@jest/globals');
const Manager = require('../lib/manager');

describe('Manager', () => {
  describe('Initialization', () => {
    it('should create an object with a github username', () => {
      const manager = new Manager('Brandon', 2, 'brandon@email.com', 123);

      expect(manager.officeNumber).toEqual(123);
    });

    it('should return the role of manager when the getRole method is called', () => {
      const manager = new Manager('Brandon', 2, 'brandon@email.com', 123);

      expect(manager.getRole()).toEqual('Manager');
    });
  });
});
