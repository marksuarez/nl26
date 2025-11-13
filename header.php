<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        [x-cloak] { display: none !important; }
    </style>
    <?php wp_head(); ?>
</head>
<body <?php body_class('antialiased'); ?>>

    <!-- Preloader -->
    <div id="preloader" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
        <div id="preloaderText" class="text-6xl leading-loose font-medium">NormAndTheGang</div>
    </div>

    <!-- Custom Cursor -->
    <div id="customCursor" class="fixed pointer-events-none z-50 hidden">
        <div class="cursor-marquee relative overflow-hidden px-4 py-2 bg-black text-white max-w-[120px]">
            <div class="marquee-content flex gap-4 whitespace-nowrap"></div>
        </div>
    </div>

    <!-- Header outside smooth scroll -->
    <header class="fixed top-0 left-0 right-0 z-50 text-white mix-blend-difference p-8">
        <div class="flex items-center justify-between">
            <!-- Logo -->
            <a href="<?php echo home_url('/'); ?>" class="block font-medium text-2xl">
                <?php bloginfo('name'); ?>
            </a>
            
            <!-- Menu Button -->
            <button role="button" data-menu-toggle class="menu-button flex items-center gap-2 md:gap-3 cursor-pointer border-none p-2 -m-2">
                <div class="menu-button-text relative overflow-hidden h-6 md:h-7 flex items-center">
                    <p class="menu-text-menu font-medium m-0 whitespace-nowrap transition-transform duration-300">Menu</p>
                    <p class="menu-text-close font-medium absolute top-0 left-0 m-0 whitespace-nowrap transition-transform duration-300">Close</p>
                </div>
                <div class="menu-button-icon relative w-4 h-4 md:w-4 md:h-4 flex items-center justify-center">
                    <svg class="w-full h-full" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line class="menu-icon-line" x1="10" y1="0" x2="10" y2="20" stroke="currentColor" stroke-width="1.5"/>
                        <line class="menu-icon-line" x1="0" y1="10" x2="20" y2="10" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                </div>
            </button>
        </div>
    </header>

    <!-- Side Navigation -->
    <nav class="nav fixed inset-0 z-40 pointer-events-none" data-nav="closed" style="display: none;">
        <!-- Overlay -->
        <div class="overlay absolute inset-0 opacity-0 pointer-events-none"></div>
        
        <!-- Background Panels (wipe effect with offset layering) -->
        <div class="bg-panel absolute top-0 right-0 h-full transform translate-x-full bg-white" style="width: 50%;"></div>
        <div class="bg-panel absolute top-0 right-0 h-full transform translate-x-full bg-red-500" style="width: calc(50% - 1rem);"></div>
        <div class="bg-panel absolute top-0 right-0 h-full transform translate-x-full bg-black" style="width: calc(50% - 2rem);"></div>
        
        <!-- Menu Content -->
        <div class="menu absolute top-0 right-0 w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-between py-12 md:py-16 px-6 md:px-12 lg:px-16 transform translate-x-full overflow-y-auto">
            <!-- Logo in Menu -->
            <div data-menu-fade>
                <a href="<?php echo home_url('/'); ?>" class="">
                    <?php bloginfo('name'); ?>
                </a>
            </div>
            
            <!-- Menu Links -->
            <div class="space-y-4 md:space-y-6" data-menu-fade>
                <?php
                if (has_nav_menu('primary')) {
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'container'      => false,
                        'items_wrap'     => '%3$s',
                        'walker'         => new Copilot_Walker_Nav_Menu(),
                    ));
                } else {
                    // Fallback menu if no menu is assigned
                    ?>
                    <div class="menu-link-wrapper overflow-hidden">
                        <a href="<?php echo home_url('/'); ?>" class="menu-link block text-white py-1" data-transition="fade">
                            Home
                        </a>
                    </div>
                    <div class="menu-link-wrapper overflow-hidden">
                        <a href="<?php echo home_url('/page'); ?>" class="menu-link block text-white py-1" data-transition="fade">
                            Page
                        </a>
                    </div>
                    <?php
                }
                ?>
            </div>
            
            <!-- Footer Info -->
            <div class="space-y-4 opacity-60" data-menu-fade>
                <p>Get in touch</p>
                <p>hello@<?php echo str_replace(['http://', 'https://', 'www.'], '', home_url()); ?></p>
            </div>
        </div>
    </nav>

    <div id="smooth-wrapper">
        <div id="smooth-content">
        

        
        <!-- Main element moved to individual template files for custom transitions -->
