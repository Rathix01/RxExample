import Bacon from 'baconjs';
import R from 'ramda';
import Q from 'q';
import 'gsap';
import Publish from './state-store';

const update = (self) => Publish(self.target.id, self.target);
const addUpdate = (tweenTo) => R.merge(tweenTo, { onUpdate: update, onUpdateParams: ['{self}'] });
const getTweenTarget = (tweenProps) => R.clone(tweenProps);

const addTween = (timeline, tween) => {
  const position = tween.delay ? `${tween.label}+=${tween.delay}` : tween.label;
  switch (tween.fn) {
    default:
    case 'fromTo': {
      const target = getTweenTarget(R.merge(tween.from, { id: tween.target }));
      timeline.fromTo(target, tween.time, tween.from, addUpdate(tween.to), position);
      break;
    }
    case 'staggerFromTo': {
      const targets = tween.target.split(' ').map((t) => getTweenTarget(R.merge(tween.from, { id: t })));
      timeline.staggerFromTo(targets, tween.time, tween.from, addUpdate(tween.to), tween.stagger, position);
      break;
    }
    case 'set': {
      const setTarget = getTweenTarget(R.merge(tween.from, { id: tween.target }));
      timeline.set(setTarget, addUpdate(tween.to), position);
      break;
    }
  }
};

const toTimeline = (tweenData) => {
  const d = Q.defer();
  /* eslint-disable no-undef */
  const tl = new TimelineMax({ paused: true, onComplete: (args) => d.resolve(tweenData, args) });
  /* eslint-enable no-undef */
  tweenData.tweenProps.forEach(addTween.bind(this, tl));
  tl.play();
  return Bacon.fromPromise(d.promise);
};

module.exports = {
  toTimeline
};
