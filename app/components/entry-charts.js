import Component from '@ember/component';
import { sort } from '@ember/object/computed';

export default Component.extend({
  sortedChartsProperties: [
    'title',
  ],
  sortedCharts: sort(
    'model.groupCharts',
    'sortedChartsProperties'
  ),
});
