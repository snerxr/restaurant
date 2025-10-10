// Register GSAP plugins for advanced animations
gsap.registerPlugin(MotionPathPlugin, MotionPathHelper);

// Get references to SVG object elements
let monster = document.querySelector("#monster");
let catsper = document.querySelector("#catsper");
let squares = document.querySelector("#squares");
let hearthstone = document.querySelector("#hearthstone");

/**
 * Hearth & Stone Logo Animation
 * Sequential 7-phase animation building the logo element by element
 */
function animateHearthStone() {
  // Wait for SVG to load before accessing internal elements
  hearthstone.addEventListener("load", function() {
    // Access the SVG document inside the object tag
    const svgDoc = hearthstone.contentDocument;

    // Get all animation elements from the SVG
    const outerCircle = svgDoc.querySelector("#outerCircle");
    const hearthOutline = svgDoc.querySelector("#hearthOutline");
    const hearthFill = svgDoc.querySelector("#hearthFill");
    const hearthStoneText = svgDoc.querySelector("#hearthStoneText");
    const bistroText = svgDoc.querySelector("#bistroText");
    const fork = svgDoc.querySelector("#fork");
    const spoon = svgDoc.querySelector("#spoon");
    const underlineScroll = svgDoc.querySelector("#underlineScroll");
    const taglineText = svgDoc.querySelector("#taglineText");

    // Get all individual letter paths for text animation
    const letterH = svgDoc.querySelector("#letterH");
    const letterE = svgDoc.querySelector("#letterE");
    const letterA = svgDoc.querySelector("#letterA");
    const letterR = svgDoc.querySelector("#letterR");
    const letterT = svgDoc.querySelector("#letterT");
    const letterH2 = svgDoc.querySelector("#letterH2");
    const letterAmpersand = svgDoc.querySelector("#letterAmpersand");
    const letterS = svgDoc.querySelector("#letterS");
    const letterT2 = svgDoc.querySelector("#letterT2");
    const letterO = svgDoc.querySelector("#letterO");
    const letterN = svgDoc.querySelector("#letterN");
    const letterE2 = svgDoc.querySelector("#letterE2");

    // Group letters in order for staggered animation
    const allLetters = [letterH, letterE, letterA, letterR, letterT, letterH2, letterAmpersand, letterS, letterT2, letterO, letterN, letterE2];

    // Get all bistro text tspan elements for letter-by-letter animation
    const bistroTspans = svgDoc.querySelectorAll("#bistroText tspan");

    // Set initial states - hide all elements that will animate
    gsap.set([hearthOutline, hearthFill, hearthStoneText, bistroText, fork, spoon, underlineScroll, taglineText], {
      opacity: 0
    });

    // Calculate path lengths for line drawing animations
    const outerCircleLength = outerCircle.getTotalLength();
    const hearthOutlineLength = hearthOutline.getTotalLength();
    const underlineLength = underlineScroll.getTotalLength();

    // Set initial stroke-dasharray for path-based animations
    gsap.set(outerCircle, {
      strokeDasharray: outerCircleLength,
      strokeDashoffset: outerCircleLength
    });

    gsap.set(hearthOutline, {
      strokeDasharray: hearthOutlineLength,
      strokeDashoffset: hearthOutlineLength,
      opacity: 1
    });

    gsap.set(underlineScroll, {
      strokeDasharray: underlineLength,
      strokeDashoffset: underlineLength
    });

    // Set initial transform states for utensils
    gsap.set(fork, {
      x: -30,
      y: -30,
      rotation: -45,
      transformOrigin: "center center",
      opacity: 0
    });

    gsap.set(spoon, {
      x: 30,
      y: -30,
      rotation: 45,
      transformOrigin: "center center",
      opacity: 0
    });

    // Set initial state for hearthFill (will be used as mask reveal)
    gsap.set(hearthFill, {
      opacity: 0,
      scale: 0.8,
      transformOrigin: "center center"
    });

    // Set initial state for bistro text tspans
    gsap.set(bistroTspans, {
      opacity: 0,
      scale: 0.5,
      transformOrigin: "center center"
    });

    // Create master timeline for sequential animation
    const masterTimeline = gsap.timeline({ delay: 0.5 });

    // PHASE 1: Draw the outer circle (Step 1)
    // Using fromTo() to demonstrate required GSAP method
    masterTimeline.fromTo(outerCircle,
      { strokeDashoffset: outerCircleLength },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut"
      },
      0
    );

    // PHASE 2: Draw the inner hearth shape (Step 2)
    // Using to() to demonstrate required GSAP method
    masterTimeline.to(hearthOutline, {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.inOut"
    }, "+=0.2");

    // PHASE 3: Animate "HEARTH & STONE" curved text (Step 3)
    // Using from() to demonstrate required GSAP method with stagger
    masterTimeline.from(allLetters, {
      opacity: 0,
      scale: 0,
      y: -20,
      rotation: -15,
      transformOrigin: "center center",
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.7)"
    }, "+=0.3");

    // Show the curved text group
    masterTimeline.to(hearthStoneText, {
      opacity: 1,
      duration: 0.1
    }, "<");

    // PHASE 4: Fill the hearth and reveal "BISTRO" (Step 4)
    // Hearth fill animation with mask effect
    masterTimeline.fromTo(hearthFill,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out"
      },
      "+=0.4"
    );

    // Bistro text slide-up and fade-in with stagger
    masterTimeline.to(bistroText, {
      opacity: 1,
      duration: 0.1
    }, "<");

    masterTimeline.from(bistroTspans, {
      opacity: 0,
      y: 20,
      scale: 0.5,
      duration: 0.6,
      stagger: 0.08,
      ease: "back.out(1.5)"
    }, "<+=0.3");

    // PHASE 5: Animate utensils - fork and spoon (Step 5)
    // Fork slides from top-left with rotation
    masterTimeline.to(fork, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.7,
      ease: "back.out(2)"
    }, "+=0.3");

    // Spoon slides from top-right with rotation (overlaps with fork)
    masterTimeline.to(spoon, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.7,
      ease: "back.out(2)"
    }, "<+=0.15");

    // PHASE 6: Draw the decorative underline (Step 6)
    masterTimeline.to(underlineScroll, {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "+=0.2");

    // PHASE 7: Reveal the tagline (Step 7)
    masterTimeline.to(taglineText, {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
    }, "+=0.2");

    // Final flourish - subtle scale pulse on entire logo
    masterTimeline.to(svgDoc.querySelector("#Bistro"), {
      scale: 1.02,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
      transformOrigin: "center center"
    }, "+=0.5");

  });
}

// Initialize Hearth & Stone animation when page loads
window.addEventListener("DOMContentLoaded", function() {
  animateHearthStone();
});