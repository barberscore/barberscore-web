import Ember from 'ember';

export default Ember.Controller.extend({
  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'kind__in': '1,11,21',
      'page_size': 100
    });
  }),
  entityFilter: Ember.computed.filterBy(
    'entityCall',
    'status',
    'Active'
  ),
  sortProperties: ['lft:asc',],
  entityOptions: Ember.computed.sort(
    'entityFilter',
    'sortProperties'
  ),
  actions: {
    addHost(){
      let host = this.get('store').createRecord('host', {
        convention: this.get('model'),
        entity: this.get('entity'),
      });
      host.save()
      .then(() => {
        this.set('entity', null);
        this.get('flashMessages').success('Success');
      })
      .catch((error) => {
        host.deleteRecord();
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
