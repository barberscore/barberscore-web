import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import RSVP from 'rsvp';

export default Service.extend({
  session: service('session'),
  store: service(),

  load() {
    let userId = this.get('session.data.authenticated.profile.barberscore_id');  
    if (!isEmpty(userId)) {
      return this.get('store').findRecord('user', userId).catch(err => {
        alert(err.errors[0].detail)
        return RSVP.resolve()
      }).then((user) => {
        return this.set('user', user);
      });
    } else {
      return RSVP.resolve();
    }
  }
});
