import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('assignment-status'),
  category: attr('assignment-category'),
  // designation: attr('string'),
  kind: attr('assignment-kind'),
  slot: attr('number'),
  convention: belongsTo('convention', {async: true}),
  person: belongsTo('person', {async: true}),
  permissions: attr(),
  kindSort: Ember.computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),
  statusOptions: [
    'New',
    'Scheduled',
    'Confirmed',
    'Validated',
    'Final',
  ],
  categoryOptions: [
    'Admin',
    'Music',
    'Performance',
    'Singing',
  ],
  kindOptions: [
    'DRCJ',
    'CA',
    'ACA',
    'Music',
    'Performance',
    'Singing',
  ],
});
