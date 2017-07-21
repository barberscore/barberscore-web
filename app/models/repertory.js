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
  group: DS.belongsTo('group', {async: true}),
  chart: DS.belongsTo('chart', {async: true}),
  permissions: DS.attr(),

  activate: memberAction({path: 'activate', type: 'post'}),
  deactivate: memberAction({path: 'deactivate', type: 'post'}),

  statusOptions: [
    'New',
    'Active',
    'Inactive',
  ],
});
