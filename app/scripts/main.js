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
          'itemHeight': 200,
          'item' : '.item'
      };

      var _settings = $.extend(_defaultSettings, options);
      var items = currentWrapper.find(_defaultSettings.item);

      return this.each(function(){
        console.log('initial');
        //Set Item Size
        items.css({
          'height': _settings.itemHeight,
          'overflow': 'hidden'
        });

        //Scale Container Size
        currentWrapper.css('height', items.outerHeight());
        //Bind Container Resize on Window Resize
        $(window).resize(function(){
          currentWrapper.css('height', items.outerHeight());
        })
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
          $(this).css('bottom', _settings.gap*index*-1);
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
    var fakeEl = $(currentWrapper).children(options.item + ':first-child').clone();
    
    var tempWrapper = $('<div class=tempWrapper></div>')
    
    tempWrapper.css({
      'z-index': 9999,
      'position': 'absolute',
      'width': '100%',
      'bottom': options.gap*-1
    });

    //Wrap all items except first Element
    currentWrapper.children(':not(:first-child)').wrapAll(tempWrapper);
    
    //Reposition items
    $('.tempWrapper').children(options.item).each(function(index){
      $(this).css('bottom', options.gap*index*-1 );
      $(this).css('z-index', $('.tempWrapper').children().length+1-index );
      $(this).attr('data-rel', index);
    })

    fakeEl.css('z-index',1);
    fakeEl.css('bottom',($('.tempWrapper').children().length-1)*options.gap*-1);
    fakeEl.css('position', 'absolute');
    //
    $('.tempWrapper').animate({
      bottom: 0
    }, 300, function(){
      //Remove first item
      currentWrapper.children(options.item).remove();
      //Load New item from bottom
      $('.tempWrapper').append(fakeEl);
      console.log('appe');
      // fakeEl.css('top',$('.tempWrapper').children().length*options.gap-options.gap);
      fakeEl.animate({
        bottom: ($('.tempWrapper').children().length-1)*options.gap*-1
      }, 300, function(){
        //Release
        // $('.tempWrapper').children(options.item).unwrap();
        // console.log($(this));
        $(this).unwrap();
      })
    });
  }
  function slidePrev(currentWrapper, options){
    console.log('go prev');
    //Fake Item
    var fakeEl = $(currentWrapper).children(options.item + ':last-child').clone();
    
    var tempWrapper = $('<div class=tempWrapper></div>')
    
    tempWrapper.css({
      'z-index': 9999,
      'position': 'absolute',
      'width': '100%',
      'bottom': 0
    });

    //Wrap all items except first Element
    currentWrapper.children(':not(:last-child)').wrapAll(tempWrapper);

    fakeEl.css('z-index',$('.tempWrapper').children().length+1);
    fakeEl.css('bottom', options.gap);
    fakeEl.css('position', 'absolute');
    // fakeEl.css('opacity', 0);
    //
    $('.tempWrapper').animate({
      bottom: options.gap*-1
    }, 300, function(){
      //Remove first item
      console.log('ddd');
      currentWrapper.children(options.item).remove();
      //Reposition items
      $('.tempWrapper').children(options.item).each(function(index){
        $(this).css('bottom', options.gap*(index+1)*-1 );
        $(this).css('z-index', $('.tempWrapper').children().length-index );
        $(this).attr('data-rel', index);
      })
      //Load New item from bottom
      $('.tempWrapper').prepend(fakeEl);
      console.log('appe');
      // fakeEl.css('top',$('.tempWrapper').children().length*options.gap-options.gap);
      fakeEl.animate({
        bottom: 0
      });
      $('.tempWrapper').animate({
        bottom: 0
      },300,function(){
        fakeEl.unwrap();
      });

      
    });
  }
})(jQuery);
