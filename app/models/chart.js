import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model from '@ember-data/model';
import DS from '@ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  status: DS.attr('chart-status'),
  title: DS.attr('string'),
  arrangers: DS.attr('string'),
  composers: DS.attr('string'),
  lyricists: DS.attr('string'),
  holders: DS.attr('string'),
  description: DS.attr('string'),
  notes: DS.attr('string'),

  nomen: DS.attr('string'),
  imageId: DS.attr('string'),

  groups: DS.hasMany('group', {async: true}),
  permissions: DS.attr(),

  // songs: DS.hasMany('song', {async: true}),
  // repertories: DS.hasMany('repertory', {async: true}),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),
  protect: memberAction({path: 'protect', type: 'post'}),

  isDisabled: not(
    'permissions.write'
  ),

  statusOptions: [
    'Protected',
    'Inactive',
    'New',
    'Active',
  ],
  statusSort: computed(
    'status',
    'statusOptions',
    function() {
      return this.statusOptions.indexOf(this.status);
    }
  ),
});
