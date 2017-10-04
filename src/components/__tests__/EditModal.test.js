import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import EditModal from '../EditModal';

it('Renders without crashing', () => {
  const updateTitle = jest.fn();
  const toggleDisplay = jest.fn();
  const editable = true;
  const currentListInfo = {
    listName: "test-title"
  };
  shallow( <EditModal updateTitle={updateTitle} toggleDisplay={toggleDisplay} editable={editable} currentListInfo={currentListInfo} /> );
});