import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import AddModal from '../AddModal';

it('renders without crashing', () => {
  const owner = "test-uid";
  const toggleDisplay = jest.fn();
  const addItem = jest.fn();
  const addable = true;
  shallow( <AddModal owner={owner} toggleDisplay={toggleDisplay} addItem={addItem} addable={addable} /> );
});

it('displays modal when addable is true', () => {
  const owner = "test-uid";
  const toggleDisplay = jest.fn();
  const addItem = jest.fn();
  const addable = true;

  const wrapper = shallow(
  <AddModal
    owner={owner}
    toggleDisplay={toggleDisplay}
    addItem={addItem}
    addable={addable}
  /> );
  const addModal = wrapper.find('.add-modal');
  expect(addModal.prop('style')).toBeNull();
});

it('hides modal when addable is false', () => {
  const owner = "test-uid";
  const toggleDisplay = jest.fn();
  const addItem = jest.fn();
  const addable = false;

  const hideDisplay = {
    display: "none"
  }

  const wrapper = shallow(
  <AddModal
    owner={owner}
    toggleDisplay={toggleDisplay}
    addItem={addItem}
    addable={addable}
  /> );
  const addModal = wrapper.find('.add-modal');
  expect(addModal.prop('style')).toEqual(hideDisplay);
});

it('should call toggleDisplay fn when clicked Cancel', () => {
  const owner = "test-uid";
  const toggleDisplay = jest.fn();
  const addItem = jest.fn();
  const addable = true;

  const hideDisplay = {
    display: "none"
  }

  const wrapper = shallow(
  <AddModal
    owner={owner}
    toggleDisplay={toggleDisplay}
    addItem={addItem}
    addable={addable}
  /> );
  const cancelItemBtn = wrapper.find('form[name="addForm"] .cancel-btn').simulate('click');
  expect(toggleDisplay).toHaveBeenCalled();
});