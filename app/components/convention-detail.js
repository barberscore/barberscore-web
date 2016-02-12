import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  isDisabled: true,
  actions: {
    editConvention: function() {
      this.set('isDisabled', false);
    },
    saveRecord: function() {
      this.get('model').save();
    },
    searchPerson(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    }
  },
  statusChoices: [
    'New',
    'Started',
    'Finished',
    'Final'
  ],
  kindChoices: [
    'International',
    'Midwinter',
    'Fall',
    'Spring',
    'Video',
  ],
  yearChoices: [
    2016,
    2017,
    2018,
  ],
  timezoneChoices: [
    'US/Eastern',
    'US/Central',
    'US/Mountain',
    'US/Pacific',
  ],
  divisionChoices: [
    'Division I',
    'Division II',
    'Division III',
    'Division IV',
    'Division V',
    'Arizona Division',
    'NE/NW Division',
    'SE/SW Division',
    'Division One/Packerland Division',
    'Northern Plains Division',
    '10,000 Lakes and Southwest Division',
    'Atlantic Division',
    'Northern and Western Division',
    'Southern Division',
    'Sunrise Division',
  ],
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('person', {'name__icontains': term})
      .then(data => resolve(data), reject);
  }
});
