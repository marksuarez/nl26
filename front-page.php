<?php get_header(); ?>

    <main id="swup" class="transition-fade" data-swup data-body-class="<?php echo esc_attr(implode(' ', get_body_class())); ?>">

        <!-- Hero Section -->
        <section id="homeHeroSection" data-custom-cursor="playReel" onclick="window.dispatchEvent(new CustomEvent('video-modal-open', { detail: { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' } }))" class="relative isolate w-full h-screen overflow-hidden cursor-pointer">
            <!-- Video Background -->
            <div class="absolute inset-0 pointer-events-none" data-speed="0.6">
                <video autoplay playsinline muted loop class="video-js w-full h-full object-center object-cover">
                    <!-- <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"> -->
                    <source src="/wp-content/uploads/seachange.mp4" type="video/mp4">
                </video>
            </div>
            
            <!-- Content -->
            <div class="relative w-full h-full container-fluid pointer-events-none">
                <div class="w-full h-full grid grid-cols-1">
                    <div class="w-full h-full flex flex-col justify-end items-start p-8">
                        <h1 class="text-6xl font-medium text-white uppercase mix-blend-difference">Your Full-Spectrum<br/>Creative Studio</h1>
                    </div>
                </div>
            </div>
        </section>

        <section id="homeStatement01Section" class="w-full h-auto py-48">
            <div class="w-full h-full container-fluid">
                <div class="w-full h-full grid grid-cols-1">
                    <div class="w-full h-full flex flex-col justify-center items-center" data-custom-cursor="moreInfo">
                        <a class="block max-w-[1000px] mx-auto text-5xl pointer-events-auto" href="/case">vel odio luctus faucibus lacus Nullam quam vel Ut Nam tortor. risus in diam amet, Nunc non vitae id ullamcorper.</a>
                    </div>
                </div>
            </div>
        </section>

        <?php 
        $services = [
            [
                'preheading' => 'Service 01',
                'heading' => '3D & CGI',
                'subheading' => 'Photorealistic Rendering and Animation',
                'link' => '/services/brand-strategy',
                'image' => 'https://placehold.co/600x400/ef4444/ffffff',
                'alt' => 'Brand Strategy'
            ],
            [
                'preheading' => 'Service 02',
                'heading' => 'Branding',
                'subheading' => 'Identities, Web, Video, and Social Content',
                'link' => '/services/creative-design',
                'image' => 'https://placehold.co/600x400/ef4444/ffffff',
                'alt' => 'Creative Design'
            ],
            [
                'preheading' => 'Service 03',
                'heading' => 'Consulting',
                'subheading' => 'Design strategy and team training',
                'link' => '/services/digital-development',
                'image' => 'https://placehold.co/600x400/ef4444/ffffff',
                'alt' => 'Digital Development'
            ],
            [
                'preheading' => 'Service 04',
                'heading' => 'AI Integration',
                'subheading' => 'Cutting-edge creative solutions',
                'link' => '/services/content-creation',
                'image' => 'https://placehold.co/600x400/ef4444/ffffff',
                'alt' => 'Content Creation'
            ],
            [
                'preheading' => 'Service 05',
                'heading' => 'Aerial Photography',
                'subheading' => 'Unique perspectives for your project',
                'link' => '/services/marketing-strategy',
                'image' => 'https://placehold.co/600x400/ef4444/ffffff',
                'alt' => 'Marketing Strategy'
            ],
            [
                'preheading' => 'Service 06',
                'heading' => 'Event Production',
                'subheading' => 'End-to-end event design and execution',
                'link' => '/services/analytics',
                'image' => 'https://placehold.co/600x400/ef4444/ffffff',
                'alt' => 'Analytics & Insights'
            ]
        ];
        ?>

        <section id="homeServicesSection" class="w-full h-screen bg-black text-white overflow-hidden">
            <div class="w-full h-full container-fluid">
                <div class="w-full h-full grid grid-cols-2 gap-8">
                    <!-- Left Column - Images -->
                    <div class="w-full h-full flex flex-col justify-center items-center p-24">
                        <div class="service-images relative w-full h-full">
                            <?php foreach($services as $index => $service): ?>
                            <figure class="service-image absolute inset-0 w-full h-full" data-service="<?php echo $index; ?>">
                                <img src="<?php echo $service['image']; ?>" alt="<?php echo $service['alt']; ?>" class="w-full h-full object-center object-cover"/>
                            </figure>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    
                    <!-- Right Column - Text Content -->
                    <div class="w-full h-full flex flex-col justify-center items-start p-24">
                        <div class="service-content relative w-full h-auto flex flex-col justify-center">
                            <?php foreach($services as $index => $service): ?>
                            <div class="service-slide absolute w-full flex flex-col gap-4" data-service="<?php echo $index; ?>">
                                <p class="service-preheading text-sm uppercase tracking-wider"><?php echo $service['preheading']; ?></p>
                                <h2 class="service-heading text-5xl"><?php echo $service['heading']; ?></h2>
                                <p class="service-subheading text-xl"><?php echo $service['subheading']; ?></p>
                                <a href="<?php echo $service['link']; ?>" class="service-link text-base underline" data-custom-cursor="moreInfo">Learn More</a>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="homeStatement02Section" class="w-full h-auto py-48">
            <div class="w-full h-full container-fluid">
                <div class="w-full h-full grid grid-cols-1">
                    <div class="w-full h-full flex flex-col justify-center items-center" data-custom-cursor="moreInfo">
                        <a class="block max-w-[1000px] mx-auto text-5xl pointer-events-auto" href="/case">vel odio luctus faucibus lacus Nullam quam vel Ut Nam tortor. risus in diam amet, Nunc non vitae id ullamcorper.</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="homeFeaturedCaseStudiesSection" class="w-full h-screen overflow-hidden">
            <div class="w-full h-full container-fluid">
                <div class="w-full h-full grid grid-cols-1">
                    <div class="w-full h-full flex flex-col justify-center items-start">
                        <div class="cards w-auto h-full flex flex-row justify-start gap-8 p-8">

                            <?php for($i = 0; $i < 3; $i++): ?>

                            <a href="/case" data-custom-cursor="moreInfo" class="card rounded-xl w-[800px] max-w-full h-full flex flex-grow flex-col justify-end items-start bg-red-500 text-white gap-4 p-8">
                                <div class="pretitle bg-black text-white text-xs uppercase px-4 py-2 rounded">Featured Case Study</div>
                                <h3 class="text-3xl">vel odio luctus faucibus lacus Nullam quam vel Ut Nam tortor. risus in diam amet, Nunc non vitae id ullamcorper.</h3>
                            </a>

                            <?php endfor; ?>


                        </div>
                    </div>
                </div>
            </div>
        </section>









</main><!-- #swup -->

<?php get_footer(); ?>
