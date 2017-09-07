import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';

const rxExample = (state) => <div>
	<button id="button1" onClick={state.handleEvent}> 1 </button>
	<button id="button2" onClick={state.handleEvent}> 2 </button>
	<button id="button3" onClick={state.handleEvent}> 3 </button>
	<button id="button4" onClick={state.handleEvent}> 4 </button>
</div>

export default readAndWrite(rxExample, "RXExample");