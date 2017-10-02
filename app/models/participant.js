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
    'member.person.validThrough',
    'entry.group.isBhs',
    'entry.session.convention.endDate',
    function () {
      let expiring = this.get('member.person.validThrough') < this.get('entry.session.convention.endDate');
      let isBhs = this.get('entry.group.isBhs');
      return (isBhs && expiring);
    }
  ),
  statusOptions: [
    'New',
  ],


});
