import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';


export default Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  perPage: 20,
  model(params) {
    params = {
      'status__gte': 0
    }
    params.paramMapping = {
      page: "page",
      perPage: "page_size",
      total_pages: "pages"
    };
    return this.findPaged('chart', params);
  },
});
