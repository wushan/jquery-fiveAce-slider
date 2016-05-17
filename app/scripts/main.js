//Browserify
//Require
//Expose Jquery Globally.
window.$ = window.jQuery = require('jquery');

// const slick = require('./slick');

(function($) {
  

  $.fn.fiveAce = function(method) {
        // currentWrapper.addClass('currentWrapper');
    if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
    } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }
  };

  //Methods
  var methods = {
    init : function( options ) {
      var Wrapper = this,
          currentWrapper = $('.currentWrapper');
      var _defaultSettings = {
          'gap' : 30,
          'item' : '.item',
          'var_2' : '2'
      };
      var _settings = $.extend(_defaultSettings, options);
      var items = currentWrapper.find(_defaultSettings.item);

      return this.each(function(){
        console.log('initial');
        console.log(currentWrapper.find(_settings.item));

        //Positioning
        items.each(function(index){
          console.log($(this));
          $(this).css('bottom', _settings.gap*-1*index);
          $(this).css('z-index', items.length-index );
          $(this).attr('data-rel', index);
        });

        items.on('click', function(){
          positioning(currentWrapper, $(this), $(this).attr('data-rel'), _settings.gap );
        });

      });
    },
    next: function() {

    },
    prev: function() {

    }
  };

  //Private Function
  function positioning(wrapper, obj, objIndex, gap) {
    //Positioning
    // obj.css('z-index', 10);
    wrapper.children().each(function(index){
      if ($(this).attr('data-rel') === objIndex) {
        //Remove previous
        // $(this).nextAll().wrapAll('<div class=currentWrapper></div>');
        var limit = $(this).prev().nextAll();
        $(this).prev().nextAll().each(function(newI){

          //Reposition
          $(this).css('bottom', gap*-1*newI);
          $(this).css('z-index', limit.length-newI );
          $(this).attr('data-rel', newI);

        }).wrapAll('<div class=currentWrapper></div>');
        console.log(typeof $(this).nextAll());
      } else {
        console.log('not match');
      }
    });
  }

})(jQuery);

$('#fiveAce').fiveAce();
