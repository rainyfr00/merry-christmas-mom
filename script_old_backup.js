/*
  script.js - Pixel journey game with deeply detailed Scene 1
  - Scene 1: Home interior with environmental depth and emotional warmth
  - Scenes 2-7: Multi-scene structure
*/

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
// Disable smoothing so pixels stay crisp when scaled
ctx.imageSmoothingEnabled = false;
const textbox = document.getElementById('textbox');
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const sceneScreen = document.getElementById('scene-screen');
const nextBtn = document.getElementById('next-btn');
const skipBtn = document.getElementById('skip-btn');

let sceneIndex = 0;
let isPlaying = false;
let lastTime = 0;
let sceneStartTime = 0;
let sceneProgress = 0;
let transition = null;

const SCENE_DURATION = 5200;
const TRANSITION_MS = 700;

function clear(){ ctx.clearRect(0,0,canvas.width,canvas.height); }
function lerp(a,b,t){ return a + (b-a)*t }
function px(x,y,w=1,h=1,color){ ctx.fillStyle = color; ctx.fillRect(Math.round(x), Math.round(y), w, h); }

// Helper: draw outlined rectangle (outline first, then fill)
function outlineRect(ctx, x, y, w, h, fillColor, outlineColor='#000000', outlineSize=2) {
  // Outline
  ctx.fillStyle = outlineColor;
  ctx.fillRect(x - outlineSize, y - outlineSize, w + outlineSize*2, h + outlineSize*2);
  // Fill
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, w, h);
}

