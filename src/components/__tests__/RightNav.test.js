import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import RightNav from '../RightNav';

it('renders without crashing', () => {
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

it('displays when openRightNav is true', () => {
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
  
  const wrapper = shallow( <RightNav
    leaveList={leaveList}
    router={router}
    removableList={removableList}
    listId={listId}
    openRightNav={openRightNav}
    closeLists={closeLists}
    lists={lists}
   /> );

  const rightNav = wrapper.find('.my-lists');
  expect(rightNav.prop('style')).toBeNull();
});

it('hides when openRightNav is false', () => {
  const leaveList = jest.fn();
  const router = {
    history: {
      push: jest.fn()
    }
  };
  const removableList = false;
  const listId = "listId-test";
  const openRightNav = false;
  const closeLists = jest.fn();
  const lists = {
    "listId-test": {
      listName: "test-title"
    }
  };

  const hideDisplay = {
    display: "none"
  }
  
  const wrapper = shallow( <RightNav
    leaveList={leaveList}
    router={router}
    removableList={removableList}
    listId={listId}
    openRightNav={openRightNav}
    closeLists={closeLists}
    lists={lists}
   /> );

  const rightNav = wrapper.find('.my-lists');
  expect(rightNav.prop('style')).toEqual(hideDisplay);
});

it('makes list items editable when removableList is true', () => {
  const leaveList = jest.fn();
  const router = {
    history: {
      push: jest.fn()
    }
  };
  const removableList = true;
  const listId = "listId-test";
  const openRightNav = true;
  const closeLists = jest.fn();
  const lists = {
    "listId-test": {
      listName: "test-title"
    }
  };
  
  const wrapper = shallow( <RightNav
    leaveList={leaveList}
    router={router}
    removableList={removableList}
    listId={listId}
    openRightNav={openRightNav}
    closeLists={closeLists}
    lists={lists}
   /> );

  const rightNav = wrapper.find('.my-lists');
  const allLists = rightNav.find('.editable');
  expect(allLists.length).toBe(1);
});

it('closeLists fn when close button is clicked', () => {
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
  
  const wrapper = shallow( <RightNav
    leaveList={leaveList}
    router={router}
    removableList={removableList}
    listId={listId}
    openRightNav={openRightNav}
    closeLists={closeLists}
    lists={lists}
   /> );

  const rightNav = wrapper.find('.my-lists');
  const closeBtn = rightNav.find('.close-my-lists');
  const closeClicked = closeBtn.simulate('click');
  expect(closeLists).toHaveBeenCalled();
});

it('routes to a new list when New is clicked', () => {
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
  
  const wrapper = shallow( <RightNav
    leaveList={leaveList}
    router={router}
    removableList={removableList}
    listId={listId}
    openRightNav={openRightNav}
    closeLists={closeLists}
    lists={lists}
   /> );

  const rightNav = wrapper.find('.my-lists');
  const newBtn = rightNav.find('.my-lists-top .add-list');
  const newBtnClicked = newBtn.simulate('click');
  expect(router.history.push).toHaveBeenCalled();
});