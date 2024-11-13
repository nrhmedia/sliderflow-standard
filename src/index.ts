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

  // Retrieve attributes or set to default if not provided or set to 'default'
  const rewindAttributeValue = swiperElement.getAttribute('swiperRewind');
  const loopAttributeValue = swiperElement.getAttribute('swiperLoop');
  const directionAttribute = swiperElement.getAttribute('swiperDirection') || defaultDirection;
  const startSlideAttribute = swiperElement.getAttribute('swiperSlideStart') || defaultSlideStart;
  const fillEmptySlotsAttribute =
    swiperElement.getAttribute('swiperFillEmptySlots') || defaultFillEmptySlots.toString();
  const effectAttribute = swiperElement.getAttribute('swiperEffect') || defaultEffect;
  const fadeCrossfadeAttribute = swiperElement.getAttribute('swiperEffectFadeCrossfade');

  // Attributes for Coverflow effect
  const coverflowDepthAttribute = swiperElement.getAttribute('swiperEffectCoverflowDepth');
  const coverflowModifierAttribute = swiperElement.getAttribute('swiperEffectCoverflowModifier');
  const coverflowRotateAttribute = swiperElement.getAttribute('swiperEffectCoverflowRotate');
  const coverflowScaleAttribute = swiperElement.getAttribute('swiperEffectCoverflowScale');
  const coverflowStretchAttribute = swiperElement.getAttribute('swiperEffectCoverflowStretch');
  const coverflowSlideShadowsAttribute = swiperElement.getAttribute(
    'swiperEffectCoverflowSlideShadows'
  );

  // Attributes for Flip effect
  const flipLimitRotationAttribute = swiperElement.getAttribute('swiperEffectFlipLimitRotation');
  const flipSlideShadowsAttribute = swiperElement.getAttribute('swiperEffectFlipSlideShadows');

  // Attributes for Cube effect
  const cubeShadowAttribute = swiperElement.getAttribute('swiperEffectCubeShadow');
  const cubeSlideShadowsAttribute = swiperElement.getAttribute('swiperEffectCubeSlideShadows');
  const cubeShadowOffsetAttribute = swiperElement.getAttribute(
    'swiperEffectCubeShadowShadowOffset'
  );
  const cubeShadowScaleAttribute = swiperElement.getAttribute('swiperEffectCubeShadowShadowScale');

  // Attributes for Cards effect
  const cardsPerSlideOffsetAttribute = swiperElement.getAttribute(
    'swiperEffectCardsPerSlideOffset'
  );
  const cardsPerSlideRotateAttribute = swiperElement.getAttribute(
    'swiperEffectCardsPerSlideRotate'
  );
  const cardsRotateAttribute = swiperElement.getAttribute('swiperEffectCardsRotate');
  const cardsSlideShadowsAttribute = swiperElement.getAttribute('swiperEffectCardsSlideShadows');

  const defaultSpeed = 1000; // Default speed for manual interactions
  const defaultAutoplayDelay = 5000; // Default autoplay delay

  // Define default slides per view for each breakpoint
  const defaultSlidesPerViewDesktop = 4;
  const defaultSlidesPerViewTablet = 3;
  const defaultSlidesPerViewMobileLandscape = 2;
  const defaultSlidesPerViewMobilePortrait = 1;

  // Define default space between slides for each breakpoint
  const defaultSpaceBetweenDesktop = 16;
  const defaultSpaceBetweenTablet = 12;
  const defaultSpaceBetweenMobileLandscape = 8;
  const defaultSpaceBetweenMobilePortrait = 0;

  const marqueeSpeed = 1; // Speed for marquee mode

  // Helper functions
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
    if (value === 'true') return defaultSpeed;
    if (!isNaN(value) && Number(value) > 0) return Number(value);
    return defaultSpeed; // Return defaultSpeed if invalid value
  };

  const getAutoplayValue = (attr) => {
    const value = swiperElement.getAttribute(attr);
    if (!value || value === 'default') return defaultAutoplayDelay;
    if (value === 'marquee') return marqueeSpeed;
    if (value === 'true') return defaultAutoplayDelay;
    if (!isNaN(value) && Number(value) > 0) return Number(value);
    return false;
  };

  const getPauseOnMouseEnterValue = (attr) => {
    const value = swiperElement.getAttribute(attr);
    if (!value || value === 'default') return false; // Changed to false
    return value === 'true';
  };

  const getDynamicBulletsValue = (attr) => {
    const value = swiperElement.getAttribute(attr);
    if (!value || value === 'default') return false; // Changed to false
    return value === 'true';
  };

  // Helper function for effect numeric values
  const getEffectValue = (attrName, defaultValue) => {
    const value = swiperElement.getAttribute(attrName);
    if (!value || value === 'default' || value === '0' || value === '') {
      return defaultValue;
    }
    if (!isNaN(value)) {
      return Number(value);
    }
    return defaultValue;
  };

  // Helper function for boolean effect options
  const getBooleanEffectOption = (attrName, defaultValue = true) => {
    const value = swiperElement.getAttribute(attrName);
    if (!value || value === 'default') return defaultValue;
    if (value === '0' || value === 'false') {
      return false;
    }
    // For 'true' or any other value, return true
    return true;
  };

  // Helper function for boolean attributes with default values
  const getBooleanAttributeValue = (attrName, defaultValue) => {
    const value = swiperElement.getAttribute(attrName);
    if (!value || value === 'default') return defaultValue;
    return value === 'true';
  };

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

  // Determine the maximum slidesPerView value across breakpoints
  const maxSlidesPerView = Math.max(
    slidesPerViewSettings.desktop,
    slidesPerViewSettings.tablet,
    slidesPerViewSettings.mobileLandscape,
    slidesPerViewSettings.mobilePortrait
  );

  const totalSlides = swiperElement.querySelectorAll('.swiper-slide').length;

  // Manually duplicate slides to fill the visible space before initializing Swiper
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

  // Ensure slides are duplicated based on 'swiperFillEmptySlots'
  const fillEmptySlots =
    fillEmptySlotsAttribute === 'true' ||
    fillEmptySlotsAttribute === 'default' ||
    !fillEmptySlotsAttribute;
  if (fillEmptySlots) {
    duplicateSlidesToFillSpace(swiperElement, maxSlidesPerView);
  }

  // Recalculate total slides after possible duplication
  const updatedTotalSlides = swiperElement.querySelectorAll('.swiper-slide').length;

  // Determine if there are enough slides to enable looping
  const enoughSlidesForLoop = updatedTotalSlides > maxSlidesPerView;

  // Adjust shouldLoop and shouldRewind based on attributes
  const shouldLoop = getBooleanAttributeValue('swiperLoop', defaultLoop) && enoughSlidesForLoop;
  const shouldRewind = !shouldLoop && getBooleanAttributeValue('swiperRewind', defaultRewind);

  const isRTL = directionAttribute === 'right-to-left';

  let initialSlideIndex = 0;
  if (startSlideAttribute === 'last') {
    initialSlideIndex = updatedTotalSlides - 1;
  } else if (!isNaN(startSlideAttribute) && Number(startSlideAttribute) >= 0) {
    initialSlideIndex = Number(startSlideAttribute);
  }

  // Generate a unique class for this Swiper instance
  const uniqueClass = `swiper-instance-${index}`;

  // Apply unique class to the Swiper element
  swiperElement.classList.add(uniqueClass);

  // Inject marquee CSS globally but scoped to this specific Swiper instance
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

  // Inject the marquee CSS if autoplay is set to "marquee"
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
  const extraBulletClasses = Array.from(
    bulletPaginationEl ? bulletPaginationEl.children[0].classList : []
  ).filter((item) => !defaultBulletClasses.includes(item));

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

  // Determine the Swiper effect
  let effectValue = defaultEffect; // Default effect is 'slide'
  if (effectAttribute && !['none', '0', '', 'default', 'slide'].includes(effectAttribute)) {
    effectValue = effectAttribute;
  }

  // List of effects that require slidesPerView: 1
  const effectsRequiringSingleSlide = ['fade', 'cube', 'flip', 'cards'];

  // Check if the current effect requires slidesPerView: 1
  const requiresSingleSlide = effectsRequiringSingleSlide.includes(effectValue);

  // Effect-specific options
  const effectOptions = {};

  if (effectValue === 'fade') {
    // Handle the swiperEffectFadeCrossfade attribute
    const crossFadeValue = getBooleanEffectOption('swiperEffectFadeCrossfade');

    effectOptions.fadeEffect = { crossFade: crossFadeValue };
  } else if (effectValue === 'cube') {
    // Get cube effect options
    const cubeShadow = getBooleanEffectOption('swiperEffectCubeShadow');
    const cubeSlideShadows = getBooleanEffectOption('swiperEffectCubeSlideShadows');

    // Get cube shadow offset and scale values
    const cubeShadowOffset = getEffectValue('swiperEffectCubeShadowShadowOffset', 20);
    const cubeShadowScale = getEffectValue('swiperEffectCubeShadowShadowScale', 0.94);

    effectOptions.cubeEffect = {
      shadow: cubeShadow,
      slideShadows: cubeSlideShadows,
      shadowOffset: cubeShadowOffset,
      shadowScale: cubeShadowScale,
    };
  } else if (effectValue === 'coverflow') {
    // Get Coverflow effect values
    const coverflowDefaults = {
      depth: 100,
      modifier: 1,
      rotate: 50,
      scale: 1,
      stretch: 0,
    };

    const coverflowRotate = getEffectValue('swiperEffectCoverflowRotate', coverflowDefaults.rotate);
    const coverflowStretch = getEffectValue(
      'swiperEffectCoverflowStretch',
      coverflowDefaults.stretch
    );
    const coverflowDepth = getEffectValue('swiperEffectCoverflowDepth', coverflowDefaults.depth);
    const coverflowModifier = getEffectValue(
      'swiperEffectCoverflowModifier',
      coverflowDefaults.modifier
    );
    const coverflowScale = getEffectValue('swiperEffectCoverflowScale', coverflowDefaults.scale);

    // Handle the swiperEffectCoverflowSlideShadows attribute
    const coverflowSlideShadows = getBooleanEffectOption('swiperEffectCoverflowSlideShadows');

    effectOptions.coverflowEffect = {
      rotate: coverflowRotate,
      stretch: coverflowStretch,
      depth: coverflowDepth,
      modifier: coverflowModifier,
      scale: coverflowScale,
      slideShadows: coverflowSlideShadows,
    };
  } else if (effectValue === 'flip') {
    // Get flip effect options
    const flipLimitRotation = getBooleanEffectOption('swiperEffectFlipLimitRotation');
    const flipSlideShadows = getBooleanEffectOption('swiperEffectFlipSlideShadows');

    effectOptions.flipEffect = {
      slideShadows: flipSlideShadows,
      limitRotation: flipLimitRotation,
    };
  } else if (effectValue === 'cards') {
    // Get cards effect options
    const cardsPerSlideOffset = getEffectValue('swiperEffectCardsPerSlideOffset', 8);
    const cardsPerSlideRotate = getEffectValue('swiperEffectCardsPerSlideRotate', 2);
    const cardsRotate = getBooleanEffectOption('swiperEffectCardsRotate');
    const cardsSlideShadows = getBooleanEffectOption('swiperEffectCardsSlideShadows');

    effectOptions.cardsEffect = {
      perSlideOffset: cardsPerSlideOffset,
      perSlideRotate: cardsPerSlideRotate,
      rotate: cardsRotate,
      slideShadows: cardsSlideShadows,
    };
  } else if (effectValue === 'creative') {
    effectOptions.creativeEffect = {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: [0, 0, -400],
      },
    };
  }

  // Adjust slidesPerView if the effect requires a single slide
  const initialSlidesPerView = requiresSingleSlide ? 1 : slidesPerViewSettings.mobilePortrait;

  // Initialize Swiper
  const swiper = new Swiper(swiperElement, {
    effect: effectValue,
    ...effectOptions,
    slidesPerView: initialSlidesPerView,
    slidesPerGroup: 1, // Ensure it moves one slide at a time
    spaceBetween: spaceBetweenSettings.mobilePortrait,
    speed: speedSettings.mobilePortrait,
    initialSlide: initialSlideIndex,
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
    autoplay: autoplaySettings.mobilePortrait
      ? {
          delay: autoplaySettings.mobilePortrait,
          disableOnInteraction: false,
          reverseDirection: isRTL,
          pauseOnMouseEnter: false,
        }
      : false,
    loop: shouldLoop,
    loopFillGroupWithBlank: fillEmptySlots,
    rewind: shouldRewind,
    grabCursor: true, // Enable the grab cursor
    breakpoints: {
      992: {
        slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.desktop,
        slidesPerGroup: 1, // Ensure it moves one slide at a time
        spaceBetween: spaceBetweenSettings.desktop,
        speed: speedSettings.desktop,
        autoplay: autoplaySettings.desktop
          ? {
              delay: autoplaySettings.desktop,
              disableOnInteraction: false,
              reverseDirection: isRTL,
            }
          : false,
        pagination: {
          dynamicBullets: dynamicBulletsSettings.desktop,
        },
      },
      768: {
        slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.tablet,
        slidesPerGroup: 1, // Ensure it moves one slide at a time
        spaceBetween: spaceBetweenSettings.tablet,
        speed: speedSettings.tablet,
        autoplay: autoplaySettings.tablet
          ? {
              delay: autoplaySettings.tablet,
              disableOnInteraction: false,
              reverseDirection: isRTL,
            }
          : false,
        pagination: {
          dynamicBullets: dynamicBulletsSettings.tablet,
        },
      },
      480: {
        slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.mobileLandscape,
        slidesPerGroup: 1, // Ensure it moves one slide at a time
        spaceBetween: spaceBetweenSettings.mobileLandscape,
        speed: speedSettings.mobileLandscape,
        autoplay: autoplaySettings.mobileLandscape
          ? {
              delay: autoplaySettings.mobileLandscape,
              disableOnInteraction: false,
              reverseDirection: isRTL,
            }
          : false,
        pagination: {
          dynamicBullets: dynamicBulletsSettings.mobileLandscape,
        },
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
        // Stop autoplay if swiperRewind and swiperLoop are both false
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
    },
  });

  // Optional: Warn the user if slidesPerView is overridden
  if (requiresSingleSlide) {
    console.warn(
      `The "${effectValue}" effect requires slidesPerView to be 1. Overriding slidesPerView to 1.`
    );
  }

  // Manually handle the navigation buttons
  const nextButton = swiperNavigation.querySelector(
    '.swiper-navigation-button.is-standard.is-next'
  );
  const prevButton = swiperNavigation.querySelector(
    '.swiper-navigation-button.is-standard.is-prev'
  );

  nextButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent any default action
    swiper.autoplay.stop();
    swiper.slideNext(defaultSpeed);
  });

  prevButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent any default action
    swiper.autoplay.stop();
    swiper.slidePrev(defaultSpeed);
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
