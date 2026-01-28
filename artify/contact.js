import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ infinite: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const contactInfo = document.querySelector(".contact-info");
const contactRowMaxGap = window.innerWidth < 1000 ? 5 : 10;

for(let i = 0; i < 10; i++) {
    const clone = contactInfo.cloneNode(true);
    contactInfo.parentElement.appendChild(clone);
}

const contactVisual = document.querySelector(".contact-visual");
const contactRows = document.querySelector(".contact-info-row");

function getVisualCenter() {
    return contactVisual.offsetTop + contactVisual.offsetHeight / 2;

}

contactRows.forEach((row) => {
    ScrollTrigger.create({
        trigger: row,
        start: () => `top+=${getVisualCenter() - 550} center`,
    
        
    })
})