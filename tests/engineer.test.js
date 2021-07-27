const { describe, it, expect } = require('@jest/globals');
const Engineer = require('../lib/engineer');

describe('Engineer', () => {
  describe('Initialization', () => {
    it('should create an object with a github username', () => {
      const engineer = new Engineer({}, 'gunzelb');

      expect(engineer.github).toEqual('gunzelb');
    });

    it('should return the github username when the getGithub method is called', () => {
      const engineer = new Engineer({}, 'gunzelb');

      expect(engineer.getGithub()).toReturn('gunzelb')
    });

    it('should return the role of engineer when the getRole method is called', () => {
      const engineer = new Engineer({}, 'gunzelb');

      expect(engineer.getRole()).toReturn('Engineer');
    });
  });
});
