import React from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import actions from '../../actions/actions';
import ReadState from './read-state';

const EventHandlerComponent = ( InnerComponent, name ) => class extends React.Component {
	constructor(props) {
		super(props);
		this.handleEvent = this.handleEvent.bind(this);
	}
	publishState(state) {
		actions.next({  ...this.props, ...this.state, ...state, component: name, type: "read-write", componentEvent: "component-update" });
	}
	stopPropagation(event) {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	}
	handleEvent(event) {
		this.publishState({
			event: { 
				target: event.target, 
				type: event.type,
				stopPropagation: this.stopPropagation.bind(this, event),
				preventDefault: event.preventDefault,
				componentNode: ReactDOM.findDOMNode(this),
				targetValue: event.target.value,
			}
		});
	}
	render(){
		this.component = <InnerComponent
			handleEvent={this.handleEvent}
			{...this.state}
			{...this.props} />

		return this.component
	}
}

export default R.compose(ReadState, EventHandlerComponent);
