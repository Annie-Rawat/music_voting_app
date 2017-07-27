import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {expect} from 'chai'

import Voting from '../../src/components/Voting'

describe('voting', ()=>{
	it('renders  a pair of buttons', ()=>{
		
		const component = ReactTestUtils.renderIntoDocument(<Voting props={["Gangam Style", "TZ Anthem"]} />)
		
		const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
		

		expect(buttons.length).to.equal(2);
		expect(buttons[0].textContent).to.equal('Gangam Style')
		
		expect(buttons[1].textContent).to.equal('TZ Anthem')
	})	
})
