import Ember from 'ember';

export function initialize(/* application */) {
  var inflector = Ember.Inflector.inflector;
  inflector.uncountable('assignment');
  inflector.uncountable('award');
  inflector.uncountable('contest');
  inflector.uncountable('contestant');
  inflector.uncountable('contestscore');
  inflector.uncountable('convention');
  inflector.uncountable('entity');
  inflector.uncountable('host');
  inflector.uncountable('membership');
  inflector.uncountable('office');
  inflector.uncountable('officer');
  inflector.uncountable('performance');
  inflector.uncountable('performancescore');
  inflector.uncountable('performer');
  inflector.uncountable('performerscore');
  inflector.uncountable('person');
  inflector.uncountable('round');
  inflector.uncountable('score');
  inflector.uncountable('session');
  inflector.uncountable('slot');
  inflector.uncountable('song');
  inflector.uncountable('songscore');
  inflector.uncountable('submission');
  inflector.uncountable('user');
  inflector.uncountable('venue');
}

export default {
  name: 'inflector',
  initialize
};
