import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  flashMessage: Ember.get(this, 'flashMessages'),
  actions: {
    addContestant() {
      let contestant = this.get('store').createRecord('contestant', {
        performer: this.get('model'),
        contest: this.get('contest'),
      });
      contestant.save()
      .then(() => {
        this.set('contest', null);
        this.get('flashMessages').success('Success');
      })
      .catch((error) => {
        contestant.deleteRecord();
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
