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

  nameSort: Ember.computed.alias('member.person.last_name'),

  isExpiring: Ember.computed(
    'member.person.dues_thru',
    'entry.representing.kind',
    'entry.session.convention.end_date',
    function () {
      let bhs = this.get('entry.representing.kind') === 'District';
      let expiring = this.get('member.person.dues_thru') < this.get('entry.session.convention.end_date');
      return (bhs && expiring);
    }
  ),
  statusOptions: [
    'New',
  ],


});
