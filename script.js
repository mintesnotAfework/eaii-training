// Initial setup
document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.getElementById('slidesContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    
    let currentSlide = 0;
    let totalSlides = document.querySelectorAll('.slide').length;
    
    // Update slide counter
    function updateCounter() {
        slideCounter.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;
    }
    
    // Update navigation buttons
    function updateButtons() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        
        // Style adjustments for disabled state
        if (prevBtn.disabled) {
            prevBtn.style.opacity = "0.5";
        } else {
            prevBtn.style.opacity = "1";
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = "0.5";
        } else {
            nextBtn.style.opacity = "1";
        }
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= totalSlides) return;
        
        currentSlide = slideIndex;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
        updateCounter();
        updateButtons();
    }
    
    // Next slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }
    
    // Event listeners for buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            prevSlide();
        }
    });
    
    // Initialize
    updateCounter();
    updateButtons();
    
    // Function to add new slide (to be called when you provide content)
    window.addSlide = function(slideNumber, title, description, contentHTML) {
        const newSlide = document.createElement('div');
        newSlide.className = 'slide';
        newSlide.id = `slide${slideNumber}`;
        
        // Create slide header
        const slideHeader = document.createElement('div');
        slideHeader.className = 'slide-header';
        slideHeader.innerHTML = `
            <img src="https://cdn-icons-png.flaticon.com/512/681/681662.png" alt="EAII Logo" class="company-logo">
            <div class="company-info">
                <div class="company-name">EAII</div>
                <div class="division-name">Cybersecurity Division</div>
            </div>
        `;
        
        // Create slide content
        const slideContent = document.createElement('div');
        slideContent.className = 'slide-content';
        slideContent.innerHTML = `
            <h1 class="slide-title">${title}</h1>
            <p class="slide-description">${description}</p>
            ${contentHTML}
        `;
        
        // Assemble slide
        newSlide.appendChild(slideHeader);
        newSlide.appendChild(slideContent);
        
        // Add slide to container
        slidesContainer.appendChild(newSlide);
        
        // Update total slides count and navigation
        totalSlides = document.querySelectorAll('.slide').length;
        updateButtons();
        
        console.log(`Slide ${slideNumber} added successfully`);
        return newSlide;
    };
});
