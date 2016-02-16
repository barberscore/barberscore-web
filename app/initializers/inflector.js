import Ember from 'ember';

export function initialize(/* application */) {
  var inflector = Ember.Inflector.inflector;
  inflector.uncountable('convention');
  inflector.uncountable('session');
  inflector.uncountable('round');
  inflector.uncountable('performer');
  inflector.uncountable('contestant');
  inflector.uncountable('performance');
  inflector.uncountable('organization');
  inflector.uncountable('song');
  inflector.uncountable('group');
  inflector.uncountable('award');
  inflector.uncountable('person');
  inflector.uncountable('judge');
  inflector.uncountable('score');
}

export default {
  name: 'inflector',
  initialize
};
