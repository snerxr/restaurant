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
    gsap.set([hearthOutline, hearthFill, hearthStoneText, fork, spoon, underlineScroll, taglineText], {
      opacity: 0
    });

    gsap.set(bistroText, {
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

    // Remove staggered tspans animation and add fade-in for bistroText group
    masterTimeline.to(bistroText, {
      opacity: 1,
      duration: 0.6,
      ease: "power1.inOut"
    }, "+=0.4");

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

    bistroTspans.forEach(tspan => {
      tspan.style.opacity = "";
      tspan.style.transform = "";
    });
  });
}

/**
 * Five Vines Logo Animation
 * Circle formation, stroke drawing, and bottle reveal with text
 */
function animateFiveVines() {
  catsper.addEventListener("load", function() {
    const svgDoc = catsper.contentDocument;

    // Get all elements
    const mainCircle = svgDoc.querySelector("#mainCircle");
    const bottleWhiteFillPaths = svgDoc.querySelectorAll('#fill-paths-container .cls-2');
    const bottleRedPaths = svgDoc.querySelectorAll('#bottle-elements .cls-3');
    const bottleStrokePaths = svgDoc.querySelectorAll('.stroke-path');

    // Set initial states
    gsap.set(mainCircle, {
      transformOrigin: '50% 50%',
      fill: 'transparent',
      stroke: '#231f20',
      strokeWidth: 2
    });

    gsap.set(bottleRedPaths, { opacity: 0 });
    gsap.set(bottleWhiteFillPaths, { opacity: 0 });

    // Prepare stroke paths for animation
    bottleStrokePaths.forEach(pathNode => {
      const pathLength = pathNode.getTotalLength();
      gsap.set(pathNode, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 1
      });
    });

    // Create timeline
    const timeline = gsap.timeline({ delay: 0.5 });

    // Step 1: Circle Formation & Fill
    timeline.from(mainCircle, {
      duration: 1,
      scale: 0,
      opacity: 0,
      ease: 'power2.out'
    })
    .to(mainCircle, {
      duration: 0.5,
      fill: '#000000',
      ease: 'sine.inOut'
    }, "-=0.5");

    // Step 2: Animate the drawing of each white bottle part
    bottleStrokePaths.forEach(pathNode => {
      timeline.to(pathNode, {
        duration: 0.5,
        strokeDashoffset: 0,
        ease: 'none'
      }, "-=0.25");
    });

    // Step 3: Reveal the final bottle (white and red parts) and hide the stroke paths
    timeline.to(bottleStrokePaths, {
      duration: 0.5,
      opacity: 0,
      ease: 'sine.inOut'
    });
    timeline.to(bottleWhiteFillPaths, {
      duration: 0.5,
      opacity: 1,
      ease: 'sine.inOut'
    }, "<");
    timeline.to(bottleRedPaths, {
      duration: 0.5,
      opacity: 1,
      ease: 'sine.inOut'
    }, "<");
  });
}
/**
 * Ceviche Logo Animation
 * Liquid ink drop effect, fish particle swarm, and text reveal
 */
function animateCeviche() {
  monster.addEventListener("load", function() {
    const svgDoc = monster.contentDocument;

    const backdrop = svgDoc.querySelector("#Backdrop");
    const fishParticles = svgDoc.querySelectorAll("#fishDetails path");
    const cevicheText = svgDoc.querySelector("#cevicheText");
    const frame = svgDoc.querySelector("#frame");
    const clipRect = svgDoc.querySelector("#clip-rect");
    const liquidFilter = svgDoc.querySelector("feGaussianBlur");

    gsap.set(backdrop, { attr: { r: 0 }, opacity: 0 });
    gsap.set(liquidFilter, { attr: { stdDeviation: '30' } });
    gsap.set(clipRect, { attr: { y: 150, height: 0 } });
    gsap.set(cevicheText, { opacity: 1 });
    gsap.set(fishParticles, {
      x: () => gsap.utils.random(-100, 100),
      y: () => gsap.utils.random(-100, 100),
      scale: 0,
      opacity: 0,
      transformOrigin: '50% 50%'
    });

    const timeline = gsap.timeline({ delay: 0.5 });

    timeline.to(backdrop, {
      attr: { r: 34.39 },
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut'
    })
    .to(liquidFilter, {
      attr: { stdDeviation: '1' },
      duration: 0.8,
      ease: 'power3.inOut'
    }, "<0.2");

    timeline.to(fishParticles, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'expo.inOut',
      stagger: {
        amount: 0.8,
        from: "random",
        ease: "power2.in"
      }
    }, "-=0.8");

    timeline.to(clipRect, {
      attr: { y: 65, height: 90 },
      duration: 1,
      ease: 'expo.inOut'
    }, "-=0.5");

    const frameLength = frame.getTotalLength();
    gsap.set(frame, {
      strokeDasharray: frameLength,
      strokeDashoffset: frameLength,
      opacity: 1
    });
    timeline.to(frame, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power1.inOut'
    }, "-=0.7");

    timeline.to([backdrop, svgDoc.querySelector("#fishDetails")], {
      scale: 1.02,
      transformOrigin: '50% 50%',
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    }, ">");
  });
}

// Initialize all animations when page loads
window.addEventListener("DOMContentLoaded", function() {
  animateHearthStone();
  animateFiveVines();
  animateCeviche();
});