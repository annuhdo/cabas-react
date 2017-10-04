import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import Owners from '../Owners';

it('renders without crashing', () => {
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  
  shallow( <Owners
    owner={owner}
   /> );
});