import React from 'react'
import ReactDOM from 'react-dom'

import Vote from './Voting.js'
import Winner from './Winner.js'

export default React.createClass({
	render: function(){
		return (<div>
		{this.props.winner? 
			<Winner winner={this.props.winner}/>:
			<Vote {...this.props}/>
		}</div>)	
	}
})
