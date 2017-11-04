import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('participant-status'),
  part: DS.attr('participant-part'),
  entry: DS.belongsTo('entry', {async: true}),
  member: DS.belongsTo('member', {async: true}),
  permissions: DS.attr(),

  nameSort: alias('member.person.lastName'),
  partSort: alias('member.partSort'),

  include: memberAction({path: 'include', type: 'post'}),
  exclude: memberAction({path: 'exclude', type: 'post'}),

  isExpiring: computed(
    'member.person.currentThrough',
    'entry.group.isBhs',
    'entry.session.convention.endDate',
    function () {
      let expiring = this.get('member.person.currentThrough') < this.get('entry.session.convention.endDate');
      let isBhs = this.get('entry.group.isBhs');
      return (isBhs && expiring);
    }
  ),
  statusOptions: [
    'Excluded',
    'New',
    'Included',
  ],


});
