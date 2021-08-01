const { describe, it, expect } = require('@jest/globals');
const Engineer = require('../lib/engineer');

describe('Engineer', () => {
  describe('Initialization', () => {
    it('should create an object with a github username', () => {
      const engineer = new Engineer('Brandon', 2, 'brandon@email.com', 'gunzelb');

      expect(engineer.github).toEqual('gunzelb');
    });

    it('should return the github username when the getGithub method is called', () => {
      const engineer = new Engineer('Brandon', 2, 'brandon@email.com', 'gunzelb');

      expect(engineer.getGithub()).toEqual('gunzelb')
    });

    it('should return the role of engineer when the getRole method is called', () => {
      const engineer = new Engineer('Brandon', 2, 'brandon@email.com', 'gunzelb');

      expect(engineer.getRole()).toEqual('Engineer');
    });
  });
});
