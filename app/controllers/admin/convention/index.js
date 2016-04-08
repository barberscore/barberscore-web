import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    // startConvention() {
    //   this.model.start()
    //   .then(response => {
    //     this.store.pushPayload('convention', response);
    //   })
    //   .catch(response => {
    //     console.log(response);
    //   });
    // },
    // finishConvention() {
    //   this.model.finish()
    //   .then(response => {
    //     this.store.pushPayload('convention', response);
    //   })
    //   .catch(response => {
    //     console.log(response);
    //   });
    // },
    saveDate(start, end) {
      this.model.set('date.lower', start);
      this.model.set('date.upper', end);
      this.model.save();
    }
  },
  sessionSortProperties: ['kind:asc',],
  sortedSessions: Ember.computed.sort(
    'model.sessions',
    'sessionSortProperties'
  ),
});
