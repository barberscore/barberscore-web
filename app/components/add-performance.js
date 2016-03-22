import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      const flashMessages = Ember.get(this, 'flashMessages');
      // var organization = this.get('group').organization;
      // console.log(organization);
      var actual = {
        lower: moment().utc().format(),
        upper: moment().add(10, 'minutes').utc().format(),
        bounds: "[)"
      };
      var scheduled = {
        lower: moment().utc().format(),
        upper: moment().add(10, 'minutes').utc().format(),
        bounds: "[)"
      };
      var performance = this.get('store').createRecord('performance', {
        round: this.get('round'),
        performer: this.get('performer'),
        actual: actual,
        scheduled: scheduled,
        slot: 199,
      });
      performance.save()
      .then(() => {
        // flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    searchPerformer(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, 'performer', resolve, reject, 600);
      });
    },
  },
  _performSearch(term, model, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query(model, {'name__icontains': term})
      .then(data => resolve(data), reject);
  }
});
