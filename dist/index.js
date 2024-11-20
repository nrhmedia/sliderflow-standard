"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/index.ts
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".swiper.is-standard").forEach((swiperElement, index) => {
      const swiperNavigation = swiperElement.parentElement.querySelector(
        ".swiper-navigation.is-standard"
      );
      const defaultDirection = "left-to-right";
      const defaultSlideStart = "first";
      const defaultFillEmptySlots = true;
      const defaultEffect = "slide";
      const defaultRewind = true;
      const defaultLoop = false;
      const defaultGrabCursor = true;
      const defaultSpeed = 1e3;
      const defaultAutoplayDelay = 5e3;
      const defaultSlidesPerViewDesktop = 4;
      const defaultSlidesPerViewTablet = 3;
      const defaultSlidesPerViewMobileLandscape = 2;
      const defaultSlidesPerViewMobilePortrait = 1;
      const defaultSpaceBetweenDesktop = 16;
      const defaultSpaceBetweenTablet = 12;
      const defaultSpaceBetweenMobileLandscape = 8;
      const defaultSpaceBetweenMobilePortrait = 0;
      const marqueeSpeed = 1;
      const getSlidesPerViewValue = (attr, defaultValue) => {
        const value = swiperElement.getAttribute(attr);
        if (!value || value === "default") return defaultValue;
        if (!isNaN(value) && Number(value) > 0) return Number(value);
        return defaultValue;
      };
      const getSpaceBetweenValue = (attr, defaultValue) => {
        const value = swiperElement.getAttribute(attr);
        if (!value || value === "default") return defaultValue;
        if (!isNaN(value)) return Number(value);
        return defaultValue;
      };
      const getSpeedValue = (attr) => {
        const value = swiperElement.getAttribute(attr);
        if (!value || value === "default") return defaultSpeed;
        if (value === "true") return defaultSpeed;
        if (!isNaN(value) && Number(value) > 0) return Number(value);
        return defaultSpeed;
      };
      const getAutoplayValue = (attr) => {
        const value = swiperElement.getAttribute(attr);
        if (value === "false") return false;
        if (value === "marquee") return marqueeSpeed;
        if (value === "true" || !value || value === "default") return defaultAutoplayDelay;
        if (!isNaN(value) && Number(value) > 0) return Number(value);
        return defaultAutoplayDelay;
      };
      const getPauseOnMouseEnterValue = (attr) => {
        const value = swiperElement.getAttribute(attr);
        if (!value || value === "default") return false;
        return value === "true";
      };
      const getDynamicBulletsValue = (attr) => {
        const value = swiperElement.getAttribute(attr);
        if (!value || value === "default") return false;
        return value === "true";
      };
      const getEffectValue = (attrName, defaultValue) => {
        const value = swiperElement.getAttribute(attrName);
        if (value === null || value === "default" || value === "") {
          return defaultValue;
        }
        if (!isNaN(value)) {
          return Number(value);
        }
        return defaultValue;
      };
      const getBooleanEffectOption = (attrName, defaultValue = true) => {
        const value = swiperElement.getAttribute(attrName);
        if (!value || value === "default") return defaultValue;
        if (value === "0" || value === "false") {
          return false;
        }
        return true;
      };
      const getBooleanAttributeValue = (attrName, defaultValue) => {
        const value = swiperElement.getAttribute(attrName);
        if (!value || value === "default") return defaultValue;
        return value === "true";
      };
      const directionAttribute = swiperElement.getAttribute("swiperDirection") || defaultDirection;
      const startSlideAttribute = swiperElement.getAttribute("swiperSlideStart") || defaultSlideStart;
      const fillEmptySlotsAttribute = swiperElement.getAttribute("swiperFillEmptySlots") || defaultFillEmptySlots.toString();
      const effectAttribute = swiperElement.getAttribute("swiperEffect") || defaultEffect;
      const slidesPerViewSettings = {
        desktop: getSlidesPerViewValue("swiperSlidesPerViewDesktop", defaultSlidesPerViewDesktop),
        tablet: getSlidesPerViewValue("swiperSlidesPerViewTablet", defaultSlidesPerViewTablet),
        mobileLandscape: getSlidesPerViewValue(
          "swiperSlidesPerViewMobileLandscape",
          defaultSlidesPerViewMobileLandscape
        ),
        mobilePortrait: getSlidesPerViewValue(
          "swiperSlidesPerViewMobilePortrait",
          defaultSlidesPerViewMobilePortrait
        )
      };
      const maxSlidesPerView = Math.max(
        slidesPerViewSettings.desktop,
        slidesPerViewSettings.tablet,
        slidesPerViewSettings.mobileLandscape,
        slidesPerViewSettings.mobilePortrait
      );
      const duplicateSlidesToFillSpace = (swiperElement2, slidesPerView) => {
        const slideCount = swiperElement2.querySelectorAll(".swiper-slide").length;
        const containerWidth = swiperElement2.offsetWidth;
        const slideWidth = containerWidth / slidesPerView;
        const slidesToAdd = Math.ceil(containerWidth / slideWidth) - slideCount;
        if (slidesToAdd > 0) {
          const swiperWrapper = swiperElement2.querySelector(".swiper-wrapper");
          const originalSlides = swiperWrapper.innerHTML;
          let duplicateContent = "";
          for (let i = 0; i < slidesToAdd; i++) {
            duplicateContent += originalSlides;
          }
          swiperWrapper.innerHTML += duplicateContent;
        }
      };
      const fillEmptySlots = fillEmptySlotsAttribute === "true" || fillEmptySlotsAttribute === "default" || !fillEmptySlotsAttribute;
      if (fillEmptySlots) {
        duplicateSlidesToFillSpace(swiperElement, maxSlidesPerView);
      }
      const updatedTotalSlides = swiperElement.querySelectorAll(".swiper-slide").length;
      const enoughSlidesForLoop = updatedTotalSlides > maxSlidesPerView;
      const shouldLoop = getBooleanAttributeValue("swiperLoop", defaultLoop) && enoughSlidesForLoop;
      const shouldRewind = !shouldLoop && getBooleanAttributeValue("swiperRewind", defaultRewind);
      const isRTL = directionAttribute === "right-to-left";
      let initialSlideIndex = 0;
      if (startSlideAttribute === "last") {
        initialSlideIndex = updatedTotalSlides - 1;
      } else if (!isNaN(startSlideAttribute) && Number(startSlideAttribute) >= 0) {
        initialSlideIndex = Number(startSlideAttribute);
      }
      const uniqueClass = `swiper-instance-${index}`;
      swiperElement.classList.add(uniqueClass);
      const injectMarqueeCSS = (uniqueClass2) => {
        const marqueeStyle = `
        .${uniqueClass2} .swiper-wrapper {
          -webkit-transition-timing-function: linear !important;
          -o-transition-timing-function: linear !important;
          transition-timing-function: linear !important;
        }
      `;
        const existingStyleElement = document.getElementById(`marquee-style-${uniqueClass2}`);
        if (existingStyleElement) {
          existingStyleElement.remove();
        }
        const styleElement = document.createElement("style");
        styleElement.id = `marquee-style-${uniqueClass2}`;
        styleElement.textContent = marqueeStyle;
        document.head.appendChild(styleElement);
      };
      const autoplayMarqueeEnabled = swiperElement.getAttribute("swiperAutoplayDesktop") === "marquee" || swiperElement.getAttribute("swiperAutoplayTablet") === "marquee" || swiperElement.getAttribute("swiperAutoplayMobileLandscape") === "marquee" || swiperElement.getAttribute("swiperAutoplayMobilePortrait") === "marquee";
      if (autoplayMarqueeEnabled) {
        injectMarqueeCSS(uniqueClass);
      }
      const spaceBetweenSettings = {
        desktop: getSpaceBetweenValue("swiperSpaceBetweenDesktop", defaultSpaceBetweenDesktop),
        tablet: getSpaceBetweenValue("swiperSpaceBetweenTablet", defaultSpaceBetweenTablet),
        mobileLandscape: getSpaceBetweenValue(
          "swiperSpaceBetweenMobileLandscape",
          defaultSpaceBetweenMobileLandscape
        ),
        mobilePortrait: getSpaceBetweenValue(
          "swiperSpaceBetweenMobilePortrait",
          defaultSpaceBetweenMobilePortrait
        )
      };
      const speedSettings = {
        desktop: getSpeedValue("swiperSpeedDesktop"),
        tablet: getSpeedValue("swiperSpeedTablet"),
        mobileLandscape: getSpeedValue("swiperSpeedMobileLandscape"),
        mobilePortrait: getSpeedValue("swiperSpeedMobilePortrait")
      };
      const autoplaySettings = {
        desktop: getAutoplayValue("swiperAutoplayDesktop"),
        tablet: getAutoplayValue("swiperAutoplayTablet"),
        mobileLandscape: getAutoplayValue("swiperAutoplayMobileLandscape"),
        mobilePortrait: getAutoplayValue("swiperAutoplayMobilePortrait")
      };
      const dynamicBulletsSettings = {
        desktop: getDynamicBulletsValue("swiperDynamicBulletsDesktop"),
        tablet: getDynamicBulletsValue("swiperDynamicBulletsTablet"),
        mobileLandscape: getDynamicBulletsValue("swiperDynamicBulletsMobileLandscape"),
        mobilePortrait: getDynamicBulletsValue("swiperDynamicBulletsMobilePortrait")
      };
      const pauseSettings = {
        desktop: getPauseOnMouseEnterValue("swiperPauseOnMouseEnterDesktop"),
        tablet: getPauseOnMouseEnterValue("swiperPauseOnMouseEnterTablet"),
        mobileLandscape: getPauseOnMouseEnterValue("swiperPauseOnMouseEnterMobileLandscape"),
        mobilePortrait: getPauseOnMouseEnterValue("swiperPauseOnMouseEnterMobilePortrait")
      };
      const bulletPaginationEl = swiperNavigation.querySelector(
        ".swiper-pagination.is-bullets.is-standard"
      );
      const defaultBulletClasses = [
        "swiper-pagination-bullet",
        "swiper-bullet-default",
        "is-standard",
        "swiper-pagination-bullet-active"
      ];
      const extraBulletClasses = Array.from(
        bulletPaginationEl ? bulletPaginationEl.children[0].classList : []
      ).filter((item) => !defaultBulletClasses.includes(item));
      const fractionPaginationEl = swiperNavigation.querySelector(
        ".swiper-pagination.is-fraction.is-standard"
      );
      const scrollbarPaginationEl = swiperNavigation.querySelector(
        ".swiper-pagination.swiper-scrollbar.is-standard"
      );
      const progressPaginationEl = swiperNavigation.querySelector(
        ".swiper-pagination.swiper-pagination-progressbar.is-standard"
      );
      const paginationEl = bulletPaginationEl || fractionPaginationEl || progressPaginationEl || scrollbarPaginationEl;
      let effectValue = defaultEffect;
      if (effectAttribute && !["none", "0", "", "default", "slide"].includes(effectAttribute)) {
        effectValue = effectAttribute;
      }
      const effectsRequiringSingleSlide = ["fade", "cube", "flip", "cards"];
      const requiresSingleSlide = effectsRequiringSingleSlide.includes(effectValue);
      const effectOptions = {};
      const initialSlidesPerView = requiresSingleSlide ? 1 : slidesPerViewSettings.mobilePortrait;
      const grabCursorSetting = (() => {
        const value = swiperElement.getAttribute("swiperGrabCursor");
        return value === null || value === "default" || value === "true" || value === "" ? true : false;
      })();
      const getAutoplayConfig = (autoplayValue) => {
        if (autoplayValue) {
          return {
            delay: autoplayValue,
            disableOnInteraction: false,
            reverseDirection: isRTL,
            pauseOnMouseEnter: false,
            enabled: true
          };
        }
        return {
          delay: defaultAutoplayDelay,
          // Set your default delay
          disableOnInteraction: false,
          reverseDirection: isRTL,
          pauseOnMouseEnter: false,
          enabled: false
          // Autoplay is initially disabled
        };
      };
      const nextButton = swiperNavigation.querySelector(
        ".swiper-navigation-button.is-standard.is-next"
      );
      const prevButton = swiperNavigation.querySelector(
        ".swiper-navigation-button.is-standard.is-prev"
      );
      const playButton = swiperNavigation.querySelector(
        ".swiper-navigation-button.is-standard.is-play"
      );
      const pauseButton = swiperNavigation.querySelector(
        ".swiper-navigation-button.is-standard.is-pause"
      );
      const swiper = new Swiper(swiperElement, {
        effect: effectValue,
        ...effectOptions,
        slidesPerView: initialSlidesPerView,
        slidesPerGroup: 1,
        spaceBetween: spaceBetweenSettings.mobilePortrait,
        speed: speedSettings.mobilePortrait,
        initialSlide: initialSlideIndex,
        pagination: {
          el: paginationEl,
          type: bulletPaginationEl ? "bullets" : fractionPaginationEl ? "fraction" : progressPaginationEl ? "progressbar" : "custom",
          dynamicBullets: dynamicBulletsSettings.mobilePortrait,
          renderBullet: bulletPaginationEl ? function(index2, className) {
            return `<button class="${className} ${extraBulletClasses.join(
              " "
            )} swiper-bullet-default is-standard"></button>`;
          } : void 0,
          clickable: !!bulletPaginationEl,
          renderFraction: fractionPaginationEl ? function(currentClass, totalClass) {
            return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
          } : void 0,
          progressbarFillClass: "swiper-pagination-progressbar-fill is-standard"
        },
        scrollbar: {
          el: scrollbarPaginationEl,
          dragClass: "swiper-scrollbar-drag is-standard",
          draggable: true,
          snapOnRelease: false,
          dragSize: "auto"
        },
        autoplay: getAutoplayConfig(autoplaySettings.mobilePortrait),
        loop: shouldLoop,
        loopFillGroupWithBlank: fillEmptySlots,
        rewind: shouldRewind,
        grabCursor: grabCursorSetting,
        breakpoints: {
          992: {
            slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.desktop,
            slidesPerGroup: 1,
            spaceBetween: spaceBetweenSettings.desktop,
            speed: speedSettings.desktop,
            autoplay: getAutoplayConfig(autoplaySettings.desktop),
            pagination: {
              dynamicBullets: dynamicBulletsSettings.desktop
            }
          },
          768: {
            slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.tablet,
            slidesPerGroup: 1,
            spaceBetween: spaceBetweenSettings.tablet,
            speed: speedSettings.tablet,
            autoplay: getAutoplayConfig(autoplaySettings.tablet),
            pagination: {
              dynamicBullets: dynamicBulletsSettings.tablet
            }
          },
          480: {
            slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.mobileLandscape,
            slidesPerGroup: 1,
            spaceBetween: spaceBetweenSettings.mobileLandscape,
            speed: speedSettings.mobileLandscape,
            autoplay: getAutoplayConfig(autoplaySettings.mobileLandscape),
            pagination: {
              dynamicBullets: dynamicBulletsSettings.mobileLandscape
            }
          }
        },
        on: {
          init: function() {
            if (fractionPaginationEl) {
              const fractionText = swiperNavigation.querySelector(".swiper-pagination-fraction-text");
              if (fractionText) {
                fractionText.textContent = `${this.realIndex + 1} / ${this.slides.length}`;
              }
            }
            if (progressPaginationEl) {
              const progressBarFill = progressPaginationEl.querySelector(
                ".swiper-pagination-progressbar-fill"
              );
              if (progressBarFill) {
                const progress = (this.realIndex + 1) / this.slides.length;
                progressBarFill.style.transform = `scaleX(${progress})`;
              }
            }
            updateNavigationVisibility(this);
          },
          slideChange: function() {
            if (fractionPaginationEl) {
              const fractionText = swiperNavigation.querySelector(".swiper-pagination-fraction-text");
              if (fractionText) {
                fractionText.textContent = `${this.realIndex + 1} / ${this.slides.length}`;
              }
            }
            if (progressPaginationEl) {
              const progressBarFill = progressPaginationEl.querySelector(
                ".swiper-pagination-progressbar-fill"
              );
              if (progressBarFill) {
                const progress = (this.realIndex + 1) / this.slides.length;
                progressBarFill.style.transform = `scaleX(${progress})`;
              }
            }
          },
          reachEnd: function() {
            if (!shouldRewind && !shouldLoop) {
              this.autoplay.stop();
            }
          },
          scrollbarDragStart: function() {
            this.autoplay.stop();
            this.params.loop = false;
            this.update();
          },
          scrollbarDragEnd: function() {
            this.params.loop = shouldLoop;
            this.update();
            this.autoplay.start();
          },
          update: function() {
            updateNavigationVisibility(this);
          },
          resize: function() {
            updateNavigationVisibility(this);
          }
        }
      });
      if (requiresSingleSlide) {
        console.warn(
          `The "${effectValue}" effect requires slidesPerView to be 1. Overriding slidesPerView to 1.`
        );
      }
      function updateNavigationVisibility(swiper2) {
        const { isLocked } = swiper2;
        if (nextButton) {
          nextButton.style.display = isLocked ? "none" : "";
        }
        if (prevButton) {
          prevButton.style.display = isLocked ? "none" : "";
        }
        if (playButton) {
          playButton.style.display = isLocked ? "none" : "";
        }
        if (pauseButton) {
          pauseButton.style.display = isLocked ? "none" : "";
        }
        if (fractionPaginationEl) {
          fractionPaginationEl.style.display = isLocked ? "none" : "";
        }
        if (progressPaginationEl) {
          progressPaginationEl.style.display = isLocked ? "none" : "";
        }
      }
      nextButton.addEventListener("click", (event) => {
        event.preventDefault();
        swiper.autoplay.stop();
        swiper.slideNext(defaultSpeed);
      });
      prevButton.addEventListener("click", (event) => {
        event.preventDefault();
        swiper.autoplay.stop();
        swiper.slidePrev(defaultSpeed);
      });
      if (pauseButton) {
        pauseButton.addEventListener("click", (event) => {
          event.preventDefault();
          swiper.autoplay.stop();
        });
      }
      if (playButton) {
        playButton.addEventListener("click", (event) => {
          event.preventDefault();
          swiper.params.autoplay.enabled = true;
          swiper.autoplay.start();
          setTimeout(() => {
            swiper.slideNext();
          }, 50);
        });
      }
      const updatePlayPauseButtons = () => {
        if (swiper.autoplay.running) {
          if (playButton) playButton.disabled = true;
          if (pauseButton) pauseButton.disabled = false;
        } else {
          if (playButton) playButton.disabled = false;
          if (pauseButton) pauseButton.disabled = true;
        }
      };
      updatePlayPauseButtons();
      swiper.on("autoplayStart", () => {
        updatePlayPauseButtons();
      });
      swiper.on("autoplayStop", () => {
        updatePlayPauseButtons();
      });
      const mouseEnterHandler = () => {
        swiper.autoplay.stop();
        swiper.setTranslate(swiper.translate);
      };
      const mouseLeaveHandler = () => {
        swiper.autoplay.start();
      };
      const handlePauseOnMouseEvents = () => {
        const { currentBreakpoint } = swiper;
        let pauseOnMouseEnter = pauseSettings.mobilePortrait;
        if (currentBreakpoint >= 992) {
          pauseOnMouseEnter = pauseSettings.desktop;
        } else if (currentBreakpoint >= 768) {
          pauseOnMouseEnter = pauseSettings.tablet;
        } else if (currentBreakpoint >= 480) {
          pauseOnMouseEnter = pauseSettings.mobileLandscape;
        }
        if (pauseOnMouseEnter) {
          swiperElement.addEventListener("mouseenter", mouseEnterHandler);
          swiperElement.addEventListener("mouseleave", mouseLeaveHandler);
        } else {
          swiperElement.removeEventListener("mouseenter", mouseEnterHandler);
          swiperElement.removeEventListener("mouseleave", mouseLeaveHandler);
        }
      };
      handlePauseOnMouseEvents();
      swiper.on("breakpoint", () => {
        handlePauseOnMouseEvents();
      });
    });
  });
})();
//# sourceMappingURL=index.js.map
