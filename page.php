<?php get_header(); ?>

<main id="swup" class="transition-slide" data-swup data-body-class="<?php echo esc_attr(implode(' ', get_body_class())); ?>">

    <section class="min-h-screen flex items-center justify-center">
    <div class="px-4">
        <h1 class="font-bold mb-6 scale-in"><?php the_title(); ?></h1>
        <p class="fade-in">Scroll to see GSAP timeline animations</p>
    </div>
    </section>

    <section class="min-h-screen flex items-center justify-center">
    <div class="max-w-4xl px-4">
        <h2 class="font-bold mb-8 slide-in">Content Section</h2>
        <div class="grid grid-cols-2 gap-6">
            <div class="p-6 rounded-lg scale-in shadow-md border border-gray-200">
                <h3 class="font-bold mb-3">Feature A</h3>
                <p>GSAP timeline animation</p>
            </div>
            <div class="p-6 rounded-lg scale-in shadow-md border border-gray-200">
                <h3 class="font-bold mb-3">Feature B</h3>
                <p>ScrollTrigger animation</p>
            </div>
        </div>
    </div>
    </section>

    <section class="min-h-screen flex items-center justify-center">
        <div class="px-4">
            <h2 class="font-bold mb-8 fade-in">Navigate</h2>
            <a href="<?php echo home_url('/'); ?>" class="px-6 py-3 rounded-lg font-semibold inline-block transition-colors" data-transition="slide">Back to Home</a>
        </div>
    </section>

</main><!-- #swup -->

<?php get_footer(); ?>
