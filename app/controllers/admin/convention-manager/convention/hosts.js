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
      'status': 10, //TODO hardcoded
      'page_size': 100
    });
  }),
  entitySortProperties: [
    'kindSort:asc',
    'name:asc',
  ],
  entityOptions: Ember.computed.sort(
    'entityCall',
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
      .catch(() => {
        host.deleteRecord();
        this.get('flashMessages').danger('Error');
      });
    },
    deleteHost(host){
      host.destroyRecord()
      .then(() => {
        this.get('flashMessages').warning('Deleted');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
  }
});