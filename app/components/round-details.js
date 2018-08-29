import Component from '@ember/component';
import { not } from '@ember/object/computed';

export default Component.extend({
  isDisabled: not(
    'model.permissions.write',
  ),
});
