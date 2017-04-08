import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('contestant-status'),
  contestantprivate: belongsTo('contestantprivate', {async: true}),
  contest: belongsTo('contest', {async: true}),
  entry: belongsTo('entry', {async: true}),
  permissions: attr(),

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
