import Ember from 'ember';

export default Ember.Controller.extend({
  flashMessage: Ember.get(this, 'flashMessages'),
  hostSortProperties: [
    'nomen:asc',
  ],
  sortedHosts: Ember.computed.sort(
    'model.hosts',
    'hostSortProperties'
  ),
  entityCall: Ember.computed(function() {
    return this.get('store').query('entity', {
      'kind__in': '1,11,21', //TODO hardcoded
      'page_size': 100
    });
  }),
  entityFilter: Ember.computed.filterBy(
    'entityCall',
    'status',
    'Active'
  ),
  entitySortProperties: [
    'lft:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityFilter',
    'entitySortProperties'
  ),
  actions: {
    createHost(){
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
    deleteHost(host){
      host.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch((error) => {
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    },
  }
});
