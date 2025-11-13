/**
 * Copilot Theme - Main JavaScript
 * GSAP, ScrollSmoother, ScrollTrigger, Alpine.js, and Swup integration
 */

(function() {
    'use strict';
    
    // Prevent browser scroll restoration and force scroll to top
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    function resetScroll() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
    
    // Reset scroll immediately
    resetScroll();
    
    // Reset on load and pageshow (for soft refresh/cache)
    window.addEventListener('load', function() {
        setTimeout(resetScroll, 0);
    });
    
    window.addEventListener('pageshow', resetScroll);

    var copilot = (function() {
        var 
        smoother,
        swup,
        currentTransition = 'fade',
        cursorLabels = {
            'playReel': 'Play Reel',
            'viewProject': 'View Project',
            'readMore': 'Read More',
            'moreInfo': 'More Info'
        },
        transitions = {
            fade: {
                out: function(c) { return gsap.timeline().to(c, { opacity: 0, duration: 0.4, ease: 'power3.inOut' }); },
                in: function(c) { return gsap.timeline().set(c, { opacity: 0 }).to(c, { opacity: 1, duration: 0.4, ease: 'power3.inOut' }); }
            },
            slide: {
                out: function(c) { return gsap.timeline().to(c, { x: -100, opacity: 0, duration: 0.5, ease: 'power3.inOut' }); },
                in: function(c) { return gsap.timeline().set(c, { x: 100, opacity: 0 }).to(c, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.inOut' }); }
            },
            scale: {
                out: function(c) { return gsap.timeline().to(c, { scale: 0.95, opacity: 0, duration: 0.5, ease: 'power3.inOut' }); },
                in: function(c) { return gsap.timeline().set(c, { scale: 1.05, opacity: 0 }).to(c, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.inOut' }); }
            }
        },
        initGSAP = function() {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
            if (typeof ScrollSmoother !== 'undefined') gsap.registerPlugin(ScrollSmoother);
            if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);
            ScrollTrigger.getAll().forEach(function(t) { t.kill(); });

            if (!smoother && typeof ScrollSmoother !== 'undefined') {
                smoother = ScrollSmoother.create({
                    wrapper: '#smooth-wrapper',
                    content: '#smooth-content',
                    smooth: 1.5,
                    effects: true,
                    smoothTouch: 0.1,
                    onUpdate: function(self) {
                        window.dispatchEvent(new CustomEvent('smoothScroll'));
                    }
                });
                
                requestAnimationFrame(function() {
                    smoother.scrollTo(0, false);
                });
            } else if (smoother) {
                requestAnimationFrame(function() {
                    smoother.scrollTo(0, false);
                    smoother.refresh();
                });
            }
        },
        createScrollTimeline = function(element, props) {
            return gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }).from(element, props);
        },
        
        // ============================================
        // RESPONSIVE ANIMATIONS
        // Easy to find and adjust timeline animations
        // ============================================
        initResponsiveAnimations = function() {
            var mm = gsap.matchMedia();
            
            // MOBILE (up to 767px)
            mm.add("(max-width: 767px)", function() {
                
                // Home Services Section (by ID) with pin and snap - 6 slides
                var homeServicesSection = document.getElementById('homeServicesSection');
                if (homeServicesSection) {
                    var serviceSlides = homeServicesSection.querySelectorAll('.service-slide');
                    var serviceImages = homeServicesSection.querySelectorAll('.service-image');
                    var totalSlides = serviceSlides.length;
                    
                    if (totalSlides > 0) {
                        // Set initial states - first slide visible, others hidden
                        gsap.set(serviceSlides[0], { autoAlpha: 1, y: 0 });
                        gsap.set(serviceImages[0], { scale: 1, zIndex: 1 });
                        
                        for (var i = 1; i < totalSlides; i++) {
                            gsap.set(serviceSlides[i], { autoAlpha: 0, y: 50 });
                            gsap.set(serviceImages[i], { scale: 0, zIndex: 0 });
                        }
                        
                        var homeServicesSectionTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: homeServicesSection,
                                start: 'top top',
                                end: '+=' + (totalSlides * 100) + 'vh',
                                pin: true,
                                anticipatePin: 1,
                                scrub: 1,
                                snap: 1 / (totalSlides - 1)
                            }
                        });
                        
                        // Create animations for each slide transition
                        var segmentDuration = 1;
                        for (var i = 0; i < totalSlides - 1; i++) {
                            var currentSlide = serviceSlides[i];
                            var nextSlide = serviceSlides[i + 1];
                            var currentImage = serviceImages[i];
                            var nextImage = serviceImages[i + 1];
                            
                            var startTime = i * segmentDuration;
                            
                            // Get text elements for sequential animation
                            var nextPreheading = nextSlide.querySelector('.service-preheading');
                            var nextHeading = nextSlide.querySelector('.service-heading');
                            var nextSubheading = nextSlide.querySelector('.service-subheading');
                            var nextLink = nextSlide.querySelector('.service-link');
                            
                            // Text fade out and down
                            homeServicesSectionTimeline.to(currentSlide, {
                                autoAlpha: 0,
                                y: -50,
                                ease: 'power2.inOut',
                                duration: segmentDuration * 0.3
                            }, startTime);
                            
                            // New image grows from center
                            homeServicesSectionTimeline.fromTo(nextImage, {
                                scale: 0,
                                zIndex: i + 2
                            }, {
                                scale: 1,
                                ease: 'power2.inOut',
                                duration: segmentDuration * 0.5
                            }, startTime + segmentDuration * 0.25);
                            
                            // Animate parent slide first (invisible container)
                            homeServicesSectionTimeline.set(nextSlide, {
                                autoAlpha: 1,
                                y: 0
                            }, startTime + segmentDuration * 0.5);
                            
                            // Animate text elements in sequence
                            var textStartTime = startTime + segmentDuration * 0.5;
                            var textStagger = 0.08;
                            
                            homeServicesSectionTimeline.fromTo(nextPreheading, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime);
                            
                            homeServicesSectionTimeline.fromTo(nextHeading, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime + textStagger);
                            
                            homeServicesSectionTimeline.fromTo(nextSubheading, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime + textStagger * 2);
                            
                            homeServicesSectionTimeline.fromTo(nextLink, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime + textStagger * 3);
                        }
                    }
                }
                
                // Statement 01 Section (by ID) with SplitText highlight effect
                var homeStatement01Section = document.getElementById('homeStatement01Section');
                if (homeStatement01Section && typeof SplitText !== 'undefined') {
                    var statement01Text = homeStatement01Section.querySelector('a');
                    if (statement01Text) {
                        var split01 = new SplitText(statement01Text, { type: 'lines', linesClass: 'split-line' });
                        var lines01 = split01.lines;
                        
                        // Wrap each line and create highlight overlay
                        var duplicates01 = [];
                        lines01.forEach(function(line) {
                            // Create wrapper
                            var wrapper = document.createElement('div');
                            wrapper.style.position = 'relative';
                            wrapper.style.display = 'inline-block';
                            wrapper.style.overflow = 'hidden';
                            
                            // Wrap the line
                            line.parentNode.insertBefore(wrapper, line);
                            wrapper.appendChild(line);
                            
                            // Create highlight overlay
                            var highlight = document.createElement('div');
                            highlight.className = 'text-red-500';
                            highlight.textContent = line.textContent;
                            highlight.style.position = 'absolute';
                            highlight.style.top = '0';
                            highlight.style.left = '0';
                            highlight.style.whiteSpace = 'nowrap';
                            gsap.set(highlight, { clipPath: 'inset(0% 100% 0% 0%)' });
                            
                            wrapper.appendChild(highlight);
                            duplicates01.push(highlight);
                        });
                        
                        var homeStatement01SectionTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: homeStatement01Section,
                                start: 'top 80%',
                                end: 'bottom 60%',
                                scrub: 1
                            }
                        });
                        
                        // Animate each line sequentially - each completes before next starts
                        duplicates01.forEach(function(highlight, index) {
                            homeStatement01SectionTimeline.to(highlight, {
                                clipPath: 'inset(0% 0% 0% 0%)',
                                ease: 'none'
                            });
                        });
                    }
                }
                
                // Statement 02 Section (by ID) with SplitText highlight effect
                var homeStatement02Section = document.getElementById('homeStatement02Section');
                if (homeStatement02Section && typeof SplitText !== 'undefined') {
                    var statement02Text = homeStatement02Section.querySelector('a');
                    if (statement02Text) {
                        var split02 = new SplitText(statement02Text, { type: 'lines', linesClass: 'split-line' });
                        var lines02 = split02.lines;
                        
                        // Wrap each line and create highlight overlay
                        var duplicates02 = [];
                        lines02.forEach(function(line) {
                            // Create wrapper
                            var wrapper = document.createElement('div');
                            wrapper.style.position = 'relative';
                            wrapper.style.display = 'inline-block';
                            wrapper.style.overflow = 'hidden';
                            
                            // Wrap the line
                            line.parentNode.insertBefore(wrapper, line);
                            wrapper.appendChild(line);
                            
                            // Create highlight overlay
                            var highlight = document.createElement('div');
                            highlight.className = 'text-red-500';
                            highlight.textContent = line.textContent;
                            highlight.style.position = 'absolute';
                            highlight.style.top = '0';
                            highlight.style.left = '0';
                            highlight.style.whiteSpace = 'nowrap';
                            gsap.set(highlight, { clipPath: 'inset(0% 100% 0% 0%)' });
                            
                            wrapper.appendChild(highlight);
                            duplicates02.push(highlight);
                        });
                        
                        var homeStatement02SectionTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: homeStatement02Section,
                                start: 'top 80%',
                                end: 'bottom 60%',
                                scrub: 1
                            }
                        });
                        
                        // Animate each line sequentially - each completes before next starts
                        duplicates02.forEach(function(highlight, index) {
                            homeStatement02SectionTimeline.to(highlight, {
                                clipPath: 'inset(0% 0% 0% 0%)',
                                ease: 'none'
                            });
                        });
                    }
                }
                
                return function() {
                    // Cleanup function for mobile
                };
            });
            
            // TABLET (768px to 1023px)
            mm.add("(min-width: 768px) and (max-width: 1023px)", function() {
                
                // Home Services Section (by ID) with pin and snap - 6 slides
                var homeServicesSection = document.getElementById('homeServicesSection');
                if (homeServicesSection) {
                    var serviceSlides = homeServicesSection.querySelectorAll('.service-slide');
                    var serviceImages = homeServicesSection.querySelectorAll('.service-image');
                    var totalSlides = serviceSlides.length;
                    
                    if (totalSlides > 0) {
                        // Set initial states - first slide visible, others hidden
                        gsap.set(serviceSlides[0], { autoAlpha: 1, y: 0 });
                        gsap.set(serviceImages[0], { scale: 1, zIndex: 1 });
                        
                        for (var i = 1; i < totalSlides; i++) {
                            gsap.set(serviceSlides[i], { autoAlpha: 0, y: 50 });
                            gsap.set(serviceImages[i], { scale: 0, zIndex: 0 });
                        }
                        
                        var homeServicesSectionTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: homeServicesSection,
                                start: 'top top',
                                end: '+=' + (totalSlides * 100) + 'vh',
                                pin: true,
                                anticipatePin: 1,
                                scrub: 1,
                                snap: 1 / (totalSlides - 1)
                            }
                        });
                        
                        // Create animations for each slide transition
                        var segmentDuration = 1;
                        for (var i = 0; i < totalSlides - 1; i++) {
                            var currentSlide = serviceSlides[i];
                            var nextSlide = serviceSlides[i + 1];
                            var currentImage = serviceImages[i];
                            var nextImage = serviceImages[i + 1];
                            
                            var startTime = i * segmentDuration;
                            
                            // Get text elements for sequential animation
                            var nextPreheading = nextSlide.querySelector('.service-preheading');
                            var nextHeading = nextSlide.querySelector('.service-heading');
                            var nextSubheading = nextSlide.querySelector('.service-subheading');
                            var nextLink = nextSlide.querySelector('.service-link');
                            
                            // Text fade out and down
                            homeServicesSectionTimeline.to(currentSlide, {
                                autoAlpha: 0,
                                y: -50,
                                ease: 'power2.inOut',
                                duration: segmentDuration * 0.3
                            }, startTime);
                            
                            // New image grows from center
                            homeServicesSectionTimeline.fromTo(nextImage, {
                                scale: 0,
                                zIndex: i + 2
                            }, {
                                scale: 1,
                                ease: 'power2.inOut',
                                duration: segmentDuration * 0.5
                            }, startTime + segmentDuration * 0.25);
                            
                            // Animate parent slide first (invisible container)
                            homeServicesSectionTimeline.set(nextSlide, {
                                autoAlpha: 1,
                                y: 0
                            }, startTime + segmentDuration * 0.5);
                            
                            // Animate text elements in sequence
                            var textStartTime = startTime + segmentDuration * 0.5;
                            var textStagger = 0.08;
                            
                            homeServicesSectionTimeline.fromTo(nextPreheading, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime);
                            
                            homeServicesSectionTimeline.fromTo(nextHeading, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime + textStagger);
                            
                            homeServicesSectionTimeline.fromTo(nextSubheading, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime + textStagger * 2);
                            
                            homeServicesSectionTimeline.fromTo(nextLink, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime + textStagger * 3);
                        }
                    }
                }
                
                // Statement 01 Section (by ID) with SplitText highlight effect
                var homeStatement01Section = document.getElementById('homeStatement01Section');
                if (homeStatement01Section && typeof SplitText !== 'undefined') {
                    var statement01Text = homeStatement01Section.querySelector('a');
                    if (statement01Text) {
                        var split01 = new SplitText(statement01Text, { type: 'lines', linesClass: 'split-line' });
                        var lines01 = split01.lines;
                        
                        // Wrap each line and create highlight overlay
                        var duplicates01 = [];
                        lines01.forEach(function(line) {
                            // Create wrapper
                            var wrapper = document.createElement('div');
                            wrapper.style.position = 'relative';
                            wrapper.style.display = 'inline-block';
                            wrapper.style.overflow = 'hidden';
                            
                            // Wrap the line
                            line.parentNode.insertBefore(wrapper, line);
                            wrapper.appendChild(line);
                            
                            // Create highlight overlay
                            var highlight = document.createElement('div');
                            highlight.className = 'text-red-500';
                            highlight.textContent = line.textContent;
                            highlight.style.position = 'absolute';
                            highlight.style.top = '0';
                            highlight.style.left = '0';
                            highlight.style.whiteSpace = 'nowrap';
                            gsap.set(highlight, { clipPath: 'inset(0% 100% 0% 0%)' });
                            
                            wrapper.appendChild(highlight);
                            duplicates01.push(highlight);
                        });
                        
                        var homeStatement01SectionTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: homeStatement01Section,
                                start: 'top 80%',
                                end: 'bottom 60%',
                                scrub: 1
                            }
                        });
                        
                        // Animate each line sequentially - each completes before next starts
                        duplicates01.forEach(function(highlight, index) {
                            homeStatement01SectionTimeline.to(highlight, {
                                clipPath: 'inset(0% 0% 0% 0%)',
                                ease: 'none'
                            });
                        });
                    }
                }
                
                // Statement 02 Section (by ID) with SplitText highlight effect
                var homeStatement02Section = document.getElementById('homeStatement02Section');
                if (homeStatement02Section && typeof SplitText !== 'undefined') {
                    var statement02Text = homeStatement02Section.querySelector('a');
                    if (statement02Text) {
                        var split02 = new SplitText(statement02Text, { type: 'lines', linesClass: 'split-line' });
                        var lines02 = split02.lines;
                        
                        // Wrap each line and create highlight overlay
                        var duplicates02 = [];
                        lines02.forEach(function(line) {
                            // Create wrapper
                            var wrapper = document.createElement('div');
                            wrapper.style.position = 'relative';
                            wrapper.style.display = 'inline-block';
                            wrapper.style.overflow = 'hidden';
                            
                            // Wrap the line
                            line.parentNode.insertBefore(wrapper, line);
                            wrapper.appendChild(line);
                            
                            // Create highlight overlay
                            var highlight = document.createElement('div');
                            highlight.className = 'text-red-500';
                            highlight.textContent = line.textContent;
                            highlight.style.position = 'absolute';
                            highlight.style.top = '0';
                            highlight.style.left = '0';
                            highlight.style.whiteSpace = 'nowrap';
                            gsap.set(highlight, { clipPath: 'inset(0% 100% 0% 0%)' });
                            
                            wrapper.appendChild(highlight);
                            duplicates02.push(highlight);
                        });
                        
                        var homeStatement02SectionTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: homeStatement02Section,
                                start: 'top 80%',
                                end: 'bottom 60%',
                                scrub: 1
                            }
                        });
                        
                        // Animate each line sequentially - each completes before next starts
                        duplicates02.forEach(function(highlight, index) {
                            homeStatement02SectionTimeline.to(highlight, {
                                clipPath: 'inset(0% 0% 0% 0%)',
                                ease: 'none'
                            });
                        });
                    }
                }
                
                // Home Featured Case Studies Section (by ID) with horizontal scroll
                var homeFeaturedCaseStudiesSection = document.getElementById('homeFeaturedCaseStudiesSection');
                if (homeFeaturedCaseStudiesSection) {
                    var cardsWrapper = homeFeaturedCaseStudiesSection.querySelector('.cards');
                    
                    if (cardsWrapper) {
                        // Calculate total width to scroll (cards width + gaps - viewport width)
                        var getScrollAmount = function() {
                            var cardsWidth = cardsWrapper.scrollWidth;
                            var viewportWidth = window.innerWidth;
                            return -(cardsWidth - viewportWidth);
                        };
                        
                        gsap.to(cardsWrapper, {
                            x: getScrollAmount,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: homeFeaturedCaseStudiesSection,
                                start: 'top top',
                                end: function() {
                                    return '+=' + cardsWrapper.scrollWidth;
                                },
                                pin: true,
                                anticipatePin: 1,
                                scrub: 1,
                                invalidateOnRefresh: true
                            }
                        });
                    }
                }
                
                return function() {
                    // Cleanup function for tablet
                };
            });
            
            // DESKTOP (1024px and up)
            mm.add("(min-width: 1024px)", function() {
                
                // Home Services Section (by ID) with pin and snap - 6 slides
                var homeServicesSection = document.getElementById('homeServicesSection');
                if (homeServicesSection) {
                    var serviceSlides = homeServicesSection.querySelectorAll('.service-slide');
                    var serviceImages = homeServicesSection.querySelectorAll('.service-image');
                    var totalSlides = serviceSlides.length;
                    
                    if (totalSlides > 0) {
                        // Set initial states - first slide visible, others hidden
                        gsap.set(serviceSlides[0], { autoAlpha: 1, y: 0 });
                        gsap.set(serviceImages[0], { scale: 1, zIndex: 1 });
                        
                        for (var i = 1; i < totalSlides; i++) {
                            gsap.set(serviceSlides[i], { autoAlpha: 0, y: 50 });
                            gsap.set(serviceImages[i], { scale: 0, zIndex: 0 });
                        }
                        
                        var homeServicesSectionTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: homeServicesSection,
                                start: 'top top',
                                end: '+=' + (totalSlides * 100) + 'vh',
                                pin: true,
                                anticipatePin: 1,
                                scrub: 1,
                                snap: 1 / (totalSlides - 1)
                            }
                        });
                        
                        // Create animations for each slide transition
                        var segmentDuration = 1;
                        for (var i = 0; i < totalSlides - 1; i++) {
                            var currentSlide = serviceSlides[i];
                            var nextSlide = serviceSlides[i + 1];
                            var currentImage = serviceImages[i];
                            var nextImage = serviceImages[i + 1];
                            
                            var startTime = i * segmentDuration;
                            
                            // Get text elements for sequential animation
                            var nextPreheading = nextSlide.querySelector('.service-preheading');
                            var nextHeading = nextSlide.querySelector('.service-heading');
                            var nextSubheading = nextSlide.querySelector('.service-subheading');
                            var nextLink = nextSlide.querySelector('.service-link');
                            
                            // Text fade out and down
                            homeServicesSectionTimeline.to(currentSlide, {
                                autoAlpha: 0,
                                y: -50,
                                ease: 'power2.inOut',
                                duration: segmentDuration * 0.3
                            }, startTime);
                            
                            // New image grows from center
                            homeServicesSectionTimeline.fromTo(nextImage, {
                                scale: 0,
                                zIndex: i + 2
                            }, {
                                scale: 1,
                                ease: 'power2.inOut',
                                duration: segmentDuration * 0.5
                            }, startTime + segmentDuration * 0.25);
                            
                            // Animate parent slide first (invisible container)
                            homeServicesSectionTimeline.set(nextSlide, {
                                autoAlpha: 1,
                                y: 0
                            }, startTime + segmentDuration * 0.5);
                            
                            // Animate text elements in sequence
                            var textStartTime = startTime + segmentDuration * 0.5;
                            var textStagger = 0.08;
                            
                            homeServicesSectionTimeline.fromTo(nextPreheading, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime);
                            
                            homeServicesSectionTimeline.fromTo(nextHeading, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime + textStagger);
                            
                            homeServicesSectionTimeline.fromTo(nextSubheading, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime + textStagger * 2);
                            
                            homeServicesSectionTimeline.fromTo(nextLink, {
                                autoAlpha: 0,
                                y: 20
                            }, {
                                autoAlpha: 1,
                                y: 0,
                                ease: 'power2.out',
                                duration: 0.15
                            }, textStartTime + textStagger * 3);
                        }
                    }
                }
                
                // Statement 01 Section (by ID) with SplitText highlight effect
                var homeStatement01Section = document.getElementById('homeStatement01Section');
                if (homeStatement01Section && typeof SplitText !== 'undefined') {
                    var statement01Text = homeStatement01Section.querySelector('a');
                    if (statement01Text) {
                        var split01 = new SplitText(statement01Text, { type: 'lines', linesClass: 'split-line' });
                        var lines01 = split01.lines;
                        
                        // Wrap each line and create highlight overlay
                        var duplicates01 = [];
                        lines01.forEach(function(line) {
                            // Create wrapper
                            var wrapper = document.createElement('div');
                            wrapper.style.position = 'relative';
                            wrapper.style.display = 'inline-block';
                            wrapper.style.overflow = 'hidden';
                            
                            // Wrap the line
                            line.parentNode.insertBefore(wrapper, line);
                            wrapper.appendChild(line);
                            
                            // Create highlight overlay
                            var highlight = document.createElement('div');
                            highlight.className = 'text-red-500';
                            highlight.textContent = line.textContent;
                            highlight.style.position = 'absolute';
                            highlight.style.top = '0';
                            highlight.style.left = '0';
                            highlight.style.whiteSpace = 'nowrap';
                            gsap.set(highlight, { clipPath: 'inset(0% 100% 0% 0%)' });
                            
                            wrapper.appendChild(highlight);
                            duplicates01.push(highlight);
                        });
                        
                        var homeStatement01SectionTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: homeStatement01Section,
                                start: 'top 80%',
                                end: 'bottom 60%',
                                scrub: 1
                            }
                        });
                        
                        // Animate each line sequentially - each completes before next starts
                        duplicates01.forEach(function(highlight, index) {
                            homeStatement01SectionTimeline.to(highlight, {
                                clipPath: 'inset(0% 0% 0% 0%)',
                                ease: 'none'
                            });
                        });
                    }
                }
                
                // Statement 02 Section (by ID) with SplitText highlight effect
                var homeStatement02Section = document.getElementById('homeStatement02Section');
                if (homeStatement02Section && typeof SplitText !== 'undefined') {
                    var statement02Text = homeStatement02Section.querySelector('a');
                    if (statement02Text) {
                        var split02 = new SplitText(statement02Text, { type: 'lines', linesClass: 'split-line' });
                        var lines02 = split02.lines;
                        
                        // Wrap each line and create highlight overlay
                        var duplicates02 = [];
                        lines02.forEach(function(line) {
                            // Create wrapper
                            var wrapper = document.createElement('div');
                            wrapper.style.position = 'relative';
                            wrapper.style.display = 'inline-block';
                            wrapper.style.overflow = 'hidden';
                            
                            // Wrap the line
                            line.parentNode.insertBefore(wrapper, line);
                            wrapper.appendChild(line);
                            
                            // Create highlight overlay
                            var highlight = document.createElement('div');
                            highlight.className = 'text-red-500';
                            highlight.textContent = line.textContent;
                            highlight.style.position = 'absolute';
                            highlight.style.top = '0';
                            highlight.style.left = '0';
                            highlight.style.whiteSpace = 'nowrap';
                            gsap.set(highlight, { clipPath: 'inset(0% 100% 0% 0%)' });
                            
                            wrapper.appendChild(highlight);
                            duplicates02.push(highlight);
                        });
                        
                        var homeStatement02SectionTimeline = gsap.timeline({
                            scrollTrigger: {
                                trigger: homeStatement02Section,
                                start: 'top 80%',
                                end: 'bottom 60%',
                                scrub: 1
                            }
                        });
                        
                        // Animate each line sequentially - each completes before next starts
                        duplicates02.forEach(function(highlight, index) {
                            homeStatement02SectionTimeline.to(highlight, {
                                clipPath: 'inset(0% 0% 0% 0%)',
                                ease: 'none'
                            });
                        });
                    }
                }
                
                // Home Featured Case Studies Section (by ID) with horizontal scroll
                var homeFeaturedCaseStudiesSection = document.getElementById('homeFeaturedCaseStudiesSection');
                if (homeFeaturedCaseStudiesSection) {
                    var cardsWrapper = homeFeaturedCaseStudiesSection.querySelector('.cards');
                    
                    if (cardsWrapper) {
                        // Set initial position to ensure cards are visible
                        gsap.set(cardsWrapper, { x: 0, force3D: true });
                        
                        // Calculate total width to scroll
                        var getScrollAmount = function() {
                            var cardsWidth = cardsWrapper.scrollWidth;
                            return -(cardsWidth - window.innerWidth);
                        };
                        
                        gsap.to(cardsWrapper, {
                            x: getScrollAmount,
                            ease: 'none',
                            force3D: true,
                            scrollTrigger: {
                                trigger: homeFeaturedCaseStudiesSection,
                                start: 'top top',
                                end: function() {
                                    return '+=' + cardsWrapper.scrollWidth;
                                },
                                pin: true,
                                anticipatePin: 1,
                                scrub: 1,
                                invalidateOnRefresh: true
                            }
                        });
                    }
                }
                
                return function() {
                    // Cleanup function for desktop
                };
            });
        },
        
        initAnimations = function() {
            // Generic class-based animations (fallback)
            document.querySelectorAll('.fade-in').forEach(function(el) {
                createScrollTimeline(el, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' });
            });
            document.querySelectorAll('.slide-in').forEach(function(el) {
                createScrollTimeline(el, { opacity: 0, x: -100, duration: 0.8, ease: 'power3.out' });
            });
            document.querySelectorAll('.scale-in').forEach(function(el) {
                createScrollTimeline(el, { opacity: 0, scale: 0.95, duration: 0.8, ease: 'power3.out' });
            });
            
            // Initialize responsive animations
            initResponsiveAnimations();
        },
        updateSEO = function() {
            var container = document.getElementById('swup');
            var bodyClasses = container ? container.getAttribute('data-body-class') : null;
            if (bodyClasses) document.body.className = bodyClasses;
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_view', { page_path: window.location.pathname, page_title: document.title });
            }
        },
        initSwup = function() {
            swup = new Swup({
                containers: ['#swup'],
                plugins: [new SwupHeadPlugin()],
                animationSelector: '[data-swup]',
                animationSelector: '[data-swup]',
                linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup])',
                cache: false,
                animateHistoryBrowsing: true
            });

            swup.on('clickLink', function(e) { 
                var link = e.delegateTarget;
                currentTransition = link.getAttribute('data-transition') || 'fade';
            });
            // Ensure menu closes before content is replaced (most reliable for Swup 2)
            swup.on('willReplaceContent', function() {
                if (window.__copilotCloseMenu) {
                    window.__copilotCloseMenu();
                }
            });
            swup.on('animationOutStart', function() {
                var container = document.getElementById('swup');
                var trans = transitions[currentTransition] || transitions.fade;
                trans.out(container);
            });
            swup.on('animationOutDone', function() {
                // Kill all ScrollTrigger instances
                ScrollTrigger.getAll().forEach(function(t) { t.kill(); });
                
                // Kill all GSAP tweens and timelines
                gsap.globalTimeline.clear();
                gsap.killTweensOf('*');
            });
            swup.on('contentReplaced', function() { 
                // Reset scroll position immediately before reinitializing
                window.scrollTo(0, 0);
                
                // Kill and recreate smoother to fully reset
                if (smoother) {
                    smoother.kill();
                    smoother = null;
                }
                
                init(); 
                updateSEO(); 
            });
            swup.on('animationInStart', function() {
                var container = document.getElementById('swup');
                gsap.set(container, { clearProps: 'all' });
                var trans = transitions[currentTransition] || transitions.fade;
                trans.in(container);
            });
        },
        initUIEvents = function() {
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.body._x_dataStack && document.body._x_dataStack[0]) {
                    var alpine = document.body._x_dataStack[0];
                    if (alpine.ui.modal) alpine.hide('modal', alpine.ui.modal);
                    if (alpine.ui.dropdown) alpine.hide('dropdown', alpine.ui.dropdown);
                }
            });
        },
        initHeroAnimation = function() {
            var heroHeading = document.querySelector('#homeHeroSection h1');
            if (heroHeading) {
                gsap.from(heroHeading, {
                    opacity: 0,
                    y: 40,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '#homeHeroSection',
                        start: 'top-=1 top',
                        toggleActions: 'play none none none'
                    }
                });
            }
        },
        initCustomCursor = function() {
            var cursor = document.getElementById('customCursor');
            var marqueeContent = cursor.querySelector('.marquee-content');
            var marqueeTimeline = null;
            var isActive = false;
            var currentTarget = null;
            var lastMouseX = 0;
            var lastMouseY = 0;
            var rafId = null;
            
            // Initialize cursor position with percentage offset
            gsap.set(cursor, { xPercent: -50, yPercent: -50 });
            
            // Use quickTo for more performant cursor movement
            var xTo = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power2.out" });
            var yTo = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power2.out" });
            
            function createMarquee(text) {
                // Clear existing content and timeline
                if (marqueeTimeline) {
                    marqueeTimeline.kill();
                }
                marqueeContent.innerHTML = '';
                
                // Create multiple instances for seamless loop
                var instances = 4;
                var spans = [];
                
                for (var i = 0; i < instances; i++) {
                    var span = document.createElement('span');
                    span.textContent = text;
                    marqueeContent.appendChild(span);
                    spans.push(span);
                }
                
                // Wait for DOM to update, then measure and animate
                requestAnimationFrame(function() {
                    var firstSpan = spans[0];
                    var spanWidth = firstSpan.offsetWidth;
                    var gap = 16; // gap-4 = 1rem = 16px
                    var totalWidth = spanWidth + gap;
                    
                    // Set initial position
                    gsap.set(marqueeContent, { x: 0 });
                    
                    // Animate exactly one item's width + gap
                    marqueeTimeline = gsap.timeline({ repeat: -1 });
                    marqueeTimeline.to(marqueeContent, {
                        x: -totalWidth,
                        duration: 2,
                        ease: 'none'
                    });
                });
            }
            
            function createMedia(mediaSrc) {
                // Clear existing content and timeline
                if (marqueeTimeline) {
                    marqueeTimeline.kill();
                }
                marqueeContent.innerHTML = '';
                
                // Get parent cursor-marquee element
                var cursorMarquee = cursor.querySelector('.cursor-marquee');
                
                // Determine if it's an image or video
                var isVideo = /\.(mp4|webm|ogg)$/i.test(mediaSrc);
                
                if (isVideo) {
                    var video = document.createElement('video');
                    video.src = mediaSrc;
                    video.autoplay = true;
                    video.muted = true;
                    video.loop = true;
                    video.playsInline = true;
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = 'cover';
                    video.style.borderRadius = 'inherit';
                    marqueeContent.appendChild(video);
                } else {
                    var img = document.createElement('img');
                    img.src = mediaSrc;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = 'inherit';
                    marqueeContent.appendChild(img);
                }
            }
            
            function showCursor(textOrMedia, isMedia) {
                if (isActive) return;
                isActive = true;
                
                if (isMedia) {
                    createMedia(textOrMedia);
                } else {
                    createMarquee(textOrMedia);
                }
                cursor.classList.remove('hidden');
                
                // Animate cursor in with scale
                gsap.fromTo(cursor, 
                    { scale: 0 },
                    { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
                );
            }
            
            function hideCursor() {
                if (!isActive) return;
                isActive = false;
                currentTarget = null;
                
                // Animate cursor out with scale
                gsap.to(cursor, {
                    scale: 0,
                    duration: 0.2,
                    ease: 'back.in(1.7)',
                    onComplete: function() {
                        cursor.classList.add('hidden');
                        if (marqueeTimeline) {
                            marqueeTimeline.kill();
                        }
                    }
                });
            }
            
            function checkCursorTarget(clientX, clientY) {
                // Check if we're over a custom cursor element
                var target = document.elementFromPoint(clientX, clientY);
                if (target) {
                    target = target.closest('[data-custom-cursor]');
                }
                
                if (target && target !== currentTarget) {
                    currentTarget = target;
                    var type = target.getAttribute('data-custom-cursor');
                    
                    // Check if this is a media cursor
                    if (type === 'projectMedia') {
                        var mediaSrc = target.getAttribute('data-media-src');
                        if (mediaSrc) {
                            showCursor(mediaSrc, true);
                        }
                    } else {
                        var text = cursorLabels[type] || type;
                        showCursor(text, false);
                    }
                } else if (!target && currentTarget) {
                    hideCursor();
                }
            }
            
            // Debounced scroll check - only checks after scrolling stops
            let scrollTimeout;
            function scheduleScrollCheck() {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    if (rafId) return;
                    rafId = requestAnimationFrame(function() {
                        rafId = null;
                        xTo(lastMouseX);
                        yTo(lastMouseY);
                        checkCursorTarget(lastMouseX, lastMouseY);
                    });
                }, 150); // Wait 150ms after scroll stops
            }
            
            document.addEventListener('mousemove', function(e) {
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
                
                // Use quickTo for smoother, more performant movement
                xTo(e.clientX);
                yTo(e.clientY);
                checkCursorTarget(e.clientX, e.clientY);
            });
            
            // Check on both regular scroll and ScrollSmoother updates
            window.addEventListener('scroll', scheduleScrollCheck, { passive: true });
            window.addEventListener('smoothScroll', scheduleScrollCheck);
        },
        animateButton = function(btn, props) {
            Object.keys(props).forEach(function(selector) {
                var element = selector === 'self' ? btn : btn.querySelector(selector);
                if (element) gsap.to(element, props[selector]);
            });
        },
        initButtonHover = function() {
            var hoverStates = new WeakMap(); // Track hover state for each button
            
            document.addEventListener('mouseover', function(e) {
                if (e.target.nodeType !== 1) return;
                
                // Custom button
                var customBtn = e.target.closest('.custom-button');
                if (customBtn && !hoverStates.get(customBtn)) {
                    hoverStates.set(customBtn, true);
                    animateButton(customBtn, {
                        '.button-hover-effect': { scale: 1, duration: 0.5, ease: 'power3.out' },
                        'span': { color: '#3b82f6', duration: 0.5, ease: 'power3.out' }
                    });
                }
                
                // Neighbourhood button
                var neighbourBtn = e.target.closest('.neighbourhood-button');
                if (neighbourBtn && !hoverStates.get(neighbourBtn)) {
                    hoverStates.set(neighbourBtn, true);
                    animateButton(neighbourBtn, {
                        '.button-bg': { x: 0, duration: 0.6, ease: 'power3.out' },
                        'span:first-child': { color: '#ffffff', duration: 0.6, ease: 'power3.out' },
                        '.arrow-wrapper': { backgroundColor: '#ffffff', duration: 0.6, ease: 'power3.out' },
                        '.arrow': { color: '#000000', duration: 0.6, ease: 'power3.out' }
                    });
                }
            }, true);
            
            document.addEventListener('mouseout', function(e) {
                if (e.target.nodeType !== 1) return;
                
                // Custom button
                var customBtn = e.target.closest('.custom-button');
                if (customBtn && !customBtn.contains(e.relatedTarget)) {
                    hoverStates.set(customBtn, false);
                    animateButton(customBtn, {
                        '.button-hover-effect': { scale: 0, duration: 0.4, ease: 'power3.in' },
                        'span': { color: '#ffffff', duration: 0.4, ease: 'power3.in' }
                    });
                }
                
                // Neighbourhood button
                var neighbourBtn = e.target.closest('.neighbourhood-button');
                if (neighbourBtn && !neighbourBtn.contains(e.relatedTarget)) {
                    hoverStates.set(neighbourBtn, false);
                    animateButton(neighbourBtn, {
                        '.button-bg': { x: '-100%', duration: 0.5, ease: 'power3.in' },
                        'span:first-child': { color: '#000000', duration: 0.5, ease: 'power3.in' },
                        '.arrow-wrapper': { backgroundColor: '#000000', duration: 0.5, ease: 'power3.in' },
                        '.arrow': { color: '#ffffff', duration: 0.5, ease: 'power3.in' }
                    });
                }
            }, true);
        },
        initMenu = function() {
            var navWrap = document.querySelector('.nav');
            if (!navWrap) return;
            
            var state = navWrap.getAttribute('data-nav');
            var overlay = navWrap.querySelector('.overlay');
            var menu = navWrap.querySelector('.menu');
            var bgPanels = navWrap.querySelectorAll('.bg-panel');
            var menuToggles = document.querySelectorAll('[data-menu-toggle]');
            var menuLinks = navWrap.querySelectorAll('.menu-link');
            var menuLinkWrappers = navWrap.querySelectorAll('.menu-link-wrapper');
            var fadeTargets = navWrap.querySelectorAll('[data-menu-fade]');
            var menuButton = document.querySelector('.menu-button');
            var menuTextMenu = menuButton ? menuButton.querySelector('.menu-text-menu') : null;
            var menuTextClose = menuButton ? menuButton.querySelector('.menu-text-close') : null;
            var menuButtonIcon = menuButton ? menuButton.querySelector('.menu-button-icon') : null;
            var iconLines = menuButtonIcon ? menuButtonIcon.querySelectorAll('.menu-icon-line') : null;
            
            // Create custom ease for smooth Osmo-style animation
            var menuEase = 'power3.out';
            if (typeof CustomEase !== 'undefined') {
                CustomEase.create('menuEase', '0.65, 0.01, 0.05, 0.99');
                menuEase = 'menuEase';
            }
            
            // Set initial state for text - Close is below viewport
            if (menuTextClose) gsap.set(menuTextClose, { yPercent: 100 });
            
            // Set initial state for menu links - hidden below with clip
            gsap.set(menuLinkWrappers, { 
                clipPath: 'inset(0% 0% 100% 0%)'
            });
            gsap.set(menuLinks, { 
                y: '110%'
            });
            
            function preventScroll(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            function openMenu() {
                navWrap.setAttribute('data-nav', 'open');
                navWrap.style.display = 'block';
                navWrap.style.pointerEvents = 'auto';
                
                // Disable scroll without changing layout
                var smoothWrapper = document.getElementById('smooth-wrapper');
                if (smoothWrapper) {
                    smoothWrapper.style.pointerEvents = 'none';
                }
                
                // Disable wheel and touch scroll
                window.addEventListener('wheel', preventScroll, { passive: false });
                window.addEventListener('touchmove', preventScroll, { passive: false });
                
                var tl = gsap.timeline({ ease: menuEase, duration: 0.7 });
                
                // Animate background panels with offset stagger (reverse order for layering effect)
                tl.to(bgPanels[2], {
                    x: 0,
                    duration: 0.7,
                    ease: 'power3.out'
                }, 0);
                tl.to(bgPanels[1], {
                    x: 0,
                    duration: 0.7,
                    ease: 'power3.out'
                }, 0.06);
                tl.to(bgPanels[0], {
                    x: 0,
                    duration: 0.7,
                    ease: 'power3.out'
                }, 0.12);
                
                // Animate menu content
                tl.to(menu, {
                    x: 0,
                    duration: 0.7,
                    ease: 'power3.out'
                }, 0.15);
                
                // Fade in overlay
                tl.to(overlay, {
                    opacity: 0.5,
                    duration: 0.6,
                    ease: 'power3.out'
                }, 0);
                
                // Fade in menu items with clip-path reveal
                tl.to(fadeTargets, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: 'power3.out'
                }, 0.3);
                
                // Animate menu links with clip reveal and slide up
                tl.to(menuLinkWrappers, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power3.out'
                }, 0.4);
                
                tl.to(menuLinks, {
                    y: '0%',
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power3.out'
                }, 0.4);
                
                // Rotate icon to X (both lines rotate 45deg to form X)
                if (iconLines && iconLines.length === 2) {
                    tl.to(menuButtonIcon, {
                        rotation: 45,
                        duration: 0.5,
                        ease: 'power3.out'
                    }, 0);
                }
                
                // Animate text: Menu slides up, Close slides in
                if (menuTextMenu && menuTextClose) {
                    tl.to(menuTextMenu, {
                        yPercent: -100,
                        duration: 0.5,
                        ease: 'power3.out'
                    }, 0);
                    tl.to(menuTextClose, {
                        yPercent: 0,
                        duration: 0.5,
                        ease: 'power3.out'
                    }, 0);
                }
            }
            
            function closeMenu() {
                var tl = gsap.timeline({
                    ease: menuEase,
                    duration: 0.6,
                    onComplete: function() {
                        navWrap.setAttribute('data-nav', 'closed');
                        navWrap.style.display = 'none';
                        navWrap.style.pointerEvents = 'none';
                        
                        // Re-enable scroll
                        var smoothWrapper = document.getElementById('smooth-wrapper');
                        if (smoothWrapper) {
                            smoothWrapper.style.pointerEvents = '';
                        }
                        
                        // Re-enable wheel and touch scroll
                        window.removeEventListener('wheel', preventScroll);
                        window.removeEventListener('touchmove', preventScroll);
                    }
                });
                
                // Fade out menu items
                tl.to(fadeTargets, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    stagger: 0.03,
                    ease: 'power3.in'
                }, 0);
                
                // Animate menu links out with clip and slide down
                tl.to(menuLinks, {
                    y: '-110%',
                    duration: 0.6,
                    stagger: 0.05,
                    ease: 'power3.in'
                }, 0);
                
                tl.to(menuLinkWrappers, {
                    clipPath: 'inset(100% 0% 0% 0%)',
                    duration: 0.6,
                    stagger: 0.05,
                    ease: 'power3.in'
                }, 0);
                
                // Animate menu content out
                tl.to(menu, {
                    x: '100%',
                    duration: 0.6,
                    ease: 'power3.in'
                }, 0.05);
                
                // Animate background panels out with offset (forward order)
                tl.to(bgPanels[0], {
                    x: '100%',
                    duration: 0.6,
                    ease: 'power3.in'
                }, 0.1);
                tl.to(bgPanels[1], {
                    x: '100%',
                    duration: 0.6,
                    ease: 'power3.in'
                }, 0.15);
                tl.to(bgPanels[2], {
                    x: '100%',
                    duration: 0.6,
                    ease: 'power3.in'
                }, 0.2);
                
                // Fade out overlay
                tl.to(overlay, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power3.in'
                }, 0);
                
                // Rotate icon back to plus
                if (iconLines && iconLines.length === 2) {
                    tl.to(menuButtonIcon, {
                        rotation: 0,
                        duration: 0.5,
                        ease: 'power3.out'
                    }, 0);
                }
                
                // Animate text: Close slides down, Menu slides back in
                if (menuTextMenu && menuTextClose) {
                    tl.to(menuTextClose, {
                        yPercent: 100,
                        duration: 0.5,
                        ease: 'power3.out'
                    }, 0);
                    tl.to(menuTextMenu, {
                        yPercent: 0,
                        duration: 0.5,
                        ease: 'power3.out'
                    }, 0);
                }
            }
            
            // Set initial states
            gsap.set(fadeTargets, { opacity: 0, y: 20 });
            
            // Toggle menu
            menuToggles.forEach(function(toggle) {
                toggle.addEventListener('click', function() {
                    var currentState = navWrap.getAttribute('data-nav');
                    if (currentState === 'closed') {
                        openMenu();
                    } else {
                        closeMenu();
                    }
                });
            });
            
            // Close menu on link click
            menuLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    var linkUrl = new URL(link.href, window.location.origin);
                    var currentUrl = new URL(window.location.href);
                    
                    // Check if clicking on the same page
                    if (linkUrl.pathname === currentUrl.pathname) {
                        e.preventDefault();
                        e.stopPropagation();
                        closeMenu();
                        return false;
                    }
                    
                    closeMenu();
                });
            });
            
            // Close menu on overlay click
            overlay.addEventListener('click', function() {
                closeMenu();
            });
            
            // Close menu on ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' || e.key === 'Esc') {
                    var currentState = navWrap.getAttribute('data-nav');
                    if (currentState === 'open') {
                        closeMenu();
                    }
                }
            });
            
            // Menu button hover animation
            if (menuButton && menuButtonIcon) {
                menuButton.addEventListener('mouseenter', function() {
                    var currentState = navWrap.getAttribute('data-nav');
                    // Only rotate on hover if menu is closed
                    if (currentState === 'closed') {
                        gsap.to(menuButtonIcon, {
                            rotation: 90,
                            duration: 0.5,
                            ease: 'power3.out'
                        });
                    }
                });
                
                menuButton.addEventListener('mouseleave', function() {
                    var currentState = navWrap.getAttribute('data-nav');
                    // Only rotate back if menu is closed
                    if (currentState === 'closed') {
                        gsap.to(menuButtonIcon, {
                            rotation: 0,
                            duration: 0.5,
                            ease: 'power3.out'
                        });
                    }
                });
            }
            // Expose closeMenu globally for Swup
            window.__copilotCloseMenu = closeMenu;
        },
        initVideoModal = function() {
            var modalVideo = null;
            var player = null;
            var modalElement = null;
            
            // Wait for DOM to be ready
            setTimeout(function() {
                // Find modal container - look for the video modal div
                var modals = document.querySelectorAll('[x-data]');
                for (var i = 0; i < modals.length; i++) {
                    if (modals[i].querySelector('#modal-video')) {
                        modalElement = modals[i];
                        break;
                    }
                }
            }, 100);
            
            // Listen for modal open event
            window.addEventListener('video-modal-open', function(e) {
                var videoSrc = e.detail.src;
                
                // Disable scroll
                if (smoother) {
                    smoother.paused(true);
                }
                document.body.style.overflow = 'hidden';
                
                // Show modal
                if (modalElement) {
                    modalElement.style.display = 'flex';
                    // Trigger Alpine state if available
                    if (modalElement._x_dataStack && modalElement._x_dataStack[0]) {
                        modalElement._x_dataStack[0].open = true;
                        modalElement._x_dataStack[0].videoSrc = videoSrc;
                    }
                }
                
                // Initialize video.js player when modal opens
                setTimeout(function() {
                    var videoElement = document.getElementById('modal-video');
                    if (videoElement && typeof videojs !== 'undefined') {
                        // Dispose existing player if it exists
                        if (player) {
                            player.dispose();
                        }
                        
                        // Create new player with source
                        player = videojs('modal-video', {
                            controls: true,
                            autoplay: true,
                            preload: 'auto',
                            fluid: true,
                            muted: false, // Volume ON
                            volume: 1.0,   // Full volume
                            sources: [{
                                src: videoSrc,
                                type: 'video/mp4'
                            }]
                        });
                        
                        // Play when ready
                        player.ready(function() {
                            this.play().catch(function(error) {
                                // Autoplay prevented by browser
                            });
                        });
                    }
                }, 150); // Slightly longer delay to ensure modal is rendered
            });
            
            // Listen for modal close event
            window.addEventListener('video-modal-close', function() {
                
                // Re-enable scroll
                if (smoother) {
                    smoother.paused(false);
                }
                document.body.style.overflow = '';
                
                // Hide modal
                if (modalElement) {
                    // Trigger Alpine state if available
                    if (modalElement._x_dataStack && modalElement._x_dataStack[0]) {
                        modalElement._x_dataStack[0].open = false;
                    }
                    // Fallback to manual hide
                    setTimeout(function() {
                        modalElement.style.display = 'none';
                    }, 300);
                }
                
                if (player) {
                    player.pause();
                    player.currentTime(0);
                    // Dispose to clean up
                    setTimeout(function() {
                        if (player) {
                            player.dispose();
                            player = null;
                        }
                    }, 300);
                }
            });
            
            // Also handle ESC key for video pause
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' || e.key === 'Esc') {
                    if (player && !player.paused()) {
                        window.dispatchEvent(new CustomEvent('video-modal-close'));
                    }
                }
            });
        },
        init = function() {
            initGSAP();
            initAnimations();
            requestAnimationFrame(function() {
                setTimeout(function() {
                    if (smoother) {
                        smoother.effects('[data-speed], [data-lag]', {});
                        smoother.refresh();
                    }
                    ScrollTrigger.refresh();
                }, 100);
            });
        },
        initPreloader = function() {
            var preloader = document.getElementById('preloader');
            var preloaderText = document.getElementById('preloaderText');
            
            if (preloaderText && typeof SplitText !== 'undefined') {
                var split = new SplitText(preloaderText, { type: 'lines', linesClass: 'split-line' });
                var lines = split.lines;
                
                // Wrap each line and create highlight overlay
                var duplicates = [];
                lines.forEach(function(line) {
                    // Create wrapper
                    var wrapper = document.createElement('div');
                    wrapper.style.position = 'relative';
                    wrapper.style.display = 'inline-block';
                    wrapper.style.overflow = 'hidden';
                    
                    // Wrap the line
                    line.parentNode.insertBefore(wrapper, line);
                    wrapper.appendChild(line);
                    
                    // Create highlight overlay
                    var highlight = document.createElement('div');
                    highlight.className = 'text-red-500';
                    highlight.textContent = line.textContent;
                    highlight.style.position = 'absolute';
                    highlight.style.top = '0';
                    highlight.style.left = '0';
                    highlight.style.whiteSpace = 'nowrap';
                    gsap.set(highlight, { clipPath: 'inset(0% 100% 0% 0%)' });
                    
                    wrapper.appendChild(highlight);
                    duplicates.push(highlight);
                });
                
                // Create timeline that animates on page ready
                var preloaderTimeline = gsap.timeline({
                    paused: true,
                    onComplete: function() {
                        // Fade out preloader after animation completes
                        setTimeout(function() {
                            gsap.to(preloader, {
                                opacity: 0,
                                duration: 0.6,
                                ease: 'power2.inOut',
                                onComplete: function() {
                                    preloader.style.display = 'none';
                                }
                            });
                        }, 300);
                    }
                });
                
                // Animate each line sequentially
                duplicates.forEach(function(highlight) {
                    preloaderTimeline.to(highlight, {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 0.8,
                        ease: 'power3.inOut'
                    }, '+=0.15');
                });
                
                return preloaderTimeline;
            }
            
            return null;
        },
        hidePreloader = function() {
            var preloader = document.getElementById('preloader');
            if (preloader) {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.inOut',
                    onComplete: function() {
                        preloader.style.display = 'none';
                    }
                });
            }
        },
        ready = function() {
            init();
            initSwup();
            initUIEvents();
            initHeroAnimation();
            initCustomCursor();
            initButtonHover();
            initMenu();
            initVideoModal();
            
            // Play preloader animation when ready
            var preloaderTimeline = initPreloader();
            if (preloaderTimeline) {
                preloaderTimeline.play();
            } else {
                // Fallback if SplitText not available
                setTimeout(hidePreloader, 300);
            }
        };

        return { ready: ready };
    })();

    document.readyState === 'loading' 
        ? document.addEventListener('DOMContentLoaded', copilot.ready)
        : copilot.ready();

})();


