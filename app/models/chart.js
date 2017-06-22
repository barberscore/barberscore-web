import Model from 'ember-data/model';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', true),
  composers: validator('presence', true),
  lyricists: validator('presence', true),
  arrangers: validator('presence', true),
  });

export default Model.extend(Validations, {
  nomen: DS.attr('string'),
  status: DS.attr('chart-status'),
  title: DS.attr('string'),
  arrangers: DS.attr('string'),
  composers: DS.attr('string'),
  lyricists: DS.attr('string'),
  holders: DS.attr('string', {defaultValue:''}),
  repertories: DS.hasMany('repertory', {async: true}),
  songs: DS.hasMany('song', {async: true}),
  permissions: DS.attr(),
});
