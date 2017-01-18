import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  nomen: attr('string'),
  status: attr('member-status'),
  person: belongsTo('person', {async: true}),
  chapter: belongsTo('chapter', {async: true}),
  permissions: attr(),
});
