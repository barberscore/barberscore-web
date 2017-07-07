import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('panelist-status'),
  num: DS.attr('number'),
  kind: DS.attr('panelist-kind'),
  category: DS.attr('panelist-category'),
  round: DS.belongsTo('round', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  scores: DS.hasMany('score', {async: true}),
  permissions: DS.attr(),

  categorySort: Ember.computed(
    'category',
    'categoryOptions',
    function() {
      return this.get('categoryOptions').indexOf(this.get('category'));
    }
  ),
  kindSort: Ember.computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),
  personSort: Ember.computed.alias('person.last_name'),
  statusOptions: [
    'New',
    'Scheduled',
    'Confirmed',
    'Validated',
    'Final',
  ],
  categoryOptions: [
    'DRCJ',
    'CA',
    'ACA',
    'Music',
    'Performance',
    'Singing',
  ],
  kindOptions: [
    'Official',
    'Practice',
  ],
});
