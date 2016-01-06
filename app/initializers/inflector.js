export function initialize(/* application */) {
  var inflector = Ember.Inflector.inflector;
  inflector.uncountable('convention');
}

export default {
  name: 'inflector',
  initialize
};
