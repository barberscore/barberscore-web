import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('about');
  this.route('faq');

  this.route('admin', { path: '/admin/' }, function() {
    this.route('convention', { path: '/convention/:convention_id' }, function() {
      this.route('session', { path: '/session/:session_id' }, function() {
        this.route('sa', { path: '/sa'});
        this.route('cursor', { path: '/cursor/:performance_id'});
        this.route('announcement', { path: '/announcement'});
        this.route('performer', { path: '/performer/:performer_id'}, function() {
          this.route('awards', { path: '/awards/'}, function() {
          });
        });
        this.route('judge', { path: '/judge/:judge_id'}, function() {
        });
        this.route('assistant', { path: '/assistant/:assistant_id'}, function() {
        });
        this.route('round', { path: '/score/:round_id'}, function() {
          this.route('performance', { path: '/performance/:performance_id'}, function() {
            this.route('variance', { path: '/variance'}, function() {
            });
          });
        });
        this.route('contest', { path: '/contest/:contest_id'}, function() {
          this.route('oss', { path: '/oss'});
          this.route('performance', { path: 'performance/:performance_id'}, function() {
          });
        });
      });
    });
  });

  this.route('conventions', { path: '/convention/' }, function() {
    this.route('convention', { path: '/:convention_id' }, function() {
      this.route('session', { path: '/:session_id' }, function() {
        this.route('judge', { path: '/judge/:judge_id'}, function() {
        });
        this.route('performer', { path: '/performer/:performer_id'}, function() {
          this.route('person', { path: '/:person_id'}, function () {
          });
        });
        this.route('round', { path: '/round/:round_id'}, function() {
        });
        this.route('contest', { path: '/contest/:contest_id'}, function() {
          this.route('performance', { path: '/:performance_id'}, function() {
          });
        });
      });
    });
  });

  this.route('groups', { path: '/group/' }, function() {
    this.route('group', { path: '/:group_id' }, function () {
    });
  });
  this.route('organizations', { path: '/organization/' }, function() {
    this.route('organization', { path: '/:organization_id' }, function() {
    });
  });
  this.route('persons', { path: '/person/' }, function() {
    this.route('person', { path: '/:person_id' }, function() {
    });
  });

  this.route('404', { path: '/*wildcard' });
});

export default Router;
