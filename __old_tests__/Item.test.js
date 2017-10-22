import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import Item from '../Item';

it('renders without crashing', () => {
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

it('renders item information based on props values', () => {
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

  const wrapper = shallow( <Item
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
   
  const itemComponent = wrapper.find('.list-row');
  const itemInfo = wrapper.find('.list-row > .item-info');
  const itemTitle = itemInfo.find('.item-title');
  const itemDetail = itemInfo.find('.item-detail');

  const ownerInfo = wrapper.find('.list-row > .owner');
  const ownerPhoto = ownerInfo.find('img');

  expect(itemComponent.length).toBe(1);
  expect(itemInfo.length).toBe(1);
  expect(itemTitle.length).toBe(1);
  expect(itemDetail.length).toBe(1);
  expect(ownerPhoto.prop('src')).toEqual(owner.photo);
});

it('hides detail if there is no detail', () => {
  const editItem = jest.fn();
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const index = "item-test-1";
  const item = {
    complete: false,
    detail: "",
    owner: "test-uid",
    title: "test-title"
  };
  const deleteItem = jest.fn();
  const closeEditItem = jest.fn();
  const toggleItemComplete = jest.fn();
  const showEditItem = "";
  const renderEditItem = jest.fn();

  const hideDisplay = {
    display: "none"
  }

  const wrapper = shallow( <Item
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
   
  const itemComponent = wrapper.find('.list-row');
  const itemInfo = wrapper.find('.list-row > .item-info');
  const itemTitle = itemInfo.find('.item-title');
  const itemDetail = itemInfo.find('.item-detail');

  expect(itemComponent.length).toBe(1);
  expect(itemInfo.length).toBe(1);
  expect(itemTitle.length).toBe(1);
  expect(itemDetail.prop('style')).toEqual(hideDisplay);
});

it('calls toggleItemComplete when list bullet is clicked', () => {
  const editItem = jest.fn();
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const index = "item-test-1";
  const item = {
    complete: false,
    detail: "",
    owner: "test-uid",
    title: "test-title"
  };
  const deleteItem = jest.fn();
  const closeEditItem = jest.fn();
  const toggleItemComplete = jest.fn();
  const showEditItem = "";
  const renderEditItem = jest.fn();

  const wrapper = shallow( <Item
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
   
  const itemComponent = wrapper.find('.list-row');
  const listBullet = wrapper.find('.list-row > .list-bullet');

  const toggleItemCompletion = listBullet.simulate('click');
  expect(toggleItemComplete).toHaveBeenCalled();
});

it('calls renderEditItem fn when edit button is clicked', () => {
  const editItem = jest.fn();
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const index = "item-test-1";
  const item = {
    complete: false,
    detail: "",
    owner: "test-uid",
    title: "test-title"
  };
  const deleteItem = jest.fn();
  const closeEditItem = jest.fn();
  const toggleItemComplete = jest.fn();
  const showEditItem = "";
  const renderEditItem = jest.fn();

  const wrapper = shallow( <Item
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
   
  const itemComponent = wrapper.find('.list-row');
  const actionBtns = wrapper.find('.list-row > .list-action-btns');
  const editBtnClicked = actionBtns.find('.edit > button[name="edit-item"]').simulate('click');
  expect(renderEditItem).toHaveBeenCalled();
});

it('renders edit item modal with item info when showEditItem is same as index', () => {
  const editItem = jest.fn();
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const index = "item-test-1";
  const item = {
    complete: false,
    detail: "",
    owner: "test-uid",
    title: "test-title"
  };
  const deleteItem = jest.fn();
  const closeEditItem = jest.fn();
  const toggleItemComplete = jest.fn();
  const showEditItem = "item-test-1";
  const renderEditItem = jest.fn();

  const wrapper = shallow( <Item
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
   
  const editItemModal = wrapper.find('.edit-item-modal');
  const titleInput = editItemModal.find('form.inputs .item-title-input');
  const detailInput = editItemModal.find('form.inputs .item-title-detail');

  expect(editItemModal.prop('style')).toBeNull();
  expect(titleInput.prop('defaultValue')).toEqual(item.title);
  expect(detailInput.prop('defaultValue')).toEqual(item.detail);
});

it('hides edit modal when cancel is clicked', () => {
  const editItem = jest.fn();
  const owner = {
    name: "test-name",
    photo: "https://image-test.jpg"
  };
  const index = "item-test-1";
  const item = {
    complete: false,
    detail: "",
    owner: "test-uid",
    title: "test-title"
  };
  const deleteItem = jest.fn();
  const closeEditItem = jest.fn();
  const toggleItemComplete = jest.fn();
  const showEditItem = "item-test-1";
  const renderEditItem = jest.fn();

  const wrapper = shallow( <Item
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
   
  const editItemModal = wrapper.find('.edit-item-modal');
  const cancelBtnClicked = editItemModal.find('.action-btns > .cancel-btn').simulate('click');
  expect(closeEditItem).toHaveBeenCalled();
});