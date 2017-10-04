import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import AddModal from '../AddModal';

it('Renders without crashing', () => {
  const owner = "test-uid";
  const toggleDisplay = jest.fn();
  const addItem = jest.fn();
  const addable = true;
  shallow( <AddModal owner={owner} toggleDisplay={toggleDisplay} addItem={addItem} addable={addable} /> );
});