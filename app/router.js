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
    this.route('assignments', {
      path: 'assignment'
    }, function () {
      this.route('assignment', {
        path: ':assignment_id'
      }, function() {
        this.route('details', {
          path: 'details'
        });
        this.route('colleagues', {
          path: 'colleagues'
        });
        this.route('convention', {
          path: 'convention'
        });
        this.route('awards', {
          path: 'awards'
        }, function () {
          this.route('award', {
            path: ':award_id'
          });
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
        }, function () {});
      });
    });
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
              }, function () {});
          });
        });
      });
    });
    this.route('scoring-manager', {
      path: 'scoring-manager'
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
        this.route('competitors', {
          path: 'competitors'
        }, function () {
          this.route('competitor', {
            path: ':competitor_id'
          });
        });
        this.route('appearances', {
          path: 'appearances'
        }, function () {
          this.route('appearance', {
            path: ':appearance_id'
          });
        });
        this.route('contests', {
          path: 'contests'
        }, function () {
          this.route('contest', {
            path: ':contest_id'
          });
        });
        this.route('advancers', {
          path: 'advancers'
        }, function () {});
        this.route('finishers', {
          path: 'finishers'
        }, function () {});
        this.route('standings', {
          path: 'standings'
        }, function () {});
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
        this.route('members', {path: 'members'}, function () {});
        this.route('repertories', {path: 'repertories'}, function () {});
      });
    });
    this.route('session-manager', {
      path: 'session-manager'
    }, function () {
      this.route('session', {
        path: ':session_id'
      }, function () {
        this.route('details', {
          path: 'details'
        });
        this.route('convention', {
          path: 'convention'
        });
        this.route('awards', {
          path: 'awards'
        }, function () {
          this.route('award', {
            path: ':award_id'
          });
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
        }, function () {});
      });
    });
  });
  this.route('about');
  this.route('tutorials');
  this.route('faq');
  this.route('404', {
    path: '/*wildcard'
  });
});

export default Router;
