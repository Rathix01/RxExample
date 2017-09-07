import Rx from 'rxjs/Rx';
import R from 'ramda';
import Actions from '../../../../actions/actions';

const toExampleInput = (state) => state.component === "RXExample";
const toInputById = R.curry((id, state) => state.event.target.id === `button${id}`);

const inputAction = Actions.filter(toExampleInput);
const input1 = inputAction.filter(toInputById("1"));
const input2 = inputAction.filter(toInputById("2"));
const input3 = inputAction.filter(toInputById("3"));
const input4 = inputAction.filter(toInputById("4"));

export default {
	input1, input2, input3, input4
}
