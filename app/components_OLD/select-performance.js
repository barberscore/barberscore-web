import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveCursor(cursor) {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.set('cursor', cursor);
      this.model.save()
      .then(() => {
        this.get('router').transitionTo('admin.contest-manager.session.cursor');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  }
});
