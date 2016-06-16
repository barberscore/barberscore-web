import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('role-status'),
  part: attr('role-part'),
  person: belongsTo('person', {async: true}),
  group: belongsTo('group', {async: true}),
  date: attr('date-range'),
});
