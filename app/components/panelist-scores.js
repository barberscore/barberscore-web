import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  store: service(),
  sortedScoresProperties: [
    'songNum',
  ],
  scoresCall: computed(
    'model',
    'appearance',
    function() {
      return this.store.query('score', {filter: {
        'panelist': this.get('model.id'),
        'song__appearance': this.get('appearance.id'),
    }});
  }),
  sortedScores: sort(
    'scoresCall',
    'sortedScoresProperties'
  ),
  autosave: task(function* (property, element){
    yield timeout(200);

    if (property.points > 100) {
      this.flashMessages.danger("Scores cannot exceed 100.");
      $(element.target).addClass('is-invalid').focus();
    } else {
      $(element.target).removeClass('is-invalid')
      try {
        yield property.save();
        this.store.findRecord('appearance', this.get('appearance.id'), { reload: true });
      } catch(e) {
        e.errors.forEach((error) => {
          this.flashMessages.danger(error.detail);
        })
      }  
    }
  }).restartable(),
});
