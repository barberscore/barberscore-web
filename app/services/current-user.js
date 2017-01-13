import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  load() {
    if (this.get('session.isAuthenticated')) {
      return this.get('store').query('user', { username: 'me' }).then((users) => {
        return users.get('firstObject');
      }).then((user) => {
        this.set('user', user);
      });
    }
  }
});
