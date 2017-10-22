import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import Login from '../Login';

it('renders without crashing', () => {
  const context = {}
  shallow(<StaticRouter context={context}> <Login /></StaticRouter>);
});