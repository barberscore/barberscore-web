import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
   host: window.BarberscoreEmber.API_HOST,
   namespace: window.BarberscoreEmber.API_NAMESPACE,
});
