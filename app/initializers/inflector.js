import Ember from 'ember';

export function initialize(/* application */) {
  var inflector = Ember.Inflector.inflector;
  inflector.uncountable('appearance');
  inflector.uncountable('assignment');
  inflector.uncountable('award');
  inflector.uncountable('chart');
  inflector.uncountable('contest');
  inflector.uncountable('contestant');
  inflector.uncountable('convention');
  inflector.uncountable('entity');
  inflector.uncountable('entry');
  inflector.uncountable('member');
  inflector.uncountable('office');
  inflector.uncountable('officer');
  inflector.uncountable('person');
  inflector.uncountable('repertory');
  inflector.uncountable('round');
  inflector.uncountable('score');
  inflector.uncountable('session');
  inflector.uncountable('slot');
  inflector.uncountable('song');
  inflector.uncountable('submission');
  inflector.uncountable('user');
  inflector.uncountable('venue');
}

export default {
  name: 'inflector',
  initialize
};
