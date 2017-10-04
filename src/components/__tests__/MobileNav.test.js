import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import MobileNav from '../MobileNav';

it('Renders without crashing', () => {
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const openMobileNav = jest.fn();
  const refreshList = jest.fn();
  
  shallow( <MobileNav
    refreshList={refreshList}
    openMobileNav={openMobileNav}
    owner={owner}
   /> );
});