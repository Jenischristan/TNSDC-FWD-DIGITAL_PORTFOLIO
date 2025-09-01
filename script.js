// Wait for the DOM to be fully loaded before running any scripts.
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Feature 1: Scroll-Reveal Animations
     * This uses the Intersection Observer API for performance.
     * It adds a 'visible' class to elements when they enter the viewport.
     */
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after it's visible
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    // Find all elements to apply the reveal effect to
    const elementsToReveal = document.querySelectorAll('.glass-card, section h2');
    elementsToReveal.forEach(element => {
        revealObserver.observe(element);
    });


    /**
     * Feature 2: Smooth Scroll-Spy for Active Navigation Links
     * This highlights the hero link corresponding to the section currently in view.
     */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.quick-links a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // First, remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Then, add 'active' class to the correct link
                const activeLink = document.querySelector(`.quick-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { 
        // This option makes the highlight trigger when a section is in the middle of the screen
        rootMargin: '-50% 0px -50% 0px' 
    });

    sections.forEach(section => {
        // We don't need to observe the hero section for this feature
        if (section.id !== 'hero') {
            navObserver.observe(section);
        }
    });

});