export function initialize(/* application */) {
  var inflector = Ember.Inflector.inflector;
  inflector.uncountable('convention');
  inflector.uncountable('session');
  inflector.uncountable('round');
  inflector.uncountable('performer');
  inflector.uncountable('contest');
  inflector.uncountable('contestant');
  inflector.uncountable('performance');
  inflector.uncountable('organization');
  inflector.uncountable('song');
}

export default {
  name: 'inflector',
  initialize
};
