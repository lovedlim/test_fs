// DOM Elements
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitButton = contactForm.querySelector('.submit-button');

// Form validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Form validation
function validateForm(formData) {
    const errors = [];
    
    // Name validation
    if (!formData.name.trim()) {
        errors.push('성함 및 소속을 입력해주세요.');
    } else if (formData.name.trim().length < 2) {
        errors.push('성함은 2글자 이상 입력해주세요.');
    }
    
    // Email validation
    if (!formData.email.trim()) {
        errors.push('이메일을 입력해주세요.');
    } else if (!emailPattern.test(formData.email)) {
        errors.push('올바른 이메일 형식을 입력해주세요.');
    }
    
    // Inquiry validation
    if (!formData.inquiry.trim()) {
        errors.push('문의 내용을 입력해주세요.');
    } else if (formData.inquiry.trim().length < 10) {
        errors.push('문의 내용은 10글자 이상 입력해주세요.');
    }
    
    return errors;
}

// Show error messages
function showErrors(errors) {
    alert('다음 항목을 확인해주세요:\n\n' + errors.join('\n'));
}

// Show loading state
function setLoadingState(isLoading) {
    if (isLoading) {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        submitButton.querySelector('span').textContent = '전송 중...';
    } else {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.querySelector('span').textContent = '문의하기';
    }
}

// Show success message
function showSuccessMessage() {
    contactForm.style.display = 'none';
    successMessage.classList.add('show');
    
    // Auto hide after 5 seconds and reset form
    setTimeout(() => {
        successMessage.classList.remove('show');
        contactForm.style.display = 'block';
        contactForm.reset();
    }, 5000);
}

// Submit form data to Google Apps Script using iframe method (CORS workaround)
async function submitFormData(formData) {
    return new Promise((resolve, reject) => {
        const form = document.getElementById('contactForm');
        
        // Create hidden iframe for form submission
        const iframe = document.createElement('iframe');
        iframe.name = 'hidden-iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Set form target to iframe
        form.target = 'hidden-iframe';
        
        let submitted = false;
        
        // Handle iframe load (indicates form submission complete)
        const handleLoad = () => {
            if (!submitted) {
                submitted = true;
                console.log('Form submitted successfully to Google Apps Script');
                
                // Clean up
                setTimeout(() => {
                    if (document.body.contains(iframe)) {
                        document.body.removeChild(iframe);
                    }
                    form.target = '';
                }, 1000);
                
                resolve({ success: true });
            }
        };
        
        iframe.onload = handleLoad;
        
        // Fallback timer (in case onload doesn't fire)
        setTimeout(() => {
            if (!submitted) {
                submitted = true;
                console.log('Form submitted (fallback timer)');
                
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
                form.target = '';
                resolve({ success: true });
            }
        }, 3000);
        
        // Submit form normally (will load in iframe)
        try {
            form.submit();
        } catch (error) {
            console.error('Error submitting form:', error);
            if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
            }
            form.target = '';
            reject(error);
        }
    });
}

// Form submission handler
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        inquiry: document.getElementById('inquiry').value
    };
    
    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showErrors(errors);
        return;
    }
    
    try {
        // Show loading state
        setLoadingState(true);
        
        // Submit form
        await submitFormData(formData);
        
        // Show success message
        showSuccessMessage();
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        // Remove loading state
        setLoadingState(false);
    }
}

// Scroll animation observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Input focus/blur effects
function setupInputEffects() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation feedback
        input.addEventListener('input', () => {
            input.classList.remove('error');
            
            // Email validation feedback
            if (input.type === 'email' && input.value.trim()) {
                if (emailPattern.test(input.value)) {
                    input.classList.add('valid');
                } else {
                    input.classList.remove('valid');
                }
            }
        });
    });
}

// Smooth scrolling for CTA button with offset
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add some interactive hover effects
function setupInteractiveEffects() {
    // Content cards tilt effect on mobile
    const cards = document.querySelectorAll('.content-card');
    
    cards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = '';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .cta-button, .submit-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .form-group.focused label {
            color: #38b2ac;
        }
        
        .form-group input.valid,
        .form-group textarea.valid {
            border-color: #38a169;
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #e53e3e;
        }
    `;
    document.head.appendChild(style);
    
    // Setup all features
    setupScrollAnimations();
    setupInputEffects();
    setupSmoothScrolling();
    setupInteractiveEffects();
    
    // Add form submission handler
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add initial animation delay
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                if (el.getBoundingClientRect().top < window.innerHeight) {
                    el.classList.add('visible');
                }
            }, index * 100);
        });
    }, 300);
    
    console.log('🚀 AI 협업 전문가 랜딩 페이지가 준비되었습니다!');
});
