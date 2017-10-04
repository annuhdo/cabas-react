import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import LeftNav from '../LeftNav';

it('Renders without crashing', () => {
  const listId = "listId-test";
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const logout = jest.fn();
  const refreshList = jest.fn();
  
  shallow( <LeftNav
    listtId={listId}
    owner={owner}
    logout={logout}
    refreshList={refreshList}
   /> );
});