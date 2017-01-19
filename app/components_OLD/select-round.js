import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveCurrent(current) {
      isCollapsed:      this.model.set('current', current);
      this.model.save()
      .then(() => {
        // this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
