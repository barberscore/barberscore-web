import Ember from 'ember';
import Model from 'ember-data/model';
import DS from 'ember-data';
import {memberAction} from 'ember-api-actions';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  chart: validator('presence', true),
  });

export default Model.extend(Validations, {
  nomen: DS.attr('string'),
  status: DS.attr('repertory-status'),
  chart: DS.belongsTo('chart', {async: true}),
  entity: DS.belongsTo('entity', {async: true}),
  validateRepertory: memberAction({path: 'validate', type: 'post'}),
  invalidate: memberAction({path: 'invalidate', type: 'post'}),
  permissions: DS.attr(),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
  isOld: Ember.computed.not('isNew'),
});
