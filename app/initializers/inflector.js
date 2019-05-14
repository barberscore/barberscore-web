import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;
  inflector.uncountable('appearance');
  inflector.uncountable('assignment');
  inflector.uncountable('award');
  inflector.uncountable('chart');
  inflector.uncountable('contest');
  inflector.uncountable('contestant');
  inflector.uncountable('convention');
  inflector.uncountable('contender');
  inflector.uncountable('entry');
  inflector.uncountable('grid');
  inflector.uncountable('group');
  inflector.uncountable('member');
  inflector.uncountable('officer');
  inflector.uncountable('outcome');
  inflector.uncountable('panelist');
  inflector.uncountable('person');
  inflector.uncountable('repertory');
  inflector.uncountable('round');
  inflector.uncountable('score');
  inflector.uncountable('session');
  inflector.uncountable('song');
  inflector.uncountable('statelog');
  inflector.uncountable('subscription');
  inflector.uncountable('user');
  inflector.uncountable('venue');
}

export default {
  name: 'inflector',
  initialize
};
