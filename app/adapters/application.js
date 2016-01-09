import DS from 'ember-data';
import ENV from '../config/environment';

console.log(ENV.APP.API_HOST);

export default DS.JSONAPIAdapter.extend({
});
