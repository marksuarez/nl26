<?php
/**
 * Copilot Theme Functions
 */

// Theme Support
function copilot_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'copilot'),
    ));
}
add_action('after_setup_theme', 'copilot_theme_support');

// Enqueue Scripts and Styles
function copilot_enqueue_assets() {
    // Swup transitions
    wp_enqueue_style('copilot-transitions', get_template_directory_uri() . '/css/transitions.css', array(), '1.0.0');
    
    // Video.js CSS
    wp_enqueue_style('videojs', 'https://vjs.zencdn.net/8.10.0/video-js.css', array(), '8.10.0');
    
    // Main theme stylesheet
    wp_enqueue_style('copilot-style', get_stylesheet_uri(), array('copilot-transitions', 'videojs'), '1.0.0');
    
    // Video.js
    wp_enqueue_script('videojs', 'https://vjs.zencdn.net/8.10.0/video.min.js', array(), '8.10.0', true);
    
    // GSAP Core
    wp_enqueue_script('gsap', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', array(), '3.12.5', true);
    
    // GSAP ScrollTrigger
    wp_enqueue_script('gsap-scrolltrigger', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', array('gsap'), '3.12.5', true);
    
    // GSAP ScrollSmoother (local file - premium plugin)
    wp_enqueue_script('gsap-scrollsmoother', get_template_directory_uri() . '/js/libs/ScrollSmoother.min.js', array('gsap', 'gsap-scrolltrigger'), '3.12.5', true);
    
    // GSAP ScrollToPlugin
    wp_enqueue_script('gsap-scrollto', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js', array('gsap'), '3.12.5', true);
    
    // GSAP CustomEase (premium plugin - UMD version)
    wp_enqueue_script('gsap-customease', get_template_directory_uri() . '/js/libs/CustomEase.min.js', array('gsap'), '3.12.5', true);
    
    // GSAP SplitText (premium plugin)
    wp_enqueue_script('gsap-splittext', get_template_directory_uri() . '/js/libs/SplitText.min.js', array('gsap'), '3.12.5', true);
    
    // Alpine.js
    wp_enqueue_script('alpine', 'https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js', array(), '3.13.3', true);
    add_filter('script_loader_tag', 'copilot_defer_alpine', 10, 2);
    
    // Swup - using v2 for better file availability
    wp_enqueue_script('swup', 'https://unpkg.com/swup@2.0.19/dist/swup.min.js', array(), '2.0.19', true);
    
    // Swup Head Plugin for v2
    wp_enqueue_script('swup-head-plugin', 'https://unpkg.com/@swup/head-plugin@1.1.0/dist/SwupHeadPlugin.js', array('swup'), '1.1.0', true);
    
    // Custom theme script (no jQuery dependency)
    wp_enqueue_script('copilot-main', get_template_directory_uri() . '/js/main.js', array('videojs', 'gsap', 'gsap-scrolltrigger', 'gsap-scrollsmoother', 'gsap-scrollto', 'gsap-customease', 'gsap-splittext', 'alpine', 'swup', 'swup-head-plugin'), '1.0.0', true);
    
    // Pass PHP data to JavaScript
    wp_localize_script('copilot-main', 'copilotData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'themeUrl' => get_template_directory_uri(),
        'homeUrl' => home_url('/'),
    ));
}
add_action('wp_enqueue_scripts', 'copilot_enqueue_assets');

// Defer Alpine.js
function copilot_defer_alpine($tag, $handle) {
    if ('alpine' === $handle) {
        return str_replace(' src', ' defer src', $tag);
    }
    return $tag;
}

// Remove WordPress emoji scripts
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

// Clean up WordPress head
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head');

// Add Tailwind CSS to head
function copilot_add_tailwind() {
    ?>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['GT Flexa', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                        display: ['GT Flexa', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <?php
}
add_action('wp_head', 'copilot_add_tailwind', 1);

// Ensure global body classes (used by Swup resets)
function copilot_global_body_classes($classes) {
    $custom_classes = array('antialiased', 'bg-black', 'text-white');
    foreach ($custom_classes as $class) {
        if (!in_array($class, $classes, true)) {
            $classes[] = $class;
        }
    }
    return $classes;
}
add_filter('body_class', 'copilot_global_body_classes');

// Custom Walker for Menu Links
class Copilot_Walker_Nav_Menu extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $transition = 'fade'; // default transition
        
        // Check for custom transition in CSS classes
        if (in_array('transition-slide', $classes)) {
            $transition = 'slide';
        } elseif (in_array('transition-scale', $classes)) {
            $transition = 'scale';
        }
        
        $output .= '<div class="menu-link-wrapper overflow-hidden">';
        $output .= '<a href="' . esc_url($item->url) . '" class="menu-link block text-white text-4xl md:text-6xl lg:text-7xl hover:text-red-500 py-1" data-transition="' . esc_attr($transition) . '">';
        $output .= esc_html($item->title);
        $output .= '</a>';
        $output .= '</div>';
    }
    
    function end_el(&$output, $item, $depth = 0, $args = null) {
        // Already closed in start_el
    }
}
