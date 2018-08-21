import { not } from '@ember/object/computed';
import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr('user-status'),
  username: DS.attr('string'),
  isActive: DS.attr('boolean'),
  isStaff: DS.attr('boolean'),
  person: DS.belongsTo('person', {async: true}),
  name: DS.attr('string'),
  email: DS.attr('string'),
  currentThrough: DS.attr('isodate'),
  permissions: DS.attr(),
  isDisabled: not(
    'permissions.write'
  ),
  isConventionManager: DS.attr('boolean'),
  isSessionManager: DS.attr('boolean'),
  isRoundManager: DS.attr('boolean'),
  isScoringManager: DS.attr('boolean'),
  isGroupManager: DS.attr('boolean'),
  isPersonManager: DS.attr('boolean'),
  isAwardManager: DS.attr('boolean'),
  isOfficerManager: DS.attr('boolean'),
  isChartManager: DS.attr('boolean'),
  isAssignmentManager: DS.attr('boolean'),
});
