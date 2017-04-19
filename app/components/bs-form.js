import Ember from 'ember';
import BsForm from 'ember-bootstrap/components/bs-form';

const { computed } = Ember;

export default BsForm.extend({
  hasValidator: computed.notEmpty('model.validate'),

  validate(/*model*/) {
    return new Ember.RSVP.Promise();
  }
});
