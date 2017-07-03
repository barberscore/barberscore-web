import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('contestant-status'),
  rank: DS.attr('number'),
  mus_points: DS.attr('number'),
  per_points: DS.attr('number'),
  sng_points: DS.attr('number'),
  tot_points: DS.attr('number'),
  mus_score: DS.attr('number'),
  per_score: DS.attr('number'),
  sng_score: DS.attr('number'),
  tot_score: DS.attr('number'),
  entry: DS.belongsTo('entry', {async: true}),
  contest: DS.belongsTo('contest', {async: true}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
    'Eligible',
    'Ineligible',
    'District Representative',
    'Qualified',
    'Validated',
    'Finished',
    'Scratched',
    'Disqualified',
    'Published',
  ],
  entryTotPoints: Ember.computed.alias('entry.totPoints'),

});
