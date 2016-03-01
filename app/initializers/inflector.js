import Ember from 'ember';

export function initialize(/* application */) {
  var inflector = Ember.Inflector.inflector;
  inflector.uncountable('award');
  inflector.uncountable('contest');
  inflector.uncountable('contestant');
  inflector.uncountable('convention');
  inflector.uncountable('group');
  inflector.uncountable('judge');
  inflector.uncountable('organization');
  inflector.uncountable('performance');
  inflector.uncountable('performer');
  inflector.uncountable('person');
  inflector.uncountable('round');
  inflector.uncountable('score');
  inflector.uncountable('session');
  inflector.uncountable('song');
  inflector.uncountable('tune');
  inflector.uncountable('venue');
}

export default {
  name: 'inflector',
  initialize
};
