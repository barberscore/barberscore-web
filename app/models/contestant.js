import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  nomen: DS.attr('string'),
  status: DS.attr('contestant-status'),
  contest: DS.belongsTo('contest', {async: true}),
  entry: DS.belongsTo('entry', {async: true}),
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

});
