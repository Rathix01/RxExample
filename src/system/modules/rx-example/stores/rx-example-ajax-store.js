import Rx from 'rxjs/Rx';
import R from 'ramda';
import RxExampleActions from './rx-example-actions-store';

const toConsoleLog = (state) => console.log(state);
const toRequest = (url) => fetch(url).then(res => res.json());

// curried functions. If curious:
// http://ramdajs.com/
// https://hughfdjackson.com/javascript/why-curry-helps/
const toStateWithKey = R.curry((key, state) => ({ key: key, state: state, id: state.id }));
const toStateWithId = R.curry((id, state) => ({ id: id, state: state }));

// set up a listener for when both listener2 and listener3 provide new state.
const toListenersFor = R.curry((listener2, listener3, state) => {
	return Rx.Observable.zip(listener2, listener3).map(toStateWithId("2,3"));
}); 

// map actions from example actions to url strings;
const inputUrl1 = RxExampleActions.input1.mapTo('https://api.github.com/users');
const inputUrl2 = RxExampleActions.input2.mapTo('https://api.github.com');
const inputUrl3 = RxExampleActions.input3.mapTo('https://api.github.com/users/defunkt');
const inputUrl4 = RxExampleActions.input4.mapTo('https://api.github.com/users/technoweenie');

// map urls to github ajax response.
const ajaxRequest1 = inputUrl1.switchMap(toRequest).map(toStateWithId(1));
const ajaxRequest2 = inputUrl2.switchMap(toRequest).map(toStateWithId(2));
const ajaxRequest3 = inputUrl3.switchMap(toRequest).map(toStateWithId(3));
const ajaxRequest4 = inputUrl4.switchMap(toRequest).map(toStateWithId(4));

// log each response as they come in.
Rx.Observable.merge(ajaxRequest1, ajaxRequest2, ajaxRequest3, ajaxRequest4)
	.map(toStateWithKey("merge"))
	.subscribe(toConsoleLog);

//log response when each request has 
Rx.Observable.zip(ajaxRequest1, ajaxRequest2, ajaxRequest3)
	.map(toStateWithId("1,2,3"))
	.map(toStateWithKey("zip"))
	.subscribe(toConsoleLog);

//something a little more complex.
//when ajaxRequest4 is completed, ajaxRequest2 and ajaxRequest3 listeners are created.
ajaxRequest4.switchMap(toListenersFor(ajaxRequest2, ajaxRequest3))
	.map(toStateWithKey("conditional zip"))
	.subscribe(toConsoleLog);
	