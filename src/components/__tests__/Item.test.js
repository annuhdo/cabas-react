import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import Item from '../Item';

it('Renders without crashing', () => {
  const editItem = jest.fn();
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const index = "item-test-1";
  const item = {
    complete: false,
    detail: "test-detail",
    owner: "test-uid",
    title: "test-title"
  };
  const deleteItem = jest.fn();
  const closeEditItem = jest.fn();
  const toggleItemComplete = jest.fn();
  const showEditItem = "";
  const renderEditItem = jest.fn();

  shallow( <Item
    editItem={editItem}
    owner={owner}
    index={index}
    item={item}
    deleteItem={deleteItem}
    closeEditItem={closeEditItem}
    toggleItemComplete={toggleItemComplete}
    showEditItem={showEditItem}
    renderEditItem={renderEditItem}
   /> );
});