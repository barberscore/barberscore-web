import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  autosave: task(function* (points){
    this.get('score').set('points', points);
    yield timeout(200);
    yield this.get('score').save();
  }).restartable()
});
