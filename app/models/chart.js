import { computed } from '@ember/object';
import Model from 'ember-data/model';
import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('chart-status'),
  title: DS.attr('string'),
  arrangers: DS.attr('string'),
  composers: DS.attr('string'),
  description: DS.attr('string'),
  notes: DS.attr('string'),
  image: DS.attr('string'),
  holders: DS.attr('string', {defaultValue:''}),
  repertories: DS.hasMany('repertory', {async: true}),
  songs: DS.hasMany('song', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

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
