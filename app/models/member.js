import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import moment from 'moment';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('member-status'),
  part: DS.attr('member-part'),
  start_date: DS.attr('isodate'),
  end_date: DS.attr('isodate'),
  entity: DS.belongsTo('entity', {async: true}),
  person: DS.belongsTo('person', {async: true}),
  participants: DS.hasMany('participant', {async: true}),
  permissions: DS.attr(),
  statusOptions: [
    'New',
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
    'person.common_name',
    'person.dues_thru',
    'part',
    function() {
      let partOut = "(Unknown Part)";
      if (this.get('part')) {
        partOut = this.get('part');
      }
      let dt = this.get('person.dues_thru');
      let dtf = moment(dt).format('LL');
      return this.get('person.common_name') + " - " + partOut + ";  BHS Membership Expires: " + dtf;
    }
  ),
  entityKind: Ember.computed.alias('entity.kind'),
  personName: Ember.computed.alias('person.name'),
  personLast: Ember.computed.alias('person.last_name'),
  personNameExp: Ember.computed.alias('person.withExp')
});
