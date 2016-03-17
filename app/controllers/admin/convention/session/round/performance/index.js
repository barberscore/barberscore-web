import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  lowerMoment: Ember.computed(
    function() {
      console.log(this.model);
      return moment(this.model.scheduled.lower);
    }
  ),
});
