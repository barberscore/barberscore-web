import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessages: Ember.inject.service(),
  // actions: {
  //   saveChart(chart){
  //     chart.save()
  //     .then(() => {
  //       this.get('flashMessages').success('Saved');
  //       this.transitionToRoute('dashboard.chart-manager.chart', chart);
  //     });
  //   },
  //   cancelChart(){
  //     this.transitionToRoute('dashboard.chart-manager');
  //   },
  //   willTransition() {
  //     this._super(...arguments);
  //     const record = this.get('model');
  //     record.rollbackAttributes();
  //   },
  // },
});
