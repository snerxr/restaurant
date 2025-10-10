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

    // Set initial stroke-dasharray for path-based animations with opacity 0
    gsap.set(outerCircle, {
      strokeDasharray: outerCircleLength,
      strokeDashoffset: outerCircleLength,
      opacity: 0
    });

    gsap.set(hearthOutline, {
      strokeDasharray: hearthOutlineLength,
      strokeDashoffset: hearthOutlineLength,
      opacity: 0
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
    // Using fromTo() to demonstrate required GSAP method with opacity fade-in
    masterTimeline.fromTo(outerCircle,
      {
        strokeDashoffset: outerCircleLength,
        opacity: 0
      },
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut"
      },
      0
    );

    // PHASE 2: Draw the inner hearth shape (Step 2)
    // Using to() to demonstrate required GSAP method with opacity fade-in
    masterTimeline.to(hearthOutline, {
      strokeDashoffset: 0,
      opacity: 1,
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

/**
 * Five Vines Logo Animation
 * Organic growing effect with circle, vines, and wine bottle reveal
 */
function animateFiveVines() {
  catsper.addEventListener("load", function() {
    const svgDoc = catsper.contentDocument;

    // Get all elements
    const mainCircle = svgDoc.querySelector("#mainCircle");
    const fiveShape = svgDoc.querySelector("#fiveShape");
    const vine1 = svgDoc.querySelector("#vine1");
    const vine2 = svgDoc.querySelector("#vine2");
    const vine3 = svgDoc.querySelector("#vine3");
    const vine4 = svgDoc.querySelector("#vine4");
    const vine5 = svgDoc.querySelector("#vine5");
    const bottleNeckCork = svgDoc.querySelector("#bottleNeckCork");

    // Set initial states
    gsap.set([fiveShape, vine1, vine2, vine3, vine4, vine5, bottleNeckCork], {
      opacity: 0
    });

    gsap.set(mainCircle, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
      fill: "transparent"
    });

    // Calculate path lengths for vine line drawing
    const vine1Length = vine1.getTotalLength();
    const vine2Length = vine2.getTotalLength();
    const vine3Length = vine3.getTotalLength();
    const vine4Length = vine4.getTotalLength();
    const vine5Length = vine5.getTotalLength();

    gsap.set([vine1, vine2, vine3, vine4, vine5], {
      strokeDasharray: function(i, target) {
        return target.getTotalLength();
      },
      strokeDashoffset: function(i, target) {
        return target.getTotalLength();
      },
      opacity: 1
    });

    // Create timeline
    const timeline = gsap.timeline({ delay: 0.5 });

    // PHASE 1: Circle scales up and fades in
    timeline.to(mainCircle, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });

    // Circle fills with black
    timeline.to(mainCircle, {
      fill: "#231f20",
      duration: 0.4,
      ease: "power1.inOut"
    }, "+=0.2");

    // PHASE 2: Draw the five vines sequentially
    timeline.to(vine1, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power1.inOut"
    }, "+=0.3");

    timeline.to(vine2, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power1.inOut"
    }, "-=0.4");

    timeline.to(vine3, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power1.inOut"
    }, "-=0.4");

    timeline.to(vine4, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power1.inOut"
    }, "-=0.4");

    timeline.to(vine5, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power1.inOut"
    }, "-=0.4");

    // PHASE 3: Reveal the "5" shape (wine bottle body)
    timeline.to(fiveShape, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "+=0.2");

    // PHASE 4: Bottle neck and cork slide up
    timeline.fromTo(bottleNeckCork, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "back.out(1.5)"
    }, "+=0.3");
  });
}

/**
 * Ceviche Logo Animation
 * Building the C mark with fish and garnish elements
 */
function animateCeviche() {
  monster.addEventListener("load", function() {
    const svgDoc = monster.contentDocument;

    // Get main elements
    const backdrop = svgDoc.querySelector("#Backdrop");
    const fishGroup = svgDoc.querySelector("#Fish");
    const cevicheText = svgDoc.querySelector("#cevicheText");

    // Set initial states
    gsap.set([backdrop, fishGroup, cevicheText], {
      opacity: 0
    });

    // Get all fish path elements (there are many detailed paths)
    const allFishPaths = svgDoc.querySelectorAll("#Fish path");

    // Set up path drawing for fish elements
    gsap.set(allFishPaths, {
      strokeDasharray: function(i, target) {
        const length = target.getTotalLength();
        return length > 0 ? length : 1;
      },
      strokeDashoffset: function(i, target) {
        const length = target.getTotalLength();
        return length > 0 ? length : 1;
      }
    });

    // Create timeline
    const timeline = gsap.timeline({ delay: 0.5 });

    // PHASE 1: Draw the main circular backdrop
    timeline.fromTo(backdrop, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center"
    }, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    });

    // PHASE 2: Draw the fish outline
    timeline.to(fishGroup, {
      opacity: 1,
      duration: 0.1
    }, "+=0.3");

    timeline.to(allFishPaths, {
      strokeDashoffset: 0,
      duration: 1.5,
      stagger: 0.02,
      ease: "power1.inOut"
    }, "<");

    // PHASE 3: Reveal "Ceviche" text
    timeline.fromTo(cevicheText, {
      opacity: 0,
      x: -30
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out"
    }, "+=0.4");
  });
}

// Initialize all animations when page loads
window.addEventListener("DOMContentLoaded", function() {
  animateHearthStone();
  animateFiveVines();
  animateCeviche();
});