import * as $ from 'jquery';
import { stopDefault } from './stopdefault';

// HOTKEYS
let keydblck = 0;

$(function() {

  let keys = {
    32: // Space Bar
    function () {
      $('#container').scrollTop($('#container').scrollTop() + 24);
    },
    33: // PageUp
    function() {
      $('#container').scrollTop($('#container').scrollTop()-$('#container').height());
    },
    34: // PageDown
    function() {
      $('#container').scrollTop($('#container').scrollTop()+$('#container').height());
    },
    37: // Left
    function() {

    },
    38: // Up
    function() {
      $('#container').scrollTop($('#container').scrollTop()-24);
    },
    39: // Right
    function() {

    },
    40: // Down
    function() {
      $('#container').scrollTop($('#container').scrollTop()+24);
    },
    75: // K - previous article
    function() {
      $($('#post-list>li').get().reverse()).each(function() {
        if ($(this).position().top-$('#content').position().top<$('#container').scrollTop()) {
          if ($(this).length)
            $('#container').scrollTop($(this).position().top-$('#content').position().top);
          return false;
        }
      });
    },
    74: // J - next article
    function() {
      $('#post-list>li').each(function() {
        if ($(this).position().top-$('#content').position().top>=$('#container').scrollTop()) {
          if ($(this).next().length)
            $('#container').scrollTop($(this).next().position().top-$('#content').position().top);
          return false;
        }
      });
    },
  };

  let shiftkeys = {
    // FUN
    77: // M
    function() {
      $('#thematrix').toggle();
    }
  };

  let ctrlkeys = {
    //MENU ITEMS
    71: // G
    function() {
      location.href = $('a[title="G"]').attr('href');
    },
    72: // H
    function() {
      location.href = $('a[title="H"]').attr('href');
    },
    83: // S
    function() {
      location.href = $('a[title="S"]').attr('href');
    },
    65: // A
    function() {
      location.href = $('a[title="A"]').attr('href');
    },
    66: // B
    function() {
      location.href = $('a[title="B"]').attr('href');
    },
    76: // L
    function() {
      location.href = $('a[title="L"]').attr('href');
    },
    77: // M
    function() {
      $('#overlay').toggle();
    },
    //DEBUGGING
    73: // I
    function() {
      $('#debug').toggle();
    },
    89: // Y
    function() {
      $('#aligngrid').toggle().css('background', 'url(../images/aligngrid.png)');
    }
  };

  let altkeys = { };


  $(document).keydown(function(e) {

    $('#debug .keydown').html(e.which+'/'+e.keyCode);

    // modkey logic.
    // improve logic for different combos.
    let keys;
    switch (true) {
      case (e.shiftKey): // 16
        keys = shiftkeys;
        break;
      case (e.ctrlKey): // 17
        keys = ctrlkeys;
        break;
      case (e.altKey): // 18
        keys = altkeys;
        break;
      default:
        break;
    }

    // if (!(e.which==16 || e.which==17 || e.which==18)) { ; }

    let skipinput = false;
    $(':input').each(function(i) {
      if ($(this)[0]===$(':focus')[0]) skipinput = true;
    });

    if ($.isFunction(keys[e.which]) && !skipinput) {
      keys[e.which]();
      return stopDefault(e);
    }
    return true;
  });

});
