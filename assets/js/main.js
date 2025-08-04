(function ($) {
  "use strict";
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. 
    08. 
    09. Ajax Contact Form
    10. Popup Sidemenu   
    11. Search Box Popup
    12. Magnific Popup
    13. Section Position
    14. Circle Progress
    15. Custom Tab
    16. Destination
    17. Team Toggle
    18. WOW.js Animation
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

  /*---------- 01. On Load Function ----------*/
  $(window).on("load", function () {
    $(".preloader").fadeOut();
  });

  /*---------- 02. Preloader ----------*/
  if ($(".preloader").length > 0) {
    $(".preloaderCls").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".preloader").css("display", "none");
      });
    });
  }

  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend(
      {
        menuToggleBtn: ".vs-menu-toggle",
        bodyToggleClass: "vs-body-visible",
        subMenuClass: "vs-submenu",
        subMenuParent: "vs-item-has-children",
        subMenuParentToggle: "vs-active",
        meanExpandClass: "vs-mean-expand",
        appendElement: '<span class="vs-mean-expand"></span>',
        subMenuToggleClass: "vs-open",
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function () {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").append(opt.appendElement);
        submenu.next("a").append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on("click", function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function (e) {
        e.stopPropagation();
      });
    });
  };

  $(".vs-menu-wrapper").vsmobilemenu();

  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = "";
  var scrollToTopBtn = ".scrollToTop";

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css("height");
    $targetMenu.parent().css("min-height", height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.parent().css("min-height", "").removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    }
    lastScrollTop = st;
  }

  $(window).on("scroll", function () {
    stickyMenu($(".sticky-active"), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass("show");
    } else {
      $(scrollToTopBtn).removeClass("show");
    }
  });

  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        lastScrollTop / 3
      );
      return false;
    });
  });

  /*---------- 06.Set Background Image ----------*/
  if ($("[data-bg-src]").length > 0) {
    $("[data-bg-src]").each(function () {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
    });
  }

  /*----------- 08. Global Slider ----------*/
  $(".vs-carousel").each(function () {
    var vsSlide = $(this);

    // Collect Data
    function d(data) {
      return vsSlide.data(data);
    }

    // Custom Arrow Button
    var prevButton =
        '<button type="button" class="slick-prev"><i class="' +
        d("prev-arrow") +
        '"></i></button>',
      nextButton =
        '<button type="button" class="slick-next"><i class="' +
        d("next-arrow") +
        '"></i></button>';

    // Function For Custom Arrow Btn
    $("[data-slick-next]").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-next")).slick("slickNext");
      });
    });

    $("[data-slick-prev]").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-prev")).slick("slickPrev");
      });
    });

    // Check for arrow wrapper
    if (d("arrows") == true) {
      if (!vsSlide.closest(".arrow-wrap").length) {
        vsSlide.closest(".container").parent().addClass("arrow-wrap");
      }
    }

    vsSlide.slick({
      dots: d("dots") ? true : false,
      fade: d("fade") ? true : false,
      arrows: d("arrows") ? true : false,
      speed: d("speed") ? d("speed") : 1000,
      asNavFor: d("asnavfor") ? d("asnavfor") : false,
      autoplay: d("autoplay") == false ? false : true,
      infinite: d("infinite") == false ? false : true,
      slidesToShow: d("slide-show") ? d("slide-show") : 1,
      adaptiveHeight: d("adaptive-height") ? true : false,
      centerMode: d("center-mode") ? true : false,
      autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
      centerPadding: d("center-padding") ? d("center-padding") : "0",
      focusOnSelect: d("focuson-select") == false ? false : true,
      pauseOnFocus: d("pauseon-focus") ? true : false,
      pauseOnHover: d("pauseon-hover") ? true : false,
      variableWidth: d("variable-width") ? true : false,
      vertical: d("vertical") ? true : false,
      verticalSwiping: d("vertical") ? true : false,
      prevArrow: d("prev-arrow")
        ? prevButton
        : '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></i></button>',
      nextArrow: d("next-arrow")
        ? nextButton
        : '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
      rtl: $("html").attr("dir") == "rtl" ? true : false,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            arrows: d("xl-arrows") ? true : false,
            dots: d("xl-dots") ? true : false,
            slidesToShow: d("xl-slide-show")
              ? d("xl-slide-show")
              : d("slide-show"),
            centerMode: d("xl-center-mode") ? true : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: d("ml-arrows") ? true : false,
            dots: d("ml-dots") ? true : false,
            slidesToShow: d("ml-slide-show")
              ? d("ml-slide-show")
              : d("slide-show"),
            centerMode: d("ml-center-mode") ? true : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: d("lg-arrows") ? true : false,
            dots: d("lg-dots") ? true : false,
            slidesToShow: d("lg-slide-show")
              ? d("lg-slide-show")
              : d("slide-show"),
            centerMode: d("lg-center-mode") ? d("lg-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 992,
          settings: {
            arrows: d("md-arrows") ? true : false,
            dots: d("md-dots") ? true : false,
            slidesToShow: d("md-slide-show") ? d("md-slide-show") : 1,
            centerMode: d("md-center-mode") ? d("md-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 767,
          settings: {
            arrows: d("sm-arrows") ? true : false,
            dots: d("sm-dots") ? true : false,
            slidesToShow: d("sm-slide-show") ? d("sm-slide-show") : 1,
            centerMode: d("sm-center-mode") ? d("sm-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 576,
          settings: {
            arrows: d("xs-arrows") ? true : false,
            dots: d("xs-dots") ? true : false,
            slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 1,
            centerMode: d("xs-center-mode") ? d("xs-center-mode") : false,
            centerPadding: 0,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });

  /*----------- 08. Global Slider ----------*/
  // $('.vs-carousel').each(function () {
  //   var vsSlide = $(this);

  //   // Collect Data
  //   var d =  (data)=>{
  //     return vsSlide.data(data);
  //   }

  //   // Custom Arrow Button
  //   var prevButton = '<button type="button" class="slick-prev"><i class="' + d('prev-arrow') + '"></i></button>',
  //     nextButton = '<button type="button" class="slick-next"><i class="' + d('next-arrow') + '"></i></button>';

  //   // Function For Custom Arrow Btn
  //   $('[data-slick-next]').each(function () {
  //     $(this).on('click', function (e) {
  //       e.preventDefault()
  //       $($(this).data('slick-next')).slick('slickNext');
  //     })
  //   })

  //   $('[data-slick-prev]').each(function () {
  //     $(this).on('click', function (e) {
  //       e.preventDefault()
  //       $($(this).data('slick-prev')).slick('slickPrev');
  //     })
  //   })

  //   // Check for arrow wrapper
  //   if (d('arrows') == true) {
  //     if (!vsSlide.closest('.arrow-wrap').length) {
  //       vsSlide.closest('.container').parent().addClass('arrow-wrap')
  //     }
  //   }

  //   vsSlide.slick({
  //     dots: (d('dots') ? true : false),
  //     fade: (d('fade') ? true : false),
  //     arrows: (d('arrows') ? true : false),
  //     speed: (d('speed') ? d('speed') : 1000),
  //     asNavFor: (d('asnavfor') ? d('asnavfor') : false),
  //     autoplay: ((d('autoplay') == false) ? false : false),
  //     infinite: ((d('infinite') == false) ? false : true),
  //     slidesToShow: (d('slide-show') ? d('slide-show') : 1),
  //     adaptiveHeight: (d('adaptive-height') ? true : false),
  //     centerMode: (d('center-mode') ? true : false),
  //     autoplaySpeed: (d('autoplay-speed') ? d('autoplay-speed') : 8000),
  //     centerPadding: (d('center-padding') ? d('center-padding') : '0'),
  //     focusOnSelect: (d('focuson-select') ? true : false),
  //     pauseOnFocus: (d('pauseon-focus') ? true : false),
  //     pauseOnHover: (d('pauseon-hover') ? true : false),
  //     variableWidth: (d('variable-width') ? true : false),
  //     vertical: (d('vertical') ? true : false),
  //     verticalSwiping: (d('vertical') ? true : false),
  //     prevArrow: (d('prev-arrow') ? prevButton : '<button type="button" class="slick-prev"><i class="fal fa-long-arrow-left"></i></button>'),
  //     nextArrow: (d('next-arrow') ? nextButton : '<button type="button" class="slick-next"><i class="fal fa-long-arrow-right"></i></button>'),
  //     rtl: ($('html').attr('dir') == 'rtl') ? true : false,
  //     responsive: [{
  //         breakpoint: 1600,
  //         settings: {
  //           arrows: (d('xl-arrows') ? true : false),
  //           dots: (d('xl-dots') ? true : false),
  //           slidesToShow: (d('xl-slide-show') ? d('xl-slide-show') : d('slide-show')),
  //           centerMode: (d('xl-center-mode') ? true : false),
  //           centerPadding: 0
  //         }
  //       }, {
  //         breakpoint: 1400,
  //         settings: {
  //           arrows: (d('ml-arrows') ? true : false),
  //           dots: (d('ml-dots') ? true : false),
  //           slidesToShow: (d('ml-slide-show') ? d('ml-slide-show') : d('slide-show')),
  //           centerMode: (d('ml-center-mode') ? true : false),
  //           centerPadding: 0
  //         }
  //       }, {
  //         breakpoint: 1200,
  //         settings: {
  //           arrows: (d('lg-arrows') ? true : false),
  //           dots: (d('lg-dots') ? true : false),
  //           slidesToShow: (d('lg-slide-show') ? d('lg-slide-show') : d('slide-show')),
  //           centerMode: (d('lg-center-mode') ? d('lg-center-mode') : false),
  //           centerPadding: 0
  //         }
  //       }, {
  //         breakpoint: 992,
  //         settings: {
  //           arrows: (d('md-arrows') ? true : false),
  //           dots: (d('md-dots') ? true : false),
  //           slidesToShow: (d('md-slide-show') ? d('md-slide-show') : 1),
  //           centerMode: (d('md-center-mode') ? d('md-center-mode') : false),
  //           centerPadding: 0
  //         }
  //       }, {
  //         breakpoint: 767,
  //         settings: {
  //           arrows: (d('sm-arrows') ? true : false),
  //           dots: (d('sm-dots') ? true : false),
  //           slidesToShow: (d('sm-slide-show') ? d('sm-slide-show') : 1),
  //           centerMode: (d('sm-center-mode') ? d('sm-center-mode') : false),
  //           centerPadding: 0
  //         }
  //       }, {
  //         breakpoint: 576,
  //         settings: {
  //           arrows: (d('xs-arrows') ? true : false),
  //           dots: (d('xs-dots') ? true : false),
  //           slidesToShow: (d('xs-slide-show') ? d('xs-slide-show') : 1),
  //           centerMode: (d('xs-center-mode') ? d('xs-center-mode') : false),
  //           centerPadding: 0
  //         }
  //       }
  //       // You can unslick at a given breakpoint now by adding:
  //       // settings: "unslick"
  //       // instead of a settings object
  //     ]
  //   });

  // });

  /*----------- 09. Ajax Contact Form ----------*/
  function ajaxContactForm(selectForm) {
    var form = selectForm;
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
      '[name="fname"],[name="lname"],[name="email"],[name="phone"],[name="message"]'; // Correct field names
    var formMessages = $(selectForm).next(".form-messages");

    function sendContact() {
      var formData = $(form).serialize();
      var valid = validateContact();

      if (valid) {
        // Send the form data via AJAX
        $.ajax({
          url: $(form).attr("action"),
          data: formData,
          type: "POST",
        })
          .done(function (response) {
            // Update the formMessages div with a success message
            formMessages.removeClass("error").addClass("success");
            formMessages.text(response);

            // Clear the form fields
            $(form).find('input:not([type="submit"]), textarea').val("");
          })
          .fail(function (data) {
            // Update the formMessages div with an error message
            formMessages.removeClass("success").addClass("error");
            formMessages.html(
              data.responseText ||
                "Oops! An error occurred and your message could not be sent."
            );
          });
      }
    }

    function validateContact() {
      var valid = true;

      // Validate all required fields
      $(form + " " + $validation).each(function () {
        var $input = $(this);
        if (!$input.val()) {
          $input.addClass(invalidCls);
          valid = false;
        } else {
          $input.removeClass(invalidCls);
        }
      });

      // Email validation
      var emailValue = $(form + " " + $email).val();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // More robust email validation
      if (!emailValue || !emailValue.match(emailRegex)) {
        $(form + " " + $email).addClass(invalidCls);
        valid = false;
      } else {
        $(form + " " + $email).removeClass(invalidCls);
      }

      return valid;
    }

    // Bind form submission to prevent default and trigger AJAX function
    $(form).on("submit", function (element) {
      element.preventDefault();
      sendContact();
    });
  }

  // Initialize the AJAX contact form
  ajaxContactForm(".ajax-contact");

  /*---------- 10. Popup Sidemenu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on("click", function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
    var sideMenuChild = $sideMenu + " > div";
    $(sideMenuChild).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenuCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sidemenu-wrapper",
    ".sideMenuToggler",
    ".sideMenuCls",
    "show"
  );

  /*---------- 10. Popup SideCart ----------*/
  function popupSideMenu($sidecart, $sidecartOpen, $sidecartCls, $toggleCls) {
    // Sidebar Popup
    $($sidecartOpen).on("click", function (e) {
      e.preventDefault();
      $($sidecart).addClass($toggleCls);
    });
    $($sidecart).on("click", function (e) {
      e.stopPropagation();
      $($sidecart).removeClass($toggleCls);
    });
    var sidecartChild = $sidecart + " > div";
    $(sidecartChild).on("click", function (e) {
      e.stopPropagation();
      $($sidecart).addClass($toggleCls);
    });
    $($sidecartCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sidecart).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sideCart-wrapper",
    ".sideCartToggler",
    ".sideMenuCls",
    "show"
  );

  /*---------- 11. Search Box Popup ----------*/
  function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).on("click", function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
    });
    $($searchBox).on("click", function (e) {
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
    $($searchBox)
      .find("form")
      .on("click", function (e) {
        e.stopPropagation();
        $($searchBox).addClass($toggleCls);
      });
    $($searchCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
  }
  popupSarchBox(
    ".popup-search-box",
    ".searchBoxTggler",
    ".searchClose",
    "show"
  );

  /*----------- 12. Magnific Popup ----------*/
  /* magnificPopup img view */
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });
  $(".gallery-img").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  /*---------- 13. Section Position ----------*/
  // Interger Converter
  function convertInteger(str) {
    return parseInt(str, 10);
  }

  $.fn.sectionPosition = function (mainAttr, posAttr) {
    $(this).each(function () {
      var section = $(this);

      function setPosition() {
        var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
          posData = section.attr(mainAttr), // where to position
          posFor = section.attr(posAttr), // On Which section is for positioning
          topMark = "top-half", // Pos top
          bottomMark = "bottom-half", // Pos Bottom
          parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
          parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

        if (posData === topMark) {
          $(posFor).css("padding-bottom", parentPB + sectionHeight + "px");
          section.css("margin-top", "-" + sectionHeight + "px");
        } else if (posData === bottomMark) {
          $(posFor).css("padding-top", parentPT + sectionHeight + "px");
          section.css("margin-bottom", "-" + sectionHeight + "px");
        }
      }
      setPosition(); // Set Padding On Load
    });
  };

  var postionHandler = "[data-sec-pos]";
  if ($(postionHandler).length) {
    $(postionHandler).sectionPosition("data-sec-pos", "data-pos-for");
  }

  /*----------- 13. Custom Tab  ----------*/
  $.fn.vsTab = function (options) {
    var opt = $.extend(
      {
        sliderTab: false,
        tabButton: "button",
        indicator: false,
      },
      options
    );

    $(this).each(function () {
      var $menu = $(this);
      var $button = $menu.find(opt.tabButton);

      // On Click Button Class Remove and indecator postion set
      $button.on("click", function (e) {
        e.preventDefault();
        var cBtn = $(this);
        cBtn.addClass("active").siblings().removeClass("active");
        if (opt.sliderTab) {
          $(slider).slick("slickGoTo", cBtn.data("slide-go-to"));
        }
      });

      // Work With slider
      if (opt.sliderTab) {
        var slider = $menu.data("asnavfor"); // select slider

        // Select All button and set attribute
        var i = 0;
        $button.each(function () {
          var slideBtn = $(this);
          slideBtn.attr("data-slide-go-to", i);
          i++;

          // Active Slide On load > Actived Button
          if (slideBtn.hasClass("active")) {
            $(slider).slick("slickGoTo", slideBtn.data("slide-go-to"));
          }

          // Change Indicator On slide Change
          $(slider).on(
            "beforeChange",
            function (event, slick, currentSlide, nextSlide) {
              $menu
                .find(opt.tabButton + '[data-slide-go-to="' + nextSlide + '"]')
                .addClass("active")
                .siblings()
                .removeClass("active");
            }
          );
        });
      }
    });
  };

  // Call On Load
  if ($(".vs-slider-tab").length) {
    $(".vs-slider-tab").vsTab({
      sliderTab: true,
      tabButton: ".tab-btn",
    });
  }

  // gallery masonery
  $(".gallery-mesonary").imagesLoaded(function () {
    $(".gallery-mesonary").isotope({
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        columnWidth: 33,
        gutter: 5,
      },
    });
  });

  /*----------- 13. Filter ----------*/
  jQuery.noConflict();
  $(".filter-active").imagesLoaded(function () {
    var $filter = ".filter-active",
      $filterItem = ".filter-item",
      $filterMenu = ".filter-menu-active";
    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: ".tab-content1",
      });
    }

    // Menu Active Class
    $($filterMenu).on("click", "button", function (event) {
      event.preventDefault();
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({
        filter: filterValue,
      });
      $(this).addClass("active");
      $(this).siblings(".active").removeClass("active");
    });
  });

  // Tours package filter
  $(".tours-active").imagesLoaded(function () {
    var $filter = ".tours-active",
      $filterItem = ".filter-item",
      $filterMenu = ".filter-menu-active";
    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: "*",
      });
    }
  });

  /*----------- 15. Count Down ----------*/
  $.fn.countdown = function () {
    $(this).each(function () {
      var $counter = $(this),
        countDownDate = new Date($counter.data("end-date")).getTime(), // Set the date we're counting down toz
        exprireCls = "expired";

      // Finding Function
      function s$(element) {
        return $counter.find(element);
      }

      // Update the count down every 1 second
      var counter = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // if low than 10 add zero
        function addZero(element) {
          return element < 10 ? "0" + element : element;
        }

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(counter);
          $counter.addClass(exprireCls);
          $counter.find(".message").css("display", "block");
        } else {
          // Output the result in elements
          s$(".day").html(addZero(days));
          s$(".hour").html(addZero(hours));
          s$(".minute").html(addZero(minutes));
          s$(".seconds").html(addZero(seconds));
        }
      }, 1000);
    });
  };

  if ($(".countdown-active").length) {
    $(".countdown-active").countdown();
  }

  /*----------- 16. Circle Progress ----------*/
  $(".circle-progress")
    .circleProgress({
      size: 150,
      thickness: 25,
      startAngle: -1.56,
      fill: "#FF681A",
      emptyFill: "#FFCCB1",
    })
    .on("circle-animation-progress", function (event, progress, stepValue) {
      $(this)
        .find(".progress-value")
        .text(stepValue.toFixed(2).substr(2) + "%");
    });

  // Quantity
  $(".quantity-plus").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal)) {
        $qty.val(currentVal + 1);
      }
    });
  });

  $(".quantity-minus").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal) && currentVal > 1) {
        $qty.val(currentVal - 1);
      }
    });
  });

  /*----------- 16. Shape Mockup ----------*/
  $.fn.shapeMockup = function () {
    var $shape = $(this);
    $shape.each(function () {
      var $currentShape = $(this),
        shapeTop = $currentShape.data("top"),
        shapeRight = $currentShape.data("right"),
        shapeBottom = $currentShape.data("bottom"),
        shapeLeft = $currentShape.data("left");
      $currentShape
        .css({
          top: shapeTop,
          right: shapeRight,
          bottom: shapeBottom,
          left: shapeLeft,
        })
        .removeAttr("data-top")
        .removeAttr("data-right")
        .removeAttr("data-bottom")
        .removeAttr("data-left")
        .parent()
        .addClass("shape-mockup-wrap");
    });
  };

  if ($(".shape-mockup")) {
    $(".shape-mockup").shapeMockup();
  }

  /*-----------  Price Slider ----------*/
  $(".price_slider").slider({
    range: true,
    min: 100,
    max: 750,
    values: [100, 550],
    slide: function (event, ui) {
      $(".from").text("$" + ui.values[0]);
      $(".to").text("$" + ui.values[1]);
    },
  });
  $(".from").text("$" + $(".price_slider").slider("values", 0));
  $(".to").text("$" + $(".price_slider").slider("values", 1));

  /*----------- 10. Woocommerce All ----------*/
  // Ship To Different Address
  $("#ship-to-different-address-checkbox").on("change", function () {
    if ($(this).is(":checked")) {
      $("#ship-to-different-address").next(".shipping_address").slideDown();
    } else {
      $("#ship-to-different-address").next(".shipping_address").slideUp();
    }
  });

  // Login Toggle
  $(".woocommerce-form-login-toggle a").on("click", function (e) {
    e.preventDefault();
    $(".woocommerce-form-login").slideToggle();
  });

  // Coupon Toggle
  $(".woocommerce-form-coupon-toggle a").on("click", function (e) {
    e.preventDefault();
    $(".woocommerce-form-coupon").slideToggle();
  });

  // Woocommerce Payment Toggle
  $('.wc_payment_methods input[type="radio"]:checked')
    .siblings(".payment_box")
    .show();
  $('.wc_payment_methods input[type="radio"]').each(function () {
    $(this).on("change", function () {
      $(".payment_box").slideUp();
      $(this).siblings(".payment_box").slideDown();
    });
  });

  // Woocommerce Rating Toggle
  $(".rating-select .stars a").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(this).siblings().removeClass("active");
      $(this).parent().parent().addClass("selected");
      $(this).addClass("active");
    });
  });

  // Woocommerce Shipping Method
  $(".shipping-calculator-button").on("click", function (e) {
    e.preventDefault();
    $(this).next(".shipping-calculator-form").slideToggle();
  });

  /* ---------------- select and change text on shop details --------------- */
  $("input[name='varient-color']").on("change", function () {
    var selectedValue = $("input[name='varient-color']:checked").val();
    $("#product_color").text(selectedValue);
  });

  /*----------- 18. WOW.js Animation ----------*/
  var wow = new WOW({
    boxClass: "wow", // animated element css class (default is wow)
    animateClass: "wow-animated", // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: false, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    scrollContainer: null, // optional scroll container selector, otherwise use window,
    resetAnimation: false, // reset animation on end (default is true)
  });
  wow.init();
})(jQuery);
