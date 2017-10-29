/* eslint-env mocha */
/* eslint-disable no-unused-vars */
const fs         = require('fs');
const path       = require('path');
const jsdom      = require('jsdom');
const sinon      = require('sinon');
const { expect } = require('chai');
const { Script } = require('vm');

const { JSDOM }  = jsdom;

const html = fs.readFileSync(path.join(__dirname, '/../index.html'), 'utf-8');

/**
 * @func initDocument
 * @desc create a new
 */
const initDocument = options => new JSDOM(html, options);


describe('JS Dom Quotes Test', () => {
  describe('Vanilla JS', () => {
    let document;
    let dom;
    const scriptText = fs.readFileSync(path.join(__dirname, '/../js/vanilla-solution.js'), 'utf-8');

    beforeEach(() => {
      dom = initDocument({ runScripts: 'outside-only' });
      const s = new Script(scriptText);
      dom.runVMScript(s);
    });

    it('should contain the body', () => {
      // ARRANGE
      const expected = dom.window.document.body;
      // ACT
      const actual = dom.window.document.querySelector('body');
      // ASSERT
      expect(actual).to.be.eql(expected);
    });

    it('should select the header, () => {
      // ARRANGE
      const expected = dom.window.document.body;
      // ACT
      const actual = dom.window.document.querySelector('header');
      // ASSERT
      expect(actual).to.be.eql(expected);
    });
  });
});
