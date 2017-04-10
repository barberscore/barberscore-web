import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  champion: DS.belongsTo('entry', {async: true}),
  permissions: DS.attr(),
});
