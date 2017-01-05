import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';
const {computed} = Ember;

export default Model.extend({
  nomen: attr('string'),
  status: attr('role-status'),
  part: attr('role-part'),
  person: belongsTo('person', {async: true}),
  group: belongsTo('group', {async: true}),
  start_date: attr('isodate'),
  finish_date: attr('isodate'),
  permissions: attr(),

  partSort: computed(
    'part',
    function(){
      if (this.get('part') === 'Tenor') {
        return 1;
      } else if (this.get('part') === 'Lead') {
        return 2;
      } else if (this.get('part') === 'Baritone') {
        return 3;
      } else if (this.get('part') === 'Bass') {
        return 4;
      } else if (this.get('part') === 'Director') {
        return 5;
      } else {
        return 0;
      }
    }
  ),

});
