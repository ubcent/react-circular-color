import React from 'react';
import { assert, expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CircularColor from '../../src';

Enzyme.configure({ adapter: new Adapter() });

describe('CircularProgressbar should', () => {

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
  it('fire an event', () => {
    const wrapper = shallow(
      <CircularColor onChange={() => { console.log('Changed'); }} />
    );
    
  });
});
