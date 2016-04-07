import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'table',
  classNames: ['table'],
  numberOfSongs: 2,

  /**
   [ { judge: <judge object>,
       scores: [ <score 1>, <score 2> ]
     },
     { judge: <judge object>,
       scores: [ <score 1>, <score 2> ]
     }
   ]
  **/
  data: Ember.computed('judges.[]', 'performance', function(){
    let judges = this.get('judges');
    let performance = this.get('performance');

    let result =  judges.map(function(judge) {
      return {
        judge,
        scores: judge.get('scores').filterBy('song.performance.id', performance.get('id'))
      };
    });

    return result;
  }),
});
