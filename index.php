<?php get_header(); ?>

<main id="swup" class="transition-scale" data-swup data-body-class="<?php echo esc_attr(implode(' ', get_body_class())); ?>">

    <?php if (have_posts()) : ?>
        <div class="min-h-screen py-12">
            <div class="container mx-auto px-4">
                <?php while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('mb-12 fade-in'); ?>>
                        <h2 class="font-bold mb-4">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>
                        <div class="prose max-w-none">
                            <?php the_excerpt(); ?>
                        </div>
                        <a href="<?php the_permalink(); ?>" class="inline-block mt-4">Read more &rarr;</a>
                    </article>
                <?php endwhile; ?>
                
                <div class="pagination mt-12">
                    <?php the_posts_pagination(array(
                        'mid_size' => 2,
                        'prev_text' => __('&larr; Previous', 'copilot'),
                        'next_text' => __('Next &rarr;', 'copilot'),
                    )); ?>
                </div>
            </div>
        </div>
    <?php else : ?>
        <div class="min-h-screen flex items-center justify-center">
            <p><?php _e('No posts found.', 'copilot'); ?></p>
        </div>
    <?php endif; ?>

</main><!-- #swup -->

<?php get_footer(); ?>
