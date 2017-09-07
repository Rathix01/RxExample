import React from 'react';
import { currentState } from '../stores/state-store';

const StateProvider = ( InnerComponent ) => class extends React.Component {
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.state = { version: 0 };
		this.getRootId = this.getRootId.bind(this);
	}
	update(state) {
		if( state[this.props.id] && state[this.props.id].version !== this.state.version ) {
			
			if(this.props.id === "AdminSectionsPositionAwareListItem2InputField") {
			console.log(this.props.id, state[this.props.id]);
		}

			this.setState(state[this.props.id] || {});
		}
	}
	componentWillMount(){
		this.unsubscribe = currentState.subscribe( this.update )
	}
	componentWillUnmount() {
		this.unsubscribe();
	}
	getRootId() {
		return this.props.isRoot || this.props.rootId === undefined ? this.props.id : this.props.rootId;
	}
	render(){
		return <InnerComponent
			rootId={ this.getRootId() }
			{...this.state}
			{...this.props}
			value={ this.state.value || this.props.value } />
	}
}

export default StateProvider;