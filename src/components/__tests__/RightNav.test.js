import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import RightNav from '../RightNav';

it('Renders without crashing', () => {
  const leaveList = jest.fn();
  const router = {
    history: {
      push: jest.fn()
    }
  };
  const removableList = false;
  const listId = "listId-test";
  const openRightNav = true;
  const closeLists = jest.fn();
  const lists = {
    "listId-test": {
      listName: "test-title"
    }
  };
  
  shallow( <RightNav
    leaveList={leaveList}
    router={router}
    removableList={removableList}
    listId={listId}
    openRightNav={openRightNav}
    closeLists={closeLists}
    lists={lists}
   /> );
});