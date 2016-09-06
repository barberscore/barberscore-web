import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';
const { isEmpty } = Ember;

export default BaseAuthorizer.extend({
  authorize: function(sessionData, block) {
    const tokenAttributeName = 'jwt';
    const userToken = sessionData[tokenAttributeName];
    if (!isEmpty(userToken)) {

      // Set request headers here.
      // userToken is the jwt from Auth0.

      // Example usage
      block('Authorization', `JWT ${userToken}`);

      // Remember to update your session service's authorize method (http://ember-simple-auth.com/api/classes/SessionService.html#method_authorize)
      // this.get('session').authorize('authorizer:my-cool-authenticator', (headerName, headerValue) => {
      //   ...
      // });

      // Alternatively if using Ember Data, update your use DataAdapterMixing provided by Ember Simple Auth (http://ember-simple-auth.com/api/classes/DataAdapterMixin.html)
      //
      // import DS from 'ember-data';
      // import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

      // export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
      //   authorizer: 'authorizer:my-cool-authenticator'
      // });
    }
  }
});
