import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('contestant-status'),
  rank: DS.attr('number'),
  musPoints: DS.attr('number'),
  perPoints: DS.attr('number'),
  sngPoints: DS.attr('number'),
  totPoints: DS.attr('number'),
  musScore: DS.attr('number'),
  perScore: DS.attr('number'),
  sngScore: DS.attr('number'),
  totScore: DS.attr('number'),
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
