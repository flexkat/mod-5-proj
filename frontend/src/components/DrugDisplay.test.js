import React from 'react';
import DrugDisplay from './DrugDisplay'
import { shallow } from 'enzyme';


describe("drug display component", () => {
  it("should render the drug display when no props are passed through", () => {
    const wrapper = shallow(<DrugDisplay />);

    expect(wrapper).toMatchSnapshot();
  })
})