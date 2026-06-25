// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lucide Icons
lucide.createIcons();

// Custom Cursor logic
const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
});

// Scale cursor on hoverables
function setupCursorHovers() {
    const hoverables = document.querySelectorAll('a, button, .contact-icon, .contact-info-row');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover-link');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-link');
        });
    });
}

// Lenis Infinite Scroll
const lenis = new Lenis({ infinite: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const contactInfo = document.querySelector(".contact-info");
const contactRowMaxGap = window.innerWidth < 1000 ? 3 : 8; // Adjust gaps for brutalist style

// Clone container 10 times to enable infinite scrolling
for(let i = 0; i < 10; i++) {
    const clone = contactInfo.cloneNode(true);
    contactInfo.parentElement.appendChild(clone);
}

ScrollTrigger.refresh();

const contactVisual = document.querySelector(".contact-visual");
const contactRows = document.querySelectorAll(".contact-info-row");

function getVisualCenter() {
    return contactVisual.offsetTop + contactVisual.offsetHeight / 2;
}

// ScrollTriggers for row gap modulation
contactRows.forEach((row) => {
    ScrollTrigger.create({
        trigger: row,
        start: () => `top+=${getVisualCenter() - 550} center`,
        end: () => `top+=${getVisualCenter() - 450} center`,
        scrub: true,
        onUpdate: (self) => {
            const gap = 2 + (contactRowMaxGap - 2) * self.progress;
            row.style.gap = `${gap}rem`;
        },
    });

    ScrollTrigger.create({
        trigger: row,
        start: () => `top+=${getVisualCenter() - 400} center`,
        end: () => `top+=${getVisualCenter() - 300} center`,
        scrub: true,
        onUpdate: (self) => {
            const gap = contactRowMaxGap - (contactRowMaxGap - 2) * self.progress;
            row.style.gap = `${gap}rem`;
        },
    });
});

// Icon Swap Logic as rows cross center
const contactIcon = document.querySelector(".contact-icon img");
let currentIconIndex = 1;
let lastCenteredRow = null;

lenis.on("scroll", () => {
    const viewportCenter = window.innerHeight / 2;

    let closestRow = null;
    let minDistance = Infinity;

    contactRows.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const distance = Math.abs(rowCenter - viewportCenter);

        if(distance < minDistance && distance < 35) {
            minDistance = distance;
            closestRow = row;
        }
    });

    if(closestRow && closestRow !== lastCenteredRow) {
        lastCenteredRow = closestRow;
        currentIconIndex = (currentIconIndex % 8) + 1; // Cycle through icon_1 to icon_8
        contactIcon.src = `img/icon_${currentIconIndex}.png`;
    }
});

// Setup hover states after DOM clones are made
setupCursorHovers();
