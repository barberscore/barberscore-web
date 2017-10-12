import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  perPage: 20,
  queryParams: {
    kind: {
      refreshModel: true
    }
  },
  model(params) {
    params.paramMapping = {
      page: "page",
      perPage: "page_size",
      total_pages: "pages"
    };
    return this.findPaged('office', params);
  },
});
