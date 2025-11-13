<?php get_header(); ?>

    <main id="swup" class="transition-fade" data-swup data-body-class="<?php echo esc_attr(implode(' ', get_body_class())); ?>">

        <?php while (have_posts()) : the_post(); ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            
            <!-- Hero Section -->
            <section class="w-full min-h-screen py-24">
                <div class="w-full h-full container-fluid">
                    <div class="w-full h-full grid grid-cols-1 gap-8">
                        
                        <!-- Title -->
                        <div class="w-full">
                            <h1 class="text-6xl font-bold"><?php the_title(); ?></h1>
                            
                            <div class="flex flex-wrap gap-4 mt-8 text-sm text-gray-600">
                                <time datetime="<?php echo get_the_date('c'); ?>">
                                    <?php echo get_the_date(); ?>
                                </time>
                                
                                <?php if (get_the_category()) : ?>
                                <span>|</span>
                                <div class="flex gap-2">
                                    <?php foreach(get_the_category() as $category): ?>
                                    <a href="<?php echo get_category_link($category->term_id); ?>" class="hover:underline">
                                        <?php echo $category->name; ?>
                                    </a>
                                    <?php endforeach; ?>
                                </div>
                                <?php endif; ?>
                                
                                <?php if (get_the_author()) : ?>
                                <span>|</span>
                                <span>By <?php the_author(); ?></span>
                                <?php endif; ?>
                            </div>
                        </div>
                        
                        <!-- Featured Image -->
                        <?php if (has_post_thumbnail()) : ?>
                        <div class="w-full">
                            <?php the_post_thumbnail('full', ['class' => 'w-full h-auto rounded-xl']); ?>
                        </div>
                        <?php endif; ?>
                        
                        <!-- Content -->
                        <div class="w-full max-w-[800px] mx-auto">
                            <div class="prose prose-lg max-w-none">
                                <?php the_content(); ?>
                            </div>
                            
                            <?php if (get_the_tags()) : ?>
                            <div class="mt-12 pt-8 border-t">
                                <div class="flex flex-wrap gap-2">
                                    <?php foreach(get_the_tags() as $tag): ?>
                                    <a href="<?php echo get_tag_link($tag->term_id); ?>" class="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                                        <?php echo $tag->name; ?>
                                    </a>
                                    <?php endforeach; ?>
                                </div>
                            </div>
                            <?php endif; ?>
                        </div>
                        
                        <!-- Post Navigation -->
                        <div class="w-full max-w-[800px] mx-auto mt-12 pt-12 border-t">
                            <div class="grid grid-cols-2 gap-8">
                                <div>
                                    <?php
                                    $prev_post = get_previous_post();
                                    if ($prev_post) :
                                    ?>
                                    <a href="<?php echo get_permalink($prev_post->ID); ?>" class="block group">
                                        <span class="text-sm text-gray-600">Previous</span>
                                        <h3 class="text-xl font-bold group-hover:underline"><?php echo get_the_title($prev_post->ID); ?></h3>
                                    </a>
                                    <?php endif; ?>
                                </div>
                                
                                <div class="text-right">
                                    <?php
                                    $next_post = get_next_post();
                                    if ($next_post) :
                                    ?>
                                    <a href="<?php echo get_permalink($next_post->ID); ?>" class="block group">
                                        <span class="text-sm text-gray-600">Next</span>
                                        <h3 class="text-xl font-bold group-hover:underline"><?php echo get_the_title($next_post->ID); ?></h3>
                                    </a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

        </article>

        <?php endwhile; ?>

    </main><!-- #swup -->

<?php get_footer(); ?>
