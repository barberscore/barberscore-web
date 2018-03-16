import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { denodeify } from 'rsvp'

export default Controller.extend({
  searchPerson: task(function* (term){
    yield timeout(600);
    let func = denodeify(this.get('algolia').search.bind(this.get('algolia')))
    let res = yield func({ indexName: 'Person', query: term})
    return res.hits
  }),
});
