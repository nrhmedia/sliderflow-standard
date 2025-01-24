document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.swiper.is-standard').forEach((swiperElement, index) => {
    const swiperNavigation = swiperElement.parentElement.querySelector(
      '.swiper-navigation.is-standard'
    );

    // Set default values for attributes
    const defaultDirection = 'left-to-right';
    const defaultSlideStart = 'first';
    const defaultFillEmptySlots = true;
    const defaultEffect = 'slide';
    const defaultRewind = true;
    const defaultLoop = false;
    const defaultGrabCursor = true;
    const defaultSpeed = 1000;
    const defaultAutoplayDelay = 5000;
    const defaultFreeMode = true; // Default value for freeMode
    const defaultFreeModeMomentumBounce = true; // Default value for freeModeMomentumBounce
    const defaultCenteredSlides = false; // Default for swiperCenteredSlides

    const defaultSlidesPerViewDesktop = 4;
    const defaultSlidesPerViewTablet = 3;
    const defaultSlidesPerViewMobileLandscape = 2;
    const defaultSlidesPerViewMobilePortrait = 1;

    const defaultSpaceBetweenDesktop = 16;
    const defaultSpaceBetweenTablet = 12;
    const defaultSpaceBetweenMobileLandscape = 8;
    const defaultSpaceBetweenMobilePortrait = 4;

    const marqueeSpeed = 1;

    // Helper functions to retrieve attribute values
    const getSlidesPerViewValue = (attr, defaultValue) => {
      const value = swiperElement.getAttribute(attr);
      if (!value || value === 'default') return defaultValue;
      if (!isNaN(value) && Number(value) > 0) return Number(value);
      return defaultValue;
    };

    const getSpaceBetweenValue = (attr, defaultValue) => {
      const value = swiperElement.getAttribute(attr);
      if (!value || value === 'default') return defaultValue;
      if (!isNaN(value)) return Number(value);
      return defaultValue;
    };

    const getSpeedValue = (attr) => {
      const value = swiperElement.getAttribute(attr);
      if (!value || value === 'default') return defaultSpeed;
      if (!isNaN(value) && Number(value) > 0) return Number(value);
      return defaultSpeed;
    };

    // Adjusted getAutoplayValue function
    const getAutoplayValue = (attr) => {
      const value = swiperElement.getAttribute(attr);
      if (value === 'false') return false;
      if (value === 'marquee') return marqueeSpeed;
      if (value === 'true' || !value || value === 'default') return defaultAutoplayDelay;
      if (!isNaN(value) && Number(value) > 0) return Number(value);
      return defaultAutoplayDelay;
    };

    const getPauseOnMouseEnterValue = (attr) => {
      const value = swiperElement.getAttribute(attr);
      if (!value || value === 'default') return false;
      return value === 'true';
    };

    const getDynamicBulletsValue = (attr) => {
      const value = swiperElement.getAttribute(attr);
      if (!value || value === 'default') return false;
      return value === 'true';
    };

    const getEffectValue = (attrName, defaultValue) => {
      const value = swiperElement.getAttribute(attrName);
      if (value === null || value === 'default' || value === '') {
        return defaultValue;
      }
      return value;
    };

    const getBooleanAttributeValue = (attrName, defaultValue) => {
      const value = swiperElement.getAttribute(attrName);
      if (!value || value === 'default') return defaultValue;
      return value === 'true';
    };

    // Helper function for numeric attributes (e.g., Coverflow effect)
    const getNumericAttributeValue = (attrName, defaultValue) => {
      const value = swiperElement.getAttribute(attrName);
      if (!value || value === 'default') return defaultValue;
      const num = parseFloat(value);
      return isNaN(num) ? defaultValue : num;
    };

    // Helper function for swiperFreeMode
    const getFreeModeValue = (attrName, defaultValue) => {
      const value = swiperElement.getAttribute(attrName);
      if (value === 'false' || value === '0') {
        return false;
      }
      // For 'true', 'default', '', null, or any other value, return true
      return true;
    };

    // Helper function for swiperFreeModeMomentumBounce
    const getFreeModeMomentumBounceValue = (attrName, defaultValue) => {
      const value = swiperElement.getAttribute(attrName);
      if (value === 'false' || value === '0') {
        return false;
      }
      // For 'true', 'default', '', null, or any other value, return true
      return true;
    };

    // NEW: Helper function for slidesPerGroup
    const getSlidesPerGroupValue = (attr) => {
      const value = swiperElement.getAttribute(attr);
      if (!value || value === 'default') return 1;
      const numberValue = Number(value);
      if (!isNaN(numberValue) && numberValue > 0) {
        return numberValue;
      }
      return 1;
    };

    // Retrieve attribute values
    const directionAttribute = swiperElement.getAttribute('swiperDirection') || defaultDirection;
    const startSlideAttribute = swiperElement.getAttribute('swiperSlideStart') || defaultSlideStart;
    const fillEmptySlotsAttribute =
      swiperElement.getAttribute('swiperFillEmptySlots') || defaultFillEmptySlots.toString();
    const effectAttribute = swiperElement.getAttribute('swiperEffect') || defaultEffect;
    // NEW: read centeredSlides attribute
    const centeredSlidesAttribute = getBooleanAttributeValue(
      'swiperCenteredSlides',
      defaultCenteredSlides
    );

    const slidesPerViewSettings = {
      desktop: getSlidesPerViewValue('swiperSlidesPerViewDesktop', defaultSlidesPerViewDesktop),
      tablet: getSlidesPerViewValue('swiperSlidesPerViewTablet', defaultSlidesPerViewTablet),
      mobileLandscape: getSlidesPerViewValue(
        'swiperSlidesPerViewMobileLandscape',
        defaultSlidesPerViewMobileLandscape
      ),
      mobilePortrait: getSlidesPerViewValue(
        'swiperSlidesPerViewMobilePortrait',
        defaultSlidesPerViewMobilePortrait
      ),
    };

    // NEW: slidesPerGroup settings (fixed the mobilePortrait key)
    const slidesPerGroupSettings = {
      desktop: getSlidesPerGroupValue('swiperSlidesPerGroupDesktop'),
      tablet: getSlidesPerGroupValue('swiperSlidesPerGroupTablet'),
      mobileLandscape: getSlidesPerGroupValue('swiperSlidesPerGroupMobileLandscape'),
      mobilePortrait: getSlidesPerGroupValue('swiperSlidesPerGroupMobilePortrait'),
    };

    const maxSlidesPerView = Math.max(
      slidesPerViewSettings.desktop,
      slidesPerViewSettings.tablet,
      slidesPerViewSettings.mobileLandscape,
      slidesPerViewSettings.mobilePortrait
    );

    // Function to duplicate slides if needed
    const duplicateSlidesToFillSpace = (swiperElement, slidesPerView) => {
      const slideCount = swiperElement.querySelectorAll('.swiper-slide').length;
      const containerWidth = swiperElement.offsetWidth;
      const slideWidth = containerWidth / slidesPerView;
      const slidesToAdd = Math.ceil(containerWidth / slideWidth) - slideCount;

      if (slidesToAdd > 0) {
        const swiperWrapper = swiperElement.querySelector('.swiper-wrapper');
        const originalSlides = swiperWrapper.innerHTML;
        let duplicateContent = '';
        for (let i = 0; i < slidesToAdd; i++) {
          duplicateContent += originalSlides;
        }
        swiperWrapper.innerHTML += duplicateContent;
      }
    };

    const fillEmptySlots =
      fillEmptySlotsAttribute === 'true' ||
      fillEmptySlotsAttribute === 'default' ||
      !fillEmptySlotsAttribute;
    if (fillEmptySlots) {
      duplicateSlidesToFillSpace(swiperElement, maxSlidesPerView);
    }

    const updatedTotalSlides = swiperElement.querySelectorAll('.swiper-slide').length;
    const enoughSlidesForLoop = updatedTotalSlides > maxSlidesPerView;

    const shouldLoop = getBooleanAttributeValue('swiperLoop', defaultLoop) && enoughSlidesForLoop;
    const shouldRewind = !shouldLoop && getBooleanAttributeValue('swiperRewind', defaultRewind);
    const isRTL = directionAttribute === 'right-to-left';

    let initialSlideIndex = 0;
    if (startSlideAttribute === 'last') {
      initialSlideIndex = updatedTotalSlides - 1;
    } else if (!isNaN(startSlideAttribute) && Number(startSlideAttribute) >= 0) {
      initialSlideIndex = Number(startSlideAttribute);
    }

    const uniqueClass = `swiper-instance-${index}`;
    swiperElement.classList.add(uniqueClass);

    // Inject CSS for marquee effect if needed
    const injectMarqueeCSS = (uniqueClass) => {
      const marqueeStyle = `
        .${uniqueClass} .swiper-wrapper {
          -webkit-transition-timing-function: linear !important;
          -o-transition-timing-function: linear !important;
          transition-timing-function: linear !important;
        }
      `;

      const existingStyleElement = document.getElementById(`marquee-style-${uniqueClass}`);
      if (existingStyleElement) {
        existingStyleElement.remove();
      }

      const styleElement = document.createElement('style');
      styleElement.id = `marquee-style-${uniqueClass}`;
      styleElement.textContent = marqueeStyle;
      document.head.appendChild(styleElement);
    };

    const autoplayMarqueeEnabled =
      swiperElement.getAttribute('swiperAutoplayDesktop') === 'marquee' ||
      swiperElement.getAttribute('swiperAutoplayTablet') === 'marquee' ||
      swiperElement.getAttribute('swiperAutoplayMobileLandscape') === 'marquee' ||
      swiperElement.getAttribute('swiperAutoplayMobilePortrait') === 'marquee';

    if (autoplayMarqueeEnabled) {
      injectMarqueeCSS(uniqueClass);
    }

    const spaceBetweenSettings = {
      desktop: getSpaceBetweenValue('swiperSpaceBetweenDesktop', defaultSpaceBetweenDesktop),
      tablet: getSpaceBetweenValue('swiperSpaceBetweenTablet', defaultSpaceBetweenTablet),
      mobileLandscape: getSpaceBetweenValue(
        'swiperSpaceBetweenMobileLandscape',
        defaultSpaceBetweenMobileLandscape
      ),
      mobilePortrait: getSpaceBetweenValue(
        'swiperSpaceBetweenMobilePortrait',
        defaultSpaceBetweenMobilePortrait
      ),
    };

    const speedSettings = {
      desktop: getSpeedValue('swiperSpeedDesktop'),
      tablet: getSpeedValue('swiperSpeedTablet'),
      mobileLandscape: getSpeedValue('swiperSpeedMobileLandscape'),
      mobilePortrait: getSpeedValue('swiperSpeedMobilePortrait'),
    };

    const autoplaySettings = {
      desktop: getAutoplayValue('swiperAutoplayDesktop'),
      tablet: getAutoplayValue('swiperAutoplayTablet'),
      mobileLandscape: getAutoplayValue('swiperAutoplayMobileLandscape'),
      mobilePortrait: getAutoplayValue('swiperAutoplayMobilePortrait'),
    };

    const dynamicBulletsSettings = {
      desktop: getDynamicBulletsValue('swiperDynamicBulletsDesktop'),
      tablet: getDynamicBulletsValue('swiperDynamicBulletsTablet'),
      mobileLandscape: getDynamicBulletsValue('swiperDynamicBulletsMobileLandscape'),
      mobilePortrait: getDynamicBulletsValue('swiperDynamicBulletsMobilePortrait'),
    };

    const pauseSettings = {
      desktop: getPauseOnMouseEnterValue('swiperPauseOnMouseEnterDesktop'),
      tablet: getPauseOnMouseEnterValue('swiperPauseOnMouseEnterTablet'),
      mobileLandscape: getPauseOnMouseEnterValue('swiperPauseOnMouseEnterMobileLandscape'),
      mobilePortrait: getPauseOnMouseEnterValue('swiperPauseOnMouseEnterMobilePortrait'),
    };

    const bulletPaginationEl = swiperNavigation.querySelector(
      '.swiper-pagination.is-bullets.is-standard'
    );

    const defaultBulletClasses = [
      'swiper-pagination-bullet',
      'swiper-bullet-default',
      'is-standard',
      'swiper-pagination-bullet-active',
    ];

    const extraBulletClasses = bulletPaginationEl
      ? Array.from(bulletPaginationEl.children)
          .flatMap((child) => Array.from(child.classList))
          .filter((item) => !defaultBulletClasses.includes(item))
      : [];

    const fractionPaginationEl = swiperNavigation.querySelector(
      '.swiper-pagination.is-fraction.is-standard'
    );
    const scrollbarPaginationEl = swiperNavigation.querySelector(
      '.swiper-pagination.swiper-scrollbar.is-standard'
    );
    const progressPaginationEl = swiperNavigation.querySelector(
      '.swiper-pagination.swiper-pagination-progressbar.is-standard'
    );

    const paginationEl =
      bulletPaginationEl || fractionPaginationEl || progressPaginationEl || scrollbarPaginationEl;

    let effectValue = defaultEffect;
    if (effectAttribute && !['none', '0', '', 'default', 'slide'].includes(effectAttribute)) {
      effectValue = effectAttribute;
    }

    const effectsRequiringSingleSlide = ['fade', 'cube', 'flip', 'cards'];
    const requiresSingleSlide = effectsRequiringSingleSlide.includes(effectValue);

    // Prepare effectOptions
    const effectOptions = {};

    // If using coverflow, read the coverflow-related attributes from DOM
    if (effectValue === 'coverflow') {
      effectOptions.coverflowEffect = {
        rotate: getNumericAttributeValue('swiperEffectCoverflowRotate', 50),
        stretch: getNumericAttributeValue('swiperEffectCoverflowStretch', 0),
        depth: getNumericAttributeValue('swiperEffectCoverflowDepth', 100),
        modifier: getNumericAttributeValue('swiperEffectCoverflowModifier', 1),
        slideShadows: getBooleanAttributeValue('swiperEffectCoverflowSlideShadows', true),
        // If your Swiper version supports scale in coverflow, enable it here:
        scale: getNumericAttributeValue('swiperEffectCoverflowScale', 1),
      };
    }

    const initialSlidesPerView = requiresSingleSlide ? 1 : slidesPerViewSettings.mobilePortrait;

    const grabCursorSetting = (() => {
      const value = swiperElement.getAttribute('swiperGrabCursor');
      return value === null || value === 'default' || value === 'true' || value === ''
        ? true
        : false;
    })();

    // Retrieve the freeMode value
    const freeMode = getFreeModeValue('swiperFreeMode', defaultFreeMode);

    // Retrieve the freeModeMomentumBounce value
    const freeModeMomentumBounce = getFreeModeMomentumBounceValue(
      'swiperFreeModeMomentumBounce',
      defaultFreeModeMomentumBounce
    );

    // Function to get autoplay configuration
    const getAutoplayConfig = (autoplayValue) => {
      if (autoplayValue === false) {
        return false;
      }
      if (autoplayValue === 'marquee') {
        return {
          delay: marqueeSpeed,
          disableOnInteraction: false,
          reverseDirection: isRTL,
          pauseOnMouseEnter: false,
          enabled: true,
        };
      }
      if (autoplayValue) {
        return {
          delay: autoplayValue,
          disableOnInteraction: false,
          reverseDirection: isRTL,
          pauseOnMouseEnter: false,
          enabled: true,
        };
      }
      return false;
    };

    // Buttons
    const nextButton = swiperNavigation.querySelector(
      '.swiper-navigation-button.is-standard.is-next'
    );
    const prevButton = swiperNavigation.querySelector(
      '.swiper-navigation-button.is-standard.is-prev'
    );
    const playButton = swiperNavigation.querySelector(
      '.swiper-navigation-button.is-standard.is-play'
    );
    const pauseButton = swiperNavigation.querySelector(
      '.swiper-navigation-button.is-standard.is-pause'
    );

    // Initialize Swiper
    const swiper = new Swiper(swiperElement, {
      effect: effectValue,
      ...effectOptions, // <-- Our coverflowEffect options are spread here
      slidesPerView: initialSlidesPerView,
      slidesPerGroup: slidesPerGroupSettings.mobilePortrait, // <-- Use the new attribute for mobile portrait
      spaceBetween: spaceBetweenSettings.mobilePortrait,
      speed: speedSettings.mobilePortrait,
      initialSlide: initialSlideIndex,
      freeMode: {
        enabled: freeMode, // Enabled or disabled based on swiperFreeMode attribute
        momentumBounce: freeModeMomentumBounce, // Controlled via swiperFreeModeMomentumBounce attribute
      },
      centeredSlides: centeredSlidesAttribute,
      pagination: {
        el: paginationEl,
        type: bulletPaginationEl
          ? 'bullets'
          : fractionPaginationEl
            ? 'fraction'
            : progressPaginationEl
              ? 'progressbar'
              : 'custom',
        dynamicBullets: dynamicBulletsSettings.mobilePortrait,
        renderBullet: bulletPaginationEl
          ? function (index, className) {
              return `<button class="${className} ${extraBulletClasses.join(
                ' '
              )} swiper-bullet-default is-standard"></button>`;
            }
          : undefined,
        clickable: !!bulletPaginationEl,
        renderFraction: fractionPaginationEl
          ? function (currentClass, totalClass) {
              return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
            }
          : undefined,
        progressbarFillClass: 'swiper-pagination-progressbar-fill is-standard',
      },
      scrollbar: {
        el: scrollbarPaginationEl,
        dragClass: 'swiper-scrollbar-drag is-standard',
        draggable: true,
        snapOnRelease: false,
        dragSize: 'auto',
      },
      autoplay: getAutoplayConfig(autoplaySettings.mobilePortrait),
      loop: shouldLoop,
      loopFillGroupWithBlank: fillEmptySlots,
      rewind: shouldRewind,
      grabCursor: grabCursorSetting,
      breakpoints: {
        992: {
          slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.desktop,
          slidesPerGroup: slidesPerGroupSettings.desktop, // <-- Desktop slidesPerGroup
          spaceBetween: spaceBetweenSettings.desktop,
          speed: speedSettings.desktop,
          autoplay: getAutoplayConfig(autoplaySettings.desktop),
          pagination: {
            dynamicBullets: dynamicBulletsSettings.desktop,
          },
          centeredSlides: centeredSlidesAttribute,
        },
        768: {
          slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.tablet,
          slidesPerGroup: slidesPerGroupSettings.tablet, // <-- Tablet slidesPerGroup
          spaceBetween: spaceBetweenSettings.tablet,
          speed: speedSettings.tablet,
          autoplay: getAutoplayConfig(autoplaySettings.tablet),
          pagination: {
            dynamicBullets: dynamicBulletsSettings.tablet,
          },
          centeredSlides: centeredSlidesAttribute,
        },
        480: {
          slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.mobileLandscape,
          slidesPerGroup: slidesPerGroupSettings.mobileLandscape, // <-- Mobile Landscape slidesPerGroup
          spaceBetween: spaceBetweenSettings.mobileLandscape,
          speed: speedSettings.mobileLandscape,
          autoplay: getAutoplayConfig(autoplaySettings.mobileLandscape),
          pagination: {
            dynamicBullets: dynamicBulletsSettings.mobileLandscape,
          },
          centeredSlides: centeredSlidesAttribute,
        },
      },
      on: {
        init: function () {
          if (fractionPaginationEl) {
            const fractionText = swiperNavigation.querySelector('.swiper-pagination-fraction-text');
            if (fractionText) {
              fractionText.textContent = `${this.realIndex + 1} / ${this.slides.length}`;
            }
          }

          if (progressPaginationEl) {
            const progressBarFill = progressPaginationEl.querySelector(
              '.swiper-pagination-progressbar-fill'
            );
            if (progressBarFill) {
              const progress = (this.realIndex + 1) / this.slides.length;
              progressBarFill.style.transform = `scaleX(${progress})`;
            }
          }

          updateNavigationVisibility(this);
        },
        slideChange: function () {
          if (fractionPaginationEl) {
            const fractionText = swiperNavigation.querySelector('.swiper-pagination-fraction-text');
            if (fractionText) {
              fractionText.textContent = `${this.realIndex + 1} / ${this.slides.length}`;
            }
          }

          if (progressPaginationEl) {
            const progressBarFill = progressPaginationEl.querySelector(
              '.swiper-pagination-progressbar-fill'
            );
            if (progressBarFill) {
              const progress = (this.realIndex + 1) / this.slides.length;
              progressBarFill.style.transform = `scaleX(${progress})`;
            }
          }
        },
        reachEnd: function () {
          if (!shouldRewind && !shouldLoop) {
            this.autoplay.stop();
          }
        },
        scrollbarDragStart: function () {
          this.autoplay.stop();
          this.params.loop = false;
          this.update();
        },
        scrollbarDragEnd: function () {
          this.params.loop = shouldLoop;
          this.update();
          this.autoplay.start();
        },
        update: function () {
          updateNavigationVisibility(this);
        },
        resize: function () {
          updateNavigationVisibility(this);
        },
      },
    });

    if (requiresSingleSlide) {
      console.warn(
        `The "${effectValue}" effect requires slidesPerView to be 1. Overriding slidesPerView to 1.`
      );
    }

    // Define the updateNavigationVisibility function
    function updateNavigationVisibility(swiperInstance) {
      const { isLocked } = swiperInstance;

      if (nextButton) {
        nextButton.style.display = isLocked ? 'none' : '';
      }
      if (prevButton) {
        prevButton.style.display = isLocked ? 'none' : '';
      }
      if (playButton) {
        playButton.style.display = isLocked ? 'none' : '';
      }
      if (pauseButton) {
        pauseButton.style.display = isLocked ? 'none' : '';
      }
      if (fractionPaginationEl) {
        fractionPaginationEl.style.display = isLocked ? 'none' : '';
      }
      if (progressPaginationEl) {
        progressPaginationEl.style.display = isLocked ? 'none' : '';
      }
    }

    // Existing event listeners for next and previous buttons
    if (nextButton) {
      nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        swiper.autoplay.stop();
        swiper.slideNext(defaultSpeed);
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', (event) => {
        event.preventDefault();
        swiper.autoplay.stop();
        swiper.slidePrev(defaultSpeed);
      });
    }

    // Add event listener for the pause button
    if (pauseButton) {
      pauseButton.addEventListener('click', (event) => {
        event.preventDefault();
        swiper.autoplay.stop();
      });
    }

    // Add event listener for the play button
    if (playButton) {
      playButton.addEventListener('click', (event) => {
        event.preventDefault();
        // Enable autoplay in Swiper parameters
        swiper.params.autoplay.enabled = true;
        swiper.autoplay.start();
        // Introduce a slight delay before advancing to the next slide
        setTimeout(() => {
          swiper.slideNext();
        }, 50); // Delay in milliseconds
      });
    }

    // Initialize buttons' disabled state
    const updatePlayPauseButtons = () => {
      if (swiper.autoplay.running) {
        if (playButton) playButton.disabled = true;
        if (pauseButton) pauseButton.disabled = false;
      } else {
        if (playButton) playButton.disabled = false;
        if (pauseButton) pauseButton.disabled = true;
      }
    };

    // Initial update of buttons
    updatePlayPauseButtons();

    // Update buttons on autoplay start/stop
    swiper.on('autoplayStart', () => {
      updatePlayPauseButtons();
    });

    swiper.on('autoplayStop', () => {
      updatePlayPauseButtons();
    });

    // Handle pause on mouse events
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
        swiperElement.addEventListener('mouseenter', mouseEnterHandler);
        swiperElement.addEventListener('mouseleave', mouseLeaveHandler);
      } else {
        swiperElement.removeEventListener('mouseenter', mouseEnterHandler);
        swiperElement.removeEventListener('mouseleave', mouseLeaveHandler);
      }
    };

    handlePauseOnMouseEvents();

    swiper.on('breakpoint', () => {
      handlePauseOnMouseEvents();
    });
  });
});
</script>

