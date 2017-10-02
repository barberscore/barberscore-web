import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('member-status'),
  part: DS.attr('member-part'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  isAdmin: DS.attr('boolean'),
  isCurrent: DS.attr('boolean'),
  group: DS.belongsTo('group', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  participants: DS.hasMany('participant', {async: true}),
  permissions: DS.attr(),
  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),


  canParticipate: Ember.computed(
    'status', function() {
      let canParticipate = ['Active', 'Provisional',]
      return canParticipate.includes(this.get('status'));
    }
  ),

  statusOptions: [
    'New',
    'Provisional',
    'Active',
    'Inactive',
  ],
  statusSort: Ember.computed(
    'status',
    'statusOptions',
    function() {
      return this.get('statusOptions').indexOf(this.get('status'));
    }
  ),
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
  personDetail: Ember.computed(
    'person.nomen',
    'part',
    function() {
      let partOut = "(Unknown Part)";
      if (this.get('part')) {
        partOut = this.get('part');
      }
      return this.get('person.nomen') + " - " + partOut;
    }
  ),
  groupStatus: Ember.computed.alias('group.statusSort'),
  groupName: Ember.computed.alias('group.name'),
  groupKind: Ember.computed.alias('group.kindSort'),
  personName: Ember.computed.alias('person.name'),
  personLast: Ember.computed.alias('person.lastName'),
});
