import { defineProperty, computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import BsFormElement from 'ember-bootstrap/components/bs-form/element';

export default BsFormElement.extend({
  setupValidations() {
    let propertyErrors = `model.errors.${this.get('property')}`;

    defineProperty(this, 'errors', computed(propertyErrors, () => {
      let errors = this.get(propertyErrors);
      let hasErrors = isPresent(errors);
      let errorMessages = null;

      this.set('showValidation', hasErrors);

      if (hasErrors) {
        errorMessages = errors.map(function(error) {
          return error.message;
        });
      }

      return errorMessages;
    }));

    defineProperty(this, 'validation', computed('errors', () => {
      return isPresent(this.get('errors')) ? 'error' : null;
    }));
  }
});