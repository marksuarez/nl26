<?php get_header(); ?>

<main id="swup" class="transition-fade" data-swup data-body-class="<?php echo esc_attr(implode(' ', get_body_class())); ?>">
    
    <!-- Hero Section -->
    <section id="" class="min-h-screen flex items-center justify-center overflow-hidden relative">
        <div class="absolute w-full h-full flex flex-col justify-center items-center" data-speed="0.6">
            <?php ?>
            <img src="https://placehold.co/1600x900" class="hidden w-full h-full object-center object-cover z-0"/>
            <?php ?>
            <video autoplay playsinline muted loop class="video-js w-full h-full object-center object-cover z-0">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            </video>
        </div>
        <div class="container relative z-10 px-4 mx-auto">
            <div class="row grid grid-cols-1">
                <div class="col flex flex-col items-center">
                    <h1>Title</h1>
                </div>
            </div>
        </div>
    </section>

    <!-- Masthead Section -->
    <section class="relative py-48">
        <div class="container z-10 px-4 mx-auto">
            <div class="row grid grid-cols-1">
                <div class="col flex flex-col items-center">
                    <h2>Masthead Title</h2>
                    <p>Subtitle and Info</p>
                </div>
            </div>
        </div>
    </section>

    <section class="relative">
        <!-- wrap for tailwind classes -->
        <div class="
        w-full
        [&_.wp-block-columns]:flex 
        [&_.wp-block-columns]:mx-auto 
        [&_.wp-block-columns]:m-0 
        [&_.wp-block-column]:flex-1 
        [&_.wp-block-column]:flex 
        [&_.wp-block-column]:flex-col 
        [&_.wp-block-column]:items-center 
        [&_.wp-block-image]:w-full 
        [&_.wp-block-image>img]:w-full 
        [&_.wp-block-video]:w-full 
        [&_.wp-block-video>video]:w-full 
        ">
            
            <!-- WP CMS Content Goes Here -->
            <?php the_content(); ?>

            <!-- example section -->
            <div class="wp-block-group"> <!-- can add bg-color/width/height/padding/margin classes here -->
                <div class="wp-block-columns"> <!-- like a row -->
                    <div class="wp-block-column"> <!-- like a col -->
                        <figure class="wp-block-video">
                            <video controls>
                                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                            </video>
                            <p>Video Caption</p>
                        </figure>
                    </div>
                    <div class="wp-block-column">
                        <figure class="wp-block-image">
                            <img src="https://placehold.co/600x400" alt="Example Image" />
                            <p>Image Caption</p>
                        </figure>
                    </div>
                </div>
            </div>    

            <!-- mixed text and media section -->
            <div class="wp-block-group"> <!-- can add bg-color/width/height/padding/margin classes here -->
                <div class="wp-block-columns"> <!-- like a row -->
                    <div class="wp-block-column"> <!-- like a col -->
                        <p>This is some example text content that goes alongside media. You can add more paragraphs, headings, or other blocks here as needed.</p>
                    </div>
                    <div class="wp-block-column"> <!-- like a col -->
                        <figure class="wp-block-image">
                            <img src="https://placehold.co/600x400" alt="Example Image" />
                            <p>Image Caption</p>
                        </figure>
                    </div>
                </div>
            </div>

            <!-- three column section -->
            <div class="wp-block-group"> <!-- can add bg-color/width/height/padding/margin classes here -->
                <div class="wp-block-columns"> <!-- like a row -->
                    <div class="wp-block-column"> <!-- like a col -->
                        <h3>Column 1</h3>
                        <p>Content for the first column goes here. You can add text, images, or other blocks as needed.</p>
                    </div>
                    <div class="wp-block-column"> <!-- like a col -->
                        <h3>Column 2</h3>
                        <p>Content for the second column goes here. You can add text, images, or other blocks as needed.</p>
                    </div>
                    <div class="wp-block-column"> <!-- like a col -->
                        <h3>Column 3</h3>
                        <p>Content for the third column goes here. You can add text, images, or other blocks as needed.</p>
                    </div>
                </div>
            </div>

            <!-- big blockquote section -->
            <div class="wp-block-group"> <!-- can add bg-color/width/height/padding/margin classes here -->
                <div class="wp-block-columns">
                    <div class="wp-block-column"> <!-- like a col -->
                        <blockquote class="wp-block-quote">
                            <p>This is an example of a large blockquote section. It can be used to highlight important quotes or statements within your content.</p>
                            <cite>— Author Name</cite>
                        </blockquote>
                    </div>
                </div>
            </div>

            <!-- custom gsap animation section -->
            <div class="wp-block-group"> <!-- can add bg-color/width/height/padding/margin classes here -->
                <div class="wp-block-columns"> <!-- like a row -->
                    <div class="wp-block-column"> <!-- like a col -->
                        <h2>Animated Section</h2>
                        <p>This section can include custom GSAP animations for enhanced interactivity and visual appeal.</p>
                    </div>
                </div>
            </div>

            <!-- custom iframe section -->
            <div class="wp-block-group"> <!-- can add bg-color/width/height/padding/margin classes here -->
                <div class="wp-block-columns"> <!-- like a row -->
                    <div class="wp-block-column"> <!-- like a col -->
                        <iframe src="https://www.example.com" class="w-full h-96" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>

            <!-- full screen parallax section -->
            <div class="relative wp-block-group h-screen overflow-hidden flex flex-col justify-center"> <!-- can add bg-color/width/height/padding/margin classes here -->
                <div class="wp-block-columns"> <!-- like a row -->
                    <div class="wp-block-column"> <!-- like a col -->
                        <!-- absolute positioned image or video w-full h-full -->
                        <img src="https://placehold.co/1600x900" data-speed="0.6" class="w-full h-full object-center object-cover absolute inset-0"/>
                        <p class="absolute">Hello World</p>
                    </div>
                </div>
            </div>

        </div>
    </section>


    <!-- lateral navigation section -->
    <section>
        <div class="container mx-auto px-4">
            <div>
                <div>
                    <div class="cards flex gap-4">
                        <a class="card flex-1 flex flex-col">
                            <div class="card-top">
                                <div class="aspect-video">
                                    <!-- media content here - image/video/etc. -->
                                </div>
                            </div>
                            <div class="card-bottom flex flex-col justify-center items-center">
                                <h3>Card 1</h3>
                            </div>
                        </a>
                        <a class="card flex-1 flex flex-col">
                            <div class="card-top">
                                <div class="aspect-video">
                                    <!-- media content here - image/video/etc. -->
                                </div>
                            </div>
                            <div class="card-bottom flex flex-col justify-center items-center">
                                <h3>Card 1</h3>
                            </div>
                        </a>
                        <a class="card flex-1 flex flex-col">
                            <div class="card-top">
                                <div class="aspect-video">
                                    <!-- media content here - image/video/etc. -->
                                </div>
                            </div>
                            <div class="card-bottom flex flex-col justify-center items-center">
                                <h3>Card 1</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main><!-- #swup -->

<?php get_footer(); ?>
