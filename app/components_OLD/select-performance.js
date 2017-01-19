import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveCursor(cursor) {
      isCollapsed:      this.model.set('cursor', cursor);
      this.model.save()
      .then(() => {
        this.get('router').transitionTo('admin.contest-manager.session.cursor');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
