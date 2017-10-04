import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import EditModal from '../EditModal';

it('renders without crashing', () => {
  const updateTitle = jest.fn();
  const toggleDisplay = jest.fn();
  const editable = true;
  const currentListInfo = {
    listName: "test-title"
  };
  shallow( <EditModal updateTitle={updateTitle} toggleDisplay={toggleDisplay} editable={editable} currentListInfo={currentListInfo} /> );
});

it('displays modal when editable is true', () => {
  const updateTitle = jest.fn();
  const toggleDisplay = jest.fn();
  const editable = true;
  const currentListInfo = {
    listName: "test-title"
  };

  const wrapper = shallow(
  <EditModal
    updateTitle={updateTitle}
    toggleDisplay={toggleDisplay}
    editable={editable}
    currentListInfo={currentListInfo}
  /> );
  
  const editModal = wrapper.find('.edit-modal');
  expect(editModal.prop('style')).toBeNull();
});

it('hides modal when editable is false', () => {
  const updateTitle = jest.fn();
  const toggleDisplay = jest.fn();
  const editable = false;
  const currentListInfo = {
    listName: "test-title"
  };

  const hideDisplay = {
    display: "none"
  }

  const wrapper = shallow(
  <EditModal
    updateTitle={updateTitle}
    toggleDisplay={toggleDisplay}
    editable={editable}
    currentListInfo={currentListInfo}
  /> );
  
  const editModal = wrapper.find('.edit-modal');
  expect(editModal.prop('style')).toEqual(hideDisplay);
});

it('should call toggleDisplay fn when clicked Cancel', () => {
  const updateTitle = jest.fn();
  const toggleDisplay = jest.fn();
  const editable = false;
  const currentListInfo = {
    listName: "test-title"
  };
  
  const wrapper = shallow(
  <EditModal
    updateTitle={updateTitle}
    toggleDisplay={toggleDisplay}
    editable={editable}
    currentListInfo={currentListInfo}
  /> );
  
  const cancelItemBtn = wrapper.find('form[name="editForm"] .cancel-btn').simulate('click');
  expect(toggleDisplay).toHaveBeenCalled();
});