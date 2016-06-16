import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  status: attr('chart-status'),
  title: attr('string'),
  arranger: attr('string'),
  composer: attr('string'),
  lyricist: attr('string'),
  submissions: hasMany('submissions', {async: true}),
  is_generic: attr('boolean'),
  is_parody: attr('boolean'),
  is_medley: attr('boolean'),
});