<!-- [Web Bae] Copy Component -->
<script>
// Function to handle the copy operation
const handleCopy = (copyButton, dataAttribute) => {
  const buttonText = copyButton.querySelector('[wb-data="text"]');
  buttonText.textContent = "Copying..."; // Inform user operation in progress

  const copyData = (event) => {
    event.preventDefault();
    const componentData = copyButton.querySelector(`[wb-data="${dataAttribute}"]`).textContent;

    // Determine if content is JSON or plain text
    try {
      JSON.parse(componentData);
      // If valid JSON, set it as JSON data
      event.clipboardData.setData("application/json", componentData);
    } catch (e) {
      // If not JSON, set as plain text
      event.clipboardData.setData("text/plain", componentData);
    }
  };

  // Listen for copy event
  document.addEventListener("copy", copyData);
  document.execCommand("copy"); // Execute copy command
  document.removeEventListener("copy", copyData); // Remove listener

  // Restore button text after 1 second
  setTimeout(() => {
    buttonText.textContent = "Done! Copy again?";
  }, 1000);
};

// Get all copy buttons
const copyButtons = document.querySelectorAll("[wb-data=copy-button]");

// Attach click event listeners to each copy button
copyButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const dataAttribute = button.getAttribute("wb-data-copy-target"); // Determine which data attribute to copy
    handleCopy(button, dataAttribute);
  });
});