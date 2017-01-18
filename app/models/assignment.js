import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('assignment-status'),
  category: attr('assignment-category'),
  designation: attr('string'),
  kind: attr('assignment-kind'),
  slot: attr('number'),
  session: belongsTo('session', {async: true}),
  person: belongsTo('person', {async: true}),
  permissions: attr(),

  rowClass: Ember.computed(
    'category',
    function() {
      if (this.get('category') === 'Music') {
        return 'warning';
      } else if (this.get('category') === 'Presentation') {
        return 'success';
      } else if (this.get('category') === 'Singing') {
        return 'info';
      } else {
        return 'foobar';
      }
    }
  )
});
