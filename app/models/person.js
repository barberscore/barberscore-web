import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('person-status'),
  birthDate: DS.attr('isodate'),
  duesThru: DS.attr('isodate'),
  spouse: DS.attr('string', {defaultValue:''}),
  location: DS.attr('string', {defaultValue:''}),
  part: DS.attr('person-part'),
  website: DS.attr('string', {defaultValue:''}),
  facebook: DS.attr('string', {defaultValue:''}),
  twitter: DS.attr('string', {defaultValue:''}),
  email: DS.attr('string', {defaultValue:''}),
  phone: DS.attr('string', {defaultValue:''}),
  address: DS.attr('string', {defaultValue:''}),
  homePhone: DS.attr('string', {defaultValue:''}),
  workPhone: DS.attr('string', {defaultValue:''}),
  cellPhone: DS.attr('string', {defaultValue:''}),
  airports: DS.attr(),
  image: DS.attr('string'),
  description: DS.attr('string', {defaultValue:''}),
  bhsId: DS.attr('number'),
  commonName: DS.attr('string'),
  fullName: DS.attr('string'),
  formalName: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  nickName: DS.attr('string'),
  representing: DS.belongsTo('entity', {async: true}),
  assignments: DS.hasMany('assignment', {async: true}),
  members: DS.hasMany('member', {async: true}),
  officers: DS.hasMany('officer', {async: true}),
  panelists: DS.hasMany('panelist', {async: true}),
  user: DS.belongsTo('user', {async: true}),
  permissions: DS.attr(),



  // Module Permissions CPs
  isConventionManager: DS.attr('boolean'),
  isSessionManager: DS.attr('boolean'),
  isScoringManager: DS.attr('boolean'),
  isOrganizationManager: DS.attr('boolean'),
  isGroupManager: DS.attr('boolean'),
  isPersonManager: DS.attr('boolean'),
  isAwardManager: DS.attr('boolean'),
  isJudgeManager: DS.attr('boolean'),
  isChartManager: DS.attr('boolean'),
  // isConventionManager: Ember.computed(
  //   'officers.@each.isConventionManager', function(){
  //   let officers = this.get('officers');
  //   return Boolean(officers.filterBy('isConventionManager', true).length);
  // }),

  // isSessionManager: Ember.computed(
  // 'officers.@each.isSessionManager', function(){
  //   let officers = this.get('officers');
  //   return Boolean(officers.filterBy('isSessionManager', true).length);
  // }),
  //
  // isScoringManager: Ember.computed(
  //   'officers.@each.isScoringManager', function(){
  //   let officers = this.get('officers');
  //   return Boolean(officers.filterBy('isScoringManager', true).length);
  // }),
  //
  // isOrganizationManager: Ember.computed(
  //   'officers.@each.isOrganizationManager', function(){
  //   let officers = this.get('officers');
  //   return Boolean(officers.filterBy('isOrganizationManager', true).length);
  // }),
  //
  // isGroupManager: Ember.computed(
  //   'officers.@each.isGroupManager', function(){
  //   let officers = this.get('officers');
  //   return Boolean(officers.filterBy('isGroupManager', true).length);
  // }),
  //
  // isPersonManager: Ember.computed(
  //   'officers.@each.isPersonManager', function(){
  //   let officers = this.get('officers');
  //   return Boolean(officers.filterBy('isPersonManager', true).length);
  // }),
  //
  // isAwardManager: Ember.computed(
  //   'officers.@each.isAwardManager', function(){
  //   let officers = this.get('officers');
  //   return Boolean(officers.filterBy('isAwardManager', true).length);
  // }),
  //
  // isJudgeManager: Ember.computed(
  //   'officers.@each.isJudgeManager', function(){
  //   let officers = this.get('officers');
  //   return Boolean(officers.filterBy('isJudgeManager', true).length);
  // }),
  //
  // isChartManager: Ember.computed(
  //   'officers.@each.isChartManager', function(){
  //   let officers = this.get('officers');
  //   return Boolean(officers.filterBy('isChartManager', true).length);
  // }),


  statusOptions: [
    'New',
    'Active',
    'Inactive',
    'Retired',
    'Deceased',
    '(Six)',
    '(Nine)',
  ],

  kindOptions: [
    'New',
    'Member',
    'Non-Member',
    'Associate',
  ],
  filteredMembers: Ember.computed.filterBy(
    'members',
    'entityKind',
    'Organization'
  ),
  withExp: Ember.computed(
    'name',
    'duesThru',
    function() {
      return this.get('name') + " " + this.get('duesThru');
    }
  )
});
