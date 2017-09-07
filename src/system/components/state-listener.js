import React from 'react';
import moduleStatepublisher from './module-state-publisher';

const stateListener = (state) => {
	return null
};

module.exports = moduleStatepublisher(stateListener, "StateListener");