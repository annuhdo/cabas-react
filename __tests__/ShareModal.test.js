import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import ShareModal from '../ShareModal';

it('renders without crashing', () => {
  const shareable = true;
  
  shallow( <ShareModal
    shareable={shareable}
   /> );
});

it('displays modal when sharable is true', () => {
  const shareable = true;
  
  const wrapper = shallow( <ShareModal
    shareable={shareable}
   /> );

  const shareModal = wrapper.find('.share-modal');
  expect(shareModal.prop('style')).toBeNull();
});

it('hides modal when sharable is false', () => {
  const shareable = false;
  const hideDisplay = {
    display: "none"
  }
  
  const wrapper = shallow( <ShareModal
    shareable={shareable}
   /> );

  const shareModal = wrapper.find('.share-modal');
  expect(shareModal.prop('style')).toEqual(hideDisplay);
});