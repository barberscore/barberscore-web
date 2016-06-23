import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('admin', { path: '/admin/' }, function() {
    this.route('conventions', { path: '/convention/' }, function() {
    });
    this.route('convention', { path: 'convention/:convention_id' }, function() {
      this.route('session', { path: '/session/:session_id' }, function() {
        this.route('judges', { path: '/judge'});
        this.route('contests', { path: '/contest'});
        this.route('performers', { path: '/performer'});
        this.route('rounds', { path: '/round'});
        this.route('reports', { path: '/report'});
        this.route('sa', { path: '/sa'});
        this.route('announcement', { path: '/announcement'});
        this.route('oss', { path: '/oss'});
        this.route('current', { path: '/current/:performance_id'});
        this.route('cursor', { path: '/cursor/'});
        this.route('performer', { path: '/performer/:performer_id'});
        this.route('csa', { path: '/csa/:performer_id'});
        this.route('round', { path: '/round/:round_id'});
        this.route('judge', { path: '/judge/:judge_id'}, function() {
        });
        this.route('round', { path: '/round/:round_id'}, function() {
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
    this.route('awards', { path: '/award/'}, function() {
      this.route('award', { path: '/:award_id'}, function() {
      });
    });
    this.route('charts', { path: '/chart/'}, function() {
      this.route('chart', { path: '/:chart_id'}, function() {
      });
    });
    this.route('chapters', { path: '/chapter/'}, function() {
      this.route('chapter', { path: '/:chapter_id'}, function() {
      });
    });
    this.route('groups', { path: '/group/'}, function() {
      this.route('group', { path: '/:group_id'}, function() {
          this.route('role', { path: '/role/:role_id'}, function() {
          });
      });
    });
    this.route('organizations', { path: '/organization/'}, function() {
      this.route('organization', { path: '/:organization_id'}, function() {
      });
    });
    this.route('persons', { path: '/person/'}, function() {
      this.route('person', { path: '/:person_id'}, function() {
      });
    });
    this.route('venues', { path: '/venue/'}, function() {
      this.route('venue', { path: '/:venue_id'}, function() {
      });
    });
  });
  this.route('public', { path: '/' }, function() {
    this.route('login');
    this.route('about');
    this.route('faq');
    this.route('conventions', { path: '/convention/' }, function() {
    });
    this.route('convention', { path: '/convention/:convention_id' }, function() {
      this.route('oss', { path: '/oss/:session_id'}, function() {
      });
      this.route('session', { path: '/session/:session_id' }, function() {
        this.route('judge', { path: '/judge/:judge_id'}, function() {
        });
        this.route('performer', { path: '/performer/:performer_id'}, function() {
        });
        this.route('round', { path: '/round/:round_id'}, function() {
        });
        this.route('current', { path: '/current/:performance_id'}, function() {
        });
        this.route('contest', { path: '/contest/:contest_id'}, function() {
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
  });
  this.route('404', { path: '/*wildcard' });
});

export default Router;
