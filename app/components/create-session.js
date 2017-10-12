import { sort } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  openModal: false,
  flashMessages: service(),
  awardCall: computed(
    'model.convention.id',
    function () {
      return this.get('store').query('award', {
        'convention': this.get('model.convention.id'),
        'page_size': 100
      });
    }),
  awardFilter: computed(
    'awardCall',
    'model.kind',
    function () {
      return this.get('awardCall').filterBy('kind', this.get('model.kind'));
    }
  ),
  awardSortProperties: [
    'organizationKindSort',
    'isQualifier',
    'isPrimary:desc',
    'ageSort',
    'name',
  ],
  awardOptions: sort(
    'awardFilter',
    'awardSortProperties'
  ),
  actions: {
    saveSession() {
      this.get('model').save()
        .then((response) => {
          // TODO More hackery
          this.get('awards').forEach(function (award) {
            let contest = response.get('contests').createRecord({
              award: award,
              contestants: [],
            });
            contest.save();
          });
          this.get('flashMessages').success('Success');
          this.set('openModal', false);
        });
    },
    clearSession() {
      this.get('model').deleteRecord();
      this.set('openModal', false);
    },
  }
});
