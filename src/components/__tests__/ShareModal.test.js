import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import ShareModal from '../ShareModal';

it('Renders without crashing', () => {
  const sharable = true;
  
  shallow( <ShareModal
    sharable={sharable}
   /> );
});