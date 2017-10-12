import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
// import { validator, buildValidations } from 'ember-cp-validations';
import { memberAction } from 'ember-api-actions';

// const Validations = buildValidations({
//   email: validator('format', {
//     type: 'email',
//     allowBlank: true
//   }),
//   website: validator('format', {
//     type: 'url',
//     allowBlank: true
//   }),
// });


export default Model.extend({
  nomen: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('organization-status'),
  kind: DS.attr('organization-kind'),
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
  parent: DS.belongsTo('organization', {inverse: 'children', async: true}),
  children: DS.hasMany('organization', {inverse: 'parent', async: true}),
  awards: DS.hasMany('award', {async: true}),
  conventions: DS.hasMany('convention', {async: true}),
  groups: DS.hasMany('group', {async: true}),
  officers: DS.hasMany('officer', {async: true}),
  grantors: DS.hasMany('grantor', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  kindOptions: [
    'International',
    'District',
    'Noncompetitive',
    'Affiliate',
    'Division',
    'Chapter',
  ],
  kindSort: computed(
    'kind',
    'kindOptions',
    function() {
      return this.get('kindOptions').indexOf(this.get('kind'));
    }
  ),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.get('statusOptions').indexOf(this.get('status'));
    }
  ),
});
