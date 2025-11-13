
        <!-- Main element closed in individual template files -->
        
        <footer class="bg-black text-white w-full h-screen flex flex-col items-center justify-center">
            <div class="container-fluid flex-1 flex items-center justify-center">
                <div class="grid">
                    <div class="flex flex-col">
                        <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
                    </div>
                </div>
            </div>
            <div class="w-full py-24">
                <div class="text-center text-[8vw] font-bold leading-none">
                    NormAndTheGang
                </div>
            </div>
        </footer>
    
    </div><!-- #smooth-content -->
</div><!-- #smooth-wrapper -->

<!-- Video Modal -->
<div 
    x-data="{ open: false, videoSrc: '' }"
    x-show="open"
    x-cloak
    @video-modal-open.window="open = true; videoSrc = $event.detail.src"
    @video-modal-close.window="open = false; videoSrc = ''"
    @keydown.escape.window="if(open) { $dispatch('video-modal-close'); }"
    class="fixed inset-0 z-[100] flex items-center justify-center p-4"
    style="display: none;"
>
    <!-- Backdrop -->
    <div 
        x-show="open"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        @click="window.dispatchEvent(new CustomEvent('video-modal-close'))"
        onclick="window.dispatchEvent(new CustomEvent('video-modal-close'))"
    class="absolute inset-0 bg-black bg-opacity-90"
    ></div>
    
    <!-- Modal Content -->
    <div 
        x-show="open"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
    class="relative w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl"
        @click.stop
    >
        <!-- Close Button -->
        <button 
            @click="window.dispatchEvent(new CustomEvent('video-modal-close'))"
            onclick="window.dispatchEvent(new CustomEvent('video-modal-close'))"
            class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
        >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        
        <!-- Video Container -->
        <div class="relative aspect-video w-full bg-black">
            <video 
                id="modal-video"
                class="video-js vjs-default-skin vjs-big-play-centered w-full h-full object-contain"
                controls
                preload="auto"
                data-setup='{"fluid": true}'
            >
                <!-- Source will be set dynamically by JavaScript -->
            </video>
        </div>
    </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
