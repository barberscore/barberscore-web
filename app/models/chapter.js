import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('chapter-status'),
  code: attr('string'),
  organization: belongsTo('organization', {async: true}),
  groups: hasMany('group', {async: true}),
  members: hasMany('member', {async: true}),
});
