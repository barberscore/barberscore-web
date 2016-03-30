import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  performanceSortProperties: ['slot'],
  sortedPerformances: Ember.computed.sort(
    'model.performances',
    'performanceSortProperties'
  ),
  isRaw: false,
  actions: {
    sortBy: function(performanceSortProperties) {
      this.set('performanceSortProperties', [performanceSortProperties]);
    },
    letsGo() {
      this.toggleProperty('isRaw');
    },
    deletePerformance(performance) {
      performance.destroyRecord();
    },
    saveDate(date, performance) {
      var scheduled = {
        lower: moment(date).utc().format(),
        upper: moment(date).add(10, 'minutes').utc().format(),
        bounds: "[)"
      };
      performance.set('scheduled', scheduled);
      performance.save();
    },
    drawRound(round) {
      const flashMessages = Ember.get(this, 'flashMessages');
      round.draw()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
      round.reload();
    },
    rankRound() {
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.rank()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
      this.model.reload();
    },
    moveTop(performance) {
      const flashMessages = Ember.get(this, 'flashMessages');
      performance.move_top()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      })
      .finally(()=>{
        this.get('model.performances').sortBy('performance.slot');
      });
    },
    moveUp(performance) {
      const flashMessages = Ember.get(this, 'flashMessages');
      performance.move_up()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      })
      .finally(()=>{
        this.model.refresh();
      });
    },
    moveDown(performance) {
      const flashMessages = Ember.get(this, 'flashMessages');
      performance.move_down()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      })
      .finally(()=>{
        this.get('model.performances').sortBy('performance.slot');
      });
    },
    moveBottom(performance) {
      const flashMessages = Ember.get(this, 'flashMessages');
      performance.move_bottom()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
      performance.reload();
    },
    scratch(performance) {
      const flashMessages = Ember.get(this, 'flashMessages');
      performance.scratch()
      .then(() => {
        flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      })
      .finally(()=>{
        this.get('model.performances').removeObject(performance);
      });
    },
  },
});
