//Browserify
//Require
//Expose Jquery Globally.
// window.$ = window.jQuery = require('jquery');

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
  
  function slideNext(currentWrapper, options){
    console.log('go next');
    //Fake Item
    var fakeEl = $(currentWrapper).children('.item:first-child').clone();
    
    var tempWrapper = $('<div class=tempWrapper></div>')
    
    //Wrap all items except first Element
    currentWrapper.children(':not(:first-child)').wrapAll(tempWrapper);

    $('.tempWrapper').css({
      'z-index': 9999,
      'position': 'relative',
      'width': '100%',
      'top': 0
    });
    //Remove first item
      currentWrapper.children('.item').remove();
      $('.tempWrapper').children('.item').each(function(index){
        $(this).css('top', options.gap*index );
        $(this).css('z-index', $('.tempWrapper').children().length-index );
        $(this).attr('data-rel', index);
      })

      fakeEl.css('z-index',0);
      fakeEl.css('top',$('.tempWrapper').children().length*options.gap+options.gap);
      fakeEl.css('opacity',0);
    //
    $('.tempWrapper').animate({
      top: options.gap*-1/3
    }, 300, function(){
      
      //Load New item from bottom
      $('.tempWrapper').append(fakeEl);
      // fakeEl.css('top',$('.tempWrapper').children().length*options.gap-options.gap);
      fakeEl.animate({
        top: $('.tempWrapper').children().length*options.gap-options.gap,
        opacity: 1
      }, 300)
      //Release
      $('.tempWrapper').children('.item').unwrap();
    });
  
  }
  function slidePrev(currentWrapper, options){
    console.log('go prev');
    //Fake Item
    var fakeEl = $(currentWrapper).children('.item:first-child').clone();
    var tempWrapper = $('<div class=tempWrapper></div>')
    
    //Wrap all items except first Element
    currentWrapper.children(':not(:last-child)').wrapAll(tempWrapper);

    $('.tempWrapper').css({
      'z-index': 9999,
      'position': 'relative',
      'width': '100%',
      'top': 0
    });
    //Remove last item
      currentWrapper.children('.item').remove();
      $('.tempWrapper').children('.item').each(function(index){
        $(this).css('top', options.gap*index+options.gap );
        $(this).css('z-index', $('.tempWrapper').children().length-index);
        $(this).attr('data-rel', index);
      })

      fakeEl.css('z-index', 6);
      fakeEl.css('top', options.gap*-1);
      fakeEl.css('opacity', 0);

    //
    $('.tempWrapper').animate({
      top: options.gap
    }, 300, function(){
      
      //Load New item from bottom
      $('.tempWrapper').prepend(fakeEl);
      // fakeEl.css('top',$('.tempWrapper').children().length*options.gap-options.gap);
      fakeEl.animate({
        top: 0,
        opacity: 1
      }, 300)
      //Release
      $('.tempWrapper').children('.item').unwrap();
    });
  }
})(jQuery);