// Set up global UI manager for Alpine.js
window.uiManager = function() {
	return {
		ui: {
			modal: null,
			dropdown: null,
			accordions: []
		},
		show(type, id) {
			document.dispatchEvent(new CustomEvent('ui-show', { detail: { type, id } }));
			if (type === 'modal' || type === 'dropdown') {
				this.ui[type] = id;
				
				if (type === 'modal' && id === 'video') {
					const videoModal = document.getElementById('modalVideo');
					const videoElement = videoModal.querySelector('video');
					if (videoElement) {
						videoElement.play().catch(error => {
							// Autoplay prevented by browser
						});
					}
				}

			} else if (type === 'accordion') {
				if (!this.ui.accordions) this.ui.accordions = [];
				if (!this.ui.accordions.includes(id)) this.ui.accordions.push(id);
			}
		},
		hide(type, id) {
			document.dispatchEvent(new CustomEvent('ui-hide', { detail: { type, id } }));
			if (type === 'modal' || type === 'dropdown') {
				if (this.ui[type] === id) this.ui[type] = null;

				if (type === 'modal' && id === 'video') {
					const videoModal = document.getElementById('modalVideo');
					const videoElement = videoModal.querySelector('video');
					if (videoElement) {
						videoElement.pause();
						videoElement.currentTime = 0;
					}
				}
				

			} else if (type === 'accordion') {
				if (this.ui.accordions) {
					this.ui.accordions = this.ui.accordions.filter(item => item !== id);
				}
			}
		},
		toggle(type, id) {
			this.isOpen(type, id) ? this.hide(type, id) : this.show(type, id);
		},
		isOpen(type, id) {
			if (type === 'modal' || type === 'dropdown') {
				return this.ui[type] === id;
			} else if (type === 'accordion') {
				return this.ui.accordions && this.ui.accordions.includes(id);
			}
			return false;
		}
	}
};