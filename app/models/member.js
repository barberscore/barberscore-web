import { alias, not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('member-status'),
  part: DS.attr('member-part'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  group: DS.belongsTo('group', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'New',
    'Provisional',
    'Active',
    'Inactive',
  ],
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.statusOptions.indexOf(this.status);
    }
  ),
  partOptions: [
    'Tenor',
    'Lead',
    'Baritone',
    'Bass',
  ],
  partSort: computed(
    'part',
    'partOptions',
    function() {
      return this.partOptions.indexOf(this.part);
    }
  ),
  personDetail: computed(
    'person.nomen',
    'part',
    function() {
      let partOut = "(Unknown Part)";
      if (this.part) {
        partOut = this.part;
      }
      return this.get('person.nomen') + " - " + partOut;
    }
  ),
  groupStatus: alias('group.status'),
  groupName: alias('group.name'),
  groupKind: alias('group.kindSort'),
  personName: alias('person.fullName'),
  personNomen: alias('person.nomen'),
  personLast: alias('person.lastName'),
});
