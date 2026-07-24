document.addEventListener('DOMContentLoaded', () => {
    
const heroContent = document.getElementById('hero-content');
const heroBg = document.getElementById('hero-bg');
const heroSection = document.getElementById('hero');

setTimeout(() => {
    if (heroContent) {
        heroContent.classList.add('loaded');
    }
}, 200);

if (window.matchMedia("(pointer: fine)").matches) {
    heroSection.addEventListener('mousemove', (e) => {
        const { offsetWidth: width, offsetHeight: height } = heroSection;
        
        const xVal = (e.clientX / width) - 0.5;
        const yVal = (e.clientY / height) - 0.5;

        const moveX = xVal * -25;
        const moveY = yVal * -25;
        
        heroBg.style.transform = `scale(1.06) translate(${moveX}px, ${moveY}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        heroBg.style.transform = 'scale(1) translate(0px, 0px)';
    });
}

// Scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY <= window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
        
        heroContent.style.opacity = 1 - (scrollY / 450);
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
});

});
