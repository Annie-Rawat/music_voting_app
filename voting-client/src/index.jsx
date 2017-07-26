import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting'

const pair = ['Shape of you', 'Never say never'];

ReactDOM.render(
	<Voting pair={pair}/>,
	document.getElementById('app')
)
