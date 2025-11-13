<?php get_header(); ?>

    <main id="swup" class="transition-fade" data-swup data-body-class="<?php echo esc_attr(implode(' ', get_body_class())); ?>">

        <!-- 404 Section -->
        <section class="w-full min-h-screen flex items-center justify-center py-24">
            <div class="w-full container-fluid">
                <div class="w-full grid grid-cols-1">
                    <div class="w-full max-w-[800px] mx-auto text-center">
                        
                        <h1 class="text-9xl font-bold mb-8">404</h1>
                        
                        <h2 class="text-4xl font-bold mb-6">Page Not Found</h2>
                        
                        <p class="text-xl text-gray-600 mb-12">
                            Sorry, the page you're looking for doesn't exist or has been moved.
                        </p>
                        
                        <!-- Search Form -->
                        <div class="mb-12">
                            <form role="search" method="get" class="flex gap-4 max-w-[500px] mx-auto" action="<?php echo home_url('/'); ?>">
                                <input 
                                    type="search" 
                                    name="s" 
                                    placeholder="Search..." 
                                    value="<?php echo get_search_query(); ?>"
                                    class="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                />
                                <button 
                                    type="submit" 
                                    class="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                        
                        <!-- Navigation Options -->
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href="<?php echo home_url('/'); ?>" 
                                class="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                data-custom-cursor="moreInfo"
                            >
                                Go to Homepage
                            </a>
                            <button 
                                onclick="history.back()" 
                                class="px-8 py-4 border border-black rounded-lg hover:bg-black hover:text-white transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                        
                        <!-- Recent Posts (Optional) -->
                        <?php
                        $recent_posts = wp_get_recent_posts([
                            'numberposts' => 3,
                            'post_status' => 'publish'
                        ]);
                        
                        if ($recent_posts) :
                        ?>
                        <div class="mt-24 pt-24 border-t">
                            <h3 class="text-2xl font-bold mb-8">Recent Posts</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <?php foreach($recent_posts as $post_item): ?>
                                <a href="<?php echo get_permalink($post_item['ID']); ?>" class="block text-left group">
                                    <h4 class="text-lg font-bold mb-2 group-hover:underline">
                                        <?php echo $post_item['post_title']; ?>
                                    </h4>
                                    <time class="text-sm text-gray-500">
                                        <?php echo get_the_date('', $post_item['ID']); ?>
                                    </time>
                                </a>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <?php
                        wp_reset_query();
                        endif;
                        ?>
                        
                    </div>
                </div>
            </div>
        </section>

    </main><!-- #swup -->

<?php get_footer(); ?>
