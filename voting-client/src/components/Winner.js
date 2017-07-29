import React from 'react'
import ReactDOM from 'react-dom'

export default React.createClass({
	render: function(){
		return (<div className="winner">The winner is {this.props.winner}</div>)
	}
})
