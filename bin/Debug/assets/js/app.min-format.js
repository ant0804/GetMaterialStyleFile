'use strict';
/**
 * @param {?} canCreateDiscussions
 * @return {undefined}
 */
function openConf(canCreateDiscussions) {
  $("#ms-configurator").animate({
    right : "0px"
  }, 400);
  $(".ms-configurator-btn").animate({
    right : "-60px"
  }, 200);
}
/**
 * @return {undefined}
 */
function closeConf() {
  $("#ms-configurator").animate({
    right : "-310px"
  }, 200);
  $(".ms-configurator-btn").animate({
    right : "20px"
  }, 400);
}
/**
 * @return {undefined}
 */
function slidebar() {
  var whapp_html = $(".ms-slidebar");
  var infoDeferido = $(".ms-site-container");
  var infoIndeferido = $(".ms-toggle-left");
  /** @type {boolean} */
  var $_minify = false;
  /** @type {boolean} */
  var $name = false;
  infoIndeferido.click(function() {
    /** @type {boolean} */
    $name = $name ? (whapp_html.removeClass("open"), false) : (whapp_html.addClass("open"), true);
    /** @type {boolean} */
    $_minify = true;
  });
  infoDeferido.click(function() {
    if (!$_minify && $name) {
      whapp_html.removeClass("open");
      /** @type {boolean} */
      $name = false;
    }
    /** @type {boolean} */
    $_minify = false;
  });
}
$(document).ready(function() {
  document.addEventListener("touchstart", function() {
  }, true);
  $.material.init();
  new SmoothScroll("[data-scroll]");
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
  $("#status").fadeOut();
  $("#ms-preload").delay(350).fadeOut("slow");
  $("body").delay(350).css({
    overflow : "visible"
  });
  (new WOW).init();
  Array.from(document.querySelectorAll(".js-player")).map(function(element) {
    return new Plyr(element);
  });
  $(".counter").counterUp({
    delay : 10,
    time : 2e3
  });
  slidebar();
  $(".ms-slider").slider();
  var jquery;
  var $allPanels = $(".btn-back-top");
  $(window).scroll(function() {
    if (400 < $(this).scrollTop()) {
      $allPanels.addClass("back-show");
    } else {
      $allPanels.removeClass("back-show");
    }
  });
  (jquery = jQuery)(function() {
    jquery(document).off("click.bs.tab.data-api", '[data-hover="tab"]');
    jquery(document).on("mouseenter.bs.tab.data-api", '[data-hover="tab"]', function() {
      jquery(this).tab("show");
    });
  });
  $(".navbar").on("click mousedown mouseup touchstart", "a.has_children", function() {
    return $(this).next("ul").hasClass("open_t") && !$(this).parents("ul").hasClass("open_t") ? $(".open_t").removeClass("open_t") : ($(".open_t").not($(this).parents("ul")).removeClass("open_t"), $(this).next("ul").addClass("open_t")), false;
  });
  $(document).on("click", ":not(.has_children, .has_children *)", function() {
    if (0 < $(".open_t").length) {
      return $(".open_t").removeClass("open_t"), $(".open_t").parent().removeClass("open"), false;
    }
  });
  var $gui = $(".ms-navbar");
  var el_form_group = ($(".navbar-nav"), $("body"));
  var i = $(".ms-site-container").hasClass("ms-nav-fixed");
  $(window).scroll(function() {
    if (!i) {
      if (120 < $(window).scrollTop()) {
        $gui.addClass("shrink");
        el_form_group.addClass("bd-scroll");
        $gui.addClass("fixed-top");
      }
      if ($(window).scrollTop() < 121) {
        $gui.removeClass("shrink");
        el_form_group.removeClass("bd-scroll");
        $gui.removeClass("fixed-top");
      }
    }
  });
  $("#datePicker").datepicker({
    orientation : "bottom left",
    autoclose : true,
    todayHighlight : true
  });
  var $container = $(".masonry-container");
  $container.imagesLoaded(function() {
    $container.masonry({
      columnWidth : ".masonry-item",
      itemSelector : ".masonry-item"
    });
  });
  /** @type {boolean} */
  var s = false;
  $(".ms-conf-btn").click(function() {
    if (s) {
      /** @type {boolean} */
      s = false;
      closeConf();
    } else {
      /** @type {boolean} */
      s = true;
      openConf();
    }
  });
  $(".ms-site-container").click(function() {
    if (s) {
      /** @type {boolean} */
      s = false;
      closeConf();
    }
  });
}), function($) {
  $(".input-number .btn-circle:first-of-type").on("click", function() {
    $(".input-number input").val(parseInt($(".input-number input").val(), 10) - 1);
  });
  $(".input-number .btn-circle:last-of-type").on("click", function() {
    $(".input-number input").val(parseInt($(".input-number input").val(), 10) + 1);
  });
}(jQuery), function($, window, canCreateDiscussions) {
  var $allDropdowns = $();
  /**
   * @param {?} options
   * @return {?}
   */
  $.fn.dropdownHover = function(options) {
    return "ontouchstart" in document ? this : ($allDropdowns = $allDropdowns.add(this.parent()), this.each(function() {
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function openDropdown(event) {
        window.clearTimeout(showAboveTimeout);
        window.clearTimeout(showBelowTimeout);
        showBelowTimeout = window.setTimeout(function() {
          $allDropdowns.find(":focus").blur();
          if (true === settings.instantlyCloseOthers) {
            $allDropdowns.removeClass("show");
          }
          window.clearTimeout(showBelowTimeout);
          $this.attr("aria-expanded", "true");
          $dimmer.addClass("show");
          $this.trigger(a);
        }, settings.hoverDelay);
      }
      var showAboveTimeout;
      var showBelowTimeout;
      var $this = $(this);
      var $dimmer = $this.parent();
      var data = {
        delay : $(this).data("delay"),
        hoverDelay : $(this).data("hover-delay"),
        instantlyCloseOthers : $(this).data("close-others")
      };
      /** @type {string} */
      var a = "show.bs.dropdown";
      var settings = $.extend(true, {}, {
        delay : 0,
        hoverDelay : 0,
        instantlyCloseOthers : true
      }, options, data);
      $dimmer.hover(function(event) {
        if (!$dimmer.hasClass("show") && !$this.is(event.target)) {
          return true;
        }
        if (767 < $(window).width()) {
          openDropdown(event);
        }
      }, function() {
        if (767 < $(window).width()) {
          window.clearTimeout(showBelowTimeout);
          showAboveTimeout = window.setTimeout(function() {
            $this.attr("aria-expanded", "false");
            $dimmer.removeClass("show");
            $this.trigger("hide.bs.dropdown");
          }, settings.delay);
        }
      });
      $this.hover(function(event) {
        if (!$dimmer.hasClass("show") && !$dimmer.is(event.target) && 767 < $(window).width()) {
          return true;
        }
        if (767 < $(window).width()) {
          openDropdown(event);
        }
      });
      $dimmer.find(".dropdown-submenu").each(function() {
        var showAboveTimeout;
        var $submenudiv = $(this);
        $submenudiv.hover(function() {
          window.clearTimeout(showAboveTimeout);
          $submenudiv.children(".dropdown-menu").show();
          $submenudiv.siblings().children(".dropdown-menu").hide();
        }, function() {
          var $trashTreeContextMenu = $submenudiv.children(".dropdown-menu");
          showAboveTimeout = window.setTimeout(function() {
            $trashTreeContextMenu.hide();
          }, settings.delay);
        });
      });
    }));
  };
  $(document).ready(function() {
    $('[data-hover="dropdown"]').dropdownHover();
  });
}(jQuery, window), function($) {
  /**
   * @param {?} element
   * @return {undefined}
   */
  function _addFormGroupFocus(element) {
    var o = $(element);
    if (!o.prop("disabled")) {
      o.closest(".form-group").addClass("is-focused");
    }
  }
  /**
   * @param {!Object} $input
   * @return {undefined}
   */
  function render($input) {
    /** @type {boolean} */
    var i = false;
    if ($input.is($.material.options.checkboxElements) || $input.is($.material.options.radioElements)) {
      /** @type {boolean} */
      i = true;
    }
    $input.closest("label").hover(function() {
      var t;
      var isShowingSpinner;
      var $i = $(this).find("input");
      var topicInputs = $i.prop("disabled");
      if (i) {
        t = $(this);
        isShowingSpinner = topicInputs;
        (t.hasClass("checkbox-inline") || t.hasClass("radio-inline") ? t : t.closest(".checkbox").length ? t.closest(".checkbox") : t.closest(".radio")).toggleClass("disabled", isShowingSpinner);
      }
      if (!topicInputs) {
        _addFormGroupFocus($i);
      }
    }, function() {
      _removeFormGroupFocus($(this).find("input"));
    });
  }
  /**
   * @param {?} element
   * @return {undefined}
   */
  function _removeFormGroupFocus(element) {
    $(element).closest(".form-group").removeClass("is-focused");
  }
  /**
   * @param {?} obj
   * @return {?}
   */
  $.expr[":"].notmdproc = function(obj) {
    return !$(obj).data("mdproc");
  };
  $.material = {
    options : {
      validate : true,
      input : true,
      ripples : true,
      checkbox : true,
      togglebutton : true,
      radio : true,
      arrive : true,
      autofill : false,
      withRipples : [".btn:not(.btn-link)", ".card-image", ".navbar a:not(.withoutripple)", ".dropdown-menu a", ".nav-tabs a:not(.withoutripple)", ".withripple", ".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"].join(","),
      inputElements : "input.form-control, textarea.form-control, select.form-control",
      checkboxElements : ".checkbox > label > input[type=checkbox], label.checkbox-inline > input[type=checkbox]",
      togglebuttonElements : ".togglebutton > label > input[type=checkbox]",
      radioElements : ".radio > label > input[type=radio], label.radio-inline > input[type=radio]"
    },
    checkbox : function(value) {
      render($(value || this.options.checkboxElements).filter(":notmdproc").data("mdproc", true).after("<span class='checkbox-material'><span class='check'></span></span>"));
    },
    togglebutton : function(selector) {
      render($(selector || this.options.togglebuttonElements).filter(":notmdproc").data("mdproc", true).after("<span class='toggle'></span>"));
    },
    radio : function(selector) {
      render($(selector || this.options.radioElements).filter(":notmdproc").data("mdproc", true).after("<span class='circle'></span><span class='check'></span>"));
    },
    input : function(selector) {
      $(selector || this.options.inputElements).filter(":notmdproc").data("mdproc", true).each(function() {
        var $this = $(this);
        var $formGroup = $this.closest(".form-group");
        if (!(0 !== $formGroup.length || "hidden" === $this.attr("type") || $this.attr("hidden"))) {
          $this.wrap("<div class='form-group'></div>");
          $formGroup = $this.closest(".form-group");
        }
        if ($this.attr("data-hint")) {
          $this.after("<p class='help-block'>" + $this.attr("data-hint") + "</p>");
          $this.removeAttr("data-hint");
        }
        if ($.each({
          "input-lg" : "form-group-lg",
          "input-sm" : "form-group-sm"
        }, function(endDateString, standardSize) {
          if ($this.hasClass(endDateString)) {
            $this.removeClass(endDateString);
            $formGroup.addClass(standardSize);
          }
        }), $this.hasClass("floating-label")) {
          var cp_amount = $this.attr("placeholder");
          $this.attr("placeholder", null).removeClass("floating-label");
          var o = $this.attr("id");
          /** @type {string} */
          var th_field = "";
          if (o) {
            /** @type {string} */
            th_field = "for='" + o + "'";
          }
          $formGroup.addClass("label-floating");
          $this.after("<label " + th_field + "class='control-label'>" + cp_amount + "</label>");
        }
        if (!(null !== $this.val() && "undefined" != $this.val() && "" !== $this.val())) {
          $formGroup.addClass("is-empty");
        }
        if (0 < $formGroup.find("input[type=file]").length) {
          $formGroup.addClass("is-fileinput");
        }
      });
    },
    attachInputEventHandlers : function() {
      var val = this.options.validate;
      $(document).on("keydown paste", ".form-control", function(updated) {
        var event;
        if (void 0 === (event = updated).which || "number" == typeof event.which && 0 < event.which && !event.ctrlKey && !event.metaKey && !event.altKey && 8 != event.which && 9 != event.which && 13 != event.which && 16 != event.which && 17 != event.which && 20 != event.which && 27 != event.which) {
          $(this).closest(".form-group").removeClass("is-empty");
        }
      }).on("keyup change", ".form-control", function() {
        var $this = $(this);
        var $formGroup = $this.closest(".form-group");
        var n = void 0 === $this[0].checkValidity || $this[0].checkValidity();
        if ("" === $this.val()) {
          $formGroup.addClass("is-empty");
        } else {
          $formGroup.removeClass("is-empty");
        }
        if (val) {
          if (n) {
            $formGroup.removeClass("has-error");
          } else {
            $formGroup.addClass("has-error");
          }
        }
      }).on("focus", ".form-control, .form-group.is-fileinput", function() {
        _addFormGroupFocus(this);
      }).on("blur", ".form-control, .form-group.is-fileinput", function() {
        _removeFormGroupFocus(this);
      }).on("change", ".form-group input", function() {
        var t = $(this);
        if ("file" != t.attr("type")) {
          var button = t.closest(".form-group");
          if (t.val()) {
            button.removeClass("is-empty");
          } else {
            button.addClass("is-empty");
          }
        }
      }).on("change", ".form-group.is-fileinput input[type='file']", function() {
        var button = $(this).closest(".form-group");
        /** @type {string} */
        var value = "";
        $.each(this.files, function(canCreateDiscussions, engineDiscovery) {
          value = value + (engineDiscovery.name + ", ");
        });
        if (value = value.substring(0, value.length - 2)) {
          button.removeClass("is-empty");
        } else {
          button.addClass("is-empty");
        }
        button.find("input.form-control[readonly]").val(value);
      });
    },
    ripples : function(selector) {
      $(selector || this.options.withRipples).ripples();
    },
    autofill : function() {
      /** @type {number} */
      var chat_retry = setInterval(function() {
        $("input[type!=checkbox]").each(function() {
          var t = $(this);
          if (t.val() && t.val() !== t.attr("value")) {
            t.trigger("change");
          }
        });
      }, 100);
      setTimeout(function() {
        clearInterval(chat_retry);
      }, 1e4);
    },
    attachAutofillEventHandlers : function() {
      var initializeCheckTimer;
      $(document).on("focus", "input", function() {
        var syncedAnimals = $(this).parents("form").find("input").not("[type=file]");
        /** @type {number} */
        initializeCheckTimer = setInterval(function() {
          syncedAnimals.each(function() {
            var t = $(this);
            if (t.val() !== t.attr("value")) {
              t.trigger("change");
            }
          });
        }, 100);
      }).on("blur", ".form-group input", function() {
        clearInterval(initializeCheckTimer);
      });
    },
    init : function(defaults) {
      this.options = $.extend({}, this.options, defaults);
      if ($.fn.ripples && this.options.ripples) {
        this.ripples();
      }
      if (this.options.input) {
        this.input();
        this.attachInputEventHandlers();
      }
      if (this.options.checkbox) {
        this.checkbox();
      }
      if (this.options.togglebutton) {
        this.togglebutton();
      }
      if (this.options.radio) {
        this.radio();
      }
      if (this.options.autofill) {
        this.autofill();
        this.attachAutofillEventHandlers();
      }
      if (document.arrive && this.options.arrive) {
        if ($.fn.ripples && this.options.ripples) {
          document.arrive(this.options.withRipples, function() {
            $.material.ripples($(this));
          });
        }
        if (this.options.input) {
          document.arrive(this.options.inputElements, function() {
            $.material.input($(this));
          });
        }
        if (this.options.checkbox) {
          document.arrive(this.options.checkboxElements, function() {
            $.material.checkbox($(this));
          });
        }
        if (this.options.radio) {
          document.arrive(this.options.radioElements, function() {
            $.material.radio($(this));
          });
        }
        if (this.options.togglebutton) {
          document.arrive(this.options.togglebuttonElements, function() {
            $.material.togglebutton($(this));
          });
        }
      }
    }
  };
}(jQuery), function($, window, doc, undefined) {
  /**
   * @param {?} el
   * @param {?} options
   * @return {undefined}
   */
  function Ripples(el, options) {
    (self = this).element = $(el);
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    /** @type {string} */
    this._name = ripples;
    this.init();
  }
  /** @type {string} */
  var ripples = "ripples";
  /** @type {null} */
  var self = null;
  var defaults = {};
  /**
   * @return {undefined}
   */
  Ripples.prototype.init = function() {
    var $element = this.element;
    $element.on("mousedown touchstart", function(event) {
      if (!self.isTouch() || "mousedown" !== event.type) {
        if (!$element.find(".ripple-container").length) {
          $element.append('<div class="ripple-container"></div>');
        }
        var $wrapper = $element.children(".ripple-container");
        var relY = self.getRelY($wrapper, event);
        var relX = self.getRelX($wrapper, event);
        if (relY || relX) {
          var rippleColor = self.getRipplesColor($element);
          var $ripple = $("<div></div>");
          $ripple.addClass("ripple").css({
            left : relX,
            top : relY,
            "background-color" : rippleColor
          });
          $wrapper.append($ripple);
          window.getComputedStyle($ripple[0]).opacity;
          self.rippleOn($element, $ripple);
          setTimeout(function() {
            self.rippleEnd($ripple);
          }, 500);
          $element.on("mouseup mouseleave touchend", function() {
            $ripple.data("mousedown", "off");
            if ("off" === $ripple.data("animating")) {
              self.rippleOut($ripple);
            }
          });
        }
      }
    });
  };
  /**
   * @param {!Window} $element
   * @param {!Object} $ripple
   * @return {?}
   */
  Ripples.prototype.getNewSize = function($element, $ripple) {
    return Math.max($element.outerWidth(), $element.outerHeight()) / $ripple.outerWidth() * 2.5;
  };
  /**
   * @param {!Object} $wrapper
   * @param {!Object} event
   * @return {?}
   */
  Ripples.prototype.getRelX = function($wrapper, event) {
    var gamePos = $wrapper.offset();
    return self.isTouch() ? 1 === (event = event.originalEvent).touches.length && event.touches[0].pageX - gamePos.left : event.pageX - gamePos.left;
  };
  /**
   * @param {!Object} $wrapper
   * @param {!Object} event
   * @return {?}
   */
  Ripples.prototype.getRelY = function($wrapper, event) {
    var spOfs = $wrapper.offset();
    return self.isTouch() ? 1 === (event = event.originalEvent).touches.length && event.touches[0].pageY - spOfs.top : event.pageY - spOfs.top;
  };
  /**
   * @param {!Object} $element
   * @return {?}
   */
  Ripples.prototype.getRipplesColor = function($element) {
    return $element.data("ripple-color") ? $element.data("ripple-color") : window.getComputedStyle($element[0]).color;
  };
  /**
   * @return {?}
   */
  Ripples.prototype.hasTransitionSupport = function() {
    /** @type {!CSSStyleDeclaration} */
    var thisStyle = (doc.body || doc.documentElement).style;
    return thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
  };
  /**
   * @return {?}
   */
  Ripples.prototype.isTouch = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  /**
   * @param {!Object} $ripple
   * @return {undefined}
   */
  Ripples.prototype.rippleEnd = function($ripple) {
    $ripple.data("animating", "off");
    if ("off" === $ripple.data("mousedown")) {
      self.rippleOut($ripple);
    }
  };
  /**
   * @param {!Object} $ripple
   * @return {undefined}
   */
  Ripples.prototype.rippleOut = function($ripple) {
    $ripple.off();
    if (self.hasTransitionSupport()) {
      $ripple.addClass("ripple-out");
    } else {
      $ripple.animate({
        opacity : 0
      }, 100, function() {
        $ripple.trigger("transitionend");
      });
    }
    $ripple.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
      $ripple.remove();
    });
  };
  /**
   * @param {!Window} $element
   * @param {!Object} $ripple
   * @return {undefined}
   */
  Ripples.prototype.rippleOn = function($element, $ripple) {
    var size = self.getNewSize($element, $ripple);
    if (self.hasTransitionSupport()) {
      $ripple.css({
        "-ms-transform" : "scale(" + size + ")",
        "-moz-transform" : "scale(" + size + ")",
        "-webkit-transform" : "scale(" + size + ")",
        transform : "scale(" + size + ")"
      }).addClass("ripple-on").data("animating", "on").data("mousedown", "on");
    } else {
      $ripple.animate({
        width : 2 * Math.max($element.outerWidth(), $element.outerHeight()),
        height : 2 * Math.max($element.outerWidth(), $element.outerHeight()),
        "margin-left" : -1 * Math.max($element.outerWidth(), $element.outerHeight()),
        "margin-top" : -1 * Math.max($element.outerWidth(), $element.outerHeight()),
        opacity : .2
      }, 500, function() {
        $ripple.trigger("transitionend");
      });
    }
  };
  /**
   * @param {boolean} options
   * @return {?}
   */
  $.fn.ripples = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + ripples)) {
        $.data(this, "plugin_" + ripples, new Ripples(this, options));
      }
    });
  };
}(jQuery, window, document), window.onresize = tabs;
/** @type {(function((Event|null)): ?|null)} */
var handler = window.onresize;
/**
 * @return {undefined}
 */
