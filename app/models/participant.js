import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('participant-status'),
  entry: DS.belongsTo('entry', {async: true}),
  member: DS.belongsTo('member', {async: true}),
  permissions: DS.attr(),

  nameSort: Ember.computed.alias('member.person.last_name'),

  isExpiring: Ember.computed(
    'member.person.dues_thru',
    'entry.session.convention.end_date',
    function () {
      return this.get('member.person.dues_thru') < this.get('entry.session.convention.end_date')
    }
  ),

  statusOptions: [
    'New',
  ],


});
