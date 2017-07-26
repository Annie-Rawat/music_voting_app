import React from 'react';

export default React.createClass({
  getPair: function(){
    return this.props.pair || [];
  },
  render: function(){
    return (<div>
      {this.getPair().map(entry =>
	<button key={entry}>
	  {entry}
	</button>
      )}
    </div>)
  }
})