// Helper: draw outlined circle
function outlineCircle(ctx, x, y, radius, fillColor, outlineColor='#000000', outlineSize=2) {
  ctx.fillStyle = outlineColor;
  ctx.beginPath();
  ctx.arc(x, y, radius + outlineSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

// Scenes array with deeply enhanced Scene 1
const scenes = [
  // Scene 1: Toddler / Birth — LIVED-IN HOME WITH ENVIRONMENTAL DEPTH
  {
    id:'birth',
    text: "I don't even remember this so we can skip forward lol.\nThanks for taking care of me though mom. I love you!",
    draw(ctx,t,progress){
      // === BACKGROUND LAYER WITH LIGHTING DEPTH ===
      // Wall with gradient (lighter at top, warmer at bottom)
      const wallGradient = ctx.createLinearGradient(0, 0, 0, 110);
      wallGradient.addColorStop(0, '#F8E4C4'); // lighter at top
      wallGradient.addColorStop(1, '#E8D0A0'); // warmer at bottom
      ctx.fillStyle = wallGradient;
      ctx.fillRect(0, 0, 160, 109);
      
      // Baseboard trim separating wall and floor
      ctx.fillStyle='#5C4033';
      ctx.fillRect(0, 108, 160, 2);

      // === FRAMED FAMILY PHOTOS ON WALL ===
      // Photo 1: upper left (dark frame with people shapes)
      ctx.fillStyle='#3E2723';
      ctx.fillRect(8, 12, 28, 30);
      ctx.fillStyle='#E8D5C4';
      ctx.fillRect(11, 15, 22, 24);
      // Simple abstract shapes suggesting people
      ctx.fillStyle='#8D5524';
      ctx.beginPath();
      ctx.arc(18, 22, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(15, 26, 6, 8);

      // Photo 2: upper right (dark frame)
      ctx.fillStyle='#3E2723';
      ctx.fillRect(124, 12, 28, 30);
      ctx.fillStyle='#E8D5C4';
      ctx.fillRect(127, 15, 22, 24);
      // Abstract shapes
      ctx.fillStyle='#8D5524';
      ctx.beginPath();
      ctx.arc(136, 22, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(133, 26, 6, 8);

      // === WINDOW: upper-right quadrant ===
      ctx.fillStyle='#FFFFFF';
      ctx.fillRect(118, 18, 40, 24);
      ctx.fillStyle='#87CEEB';
      ctx.fillRect(120, 20, 36, 20);
      
      // White cloud in window
      ctx.fillStyle='#FFFFFF';
      for(let i=0;i<2;i++) ctx.fillRect(130+i,26,2,1);
      for(let i=-3;i<=3;i++) ctx.fillRect(128+i,27,1,1);
      for(let i=-4;i<=4;i++) ctx.fillRect(127+i,28,1,1);

      // === FLOOR WITH DEPTH GRADIENT ===
      const floorGradient = ctx.createLinearGradient(0, 109, 0, 144);
      floorGradient.addColorStop(0, '#8B5A2B'); // lighter at top
      floorGradient.addColorStop(1, '#5C3D1F'); // darker at bottom for depth
      ctx.fillStyle = floorGradient;
      ctx.fillRect(0, 109, 160, 35);

      // === MIDGROUND LAYER ===
      // TOY BOX: wooden box behind toddler
      ctx.fillStyle='#8B7355';
      ctx.fillRect(45, 80, 24, 18);
      // Box lid shadow for depth
      ctx.fillStyle='#6B5344';
      ctx.fillRect(45, 79, 24, 2);
      // Toy sticking out (red block)
      ctx.fillStyle='#E63946';
      ctx.fillRect(58, 72, 5, 8);

      // === FOREGROUND LAYER: RUG FOR GROUNDING ===
      // Warm-colored rug beneath toddler (oval, gives grounding)
      ctx.fillStyle='#D4A574';
      ctx.beginPath();
      ctx.ellipse(70, 92, 20, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Rug darker edge for definition
      ctx.strokeStyle='#A68560';
      ctx.lineWidth=1.5;
      ctx.stroke();

      // === TODDLER CHARACTER (ENLARGED & MORE EXPRESSIVE) ===
      const bobOffset = Math.sin(t * 2) * 1.5;
      const toddlerX = 70;
      const toddlerY = 80 + bobOffset;
      
      // HAIR: high-top fade (wider, more defined)
      ctx.fillStyle='#1a1a1a';
      // Top flat section (wider, ~15% larger)
      for(let i=0;i<12;i++) ctx.fillRect(toddlerX - 6 + i, toddlerY - 20, 1, 4);
      // Side taper
      ctx.fillRect(toddlerX - 7, toddlerY - 17, 1, 3);
      ctx.fillRect(toddlerX + 6, toddlerY - 17, 1, 3);

      // FACE: warm brown skin (enlarged ~15%)
      ctx.fillStyle='#8D5524';
      ctx.fillRect(toddlerX - 5, toddlerY - 12, 10, 10);

      // EYES: larger, clearer with more defined highlights
      ctx.fillStyle='#3E2723';
      ctx.fillRect(toddlerX - 3, toddlerY - 7, 2, 2);
      ctx.fillRect(toddlerX + 1, toddlerY - 7, 2, 2);
      // White highlights (brighter)
      ctx.fillStyle='#FFFFFF';
      ctx.fillRect(toddlerX - 2, toddlerY - 7, 1, 1);
      ctx.fillRect(toddlerX + 2, toddlerY - 7, 1, 1);

      // NOSE
      ctx.fillStyle='#6B3F2A';
      ctx.fillRect(toddlerX, toddlerY - 5, 1, 1);

      // MOUTH: bigger, clearer smile
      ctx.fillStyle='#5C2E1F';
      ctx.fillRect(toddlerX - 1, toddlerY - 3, 3, 1);
      ctx.fillRect(toddlerX - 2, toddlerY - 2, 5, 1);
      ctx.fillRect(toddlerX - 1, toddlerY - 1, 3, 1); // extra line for warmth

      // SHIRT: soft blue
      ctx.fillStyle='#6B9BD1';
      ctx.fillRect(toddlerX - 5, toddlerY + 2, 10, 10);

      // SHORTS: light yellow
      ctx.fillStyle='#FFE5B4';
      ctx.fillRect(toddlerX - 4, toddlerY + 12, 8, 4);

      // FEET: white socks
      ctx.fillStyle='#E8E8E8';
      ctx.fillRect(toddlerX - 3, toddlerY + 16, 2, 2);
      ctx.fillRect(toddlerX + 1, toddlerY + 16, 2, 2);

      // LOLLIPOP: bright red
      ctx.strokeStyle='#8B6F47';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(toddlerX + 5, toddlerY + 5);
      ctx.lineTo(toddlerX + 8, toddlerY - 2);
      ctx.stroke();
      ctx.fillStyle='#FF1744';
      ctx.beginPath();
      ctx.arc(toddlerX + 8, toddlerY - 4, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // === HEART BALLOON WITH SWAY ANIMATION ===
      const balloonScale = 1 + Math.sin(t * 2.5) * 0.12;
      const balloonSway = Math.sin(t * 1.8) * 3; // sway left/right
      const balloonX = 70 + balloonSway;
      const balloonY = 40;
      
      ctx.save();
      ctx.translate(balloonX, balloonY);
      ctx.scale(balloonScale, balloonScale);
      
      // Heart shape
      ctx.fillStyle='#E74C3C';
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(-4, -2, -5, -4, -2, -2);
      ctx.bezierCurveTo(-1, -3.5, 0, -3, 0, 0);
      ctx.bezierCurveTo(0, -3, 1, -3.5, 2, -2);
      ctx.bezierCurveTo(5, -4, 4, -2, 0, 3);
      ctx.fill();
      
      ctx.restore();
      
      // Balloon string: visibly attach to wrist (not floating)
      ctx.strokeStyle='#A65B4A';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(balloonX, balloonY + 8);
      // String curves naturally to wrist
      ctx.quadraticCurveTo(balloonX - 2, 65, toddlerX + 4, 78);
      ctx.stroke();

      // === TEXT BOX at bottom with typewriter effect ===
      ctx.fillStyle='#6B4423';
      ctx.fillRect(2, 118, 156, 24);
      ctx.strokeStyle='#F2D6B3';
      ctx.lineWidth=2;
      ctx.strokeRect(2, 118, 156, 24);
      
      // Typewriter effect
      const fullText = "I don't even remember this so we can skip forward lol. Thanks for taking care of me though mom. I love you!";
      const charIndex = Math.floor((progress * 144) % (fullText.length + 10));
      const displayedText = fullText.substring(0, Math.max(0, charIndex - 2));
      
      ctx.fillStyle='#F2D6B3';
      ctx.font='6px monospace';
      ctx.fillText(displayedText, 6, 127);
    }
  },

  // Scene 2: Elementary School
  {
    id: 'elementary',
    text: `"You came to every event and embarrassingly cheered, my mom.\nEveryone could tell who's mom you were and who's son I was."`,
    // Two-phase scene: school exterior -> football field.
    // Transition triggered by the main character reaching ~60% canvas width.
    // Comments below explain the transition logic, character growth, and mom cheering animation.
    draw(ctx, t, progress){
      const W = ctx.canvas.width;
      const H = ctx.canvas.height;

      // Movement: character walks left->right across the sidewalk. `walkPos` is driven by scene `progress`.
      // When `walkPos` crosses 60% of W, we begin sliding the school left and the field in from the right.
      const startX = Math.round(W * 0.06);
      const endX = Math.round(W * 0.82);
      // Speed up slightly so the walk completes before scene end
      const walkT = Math.min(1, progress * 1.25);
      const walkPos = Math.round(lerp(startX, endX, walkT));

      // When char reaches threshold, compute slide progress (0..1)
      const slideTriggerX = Math.round(W * 0.60);
      const slideRange = Math.max(1, W * 0.28); // how much distance moves during slide
      const slideP = Math.max(0, Math.min(1, (walkPos - slideTriggerX) / slideRange));

      // BACKGROUND LAYER: We'll render school and field as two separate layers and slide them.
      // School background slides left by `slideP * W`. Field background slides in from right by (1 - slideP) * W.
      const schoolOffset = -Math.round(slideP * W);
      const fieldOffset = Math.round((1 - slideP) * W);

      // --- Draw School (phase 1 background) ---
      ctx.save();
      ctx.translate(schoolOffset, 0);
      // Sky
      ctx.fillStyle = '#AEE7FF'; ctx.fillRect(0, 0, W, H);
      // A couple clouds
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(18, 18, 6, 2); ctx.fillRect(22, 16, 4, 2);
      ctx.fillRect(44, 12, 8, 2); ctx.fillRect(48, 10, 6, 2);

      // School building - large rectangle filling most of mid background
      const schoolY = Math.round(H * 0.30);
      const schoolH = Math.round(H * 0.44);
      ctx.fillStyle = '#D88A6A'; // light brick red / tan
      ctx.fillRect(8, schoolY, W - 16, schoolH);
      // Roof strip
      ctx.fillStyle = '#9A5A3A'; ctx.fillRect(8, schoolY - 8, W - 16, 8);

      // Windows - evenly spaced small blue rectangles
      ctx.fillStyle = '#9AD2FF';
      const cols = 6; const rows = 2;
      const winW = 10; const winH = 6;
      const leftPad = 18;
      for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
          const wx = leftPad + c * (winW + 8);
          const wy = schoolY + 6 + r * (winH + 8);
          ctx.fillRect(wx, wy, winW, winH);
        }
      }

      // Entrance and sign
      const doorW = 18, doorH = 22;
      const doorX = Math.round(W/2 - doorW/2);
      ctx.fillStyle = '#6B3F2A'; ctx.fillRect(doorX, schoolY + schoolH - doorH, doorW, doorH);
      // School sign above entrance
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(doorX - 12, schoolY + 4, doorW + 24, 8);
      ctx.fillStyle = '#333333'; ctx.font = Math.max(6, Math.round(H*0.04)) + 'px monospace';
      ctx.fillText('Elementary', doorX - 10, schoolY + 10);

      // Sidewalk foreground in this layer (will be covered by foreground draw)
      ctx.restore();

      // --- Draw Field (phase 2 background) ---
      ctx.save();
      ctx.translate(fieldOffset, 0);
      // Field sky (reuse same sky so slide feels continuous)
      ctx.fillStyle = '#AEE7FF'; ctx.fillRect(0,0,W,H);
      // Sun in corner
      ctx.fillStyle = '#FFD24D'; ctx.fillRect(W - 18, 8, 8, 8);
      // Green field
      ctx.fillStyle = '#3C9A40'; ctx.fillRect(0, Math.round(H*0.40), W, Math.round(H*0.60));
      // Yard lines - white horizontal lines
      ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1;
      const topLine = Math.round(H*0.48);
      for(let i=0;i<6;i++){
        const y = topLine + i * 10;
        ctx.beginPath(); ctx.moveTo(6, y); ctx.lineTo(W - 6, y); ctx.stroke();
      }
      // Bleachers in background (gray stepped shapes)
      ctx.fillStyle = '#9E9E9E';
      const bleacherY = Math.round(H*0.22);
      for(let step=0; step<5; step++){
        ctx.fillRect(40 - step*4, bleacherY + step*6, W - 80 + step*8, 4);
      }
      ctx.restore();

      // MIDGROUND LAYER: sidewalks, grass and the walking character.
      // Sidewalk (foreground strip at bottom)
      const sidewalkY = Math.round(H * 0.78);
      ctx.fillStyle = '#CFCFCF'; ctx.fillRect(0, sidewalkY, W, Math.round(H*0.12));
      // Grass patches along sidewalk
      ctx.fillStyle = '#6FB14E';
      for(let gx=6; gx<W; gx += 16){ ctx.fillRect(gx, sidewalkY - 6, 6, 6); }

      // Character backpack - draw behind the body for depth
      // Determine rendering offsets while the backgrounds slide: when school slides left we should offset the character by the same scene-level translation for visual consistency
      const globalCharX = walkPos;
      const charY = sidewalkY - 28; // stands on sidewalk

      // Backpack (VERY IMPORTANT) - simple rectangle behind the shirt
      ctx.fillStyle = '#5C2E8A'; // purple-ish backpack
      ctx.fillRect(globalCharX - 6, charY - 2, 8, 10);

      // Walking animation: pass phase to drawMainCharacter for legs/arms
      const walkPhase = (t * 1.5) % 1;
      // Character is elementary-age: slightly taller than toddler -> use stage=2
      drawMainCharacter(ctx, globalCharX, charY, 2, walkPhase, 'walk');

      // FOREGROUND: keep sidewalk and grounding elements on top
      // Small grass near foreground edge for depth
      ctx.fillStyle = '#4F8E34';
      ctx.fillRect(2, sidewalkY + Math.round(H*0.01), 10, 3);

      // TRANSITION: when slideP > 0 we should show both layers sliding smoothly.
      // We achieved this by translating the school and field above. slideP also indicates how far along transition is.

      // PHASE 2 MIDGROUND: draw mom in bleachers when slideP > 0.1 (appears as field arrives).
      if(slideP > 0.05){
        // Mom cheering is in the bleachers area. We'll place her relative to the field layer.
        // Cheer animation: arms up/down driven by `cheerPhase` (sin wave). This is a simple pixel animation.
        const cheerPhase = Math.sin(t * 6) * 0.6; // -0.6 .. 0.6
        // Mom position anchored to bleachers (screen coordinates)
        const momScreenX = Math.round(W * 0.70);
        const momScreenY = Math.round(H * 0.38);

        // Draw mom body (visible volume, curly hair, rounded clusters)
        // Scale her visibility by slideP so she fades in as bleachers arrive
        ctx.save(); ctx.globalAlpha = Math.min(1, slideP * 1.4);
        // Curly hair (clustered pixels)
        ctx.fillStyle = '#1a1a1a';
        for(let cx=-3; cx<=3; cx+=2){ for(let cy=-8; cy<=-4; cy+=2){ ctx.fillRect(momScreenX+cx, momScreenY+cy, 2, 2); } }
        // Head
        ctx.fillStyle = '#7a4f36'; ctx.fillRect(momScreenX-2, momScreenY-4, 6, 6);
        // Eyes and mouth (face)
        ctx.fillStyle = '#000000'; ctx.fillRect(momScreenX-1, momScreenY-2, 1, 1); ctx.fillRect(momScreenX+2, momScreenY-2, 1, 1);
        ctx.fillRect(momScreenX, momScreenY+1, 2, 1);

        // Torso
        ctx.fillStyle = '#FFB07C'; ctx.fillRect(momScreenX-3, momScreenY+4, 8, 6);

        // Arms: simple rectangles that move up/down using cheerPhase
        // Compute arm Y offset: arms raise upwards when cheerPhase > 0
        const armLift = Math.round(lerp( -2, -8, (cheerPhase + 0.6) / 1.2 ));
        // Left arm
        ctx.fillStyle = '#7a4f36'; ctx.fillRect(momScreenX-6, momScreenY+2 + armLift, 3, 3);
        // Right arm
        ctx.fillRect(momScreenX+8, momScreenY+2 + armLift, 3, 3);

        ctx.restore();
      }

      // MAIN CHARACTER ON FIELD (phase 2): when slideP > 0.6 the child is standing on the field with idle bounce
      if(slideP > 0.55){
        const fieldCharX = Math.round(W * 0.30);
        const idleBounce = Math.round(Math.sin(t * 4) * 1.5);
        // Backpack visible on field version as well
        ctx.fillStyle = '#5C2E8A'; ctx.fillRect(fieldCharX - 6, Math.round(H*0.78) - 28 - 2 + idleBounce, 8, 10);
        drawMainCharacter(ctx, fieldCharX, Math.round(H*0.78) - 28 + idleBounce, 2, (t*0.4)%1, 'idle');
      }

      // Only show the canvas text box after the movement/transition finishes
      // Note: Text is now shown in DOM textbox below canvas
    }
  },

  // Scene 3: Disney-style park
  {
    id:'disney',
    text:`"We stayed tearing up those lines.\nI’ll never forget running through lines to get on rides two minutes before the park closed."`,
    draw(ctx,t,progress){
      const W = ctx.canvas.width; const H = ctx.canvas.height;
      // Sky
      ctx.fillStyle='#9ED6FF'; ctx.fillRect(0,0,W,H);
      // Castle silhouette (fantasy original design)
      ctx.fillStyle='#B28CE6';
      ctx.beginPath(); ctx.moveTo(20, H*0.65); ctx.lineTo(40, H*0.30); ctx.lineTo(52, H*0.50); ctx.lineTo(70, H*0.28); ctx.lineTo(86, H*0.56); ctx.lineTo(100, H*0.32); ctx.lineTo(120, H*0.60); ctx.lineTo(20, H*0.65); ctx.fill();
      // Flags / sparkles
      ctx.fillStyle='#FFD24D'; px(ctx,34,26,2,2,'#FFD24D'); px(ctx,68,22,2,2,'#FFD24D'); px(ctx,100,28,2,2,'#FFD24D');
      // Pathway with fence/bushes
      ctx.fillStyle='#EBD6B0'; ctx.fillRect(0, Math.round(H*0.72), W, Math.round(H*0.12));
      ctx.fillStyle='#4F8E34'; for(let i=6;i<W;i+=18) px(ctx,i,Math.round(H*0.70),6,4,'#2E7D32');
      // Crowd silhouettes / ropes
      ctx.fillStyle='#6B6B6B'; for(let i=0;i<6;i++) px(ctx,10 + i*20, Math.round(H*0.66),4,6,'#6B6B6B');

      // Character walks faster in this scene
      const x = Math.round(lerp(8,118,Math.min(1, progress * 1.6)));
      drawMainCharacter(ctx,x, Math.round(H*0.72)-20, 3, (t*2.2)%1,'walk');

    }
  },

  // Scene 4: Middle School / Gaming
  {
    id:'middle',
    text:`"This was my antisocial teenager phase.\nI was glued to the PC you got me for Christmas.\nI know you probably had fun dressing me for middle school events though."`,
    draw(ctx,t,progress){
      const W = ctx.canvas.width, H = ctx.canvas.height;
      // Background wall
      ctx.fillStyle='#1f2430'; ctx.fillRect(0,0,W,H);
      // Poster on wall
      ctx.fillStyle='#6B8E23'; ctx.fillRect(12,16,36,20);
      // Window (evening)
      ctx.fillStyle='#0b2947'; ctx.fillRect(W-42,14,30,18);
      ctx.fillStyle='#253858'; ctx.fillRect(W-40,16,26,14);

      // Floor + rug
      ctx.fillStyle='#3b2b23'; ctx.fillRect(0, H-36, W, 36);
      ctx.fillStyle='#8B5A2B'; ctx.fillRect(40, H-28, 80, 16);

      // Desk and PC monitor (environmental objects)
      ctx.fillStyle='#6b6b6b'; ctx.fillRect(18, H-46, 44, 10); // desk top
      ctx.fillStyle='#000'; ctx.fillRect(26, H-70, 28, 18); // monitor
      ctx.fillStyle='#1E90FF'; ctx.fillRect(30, H-66, 20, 12); // monitor glow

      // Character at desk or moving depending on progress
      const sitBlend = Math.min(1, Math.max(0, (progress - 0.4)/0.5));
      if(sitBlend < 0.6){
        const x = lerp(18,86,progress);
        drawMainCharacter(ctx,x, H-44, 4, (t*0.6)%1,'walk');
      } else {
        drawMainCharacter(ctx,48, H-46, 4, (t*0.2)%1,'sit');
      }
      // Text displayed in DOM textbox below
    }
  },

  // Scene 5: High School / Friends
  {
    id:'highschool',
    text:`"Started hanging with friends and had you taking me everywhere.\nI always used you to get me out of dumb stuff lol.\nBlamed it on you being a nurse and instantly knowing."`,
    draw(ctx,t,progress){
      const W = ctx.canvas.width; const H = ctx.canvas.height;
      // Background outdoor area
      ctx.fillStyle = '#EAF6FF'; ctx.fillRect(0,0,W,H);
      // Fence / lockers wall
      ctx.fillStyle = '#C6B79A'; ctx.fillRect(0, Math.round(H*0.62), W, Math.round(H*0.18));
      // Trees
      ctx.fillStyle = '#4F8E34'; for(let tx=12; tx<W; tx+=40) ctx.fillRect(tx, Math.round(H*0.46), 8, 12);

      // Friends (3) idle bounce
      drawFriend(ctx,44, Math.round(H*0.54), (t*0.8)%1,'#9ec5ff');
      drawFriend(ctx,68, Math.round(H*0.52), (t*0.9)%1,'#ffd6a5');
      drawFriend(ctx,92, Math.round(H*0.54), (t*0.7)%1,'#c2ffd6');

      // Main character taller and starting short dreads (stage 5)
      drawMainCharacter(ctx,68, Math.round(H*0.52), 5, (t*0.6)%1,'stand');

      // HAHAHA pop briefly when progress in mid range
      const laughX = Math.round(W*0.5); const laughY = Math.round(H*0.36); const amp = Math.abs(Math.sin(t*6))*2;
      if(progress > 0.3 && progress < 0.6){ ctx.fillStyle='#FF6B6B'; ctx.font='8px monospace'; ctx.fillText('HAHAHA',laughX,laughY-amp); }
      // Text displayed in DOM textbox below
    }
  },

  // Scene 6: Sleeping in the car
  {
    id:'car',
    text:`"Do I even need to explain this?\nWe held it down, playa.\nSometimes I miss the days of doing nothing and being one with nature."`,
    draw(ctx,t,progress){
      const W = ctx.canvas.width, H = ctx.canvas.height;
      // Night sky with gradient
      const skyGrad = ctx.createLinearGradient(0,0,0,H*0.5);
      skyGrad.addColorStop(0, '#0a0f2c'); skyGrad.addColorStop(1, '#1a1a3a');
      ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, W, H);
      // Moon
      ctx.fillStyle='#FFFACD'; ctx.beginPath(); ctx.arc(W*0.88, H*0.15, 8, 0, Math.PI*2); ctx.fill();
      // Stars (simple pixels)
      ctx.fillStyle='#FFE9B5'; for(let i=0;i<12;i++) px(ctx, Math.random()*W, Math.random()*H*0.4, 1, 1, '#FFE9B5');
      // Road at bottom
      ctx.fillStyle='#333333'; ctx.fillRect(0, H*0.80, W, H*0.20);

      // Car interior side view (dark silhouette)
      ctx.fillStyle='#1a1a1a'; ctx.fillRect(6, H*0.50, W-12, H*0.32);
      // Seats visible
      ctx.fillStyle='#3a3a3a'; ctx.fillRect(12, H*0.56, W-24, 6);
      // Side window
      ctx.fillStyle='#0b2947'; ctx.fillRect(W-20, H*0.52, 16, 12);

      // Mom and main character sleeping with gentle head bobbing
      const bobMom = Math.sin(t*1.8)*2; const bobMe = Math.sin((t+0.5)*1.8)*2;
      drawMom(ctx, Math.round(W*0.35), Math.round(H*0.68) + bobMom, 0, 'sleep');
      drawMainCharacter(ctx, Math.round(W*0.70), Math.round(H*0.70) + bobMe, 6, (t*0.15)%1, 'sleep');
      // Text displayed in DOM textbox below
    }
  },

  // Scene 7: Today / Christmas (Ending)
  {
    id:'today',
    text:`"I love you mom and Merry Christmas.\nDon't feel bad about anything I went through — it's not your fault.\nHaving a mom like you is the greatest gift I could ask for.\n(And your cooking is amazing.)\nI love you mom."`,
    draw(ctx,t,progress){
      const W = ctx.canvas.width, H = ctx.canvas.height;
      // Living room interior
      ctx.fillStyle='#E8D5C4'; ctx.fillRect(0,0,W,H);
      // Wall
      ctx.fillStyle='#D4C4B0'; ctx.fillRect(0, H*0.70, W, H*0.30);

      // Christmas tree (with lights and ornaments)
      ctx.fillStyle='#2F855A'; ctx.fillRect(W*0.20, H*0.26, 12, 18);
      ctx.fillRect(W*0.16, H*0.34, 20, 8);
      ctx.fillRect(W*0.14, H*0.42, 24, 6);
      // Tree lights (animated colors)
      ctx.fillStyle='#FFD54F'; px(ctx, Math.round(W*0.22), 28+Math.sin(t*6)*2, 2, 2, '#FFD54F');
      ctx.fillStyle='#FF6B6B'; px(ctx, Math.round(W*0.24), 32+Math.sin((t+0.5)*6)*2, 2, 2, '#FF6B6B');
      ctx.fillStyle='#9DE0AD'; px(ctx, Math.round(W*0.20), 36+Math.sin((t+1)*6)*2, 2, 2, '#9DE0AD');

      // Rug
      ctx.fillStyle='#B8996F'; ctx.fillRect(28, Math.round(H*0.65), 104, 14);

      // Main character and mom dancing (sway animation)
      const sway = Math.sin(t*2.8)*3;
      const swayOpp = Math.sin((t+Math.PI)*2.8)*3;

      drawMainCharacter(ctx, Math.round(W*0.40) + sway, Math.round(H*0.65), 6, (t*0.6)%1, 'dance');
      drawMom(ctx, Math.round(W*0.68) + swayOpp, Math.round(H*0.65), (t*0.5)%1, 'dance');
      // Text displayed in DOM textbox below
    }
  }
];

function drawMainCharacter(ctx,x,y,stage,stepPhase,state='walk'){
  // Kindergarten style: Large head proportions
  // Total height ~28px: head 14px, body 14px
  const totalH = 28;
  const headH = 14;
  const bodyH = 14;
  const headW = 14;
  const bodyW = 12;
  
  const headX = x - headW/2;
  const headY = y - totalH;
  const bodyX = x - bodyW/2;
  const bodyY = y - bodyH;
  
  // Skin color: warm brown
  const skin = '#9D6B4A';
  const outline = '#000000';
  
  // === HAIR (stage-dependent) ===
  const hairColor = '#1a1a1a';
  
  if(stage === 0){
    // Toddler: small rounded high-top
    outlineRect(ctx, headX-1, headY-4, headW+2, 6, hairColor, outline, 1);
  } else if(stage === 1){
    // Elementary: medium high-top
    outlineRect(ctx, headX-2, headY-6, headW+4, 8, hairColor, outline, 1);
  } else if(stage === 2){
    // Elementary older: fuller high-top
    outlineRect(ctx, headX-3, headY-7, headW+6, 9, hairColor, outline, 1);
  } else if(stage === 3){
    // Middle school: taller textured
    outlineRect(ctx, headX-3, headY-8, headW+6, 10, hairColor, outline, 1);
  } else if(stage === 4){
    // High school: short dreads
    px(ctx, headX-2, headY-7, 3, 1, outline);
    px(ctx, headX+3, headY-7, 3, 1, outline);
    px(ctx, headX, headY-7, 4, 1, outline);
  } else {
    // Today: longer dreads
    px(ctx, headX-3, headY-8, 3, 2, outline);
    px(ctx, headX+3, headY-8, 3, 2, outline);
    px(ctx, headX, headY-9, 4, 2, outline);
  }
  
  // === HEAD with thick outline ===
  outlineRect(ctx, headX, headY, headW, headH, skin, outline, 2);
  
  // === LARGE EXPRESSIVE EYES (6-8px each) ===
  const eyeW = 6;
  const eyeH = 5;
  const eyeY = headY + 5;
  
  // Left eye white
  outlineRect(ctx, headX+2, eyeY, eyeW, eyeH, '#FFFFFF', outline, 1);
  // Left pupil (can move)
  const pupilOff = Math.sin(stepPhase * Math.PI * 2) * 1;
  px(ctx, headX+4+pupilOff, eyeY+2, 2, 2, '#000000');
  
  // Right eye white
  outlineRect(ctx, headX+headW-eyeW-2, eyeY, eyeW, eyeH, '#FFFFFF', outline, 1);
  // Right pupil
  px(ctx, headX+headW-4+pupilOff, eyeY+2, 2, 2, '#000000');
  
  // === MOUTH (expressive) ===
  if(state === 'sleep'){
    px(ctx, x-2, y-totalH+12, 4, 1, '#000000');
  } else if(state === 'idle' || state === 'sit'){
    px(ctx, x-2, y-totalH+12, 4, 1, '#8B4545'); // slight smile
  } else {
    px(ctx, x-2, y-totalH+11, 4, 1, '#000000');
    px(ctx, x-1, y-totalH+13, 2, 1, '#8B4545'); // happy mouth
  }
  
  // === BODY with thick outline ===
  let shirtColor = '#6B8E23';
  if(stage === 0) shirtColor = '#E8B4A8';
  if(stage === 1) shirtColor = '#6FA3FF';
  if(stage === 2) shirtColor = '#7FB77E';
  if(stage === 3) shirtColor = '#9B7FFF';
  if(stage >= 4) shirtColor = '#556B2F';
  
  outlineRect(ctx, bodyX, bodyY, bodyW, bodyH, shirtColor, outline, 2);
  
  // === ARMS (stubby) ===
  px(ctx, bodyX-2, bodyY+4, 2, 4, outline);
  px(ctx, bodyX-1, bodyY+4, 1, 4, skin);
  px(ctx, bodyX+bodyW, bodyY+4, 2, 4, outline);
  px(ctx, bodyX+bodyW+1, bodyY+4, 1, 4, skin);
  
  // === LEGS (simple, alternating with walk) ===
  const legOff = Math.sin(stepPhase * Math.PI * 2) * 2;
  px(ctx, bodyX+2, bodyY+bodyH, 2, 4, outline);
  px(ctx, bodyX+2.5, bodyY+bodyH, 1, 4, skin);
  
  px(ctx, bodyX+bodyW-4, bodyY+bodyH+legOff, 2, 4, outline);
  px(ctx, bodyX+bodyW-3.5, bodyY+bodyH+legOff, 1, 4, skin);
}

function drawMom(ctx,x,y,stepPhase,state='stand'){
  // Kindergarten style: Same large head proportions as main character
  const totalH = 28;
  const headH = 14;
  const bodyH = 14;
  const headW = 14;
  const bodyW = 12;
  
  const headX = x - headW/2;
  const headY = y - totalH;
  const bodyX = x - bodyW/2;
  const bodyY = y - bodyH;
  
  const skin = '#9D6B4A';
  const outline = '#000000';
  const hairColor = '#2a1a1a';
  
  // === CURLY HAIR (rounded clusters) ===
  // Hair outline
  px(ctx, headX-5, headY-6, 16, 8, outline);
  // Hair fill (rounded top with curls)
  px(ctx, headX-4, headY-5, 14, 7, hairColor);
  // Curly texture (clusters)
  px(ctx, headX-3, headY-7, 2, 2, hairColor);
  px(ctx, headX+3, headY-7, 2, 2, hairColor);
  px(ctx, headX, headY-8, 2, 2, hairColor);
  
  // === HEAD with thick outline ===
  outlineRect(ctx, headX, headY, headW, headH, skin, outline, 2);
  
  // === LARGE EYES ===
  const eyeW = 6;
  const eyeH = 5;
  const eyeY = headY + 5;
  
  outlineRect(ctx, headX+2, eyeY, eyeW, eyeH, '#FFFFFF', outline, 1);
  px(ctx, headX+4, eyeY+2, 2, 2, '#000000');
  
  outlineRect(ctx, headX+headW-eyeW-2, eyeY, eyeW, eyeH, '#FFFFFF', outline, 1);
  px(ctx, headX+headW-4, eyeY+2, 2, 2, '#000000');
  
  // === MOUTH (warm smile) ===
  px(ctx, x-2, y-totalH+12, 4, 1, '#8B5544');
  px(ctx, x-1, y-totalH+13, 2, 1, '#C88060');
  
  // === BODY (simple dress) with thick outline ===
  outlineRect(ctx, bodyX, bodyY, bodyW, bodyH, '#E8A080', outline, 2);
  
  // === SIMPLE ARMS ===
  px(ctx, bodyX-2, bodyY+4, 2, 6, outline);
  px(ctx, bodyX-1, bodyY+4, 1, 6, skin);
  px(ctx, bodyX+bodyW, bodyY+4, 2, 6, outline);
  px(ctx, bodyX+bodyW+1, bodyY+4, 1, 6, skin);
}

function drawFriend(ctx,x,y,phase,color){
  // Kindergarten style friend: large head proportions
  const totalH = 26;
  const headH = 13;
  const bodyH = 13;
  const headW = 13;
  const bodyW = 11;
  
  const headX = x - headW/2;
  const headY = y - totalH;
  const bodyX = x - bodyW/2;
  const bodyY = y - bodyH;
  
  const skin = '#9D6B4A';
  const outline = '#000000';
  const hairColor = '#1a1a1a';
  
  // === HAIR (simple dark top) ===
  outlineRect(ctx, headX-2, headY-5, headW+4, 6, hairColor, outline, 1);
  
  // === HEAD ===
  outlineRect(ctx, headX, headY, headW, headH, skin, outline, 2);
  
  // === EYES (large) ===
  const eyeW = 5;
  const eyeH = 4;
  const eyeY = headY + 4;
  
  outlineRect(ctx, headX+1.5, eyeY, eyeW, eyeH, '#FFFFFF', outline, 1);
  px(ctx, headX+3.5, eyeY+1.5, 2, 2, '#000000');
  
  outlineRect(ctx, headX+headW-eyeW-1.5, eyeY, eyeW, eyeH, '#FFFFFF', outline, 1);
  px(ctx, headX+headW-3.5, eyeY+1.5, 2, 2, '#000000');
  
  // === MOUTH ===
  px(ctx, x-2, y-totalH+10, 4, 1, '#8B5544');
  
  // === BODY (colored shirt) ===
  outlineRect(ctx, bodyX, bodyY, bodyW, bodyH, color, outline, 2);
  
  // === SIMPLE ARMS ===
  px(ctx, bodyX-2, bodyY+3, 2, 5, outline);
  px(ctx, bodyX-1, bodyY+3, 1, 5, skin);
  px(ctx, bodyX+bodyW, bodyY+3, 2, 5, outline);
  px(ctx, bodyX+bodyW+1, bodyY+3, 1, 5, skin);
}

function showStart(){ startScreen.classList.remove('hidden'); sceneScreen.classList.add('hidden'); isPlaying=false; }

function startJourney(){ startScreen.classList.add('hidden'); sceneScreen.classList.remove('hidden'); sceneIndex=0; isPlaying=true; sceneStartTime=performance.now(); sceneProgress=0; lastTime=sceneStartTime; requestAnimationFrame(loop); renderTextbox(); }

function renderTextbox(){
  const s = scenes[sceneIndex];
  textbox.innerHTML = s.text.replace(/\n/g,'<br>');
  if(s.id === 'highschool'){
    const laugh = document.createElement('div'); laugh.className='laugh'; laugh.textContent='HAHAHAHA'; laugh.style.marginTop='6px'; textbox.appendChild(laugh);
  }
}

function advanceScene(nowImmediate=false){
  if(transition) return;
  const from = sceneIndex;
  const to = (sceneIndex + 1) % scenes.length;
  transition = {from,to,start:performance.now(),duration:TRANSITION_MS};
  setTimeout(()=>{
    sceneIndex = to; renderTextbox(); sceneStartTime = performance.now(); sceneProgress = 0; transition = null;
    if(to === 0 && from === scenes.length-1){
      playEndingHeart();
    }
  }, TRANSITION_MS);
}

function playEndingHeart(){
  const overlay = document.createElement('div'); overlay.id='heart-overlay'; document.body.appendChild(overlay);
  const ocan = document.createElement('canvas'); ocan.width=160; ocan.height=144; ocan.style.width = `calc(160px * var(--scale))`; ocan.style.height = `calc(144px * var(--scale))`; ocan.style.imageRendering='pixelated'; overlay.appendChild(ocan);
  const octx = ocan.getContext('2d');
  const start = performance.now();
  const dur = 900;
  function frame(t){
    const dt = t-start; const p = Math.min(1, dt/dur);
    octx.clearRect(0,0,160,144);
    octx.save(); octx.translate(80,60); octx.scale(1+p*4,1+p*4);
    octx.fillStyle='#FF6B6B'; octx.beginPath(); octx.moveTo(0, -6); octx.bezierCurveTo(-10,-20,-36,-8,-12,12); octx.bezierCurveTo(0,26,12,20,12,20); octx.bezierCurveTo(28,-6,10,-20,0,-6); octx.fill();
    octx.restore();
    if(p < 1) requestAnimationFrame(frame); else {
      setTimeout(()=>{ document.body.removeChild(overlay); showStart(); }, 420);
    }
  }
  requestAnimationFrame(frame);
}

function loop(now){
  if(!isPlaying) return;
  const dt = now - lastTime; lastTime = now;
  const elapsed = now - sceneStartTime;
  sceneProgress = Math.min(1, elapsed / SCENE_DURATION);
  const sidx = sceneIndex;
  clear();
  if(transition){
    const p = Math.min(1, (now - transition.start)/transition.duration);
    ctx.save(); ctx.globalAlpha = 1-p; scenes[transition.from].draw(ctx, (now%1000)/1000, sceneProgress, transition.from); ctx.restore();
    ctx.save(); ctx.globalAlpha = p; scenes[transition.to].draw(ctx, (now%1000)/1000, sceneProgress, transition.to); ctx.restore();
  } else {
    scenes[sidx].draw(ctx, (now%1000)/1000, sceneProgress, sidx);
  }

  // Auto-advance disabled: scenes only advance when "Next" button clicked

  requestAnimationFrame(loop);
}

startBtn.addEventListener('click', () => { startJourney(); });
nextBtn.addEventListener('click', () => { advanceScene(true); });
skipBtn.addEventListener('click', () => {
  sceneIndex = scenes.length - 1;
  renderTextbox();
  sceneStartTime = performance.now() - SCENE_DURATION;
});

showStart();
