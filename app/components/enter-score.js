import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  autosave: task(function* (points){
    let intPoints = parseInt(points);
    this.get('score').set('points', intPoints);
    yield timeout(800);
    yield this.get('score').save();
  }).restartable()
});
