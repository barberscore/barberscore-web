import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('membership-status'),
  part: attr('membership-part'),
  start_date: attr('isodate'),
  end_date: attr('isodate'),
  entity: belongsTo('entity', {async: true}),
  person: belongsTo('person', {async: true}),
  permissions: attr(),
  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
  partOptions: [
    'Tenor',
    'Lead',
    'Baritone',
    'Bass',
    'Director',
  ],
  partSort: Ember.computed(
    'part',
    'partOptions',
    function() {
      return this.get('partOptions').indexOf(this.get('part'));
    }
  ),
  entityKind: Ember.computed.alias('entity.kind')
});
