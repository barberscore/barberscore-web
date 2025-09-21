import Component from '@ember/component';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  flashMessages: service(),
  store: service(),
  isDisabled: computed('appearance', 'appearance.round.status', function() {
    if (this.get('appearance.round.status') == 'Published') {
      return true;
    }
    return false;
  }),
  sortedScores: sort(
    'scoresCall',
    'sortedScoresProperties'
  ),
  autosave: task(function* (property, element){
    this.get('setDisableCheckAppearance')(true);
    yield timeout(1000);

    if (property.points > 100) {
      this.flashMessages.danger("Scores cannot exceed 100.");
      $(element.target).addClass('is-invalid').focus();
    } else {
      $(element.target).removeClass('is-invalid')
      try {
        yield property.save();
        this.onScoreChange();
        this.store.findRecord('appearance', this.get('appearance.id'), { reload: true });
        this.get('setDisableCheckAppearance')(false);
      } catch(e) {
        console.error(e);
        this.get('setDisableCheckAppearance')(false);
        e.errors.forEach((error) => {
          this.flashMessages.danger(error.detail);
        })
      }
    }
  }).restartable(),
})
