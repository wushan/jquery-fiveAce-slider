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
          currentWrapper = $('.currentWrapper'),
          controls = $('<div class=controls></div>');
          controls.append($('<a href=javascript:; class=fa-prev>Prev</a>'),$('<a href=javascript:; class=fa-next>Next</a>'));
      
      var prevBtn = controls.find('.fa-prev'),
          nextBtn = controls.find('.fa-next');
      
          //Init Controller
          Wrapper.prepend(controls);
      var _defaultSettings = {
          'gap' : 30,
          'item' : '.item',
          'var_2' : '2'
      };

      var _settings = $.extend(_defaultSettings, options);
      var items = currentWrapper.find(_defaultSettings.item);

      return this.each(function(){
        console.log('initial');

        //Scale Container Size
        currentWrapper.css('height', items.outerHeight() + items.length*_settings.gap);

        //Bind Controller Event
        prevBtn.on('click', function(){
          slidePrev(currentWrapper, _settings);
        });
        nextBtn.on('click', function(){
          slideNext(currentWrapper, _settings);
        });

        //Init Positioning
        items.each(function(index){
          console.log($(this));
          $(this).css('top', _settings.gap*index);
          $(this).css('z-index', items.length-index );
          $(this).attr('data-rel', index);
        });
      });
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
          $(this).css('bottom', gap*-1*newI );
          $(this).css('z-index', limit.length-newI );
          $(this).attr('data-rel', newI);

        }).wrapAll('<div class=currentWrapper></div>');
        console.log(typeof $(this).nextAll());
      } else {
        console.log('not match');
      }
    });
  }
  function slideNext(currentWrapper, options){
    console.log('go next');
    var tempWrapper = $('<div class=tempWrapper></div>')
    currentWrapper.children(':not(:first-child)').wrapAll(tempWrapper);
    $('.tempWrapper').css({
      'z-index': 9999,
      'position': 'absolute',
      'width': '100%',
      'top': options.gap
    });
    $('.tempWrapper').animate({
      top: options.gap*-1
    }, 500);
  }
  function slidePrev(currentWrapper, options){
    console.log('go prev');
  }
})(jQuery);

$('#fiveAce').fiveAce();
