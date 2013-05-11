/*
 * jQuery mouseOverTooltip UI Widget 1.0 that wraps jQuery UI Tooltip Widget
 * and adds functionality for keeping tooltip opened on hover
 * Copyright (c) 2013 Domen Vrankar
 * Copyright (c) 2013 Gamabit d.o.o. (http://www.gamabit.com)
 *
 * Depends:
 *   - jQuery 1.8.3+
 *   - jQuery UI 1.9.2+
 *   - jquery.ui.tooltip.js
 *
 * Released under the MIT license
 * https://github.com/do-m-en/jquery-ui-mouse-over-tooltip/blob/master/MIT-LICENSE.txt
 */
(function ($) {
  $.widget("gamabit.mouseOverTooltip", $.ui.tooltip, {
      	open: function( event ) {
      	  $(".close-pending").each( function() {
      	      var element = $(this);
      	      element.addClass("close-force");
      	      element.mouseOverTooltip("close");
      	    } );
          $.ui.tooltip.prototype.open.apply(this, event);
        },

      close: function( event ) {
        if( !this.element.hasClass("close-pending") ) {
          this.element.addClass("close-pending");
          var that = this;
          that._closeTimeoutElement = setTimeout( function() {
                $.ui.tooltip.prototype.close.apply(that, event);
              },
              that.options.closeTimeout
            );
          
          var target = $( event ? event.currentTarget : that.element );
          that._find( target ).mouseenter( function() {
              clearTimeout( that._closeTimeoutElement );
            } ).
            mouseleave( function() {
              that.element.addClass("close-force");
              that.close();
            } );
        } else if( this.element.hasClass("close-force") ) {
          clearTimeout( this._closeTimeoutElement );
          this.element.removeClass("close-pending");
          this.element.removeClass("close-force");
          $.ui.tooltip.prototype.close.apply(this, event);
        }
      }
    } );
} (jQuery) );
