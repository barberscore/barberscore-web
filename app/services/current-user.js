import Ember from 'ember';

const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  load() {
    let userId = this.get('session.data.authenticated.profile.barberscore_id');
    if (!isEmpty(userId)) {
      return this.get('store').findRecord('user', userId).then((user) => {
        this.set('user', user);
      });
    } else {
      return RSVP.resolve();
    }
  }
});
