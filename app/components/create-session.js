import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  openModal: false,
  flashMessage: Ember.get(this, 'flashMessages'),
  awardCall: Ember.computed(
    'model.convention.id', function() {
      return this.get('store').query('award', {
        'convention': this.get('model.convention.id'),
        'page_size': 100
      });
    }),
  awardFilter: Ember.computed(
    'awardCall',
    'model.kind',
    function() {
      return this.get('awardCall').filterBy('kind', this.get('model.kind'));
    }
  ),
  awardSortProperties: [
    'entityKindSort',
    'is_qualifier',
    'is_primary:desc',
    'ageSort',
    'name',
  ],
  awardOptions: Ember.computed.sort(
    'awardFilter',
    'awardSortProperties'
  ),
  actions: {
    saveSession() {
      this.get('model').save()
      .then((response) => {
        // TODO More hackery
        this.get('awards').forEach(function(award) {
          let contest = response.get('contests').createRecord({
            award: award
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
