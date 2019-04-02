import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('dashboard', {
    path: 'dashboard'
  }, function () {
    this.route('conventions', {
      path: 'convention'
    }, function () {
      this.route('convention', {
        path: ':convention_id'
      }, function() {
        this.route('details', {
          path: 'details'
        });
        this.route('assignments', {
          path: 'assignments'
        });
        this.route('sessions', {
          path: 'sessions'
        }, function() {
          this.route('session', {
            path: ':session_id'
            }, function() {
              this.route('details', {
                path: 'details'
              });
              this.route('contests', {
                path: 'contests'
              }, function () {
                this.route('contest', {
                  path: ':contest_id'
                });
              });
              this.route('entries', {
                path: 'entries'
              }, function () {
                this.route('entry', {
                  path: ':entry_id'
                });
              });
              this.route('draw', {
                path: 'draw'
              }, function () {
              });
              this.route('reports', {
                path: 'reports'
              });
              this.route('rounds', {
                path: 'rounds'
              }, function () {
                this.route('round', {
                  path: ':round_id'
                }, function () {
                  this.route('details', {
                    path: 'details'
                  });
                  this.route('panelists', {
                    path: 'panelists'
                  }, function () {
                    this.route('panelist', {
                      path: ':panelist_id'
                    });
                  });
                  this.route('appearances', {
                    path: 'appearances'
                  }, function () {
                    this.route('appearance', {
                      path: ':appearance_id'
                    });
                  });
                  this.route('standings', {
                    path: 'standings'
                  }, function() {
                  });
                  this.route('draw', {
                    path: 'draw'
                  });
                  this.route('outcomes', {
                    path: 'outcomes'
                  }, function () {
                    this.route('outcome', {
                      path: ':outcome_id'
                    });
                  });
                  this.route('reports', {
                    path: 'reports'
                  });
                });
              });
          });
        });
      });
    });
    this.route('groups', {
      path: 'group'
    }, function () {
      this.route('group', {
        path: ':group_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
        this.route('entries', {
          path: 'entries'
        }, function () {
          this.route('entry', {
            path: ':entry_id'
          });
        });
        this.route('officers', {path: 'officers'}, function () {});
        this.route('members', {path: 'members'}, function () {});
        this.route('repertories', {path: 'repertories'}, function () {});
        this.route('children', {path: 'children'}, function () {});
      });
    });
    this.route('assignments', {path: 'assignment'}, function(){});
    this.route('members', {path: 'member'}, function(){});
  });
  this.route('about');
  this.route('tutorials');
  this.route('faq');
  this.route('404', {
    path: '/*wildcard'
  });
});

export default Router;
