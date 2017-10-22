import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import LeftNav from '../LeftNav';

it('renders without crashing', () => {
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

it('displays the current user name and photo', () => {
  const listId = "listId-test";
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const logout = jest.fn();
  const refreshList = jest.fn();
  
  const wrapper = shallow( <LeftNav
    listtId={listId}
    owner={owner}
    logout={logout}
    refreshList={refreshList}
   /> );

  const userInfo = wrapper.find('.user');
  const userPhoto = userInfo.find('.user-img > img');
  const userName = userInfo.find('.user > span');

  expect(userPhoto.prop('src')).toEqual(owner.photo);
  expect(userName.text()).toEqual(owner.name);
});

it('calls refreshList when My List is clicked', () => {
  const listId = "listId-test";
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const logout = jest.fn();
  const refreshLists = jest.fn();
  
  const wrapper = shallow( <LeftNav
    listtId={listId}
    owner={owner}
    logout={logout}
    refreshLists={refreshLists}
   /> );

  const myListsLink = wrapper.find('.navigation > ul > li').first();
  const myListsClicked = myListsLink.simulate('click');
  expect(refreshLists).toHaveBeenCalled();
});

it('logouts when logout is clicked', () => {
  const listId = "listId-test";
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const logout = jest.fn();
  const refreshLists = jest.fn();
  
  const wrapper = shallow( <LeftNav
    listtId={listId}
    owner={owner}
    logout={logout}
    refreshLists={refreshLists}
   /> );

  const logoutLink = wrapper.find('.navigation > ul > li').last();
  const logoutClicked = logoutLink.simulate('click');
  expect(logout).toHaveBeenCalled();
});