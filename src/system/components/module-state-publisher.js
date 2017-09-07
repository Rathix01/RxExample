import React from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import actions from '../../actions/actions';
import ReadState from './read-state';

window.React = React

const moduleStatePublisherComponent = ( InnerComponent, name ) => class extends React.Component {
	publishState(state) {
		actions.push({ ...this.props, ...this.state, ...state, component: name, type: "state-module", event: ReactDOM.findDOMNode(this) });
	}
	componentDidUpdate() {
		this.publishState({ componentEvent: "component-update" })
	}
	componentDidMount() {
		this.publishState({ componentEvent: "component-mount" })
	}
	render(){
		return <InnerComponent
			name={ InnerComponent.name }
			{...this.state}
			{...this.props} />
	}
}

export default R.compose(ReadState, moduleStatePublisherComponent);