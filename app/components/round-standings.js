import { not, sort } from '@ember/object/computed';
// import { inject as service } from '@ember/service';
import Component from '@ember/component';
// import { task } from 'ember-concurrency';
// import { denodeify } from 'rsvp'

export default Component.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
  sortedCompetitorsProperties: [
    'totPoints:desc',
  ],
  sortedCompetitors: sort(
    'model.session.competitors',
    'sortedCompetitorsProperties'
  ),
});


