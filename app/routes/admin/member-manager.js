import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  model: function(params) {
    params.paramMapping = {
      page: "page",
      perPage: "per",
      total_pages: "pages",
    };
    return this.findPaged('person', params);
  },
});