function tabs() {
  var t = $(".nav.nav-tabs");
  var row = {};
  var w = {};
  /** @type {number} */
  var k = 0;
  for (; k < t.length; k++) {
    /** @type {number} */
    var j = k + 1;
    var $this = $(t[k]).children();
    var reqmodlen = $(t[k]).children().length;
    if (!$($this[$this.length - 1]).hasClass("ms-tabs-indicator")) {
      $(t[k]).data("id", j);
      $(t[k]).append('<span id="i' + j + '" class="ms-tabs-indicator"></span>');
    }
    var jResizer = $("#i" + j);
    /** @type {!Array} */
    row["tabW" + j] = [];
    /** @type {!Array} */
    w["tabL" + j] = [];
    var p = row["tabW" + j];
    var f = w["tabL" + j];
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    m = 0;
    for (; m < reqmodlen; m++) {
      f[m] = i;
      p[m] = $($this[m]).width();
      if ($($this[m]).children().hasClass("active")) {
        jResizer.css({
          left : f[m] + "px",
          width : p[m] + "px"
        });
      }
      i = i + p[m];
    }
  }
  $(".nav.nav-tabs > li").click(function(canCreateDiscussions) {
    var n = ($this = $(this).parent()).data("id");
    $this.children().removeClass("current");
    $(this).addClass("current");
    var bcofl_checkbox = $this.children();
    /** @type {number} */
    var i = 0;
    for (; i < bcofl_checkbox.length - 1; i++) {
      if ($(bcofl_checkbox[i]).hasClass("current")) {
        $("#i" + n).css({
          left : w["tabL" + n][i] + "px",
          width : row["tabW" + n][i] + "px"
        });
      }
    }
  });
}
handler.apply(window, [" On"]), $("#ms-account-modal").on("shown.bs.modal", function(canCreateDiscussions) {
  setTimeout(tabs, 700);
});
