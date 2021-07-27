const { describe, it, expect } = require('@jest/globals');
const validateEmail = require('../src/validate');

describe('validateEmail', () => {
  describe('Valid Entry', () => {
    it('should return true if a valid email address is given', () => {
      let valid = validateEmail('brandongunzel@gmail.com');

      expect(valid).toBeTruthy();
    });
  });
  describe('Invalid Entry', () => {
    it('should return false if an invalid email address is given', () => {
      let invalid = validateEmail('this is not an email');

      expect(invalid).toBeFalsy();
    });
  });
});
