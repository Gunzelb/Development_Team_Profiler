const { describe, it, expect } = require('@jest/globals');
const Intern = require('../lib/intern');

describe('Intern', () => {
  describe('Initialization', () => {
    it('should create an object with a school name', () => {
      const intern = new Intern({}, 'Northern Arizona University');

      expect(intern.school).toEqual('Northern Arizona University');
    });

    it('should return the school name when the getSchool method is called', () => {
      const intern = new Intern({}, 'Northern Arizona University');

      expect(intern.getSchool()).toReturn('Northern Arizona University')
    });

    it('should return the role of intern when the getRole method is called', () => {
      const intern = new Intern({}, 'Northern Arizona University');

      expect(intern.getRole()).toReturn('Intern');
    });
  });
});
