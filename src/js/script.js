document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.getElementById('theme-toggle');

    // Tema tercihini localStorage'dan al
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(currentTheme + '-theme');
    
    // Tema butonunun başlangıç durumunu ayarla
    if (currentTheme === 'dark') {
        themeToggle.checked = true;
    }

    // Tema değiştirme fonksiyonu
    function toggleTheme() {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        }
    }

    // Tema değiştirme event listener'ı
    themeToggle.addEventListener('change', toggleTheme);

    // Mobile menu toggle
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Menu icon animation
        mobileMenu.classList.toggle('active');
    });

    // CTA Button Interaction
    const ctaButton = document.getElementById('cta-button');
    const contactForm = document.getElementById('contact-form');

    ctaButton.addEventListener('click', () => {
        // Smooth scroll to contact section
        document.getElementById('contact').scrollIntoView({ 
            behavior: 'smooth' 
        });

        // Button animation
        ctaButton.classList.add('pulse');
        setTimeout(() => {
            ctaButton.classList.remove('pulse');
        }, 500);
    });

    // Form Validation and Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const messageInput = contactForm.querySelector('textarea');

        // Detaylı form doğrulaması
        const errors = [];

        if (!nameInput.value.trim()) {
            errors.push('Ad alanı zorunludur.');
        }

        if (!emailInput.value.trim()) {
            errors.push('E-posta alanı zorunludur.');
        } else if (!isValidEmail(emailInput.value)) {
            errors.push('Geçerli bir e-posta adresi girin.');
        }

        if (!messageInput.value.trim()) {
            errors.push('Mesaj alanı zorunludur.');
        }

        // Hata kontrolü
        if (errors.length > 0) {
            showErrorNotification(errors);
            return;
        }

        // Form gönderim simülasyonu
        submitFormData(nameInput.value, emailInput.value, messageInput.value);
    });

    // E-posta doğrulama fonksiyonu
    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    // Hata bildirimi fonksiyonu
    function showErrorNotification(errors) {
        const notificationContainer = document.createElement('div');
        notificationContainer.classList.add('error-notification');
        
        errors.forEach(error => {
            const errorElement = document.createElement('p');
            errorElement.textContent = error;
            notificationContainer.appendChild(errorElement);
        });

        document.body.appendChild(notificationContainer);

        // Bildirimi 3 saniye sonra kaldır
        setTimeout(() => {
            document.body.removeChild(notificationContainer);
        }, 3000);
    }

    // Form gönderim simülasyonu
    function submitFormData(name, email, message) {
        // Gerçek bir arka uç entegrasyonu için bu kısım değiştirilmelidir
        console.log('Form Gönderildi:', { name, email, message });
        
        // Başarılı gönderim bildirimi
        const successNotification = document.createElement('div');
        successNotification.classList.add('success-notification');
        successNotification.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.';
        
        document.body.appendChild(successNotification);

        // Formu sıfırla
        contactForm.reset();

        // Bildirimi 3 saniye sonra kaldır
        setTimeout(() => {
            document.body.removeChild(successNotification);
        }, 3000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });
});
