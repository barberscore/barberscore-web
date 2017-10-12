import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  flashMessages: service(),
  actions: {
    saveChart(chart){
      chart.save()
      .then(() => {
        this.get('flashMessages').success('Saved');
        this.transitionToRoute('dashboard.chart-manager.chart', chart);
      });
    },
    cancelChart(){
      this.transitionToRoute('dashboard.chart-manager');
    },
    willTransition() {
      this._super(...arguments);
      const record = this.get('model');
      record.rollbackAttributes();
    },
  },
});
