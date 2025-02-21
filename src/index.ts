// Helper: Force a full update and reinitialization of pagination on a swiper instance.
function updateSwiperAfterVisible(swiperInstance) {
  if (!swiperInstance) return;

  // Update size, slides, and progress.
  swiperInstance.updateSize();
  swiperInstance.updateSlides();
  swiperInstance.updateProgress();

  // Reinitialize pagination if it exists.
  if (swiperInstance.pagination) {
    swiperInstance.pagination.destroy();
    swiperInstance.pagination.init();
    swiperInstance.pagination.render();
    swiperInstance.pagination.update();
  }

  // Manually update fraction text if it exists.
  const swiperEl = swiperInstance.el;
  const swiperNav = swiperEl.parentElement.querySelector('.swiper-navigation.is-standard');
  if (swiperNav) {
    const fractionEl = swiperNav.querySelector('.swiper-pagination-fraction-text');
    if (fractionEl) {
      fractionEl.textContent = `${swiperInstance.realIndex + 1} / ${swiperInstance.slides.length}`;
    }
  }

  // Force re-render the current slide (0ms transition).
  swiperInstance.slideTo(swiperInstance.realIndex, 0, false);
}

// this will run after DOMContentLoaded.
function checkRichTextCopied() {
  // If Finsweet RichText has been added.
  if (document.querySelector('[fs-richtext-component]')) {
    initializeSwipers();
    // After Rich Text loads, wait a moment then force update on all swipers.
    setTimeout(function () {
      document.querySelectorAll('.swiper.is-standard').forEach((swiperElement) => {
        if (swiperElement.swiper) {
          updateSwiperAfterVisible(swiperElement.swiper);
        }
      });
    }, 500);
  } else {
    setTimeout(function () {
      checkRichTextCopied();
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize swipers if loaded normally.
  initializeSwipers();
  checkRichTextCopied();
});

function initializeSwipers() {
  document.querySelectorAll('.swiper.is-standard').forEach((swiperElement, index) => {
    // Duplicate any attribute that has "Desktop" in its name.
    swiperElement.getAttributeNames().forEach((attrName) => {
      if (attrName.includes('Desktop')) {
        const newAttrName = attrName.replace('Desktop', '');
        swiperElement.setAttribute(newAttrName, swiperElement.getAttribute(attrName));
      }
    });

    const swiperNavigation = swiperElement.parentElement.querySelector(
      '.swiper-navigation.is-standard'
    );

    // -----------------------------------------------------------
    // Set default values for attributes
    // -----------------------------------------------------------
    let defaultSpeed = 1000;
    const anyMarquee =
      swiperElement.getAttribute('swiperAutoplayDesktop') === 'marquee' ||
      swiperElement.getAttribute('swiperAutoplayTablet') === 'marquee' ||
      swiperElement.getAttribute('swiperAutoplayMobileLandscape') === 'marquee' ||
      swiperElement.getAttribute('swiperAutoplayMobilePortrait') === 'marquee';
    if (anyMarquee) {
      defaultSpeed = 5000;
    }
    const defaultDirection = 'horizontal';
    const defaultSlideStart = 'first';
    const defaultFillEmptySlots = true;
    const defaultEffect = 'slide';
    const defaultRewind = true;
    const defaultLoop = false;
    const defaultGrabCursor = true;
    const defaultAutoplayDelay = 5000;
    const defaultFreeMode = true;
    const defaultFreeModeMomentumBounce = true;
    const defaultCenteredSlides = false;
    const defaultSlidesPerViewDesktop = 4;
    const defaultSlidesPerViewTablet = 3;
    const defaultSlidesPerViewMobileLandscape = 2;
    const defaultSlidesPerViewMobilePortrait = 1;
    const defaultSpaceBetweenDesktop = 16;
    const defaultSpaceBetweenTablet = 12;
    const defaultSpaceBetweenMobileLandscape = 8;
    const defaultSpaceBetweenMobilePortrait = 4;
    const marqueeSpeed = 1;

    // -----------------------------------------------------------
    // Helper functions (omitted here for brevity; they remain unchanged)
    // -----------------------------------------------------------
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
    const getNumericAttributeValue = (attrName, defaultValue) => {
      const value = swiperElement.getAttribute(attrName);
      if (!value || value === 'default') return defaultValue;
      const num = parseFloat(value);
      return isNaN(num) ? defaultValue : num;
    };
    const getFreeModeValue = (attrName, defaultValue) => {
      const value = swiperElement.getAttribute(attrName);
      if (value === 'false' || value === '0') {
        return false;
      }
      return true;
    };
    const getFreeModeMomentumBounceValue = (attrName, defaultValue) => {
      const value = swiperElement.getAttribute(attrName);
      if (value === 'false' || value === '0') {
        return false;
      }
      return true;
    };
    const getSlidesPerGroupValue = (attr) => {
      const value = swiperElement.getAttribute(attr);
      if (!value || value === 'default') return 1;
      const numberValue = Number(value);
      if (!isNaN(numberValue) && numberValue > 0) {
        return numberValue;
      }
      return 1;
    };
    const getAllowTouchMoveValue = (attrName) => {
      const value = swiperElement.getAttribute(attrName);
      if (value === 'false' || value === '0') {
        return false;
      }
      return true;
    };
    const getStringAttributeValue = (attrName, defaultValue) => {
      const value = swiperElement.getAttribute(attrName);
      if (!value || value === 'default') return defaultValue;
      return value;
    };

    // -----------------------------------------------------------
    // Retrieve attribute values from the DOM
    // -----------------------------------------------------------
    const directionAttr = (swiperElement.getAttribute('swiperDirection') || '').toLowerCase();
    let finalDirection = defaultDirection;
    if (directionAttr === 'vertical') {
      finalDirection = 'vertical';
    }
    const reverseAttr = swiperElement.getAttribute('swiperReverseDirection');
    const autoplayReverse = reverseAttr === 'true';
    const startSlideAttribute = swiperElement.getAttribute('swiperSlideStart') || 'first';
    const fillEmptySlotsAttribute =
      swiperElement.getAttribute('swiperFillEmptySlots') || defaultFillEmptySlots.toString();
    const effectAttribute = swiperElement.getAttribute('swiperEffect') || defaultEffect;
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

    // --- NEW: Breakpoint-specific settings for direction, grabCursor, freeMode, and centeredSlides ---
    const directionSettings = {
      desktop: getStringAttributeValue('swiperDirectionDesktop', finalDirection).toLowerCase(),
      tablet: getStringAttributeValue('swiperDirectionTablet', finalDirection).toLowerCase(),
      mobileLandscape: getStringAttributeValue(
        'swiperDirectionMobileLandscape',
        finalDirection
      ).toLowerCase(),
      mobilePortrait: getStringAttributeValue(
        'swiperDirectionMobilePortrait',
        finalDirection
      ).toLowerCase(),
    };
    const grabCursorSettings = {
      desktop: getBooleanAttributeValue('swiperGrabCursorDesktop', defaultGrabCursor),
      tablet: getBooleanAttributeValue('swiperGrabCursorTablet', defaultGrabCursor),
      mobileLandscape: getBooleanAttributeValue(
        'swiperGrabCursorMobileLandscape',
        defaultGrabCursor
      ),
      mobilePortrait: getBooleanAttributeValue('swiperGrabCursorMobilePortrait', defaultGrabCursor),
    };
    const freeMode = getFreeModeValue('swiperFreeMode', defaultFreeMode);
    const freeModeMomentumBounce = getFreeModeMomentumBounceValue(
      'swiperFreeModeMomentumBounce',
      defaultFreeModeMomentumBounce
    );
    const freeModeSettings = {
      desktop: getFreeModeValue('swiperFreeModeDesktop', freeMode),
      tablet: getFreeModeValue('swiperFreeModeTablet', freeMode),
      mobileLandscape: getFreeModeValue('swiperFreeModeMobileLandscape', freeMode),
      mobilePortrait: getFreeModeValue('swiperFreeModeMobilePortrait', freeMode),
    };
    const centeredSlidesSettings = {
      desktop: getBooleanAttributeValue('swiperCenteredSlidesDesktop', centeredSlidesAttribute),
      tablet: getBooleanAttributeValue('swiperCenteredSlidesTablet', centeredSlidesAttribute),
      mobileLandscape: getBooleanAttributeValue(
        'swiperCenteredSlidesMobileLandscape',
        centeredSlidesAttribute
      ),
      mobilePortrait: getBooleanAttributeValue(
        'swiperCenteredSlidesMobilePortrait',
        centeredSlidesAttribute
      ),
    };

    // -----------------------------------------------------------
    // Duplicate slides if needed.
    // -----------------------------------------------------------
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
    let initialSlideIndex = 0;
    if (startSlideAttribute === 'last') {
      initialSlideIndex = updatedTotalSlides - 1;
    } else if (!isNaN(startSlideAttribute) && Number(startSlideAttribute) >= 0) {
      initialSlideIndex = Number(startSlideAttribute);
    }
    const uniqueClass = `swiper-instance-${index}`;
    swiperElement.classList.add(uniqueClass);

    // Inject CSS for marquee effect if needed.
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

    // ---------------------------------------------------------------------
    // NEW: Parallax by breakpoint
    // ---------------------------------------------------------------------
    const parallaxContainer = swiperElement.querySelector('[swiperParallaxContainer="true"]');
    const hasParallaxContainer = parallaxContainer !== null;
    const parentWantsParallaxDesktop = getBooleanAttributeValue('swiperParallaxDesktop', false);
    const parentWantsParallaxTablet = getBooleanAttributeValue('swiperParallaxTablet', false);
    const parentWantsParallaxMobileLandscape = getBooleanAttributeValue(
      'swiperParallaxMobileLandscape',
      false
    );
    const parentWantsParallaxMobilePortrait = getBooleanAttributeValue(
      'swiperParallaxMobilePortrait',
      false
    );
    const parallaxEnabledDesktop = parentWantsParallaxDesktop && hasParallaxContainer;
    const parallaxEnabledTablet = parentWantsParallaxTablet && hasParallaxContainer;
    const parallaxEnabledMobileLandscape =
      parentWantsParallaxMobileLandscape && hasParallaxContainer;
    const parallaxEnabledMobilePortrait = parentWantsParallaxMobilePortrait && hasParallaxContainer;

    // ---------------------------------------------------------------------
    // NEW: AllowTouchMove by breakpoint
    // ---------------------------------------------------------------------
    const allowTouchMoveDesktop = getAllowTouchMoveValue('swiperAllowTouchMoveDesktop');
    const allowTouchMoveTablet = getAllowTouchMoveValue('swiperAllowTouchMoveTablet');
    const allowTouchMoveMobileLandscape = getAllowTouchMoveValue(
      'swiperAllowTouchMoveMobileLandscape'
    );
    const allowTouchMoveMobilePortrait = getAllowTouchMoveValue(
      'swiperAllowTouchMoveMobilePortrait'
    );

    // ---------------------------------------------------------------------
    // Determine the effect
    // ---------------------------------------------------------------------
    let effectValue = defaultEffect;
    if (effectAttribute && !['none', '0', '', 'default', 'slide'].includes(effectAttribute)) {
      effectValue = effectAttribute;
    }
    const effectsRequiringSingleSlide = ['fade', 'cube', 'flip', 'cards'];
    const requiresSingleSlide = effectsRequiringSingleSlide.includes(effectValue);
    const effectOptions = {};
    if (effectValue === 'coverflow') {
      effectOptions.coverflowEffect = {
        rotate: getNumericAttributeValue('swiperEffectCoverflowRotate', 50),
        stretch: getNumericAttributeValue('swiperEffectCoverflowStretch', 0),
        depth: getNumericAttributeValue('swiperEffectCoverflowDepth', 100),
        modifier: getNumericAttributeValue('swiperEffectCoverflowModifier', 1),
        slideShadows: getBooleanAttributeValue('swiperEffectCoverflowSlideShadows', true),
        scale: getNumericAttributeValue('swiperEffectCoverflowScale', 1),
      };
    }
    const initialSlidesPerView = requiresSingleSlide ? 1 : slidesPerViewSettings.mobilePortrait;
    const allowTouchMoveBase = allowTouchMoveMobilePortrait;

    function getAutoplayConfig(autoplayValue) {
      if (autoplayValue === false) {
        return false;
      }
      if (autoplayValue === 'marquee') {
        return {
          delay: marqueeSpeed,
          disableOnInteraction: false,
          reverseDirection: autoplayReverse,
          pauseOnMouseEnter: false,
          enabled: true,
        };
      }
      if (autoplayValue) {
        return {
          delay: autoplayValue,
          disableOnInteraction: false,
          reverseDirection: autoplayReverse,
          pauseOnMouseEnter: false,
          enabled: true,
        };
      }
      return false;
    }

    // Buttons
    const nextButton = swiperNavigation?.querySelector(
      '.swiper-navigation-button.is-standard.is-next'
    );
    const prevButton = swiperNavigation?.querySelector(
      '.swiper-navigation-button.is-standard.is-prev'
    );
    const playButton = swiperNavigation?.querySelector(
      '.swiper-navigation-button.is-standard.is-play'
    );
    const pauseButton = swiperNavigation?.querySelector(
      '.swiper-navigation-button.is-standard.is-pause'
    );
    const bulletPaginationEl = swiperNavigation?.querySelector(
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
    const fractionPaginationEl = swiperNavigation?.querySelector(
      '.swiper-pagination.is-fraction.is-standard'
    );
    const scrollbarPaginationEl = swiperNavigation?.querySelector(
      '.swiper-pagination.swiper-scrollbar.is-standard'
    );
    const progressPaginationEl = swiperNavigation?.querySelector(
      '.swiper-pagination.swiper-pagination-progressbar.is-standard'
    );
    const paginationEl =
      bulletPaginationEl || fractionPaginationEl || progressPaginationEl || scrollbarPaginationEl;

    // -----------------------------------------------------------
    // Initialize Swiper
    // -----------------------------------------------------------
    const swiper = new Swiper(swiperElement, {
      // Use mobilePortrait settings as the default/base config
      direction: directionSettings.mobilePortrait,
      effect: effectValue,
      ...effectOptions,
      slidesPerView: initialSlidesPerView,
      slidesPerGroup: slidesPerGroupSettings.mobilePortrait,
      spaceBetween: spaceBetweenSettings.mobilePortrait,
      speed: speedSettings.mobilePortrait,
      initialSlide: initialSlideIndex,
      freeMode: {
        enabled: freeModeSettings.mobilePortrait,
        momentumBounce: freeModeMomentumBounce,
      },
      centeredSlides: centeredSlidesSettings.mobilePortrait,
      grabCursor: grabCursorSettings.mobilePortrait,
      allowTouchMove: allowTouchMoveBase,

      // --- NEW: Observe changes so update occurs on tab switch ---
      observer: true,
      observeParents: true,

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
              return `<button class="${className} ${extraBulletClasses.join(' ')} swiper-bullet-default is-standard"></button>`;
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

      // -----------------------------------------------------------
      // Breakpoints with override settings
      // -----------------------------------------------------------
      breakpoints: {
        992: {
          slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.desktop,
          slidesPerGroup: slidesPerGroupSettings.desktop,
          spaceBetween: spaceBetweenSettings.desktop,
          speed: speedSettings.desktop,
          autoplay: getAutoplayConfig(autoplaySettings.desktop),
          pagination: { dynamicBullets: dynamicBulletsSettings.desktop },
          direction: directionSettings.desktop,
          grabCursor: grabCursorSettings.desktop,
          freeMode: {
            enabled: freeModeSettings.desktop,
            momentumBounce: freeModeMomentumBounce,
          },
          centeredSlides: centeredSlidesSettings.desktop,
          parallax: parallaxEnabledDesktop,
          allowTouchMove: allowTouchMoveDesktop,
        },
        768: {
          slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.tablet,
          slidesPerGroup: slidesPerGroupSettings.tablet,
          spaceBetween: spaceBetweenSettings.tablet,
          speed: speedSettings.tablet,
          autoplay: getAutoplayConfig(autoplaySettings.tablet),
          pagination: { dynamicBullets: dynamicBulletsSettings.tablet },
          direction: directionSettings.tablet,
          grabCursor: grabCursorSettings.tablet,
          freeMode: {
            enabled: freeModeSettings.tablet,
            momentumBounce: freeModeMomentumBounce,
          },
          centeredSlides: centeredSlidesSettings.tablet,
          parallax: parallaxEnabledTablet,
          allowTouchMove: allowTouchMoveTablet,
        },
        480: {
          slidesPerView: requiresSingleSlide ? 1 : slidesPerViewSettings.mobileLandscape,
          slidesPerGroup: slidesPerGroupSettings.mobileLandscape,
          spaceBetween: spaceBetweenSettings.mobileLandscape,
          speed: speedSettings.mobileLandscape,
          autoplay: getAutoplayConfig(autoplaySettings.mobileLandscape),
          pagination: { dynamicBullets: dynamicBulletsSettings.mobileLandscape },
          direction: directionSettings.mobileLandscape,
          grabCursor: grabCursorSettings.mobileLandscape,
          freeMode: {
            enabled: freeModeSettings.mobileLandscape,
            momentumBounce: freeModeMomentumBounce,
          },
          centeredSlides: centeredSlidesSettings.mobileLandscape,
          parallax: parallaxEnabledMobileLandscape,
          allowTouchMove: allowTouchMoveMobileLandscape,
        },
      },
      on: {
        init: function () {
          if (fractionPaginationEl) {
            const fractionText = swiperNavigation?.querySelector(
              '.swiper-pagination-fraction-text'
            );
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
            const fractionText = swiperNavigation?.querySelector(
              '.swiper-pagination-fraction-text'
            );
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
        // Updated: Restore loop setting based on the current breakpoint rather than defaulting to mobile portrait.
        scrollbarDragEnd: function () {
          let loopSetting;
          const bp = this.currentBreakpoint;
          if (bp >= 992) {
            loopSetting = getBooleanAttributeValue(
              'swiperLoopDesktop',
              getBooleanAttributeValue('swiperLoop', defaultLoop)
            );
          } else if (bp >= 768) {
            loopSetting = getBooleanAttributeValue(
              'swiperLoopTablet',
              getBooleanAttributeValue('swiperLoop', defaultLoop)
            );
          } else if (bp >= 480) {
            loopSetting = getBooleanAttributeValue(
              'swiperLoopMobileLandscape',
              getBooleanAttributeValue('swiperLoop', defaultLoop)
            );
          } else {
            loopSetting = getBooleanAttributeValue(
              'swiperLoopMobilePortrait',
              getBooleanAttributeValue('swiperLoop', defaultLoop)
            );
          }
          // Only loop if there are enough slides.
          this.params.loop = loopSetting && enoughSlidesForLoop;
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
    if (pauseButton) {
      pauseButton.addEventListener('click', (event) => {
        event.preventDefault();
        swiper.autoplay.stop();
      });
    }
    if (playButton) {
      playButton.addEventListener('click', (event) => {
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
    swiper.on('autoplayStart', () => {
      updatePlayPauseButtons();
    });
    swiper.on('autoplayStop', () => {
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
}

// Listen for Webflow tab clicks to force a full update on each Swiper instance.
document.addEventListener('click', function (e) {
  const tabLink = e.target.closest('.w-tab-link');
  if (tabLink) {
    setTimeout(function () {
      document.querySelectorAll('.swiper.is-standard').forEach((swiperElement) => {
        if (swiperElement.swiper) {
          updateSwiperAfterVisible(swiperElement.swiper);
        }
      });
    }, 150);
  }
});
