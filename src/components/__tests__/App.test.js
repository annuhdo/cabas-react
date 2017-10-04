import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter } from 'react-router'

Enzyme.configure({ adapter: new Adapter() });
import App from '../App';

it('Renders without crashing', () => {
  const match = {
    params: {
      listId: 'test'
    }
  }

  const context = {}
  shallow(<StaticRouter context={context}> <App match={match} /></StaticRouter>);
});