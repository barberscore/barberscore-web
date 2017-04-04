import Ember from 'ember';

export function initialize(/* application */) {
  var inflector = Ember.Inflector.inflector;
  inflector.uncountable('assignment');
  inflector.uncountable('award');
  inflector.uncountable('catalog');
  inflector.uncountable('contest');
  inflector.uncountable('contestant');
  inflector.uncountable('contestprivate');
  inflector.uncountable('convention');
  inflector.uncountable('entity');
  inflector.uncountable('membership');
  inflector.uncountable('office');
  inflector.uncountable('officer');
  inflector.uncountable('performance');
  inflector.uncountable('performanceprivate');
  inflector.uncountable('performer');
  inflector.uncountable('performerprivate');
  inflector.uncountable('person');
  inflector.uncountable('repertory');
  inflector.uncountable('round');
  inflector.uncountable('score');
  inflector.uncountable('session');
  inflector.uncountable('slot');
  inflector.uncountable('song');
  inflector.uncountable('songprivate');
  inflector.uncountable('submission');
  inflector.uncountable('user');
  inflector.uncountable('venue');
}

export default {
  name: 'inflector',
  initialize
};
