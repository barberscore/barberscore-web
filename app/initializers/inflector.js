import Ember from 'ember';

export function initialize(/* application */) {
  var inflector = Ember.Inflector.inflector;
  inflector.uncountable('award');
  inflector.uncountable('judge');
  inflector.uncountable('chapter');
  inflector.uncountable('contest');
  inflector.uncountable('contestant');
  inflector.uncountable('convention');
  inflector.uncountable('group');
  inflector.uncountable('host');
  inflector.uncountable('assignment');
  inflector.uncountable('member');
  inflector.uncountable('organization');
  inflector.uncountable('performance');
  inflector.uncountable('performancescore');
  inflector.uncountable('performer');
  inflector.uncountable('performerscore');
  inflector.uncountable('person');
  inflector.uncountable('role');
  inflector.uncountable('round');
  inflector.uncountable('score');
  inflector.uncountable('session');
  inflector.uncountable('slot');
  inflector.uncountable('song');
  inflector.uncountable('songscore');
  inflector.uncountable('submission');
  inflector.uncountable('venue');
}

export default {
  name: 'inflector',
  initialize
};
