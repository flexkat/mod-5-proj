import React from 'react';
import Navbar from './Navbar'
import { shallow } from 'enzyme';


describe("nav bar component", () => {
  it("should render the menu when no props are passed through", () => {
    const wrapper = shallow(<Navbar />);

    expect(wrapper).toMatchSnapshot();
  })
})