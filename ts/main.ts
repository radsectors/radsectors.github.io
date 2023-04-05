import * as $ from 'jquery';
import { scrollbar } from './scrollbar';
import { theMatrix } from './matrix';

$(() => {

  console.log('initing');

  // title sizing
  if ($('#page_title').text()) {
    if ($('#page_title').text().length % 2) {
      $('#page_title').append('&nbsp;');
    }
  }

  // prevent normal body scrolling
  $(document).scrollTop(0);
  $(document).scroll(function() { $(this).scrollTop(0); });

  // remove br tags from <code>
  // maybe rethink this... or handle it better in php?
  $('code').children().remove('br');

  imageSize();
  $('body').mousemove(function(e) {
    imageSize();
  });

  new scrollbar($('#container'));
  // autogrow('textarea');
  new theMatrix();

  // modal events...
  // TODO: put these and the functions in general.js together into an object.
  $('#overlay').click(function() {
    // modalClose();
  });
  $('.center').click(function() { return false; });
});


// image sizing
function imageSize() {
  $('#grid img').each(function() {
    // var newdiv = $('<div style="display:inline-block;"></div>');
    // $(this).after(newdiv);
    // newdiv.append($(this));

    let height = Math.ceil($(this).height() / 24) * 24, // rounded height
        width = Math.ceil($(this).width() / 24) * 24; // rounded width
    let prefdHeight = Math.min(Math.max(height, 0), 504), // constrained height
        prefdWidth = Math.min(Math.max(width, 0), 924); // constrained width

    $(this).height(prefdHeight);
  });
}

// detached element
let detached;

let hasher = function(e) {
  if (window.location.hash!='') {
    $('#detached').append($('#content').children().addClass('last').detach());
    switch (window.location.hash)
    {
      case "#search":
        $('#content').append($('.widget_search').detach());
        break;
      case "#archive":
        $('#content').append($('.widget_archive').detach());
        break;
      case "#blogroll":
        $('#content').append($('.widget_links').detach());
        break;
      case "#login":
        if ($('.widget_login a.wp-admin').length>0) {
          location.href = $('.widget_login a.wp-admin').attr('href');
          break;
        }
        $('#content').append($('.widget_login').detach());
        break;
      case "#matrix":
        $('#thematrix').show();
        break;
      default:
        $('#content').append($('#detached .last').removeClass('last').detach());
    }
  }
  // add failsafe
}
$(window).bind('hashchange', hasher);
$(hasher);
