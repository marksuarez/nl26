<?php
/**
 * Template Name: Work Page
 */
get_header(); ?>

    <main id="swup" class="transition-fade" data-swup data-body-class="<?php echo esc_attr(implode(' ', get_body_class())); ?>">

        <section class="w-full h-auto pt-48">
            <div class="container mx-auto">
                <div class="grid grid-cols-1">
                    <div class="flex flex-col justify-center items-center">
                        <div class="cards w-full">

                            <hr/>

                            <?php for($i = 1; $i <= 6; $i++): ?>
                                <a href="/case" class="card block py-24" data-custom-cursor="projectMedia" data-media-src="https://placehold.co/1200x800">
                                    <div class="card-top">
                                    </div>
                                    <div class="card-bottom flex flex-col">
                                        <h1 class="text-4xl">Project Name</h1>
                                    </div>
                                </a>

                                <hr/>
                            <?php endfor; ?>

                        </div>
                    </div>
                </div>
            </div>
        </section>

    </main><!-- #swup -->

<?php get_footer(); ?>
