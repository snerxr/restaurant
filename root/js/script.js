// Register GSAP plugins for advanced animations
gsap.registerPlugin(MotionPathPlugin, MotionPathHelper);

// Get references to SVG object elements
let ceviche = document.querySelector("#ceviche");
let fivevines = document.querySelector("#fivevines");
let foe = document.querySelector("#foe");
let hearthstone = document.querySelector("#hearthstone");

/* Hearth & Stone Logo Animation
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

/* Five Vines Logo Animation
 */
function animateFiveVines() {
  fivevines.addEventListener("load", function() {
    const svgDoc = fivevines.contentDocument;

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
/* Ceviche Logo Animation
 */
function animateCeviche() {
  ceviche.addEventListener("load", function() {
    const svgDoc = ceviche.contentDocument;

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

/* Family of Eateries Logo Animation
 */
function animateFamilyOfEateries() {
  // Wait for SVG to load before accessing internal elements
  foe.addEventListener("load", function() {
    // Access the SVG document inside the object tag
    const svgDoc = foe.contentDocument;

    // Get the main group containing all logo elements
    const mainGroup = svgDoc.querySelector("#familyofeateries");

    // Get all red flourish paths (cls-6 class)
    const redFlourish = svgDoc.querySelectorAll(".cls-6");

    // Get all text paths (black text elements)
    const textPaths = svgDoc.querySelectorAll("#familyofeateries > g:last-child path");

    // Set initial opacity on main group to make it visible
    gsap.set(mainGroup, { opacity: 1 });

    // Phase 1: Prepare red flourish paths for write-on animation
    // Calculate total length and set up stroke-dasharray for each path
    redFlourish.forEach(path => {
      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        stroke: "red",
        strokeWidth: 1.5,
        fill: "none",
        opacity: 1
      });
    });

    // Phase 2: Prepare text paths for write-on animation
    textPaths.forEach(path => {
      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        stroke: "#000000",
        strokeWidth: 0.8,
        fill: "none",
        opacity: 1
      });
    });

    // Create master timeline for the three-phase animation
    const masterTimeline = gsap.timeline({ delay: 0.5 });

    // PHASE 1: The Red Flourish
    // Animate each red flourish path with varying speeds for natural feel
    redFlourish.forEach((path, index) => {
      // Stagger the start times slightly and vary duration for organic effect
      const duration = 0.8 + (index * 0.1);
      const startTime = 0.2 + (index * 0.05);

      masterTimeline.to(path, {
        strokeDashoffset: 0,
        duration: duration,
        ease: "power2.inOut"
      }, startTime);
    });

    // Fill the red flourish paths after drawing completes
    masterTimeline.to(redFlourish, {
      fill: "red",
      stroke: "none",
      duration: 0.3,
      ease: "sine.inOut"
    }, 1.2);

    // Create particle splash effect at the end of red flourish
    // Generate 3 small teardrop particles that splash outwards
    const particleContainer = svgDoc.createElementNS("http://www.w3.org/2000/svg", "g");
    particleContainer.setAttribute("id", "particles");
    mainGroup.appendChild(particleContainer);

    // Create 3 teardrop-shaped particles
    for (let i = 0; i < 3; i++) {
      const particle = svgDoc.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      particle.setAttribute("cx", "330");
      particle.setAttribute("cy", "410");
      particle.setAttribute("rx", "2");
      particle.setAttribute("ry", "3");
      particle.setAttribute("fill", "red");
      particle.setAttribute("class", "particle");
      particleContainer.appendChild(particle);

      // Set initial state for particle animation
      gsap.set(particle, {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center"
      });

      // Animate particles splashing outwards at different angles
      const angle = -30 + (i * 30); // Spread particles at different angles
      const distance = 15 + (i * 5);

      masterTimeline.to(particle, {
        opacity: 1,
        scale: 1,
        x: Math.cos(angle * Math.PI / 180) * distance,
        y: Math.sin(angle * Math.PI / 180) * distance,
        duration: 0.3,
        ease: "power2.out"
      }, 1.2 + (i * 0.05));

      // Fade out particles
      masterTimeline.to(particle, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.in"
      }, 1.35 + (i * 0.05));
    }

    // PHASE 2: The Title Reveal
    // Animate text paths to write on, starting before red flourish completes
    textPaths.forEach((path, index) => {
      // Calculate logical drawing order and duration
      const duration = 0.6;
      const startTime = 1.0 + (index * 0.08);

      masterTimeline.to(path, {
        strokeDashoffset: 0,
        duration: duration,
        ease: "power1.inOut"
      }, startTime);
    });

    // Fill text paths after drawing completes
    masterTimeline.to(textPaths, {
      fill: "#000000",
      stroke: "none",
      duration: 0.2,
      ease: "sine.inOut"
    }, 2.6);

    // Overshoot and settle animation for text
    // Group containing all text for unified scaling
    const textGroup = svgDoc.querySelector("#familyofeateries > g:last-child");
    gsap.set(textGroup, { transformOrigin: "50% 50%" });

    masterTimeline.to(textGroup, {
      scale: 1.05,
      duration: 0.15,
      ease: "power2.out"
    }, 2.8);

    masterTimeline.to(textGroup, {
      scale: 1,
      duration: 0.2,
      ease: "power2.inOut"
    }, 2.95);

    // PHASE 3: Final Polish & Lockup
    // Create subtle light sweep effect across the entire logo
    const lightSweep = svgDoc.createElementNS("http://www.w3.org/2000/svg", "rect");
    lightSweep.setAttribute("x", "0");
    lightSweep.setAttribute("y", "370");
    lightSweep.setAttribute("width", "40");
    lightSweep.setAttribute("height", "150");
    lightSweep.setAttribute("fill", "url(#lightGradient)");
    lightSweep.setAttribute("opacity", "0.3");

    // Create gradient for light sweep
    const defs = svgDoc.querySelector("defs") || svgDoc.createElementNS("http://www.w3.org/2000/svg", "defs");
    if (!svgDoc.querySelector("defs")) {
      svgDoc.querySelector("svg").insertBefore(defs, svgDoc.querySelector("svg").firstChild);
    }

    const gradient = svgDoc.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "lightGradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("x2", "100%");

    const stop1 = svgDoc.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("style", "stop-color:rgba(255,255,255,0);stop-opacity:1");

    const stop2 = svgDoc.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "50%");
    stop2.setAttribute("style", "stop-color:rgba(255,255,255,0.8);stop-opacity:1");

    const stop3 = svgDoc.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop3.setAttribute("offset", "100%");
    stop3.setAttribute("style", "stop-color:rgba(255,255,255,0);stop-opacity:1");

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);
    mainGroup.appendChild(lightSweep);

    // Set initial position for light sweep
    gsap.set(lightSweep, { x: -100, opacity: 0 });

    // Animate light sweep from left to right
    masterTimeline.to(lightSweep, {
      opacity: 0.3,
      duration: 0.1,
      ease: "sine.in"
    }, 3.0);

    masterTimeline.to(lightSweep, {
      x: 350,
      duration: 0.5,
      ease: "power1.inOut"
    }, 3.0);

    masterTimeline.to(lightSweep, {
      opacity: 0,
      duration: 0.1,
      ease: "sine.out"
    }, 3.4);

    // Final breath animation - subtle scale pulse on entire logo
    masterTimeline.to(mainGroup, {
      scale: 1.01,
      duration: 0.25,
      ease: "power1.inOut",
      transformOrigin: "center center"
    }, 3.0);

    masterTimeline.to(mainGroup, {
      scale: 1,
      duration: 0.25,
      ease: "power1.inOut"
    }, 3.25);

  });
}

// Initialize all animations when page loads
window.addEventListener("DOMContentLoaded", function() {
  animateHearthStone();
  animateFiveVines();
  animateCeviche();
  animateFamilyOfEateries();
});