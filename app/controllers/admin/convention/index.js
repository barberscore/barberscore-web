import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    startConvention() {
      this.model.start()
      .then(response => {
        this.store.pushPayload('convention', response);
      })
      .catch(response => {
        console.log(response);
      });
    },
    finishConvention() {
      this.model.finish();
    },
    saveDate(start, end) {
      var date = {
        lower: start,
        upper: end,
        bounds: "[)"
      };
      this.model.set('date', date);
      this.model.save();
    }
  },
  sessionSortProperties: ['kind:asc',],
  sortedSessions: Ember.computed.sort(
    'model.sessions',
    'sessionSortProperties'
  ),
});
