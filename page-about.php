<?php
/**
 * Template Name: About Page
 */
get_header(); ?>

    <main id="swup" class="transition-fade" data-swup data-body-class="<?php echo esc_attr(implode(' ', get_body_class())); ?>">

        <section id="aboutHeroSection" class="w-full h-screen overflow-hidden relative">
            <!-- Video Background -->
            <div class="absolute inset-0 pointer-events-none" data-speed="0.6">
                <video autoplay playsinline muted loop class="video-js w-full h-full object-center object-cover">
                    <!-- <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"> -->
                    <source src="/wp-content/uploads/buildinamsterdam.mp4" type="video/mp4">
                </video>
            </div>
            
            <!-- Content -->
            <div class="relative w-full h-full container-fluid pointer-events-none">
                <div class="w-full h-full grid grid-cols-1">
                    <div class="w-full h-full flex flex-col justify-end items-start p-8">
                        <h1 class="text-6xl text-white mix-blend-difference">Your Full-Spectrum<br/>Creative Studio</h1>
                    </div>
                </div>
            </div>
        </section>

        <section id="aboutPeopleSection" class="w-full h-auto py-48">
            <div class="container mx-auto">
                <div class="grid grid-cols-1">
                    <div class="flex flex-col items-center">
                        <div class="cards w-full h-auto grid grid-cols-2 md:grid-cols-4 gap-8">

                        <?php for($i = 1; $i <= 12; $i++): ?>
                            <div class="card">
                                <div class="card-top">
                                    <img src="https://placehold.co/400x400" alt="Person <?php echo $i; ?>" class="w-full h-auto object-cover"/>
                                </div>
                                <div class="card-bottom flex flex-col">
                                    <h3 class="">Person <?php echo $i; ?></h3>
                                    <p class="">Position <?php echo $i; ?></p>
                                    <div>
                                        <a href="#" class="">View Profile</a>
                                    </div>    
                                </div>
                            </div>
                        <?php endfor; ?>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="aboutStatementSection" class="">
            <div class="w-full h-full container-fluid">
                <div class="w-full h-full grid grid-cols-1">
                    <div class="w-full h-full flex flex-col justify-center items-center" data-custom-cursor="moreInfo">
                        <a class="block max-w-[800px] mx-auto text-6xl pointer-events-auto" href="/case">24 years, 10 milllion visuals. Hundreds of Happy Clients.</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="aboutSectorsSection" class="">            
        </section>

        <section id="aboutProcessSection" class="">
        </section>

    </main><!-- #swup -->

<?php get_footer(); ?>
