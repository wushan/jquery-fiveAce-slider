//Browserify
//Require
//Expose Jquery Globally.
window.$ = window.jQuery = require('jquery');

// const slick = require('./slick');

(function($) {
  var Wrapper = this,
      currentWrapper = $('.currentWrapper');
      
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
      var _defaultSettings = {
          'gap' : 30,
          'item' : '.item',
          'var_2' : '2'
      };
      var _settings = $.extend(_defaultSettings, options);
      var items = currentWrapper.find(_defaultSettings.item);

      return this.each(function(){
        console.log('initial');
        console.log(currentWrapper.find(_defaultSettings.item));

        //Positioning
        items.each(function(index){
          console.log($(this));
          $(this).css('bottom', _defaultSettings.gap*-1*index);
          $(this).css('z-index', items.length-index )
        });

      });
    },
    positioning: function(){
      return this.each(function(){
        alert("Hello");
      });
    },
    next: function() {

    },
    prev: function() {

    }
  };

})(jQuery);

$('#fiveAce').fiveAce();
