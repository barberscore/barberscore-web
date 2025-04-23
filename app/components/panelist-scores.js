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
  scoresCall: [],
  panelistId: null,
  appearanceId: null,
  sortedScoresProperties: [
    'songNum',
  ],
  /* scoresCall: computed(
    'model',
    'appearance',
    {
      get() {
        if (this._scoresCall)
          return this._scoresCall;
        return this.store.query('score', {filter: {
          'panelist': this.get('model.id'),
          'song__appearance': this.get('appearance.id'),
        }}).then(function (scoresCall) {
          let scores = []
          for (var i=scoresCall.length - 1; i>=0; i--) {
            let score = scoresCall[i];
            scores.push(score);
          }
          console.log("Scores fetched");
          console.log(scores);
          return scores;
        });
      },

      set(key, value) {
        return this._scoresCall = value;
      }
    }
  ), */
  didRender: function() {
    console.log("Did render");
    const that = this;
    const panelistId = this.get('model.id');
    const appearanceId = this.get('appearance.id');
    if (this.panelistId == panelistId & this.appearanceId == appearanceId)
      return;
    this.store.query('score', {filter: {
          'panelist': this.get('model.id'),
          'song__appearance': this.get('appearance.id'),
    }}).then(function (scoresCall) {
      let scores = [];
      for (var i=scoresCall.length - 1; i>=0; i--) {
        let score = scoresCall[i];
        scores.push(score);
      }
      scores.sort((a, b) => a.songNum - b.songNum);
      that.set('scoresCall', scores);
      that.set('panelistId', panelistId);
      that.set('appearanceId', appearanceId);
    });
  },
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
        this.onScoreChange();
        this.store.findRecord('appearance', this.get('appearance.id'), { reload: true });
      } catch(e) {
        e.errors.forEach((error) => {
          this.flashMessages.danger(error.detail);
        })
      }
    }
  }).restartable(),
});
