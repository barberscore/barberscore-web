import Ember from 'ember';

export default Ember.Component.extend({
  riserChoices: Ember.computed(function(){
    return this.get('model.session.convention.risers');
  })
});
