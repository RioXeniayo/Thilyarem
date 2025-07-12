    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // --- Reusable Image Slider Logic ---
            /**
             * Finds all sliders with the class '.slider-container' and initializes them.
             * @param {HTMLElement} sliderElement - The container element for a single slider.
             */
            function initializeSlider(sliderElement) {
                const sliderTrack = sliderElement.querySelector('.slider-track');
                const prevButton = sliderElement.querySelector('.prev-slide');
                const nextButton = sliderElement.querySelector('.next-slide');
                
                if (!sliderTrack || !prevButton || !nextButton) {
                    console.error("A slider is missing required elements (track or buttons).");
                    return;
                }

                const slides = sliderTrack.children;
                const slideCount = slides.length;
                let currentIndex = 0;

                function updateSliderPosition() {
                    const offset = -currentIndex * 100;
                    sliderTrack.style.transform = `translateX(${offset}%)`;
                }

                nextButton.addEventListener('click', function () {
                    currentIndex = (currentIndex + 1) % slideCount;
                    updateSliderPosition();
                });

                prevButton.addEventListener('click', function () {
                    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                    updateSliderPosition();
                });
            }

            // Initialize all sliders on the page.
            document.querySelectorAll('.slider-container').forEach(initializeSlider);
        });
    </script>
