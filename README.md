# Copilot WordPress Theme

A bare-bones WordPress theme with Tailwind CSS, GSAP, Alpine.js, and Swup page transitions.

## Features

- **Tailwind CSS** - Utility-first CSS framework (CDN)
- **GSAP** - Animation library with ScrollTrigger, ScrollSmoother, and ScrollToPlugin
- **Alpine.js** - Lightweight JavaScript framework for components
- **Swup** - Page transition library with SEO support
- **No build process** - All libraries loaded via CDN

## File Structure

```
copilot/
├── style.css           # Theme header and basic styles
├── functions.php       # Theme setup and asset enqueuing
├── index.php          # Main template file
├── css/
│   └── transitions.css # Swup transition styles
└── js/
    └── main.js        # Main JavaScript file
```

## How It Works

### GSAP Integration
- ScrollSmoother wraps the entire page for smooth scrolling
- ScrollTrigger instances are automatically tracked
- All GSAP animations are killed and reinstantiated on page transitions

### Swup Page Transitions
- Uses data attributes to select transition animations
- Add `data-transition="slide"` to links to use slide transition
- Available transitions: `fade` (default), `slide`, `scale`, `slide-up`, `none`
- Head plugin updates meta tags for SEO Framework compatibility

### Alpine.js
- Loaded with defer attribute for optimal performance
- Components will be added as needed
- Auto-initializes on page load and reinitializes on Swup transitions

## Usage Examples

### Custom Link Transitions
```html
<!-- Default fade transition -->
<a href="/about">About</a>

<!-- Slide transition -->
<a href="/contact" data-transition="slide">Contact</a>

<!-- Scale transition -->
<a href="/services" data-transition="scale">Services</a>

<!-- No Swup transition (regular page load) -->
<a href="/external" data-no-swup>External Link</a>
```

### GSAP Animations
Add the class `fade-in` to any element to animate it on scroll:
```html
<div class="fade-in">This will fade in on scroll</div>
```

Add custom animations in `js/main.js` within the `initAnimations()` function.

### Alpine.js Components
Alpine components will be added later. Example:
```html
<div x-data="{ open: false }">
    <button @click="open = !open">Toggle</button>
    <div x-show="open">Content</div>
</div>
```

## WordPress Page Templates
Use standard WordPress template hierarchy:
- `page.php` - Single page template
- `single.php` - Single post template
- `archive.php` - Archive template
- `header.php` - Header partial
- `footer.php` - Footer partial

## Notes

- The lint errors shown are normal - they're WordPress functions that exist at runtime
- ScrollSmoother requires wrapper/content structure (already in index.php)
- Swup only transitions internal links by default
- All scripts load in footer for better performance
