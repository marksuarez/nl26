<?php get_header(); ?>

    <main id="swup" class="transition-fade" data-swup data-body-class="<?php echo esc_attr(implode(' ', get_body_class())); ?>">

        <!-- Category Header -->
        <section class="w-full py-24">
            <div class="w-full container-fluid">
                <div class="w-full grid grid-cols-1">
                    <div class="w-full">
                        <p class="text-sm uppercase tracking-wider text-gray-600 mb-4">Category</p>
                        <h1 class="text-6xl font-bold">
                            <?php single_cat_title(); ?>
                        </h1>
                        
                        <?php if (category_description()) : ?>
                        <div class="mt-6 text-xl text-gray-600 max-w-[800px]">
                            <?php echo category_description(); ?>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </section>

        <!-- Posts Grid -->
        <section class="w-full py-24">
            <div class="w-full container-fluid">
                
                <?php if (have_posts()) : ?>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <?php while (have_posts()) : the_post(); ?>
                    
                    <article id="post-<?php the_ID(); ?>" <?php post_class('group'); ?>>
                        <a href="<?php the_permalink(); ?>" class="block">
                            
                            <?php if (has_post_thumbnail()) : ?>
                            <div class="w-full aspect-video overflow-hidden rounded-xl mb-6">
                                <?php the_post_thumbnail('large', ['class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300']); ?>
                            </div>
                            <?php endif; ?>
                            
                            <h2 class="text-2xl font-bold mb-3 group-hover:underline">
                                <?php the_title(); ?>
                            </h2>
                            
                            <?php if (has_excerpt()) : ?>
                            <p class="text-gray-600 mb-4">
                                <?php echo wp_trim_words(get_the_excerpt(), 20); ?>
                            </p>
                            <?php endif; ?>
                            
                            <div class="flex items-center gap-4 text-sm text-gray-500">
                                <time datetime="<?php echo get_the_date('c'); ?>">
                                    <?php echo get_the_date(); ?>
                                </time>
                                <?php if (get_the_author()) : ?>
                                <span>·</span>
                                <span><?php the_author(); ?></span>
                                <?php endif; ?>
                            </div>
                            
                        </a>
                    </article>
                    
                    <?php endwhile; ?>
                    
                </div>
                
                <!-- Pagination -->
                <?php if (paginate_links()) : ?>
                <div class="mt-16 flex justify-center">
                    <div class="flex gap-2">
                        <?php
                        echo paginate_links([
                            'prev_text' => '← Previous',
                            'next_text' => 'Next →',
                            'type' => 'list',
                            'class' => 'flex gap-2'
                        ]);
                        ?>
                    </div>
                </div>
                <?php endif; ?>
                
                <?php else : ?>
                
                <div class="text-center py-24">
                    <h2 class="text-3xl font-bold mb-4">No posts found</h2>
                    <p class="text-gray-600">Sorry, no posts were found in this category.</p>
                </div>
                
                <?php endif; ?>
                
            </div>
        </section>

    </main><!-- #swup -->

<?php get_footer(); ?>
