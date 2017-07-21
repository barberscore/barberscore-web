import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('participant-status'),
  part: DS.attr('participant-part'),
  entry: DS.belongsTo('entry', {async: true}),
  member: DS.belongsTo('member', {async: true}),
  permissions: DS.attr(),

  nameSort: Ember.computed.alias('member.person.lastName'),
  partSort: Ember.computed.alias('member.partSort'),

  isExpiring: Ember.computed(
    'member.person.duesThru',
    'entry.group.isBHS',
    'entry.session.convention.endDate',
    function () {
      let expiring = this.get('member.person.duesThru') < this.get('entry.session.convention.endDate');
      let isBHS = this.get('entry.group.isBHS');
      return (isBHS && expiring);
    }
  ),
  statusOptions: [
    'New',
  ],


});
