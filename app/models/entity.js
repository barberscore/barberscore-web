import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
import {memberAction} from 'ember-api-actions';

const Validations = buildValidations({
  email: validator('format', {
    type: 'email',
    allowBlank: true
  }),
  website: validator('format', {
    type: 'url',
    allowBlank: true
  }),
});


export default Model.extend(Validations, {
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('entity-status'),
  kind: DS.attr('entity-kind'),
  shortName: DS.attr('string'),
  code: DS.attr('string'),
  startDate: DS.attr('isodate'),
  endDate: DS.attr('isodate'),
  location: DS.attr('string'),
  website: DS.attr('string'),
  facebook: DS.attr('string'),
  twitter: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  image: DS.attr('string'),
  description: DS.attr('string'),
  bhsId: DS.attr('number'),
  orgSort: DS.attr('number'),
  parent: DS.belongsTo('entity', {inverse: 'children', async: true}),
  children: DS.hasMany('entity', {inverse: 'parent', async: true}),
  awards: DS.hasMany('award', {async: true}),
  conventions: DS.hasMany('convention', {async: true}),
  entries: DS.hasMany('entry', {inverse: 'entity', async: true}),
  members: DS.hasMany('member', {async: true}),
  officers: DS.hasMany('officer', {async: true}),
  repertories: DS.hasMany('repertory', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  kindOptions: [
    'Organization',
    'Harmony Incorporated',
    'District',
    'Noncompetitive',
    'Affiliate',
    'Division',
    'Quartet',
    'Chorus',
    'Very Large Quartet',
    'Mixed Group',
  ],

  ageOptions: [
    'Seniors',
    'Youth',
    // 'Collegiate',
  ],

  kindSort: Ember.computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),
  isQuartet: Ember.computed.equal(
    'kind',
    'Quartet',
  ),
  isChorus: Ember.computed.equal(
    'kind',
    'Chorus',
  ),
  isVeryLargeQuartet: Ember.computed.equal(
    'kind',
    'Very Large Quartet',
  ),
  isMixedGroup: Ember.computed.equal(
    'kind',
    'Mixed Group',
  ),
  isGroup: Ember.computed.or(
    'isQuartet',
    'isChorus',
    'isVeryLargeQuartet',
    'isMixedGroup',
  ),
  isOrg: Ember.computed.not('isGroup'),

});
