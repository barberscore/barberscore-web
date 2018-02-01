import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember'

export default Route.extend(AuthenticatedRouteMixin, {
  actions: {
      didTransition() {
        Ember.run.scheduleOnce('afterRender', this, function(){
          let scrollTop = window.pageYOffset + document.getElementById('entry-detail').getBoundingClientRect().top
          window.scrollTo(0, scrollTop);
        });
      }
    }
})