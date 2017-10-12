import { notEmpty } from '@ember/object/computed';
import { Promise as EmberPromise } from 'rsvp';
import BsForm from 'ember-bootstrap/components/bs-form';

export default BsForm.extend({
  hasValidator: notEmpty('model.validate'),

  validate(/*model*/) {
    return new EmberPromise();
  }
});
