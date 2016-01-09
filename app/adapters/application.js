import DS from 'ember-data';
import ENV from '../config/environment';

console.log(ENV.APP.API_HOST);
console.log(ENV.APP.API_NAMESPACE);

export default DS.JSONAPIAdapter.extend({
  host: ENV.APP.API_HOST,
  namespace: ENV.APP.API_NAMESPACE,
});
