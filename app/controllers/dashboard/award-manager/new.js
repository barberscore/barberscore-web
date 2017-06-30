import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  actions: {
    saveAward(award){
      award.save()
      .then(() => {
        this.get('flashMessages').success('Saved');
        this.transitionToRoute('dashboard.award-manager.award', award);
      });
    },
    cancelAward(){
      this.transitionToRoute('dashboard.award-manager');
    },
    willTransition() {
      this._super(...arguments);
      const record = this.get('model');
      record.rollbackAttributes();
    },
  },
});
