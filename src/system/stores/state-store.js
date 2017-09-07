import Rx from 'rxjs/Rx';
import R from 'ramda';

const stateUpdates = new Rx.Subject();

const publish = R.curry((key, state) => {
  return stateUpdates.next({ state, key });
});

const currentState = stateUpdates.scan((current, update) => {
    const version = current[update.key] !== undefined ? ( current[update.key].version + 1 ) : 1
    const nextUpdate = { [update.key]: R.merge( update.state, {version} ) };
    return R.merge( current, nextUpdate );
}, {});

if (process.env.NODE_ENV !== 'production') {
  if (window) {
    currentState.subscribe(state => { 
    	window.currentState = state; 
    });
  }
}

window.publish = publish;

export { currentState }
export default publish;
