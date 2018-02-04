import React from 'react';
import { assert, expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CircularColor from '../src';

Enzyme.configure({ adapter: new Adapter() });
const jsdom = require('jsdom').jsdom;

describe('CircularProgressbar should', () => {
  before(() => {
    global.document = jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
    global.navigator = { userAgent: 'node.js' };
    global.window = {
      addEventListener: () => true,
      removeEventListener: () => true,
    };
  });
  it('render path correctly', () => {
    assert.doesNotThrow(() => <CircularColor />);
  });
  it('check if class accepted', () => { // what class?
    const wrapper = shallow(
      <CircularColor className="someclass" />
    );
    expect(wrapper.find('.someclass')).to.have.length(1);
  });
  it('render as an svg', () => {
    const wrapper = shallow(
      <CircularColor />
    );
    assert.equal(1, wrapper.find('svg').length);
  });
  it('render square', () => {
    const wrapper = shallow(
      <CircularColor centerRect />
    );
    expect(wrapper.find('rect')).to.have.length(1);
  });
  it('fire onChange', (done) => {
    const component = new CircularColor({
      size: 36,
      onChange: () => {
        done();
      } });
    component.state.touched = true;
    component.setState = () => true;
    component.handleMove({
      type: 'mousemove',
      clientX: 10,
      clientY: 10,
      currentTarget: {
        getBoundingClientRect: () => ({ x: 1, y: 1 }),
      },
    });
  });
  it('render 48 sectors correctly', () => {
    const wrapper = shallow(
      <CircularColor numberOfSectors={48} />
    );
    expect(wrapper.find('Sector')).to.have.length(48);
  });
});
