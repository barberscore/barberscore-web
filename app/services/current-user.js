import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  load() {
    if (this.get('session.isAuthenticated')) {
      return this.get('store').find('user', 'me').then((user) => {
        this.set('user', user);
      });
    }
  }
});
