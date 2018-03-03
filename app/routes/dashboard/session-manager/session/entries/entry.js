import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
// import { scheduleOnce } from '@ember/runloop';

export default Route.extend(AuthenticatedRouteMixin, {
  // actions: {
  //     didTransition() {
  //       scheduleOnce('afterRender', this, function(){
  //         let scrollTop = window.pageYOffset + document.getElementById('entry-detail').getBoundingClientRect().top
  //         window.scrollTo(0, scrollTop);
  //       });
  //     }
  //   }
})
