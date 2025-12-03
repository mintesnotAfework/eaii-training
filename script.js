document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.getElementById('slidesContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    let totalSlides = document.querySelectorAll('.slide').length;
    
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
    
    function goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= totalSlides) return;
        
        currentSlide = slideIndex;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
        updateButtons();
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            prevSlide();
        }
    });
    
    updateButtons();
    
    window.addSlide = function(slideNumber, title, description, contentHTML) {
        const newSlide = document.createElement('div');
        newSlide.className = 'slide';
        newSlide.id = `slide${slideNumber}`;
        
        const slideHeader = document.createElement('div');
        slideHeader.className = 'slide-header';
        slideHeader.innerHTML = `
            <img src="./logo.png" alt="EAII Logo" class="company-logo">
            <div class="company-info">
                <div class="company-name">EAII</div>
                <div class="division-name">Cybersecurity Division</div>
            </div>
        `;
        
        const slideContent = document.createElement('div');
        slideContent.className = 'slide-content';
        slideContent.innerHTML = `
            <h1 class="slide-title">${title}</h1>
            <p class="slide-description">${description}</p>
            ${contentHTML}
        `;
        
        newSlide.appendChild(slideHeader);
        newSlide.appendChild(slideContent);
        
        slidesContainer.appendChild(newSlide);
        
        totalSlides = document.querySelectorAll('.slide').length;
        updateButtons();
        
        console.log(`Slide ${slideNumber} added successfully`);
        return newSlide;
    };
    addSlide(2, 
        "Objective", 
        "Understanding critical Cybersecurity and AI focus areas for executive leadership",
        `<div class="content-grid">
            <div class="content-card">
                <h3 class="card-title">Social Engineering Threats</h3>
                <div style="margin-top: 30px; text-align: center;">
                    <i class="fas fa-user-secret" style="font-size: 60px; color: #d32f2f; margin-bottom: 20px;"></i>
                    <p style="font-size: 20px; color: #333;">Human manipulation techniques exploiting psychology</p>
                </div>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">AI for Leadership</h3>
                <div style="margin-top: 30px; text-align: center;">
                    <i class="fas fa-robot" style="font-size: 60px; color: #0056b3; margin-bottom: 20px;"></i>
                    <p style="font-size: 20px; color: #333;">Strategic AI integration for leadership</p>
                </div>
            </div>
            
            <div class="content-card">
                <h3 class="card-title">Dark Side of AI</h3>
                <div style="margin-top: 30px; text-align: center;">
                    <i class="fas fa-skull-crossbones" style="font-size: 60px; color: #d32f2f; margin-bottom: 20px;"></i>
                    <p style="font-size: 20px; color: #333;">Malicious AI applications and adversarial threats</p>
                </div>
            </div>
        </div>`
    );
});
