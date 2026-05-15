<script>
  import { onMount } from "svelte";
  import * as THREE from "three";
  import gsap from "gsap";

  // ─── Constants ────────────────────────────────────────────────────────────
  const SECTION_IDS = ["hero", "skills", "experience", "portfolio", "contact"];
  const isMobile =
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: coarse)").matches
      : false;
  const PARTICLE_COUNT = isMobile ? 800 : 3000;

  // ─── Colour palette ───────────────────────────────────────────────────────
  const C_PRIMARY = new THREE.Color(0x7aa7ff); // blue
  const C_SECONDARY = new THREE.Color(0x64e7d5); // cyan
  const C_WHITE = new THREE.Color(0xffffff);

  // ─── Shape generators ─────────────────────────────────────────────────────
  // Each returns a Float32Array(count × 3) of particle positions.

  /** Starfield — random dots filling the full viewport at varying depths, no shape */
  function generateStarfield(count) {
    const pos = new Float32Array(count * 3);
    const camZ = 8;
    const halfFov = Math.PI / 6; // half of 60° FOV
    const aspect = window.innerWidth / window.innerHeight;

    for (let i = 0; i < count; i++) {
      // Depth range: z from -6 to +3 → camera distance 5..14
      const z = -6 + Math.random() * 9;
      const dist = camZ - z;
      const halfH = Math.tan(halfFov) * dist;
      const halfW = halfH * aspect;
      pos[i * 3]     = (Math.random() * 2 - 1) * halfW;
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * halfH;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }

  /** 3D extruded </> code icon — two faces + depth-fill for a rotating block-letter look */
  function generateCodeIcon(count) {
    const pos = new Float32Array(count * 3);
    const depth = 0.9; // Z-axis extrusion

    // Character strokes [x1, y1, x2, y2]
    const strokes = [
      [-1.5, 1.3, -2.5, 0.0], // '<' upper arm  (apex at x=-2.5, leftmost)
      [-2.5, 0.0, -1.5, -1.3], // '<' lower arm
      [0.4, 1.45, -0.4, -1.45], // '/'
      [1.5, 1.3, 2.5, 0.0], // '>' upper arm
      [2.5, 0.0, 1.5, -1.3], // '>' lower arm
    ];

    const lengths = strokes.map(([x1, y1, x2, y2]) =>
      Math.hypot(x2 - x1, y2 - y1),
    );
    const totalLen = lengths.reduce((a, b) => a + b, 0);
    // Cumulative for weighted random stroke selection
    const cumLen = [];
    let acc = 0;
    for (const l of lengths) {
      acc += l;
      cumLen.push(acc);
    }

    const jitter = 0.05;

    for (let i = 0; i < count; i++) {
      // Pick stroke proportional to length
      const r = Math.random() * totalLen;
      let s = cumLen.findIndex((c) => r <= c);
      if (s < 0) s = strokes.length - 1;

      const [x1, y1, x2, y2] = strokes[s];
      const t = Math.random();

      // Z: 40% front face, 40% back face, 20% depth fill (visible side walls when rotating)
      let z;
      const zr = Math.random();
      if (zr < 0.4) z = depth * 0.5 + (Math.random() - 0.5) * 0.06;
      else if (zr < 0.8) z = -depth * 0.5 + (Math.random() - 0.5) * 0.06;
      else z = (Math.random() - 0.5) * depth;

      pos[i * 3] = x1 + (x2 - x1) * t + (Math.random() - 0.5) * jitter;
      pos[i * 3 + 1] = y1 + (y2 - y1) * t + (Math.random() - 0.5) * jitter;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }

  /** DNA double helix — two strands + connecting rungs */
  function generateDoubleHelix(count, height = 5.0, radius = 1.5, turns = 4) {
    const pos = new Float32Array(count * 3);
    const strand = Math.floor(count * 0.44);
    const rungPairs = Math.floor((count - strand * 2) / 6);

    for (let i = 0; i < strand; i++) {
      const t = (i / strand) * Math.PI * 2 * turns;
      const y = (i / strand) * height - height / 2;
      pos[i * 3] = Math.cos(t) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(t) * radius;
      const j = strand + i;
      pos[j * 3] = Math.cos(t + Math.PI) * radius;
      pos[j * 3 + 1] = y;
      pos[j * 3 + 2] = Math.sin(t + Math.PI) * radius;
    }

    let idx = strand * 2;
    for (let rung = 0; rung < rungPairs && idx + 5 < count; rung++) {
      const t = (rung / rungPairs) * Math.PI * 2 * turns;
      const y = (rung / rungPairs) * height - height / 2;
      const x1 = Math.cos(t) * radius,
        z1 = Math.sin(t) * radius;
      const x2 = Math.cos(t + Math.PI) * radius,
        z2 = Math.sin(t + Math.PI) * radius;
      for (let s = 0; s < 6; s++) {
        const lerp = s / 5;
        pos[idx * 3] = x1 + (x2 - x1) * lerp;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z1 + (z2 - z1) * lerp;
        idx++;
      }
    }
    return pos;
  }

  /** Cube — dense face sampling + 12 edge lines */
  function generateCubeGrid(count, size = 3.0) {
    const pos = new Float32Array(count * 3);
    const h = size / 2;
    const faceN = Math.floor(count * 0.8);
    const edgeN = count - faceN;
    const perEdge = Math.floor(edgeN / 12);

    // Face points
    for (let i = 0; i < faceN; i++) {
      const face = Math.floor(Math.random() * 6);
      const u = (Math.random() - 0.5) * size;
      const v = (Math.random() - 0.5) * size;
      switch (face) {
        case 0:
          pos[i * 3] = h;
          pos[i * 3 + 1] = u;
          pos[i * 3 + 2] = v;
          break;
        case 1:
          pos[i * 3] = -h;
          pos[i * 3 + 1] = u;
          pos[i * 3 + 2] = v;
          break;
        case 2:
          pos[i * 3] = u;
          pos[i * 3 + 1] = h;
          pos[i * 3 + 2] = v;
          break;
        case 3:
          pos[i * 3] = u;
          pos[i * 3 + 1] = -h;
          pos[i * 3 + 2] = v;
          break;
        case 4:
          pos[i * 3] = u;
          pos[i * 3 + 1] = v;
          pos[i * 3 + 2] = h;
          break;
        case 5:
          pos[i * 3] = u;
          pos[i * 3 + 1] = v;
          pos[i * 3 + 2] = -h;
          break;
      }
    }

    // 12 edge lines
    const edges = [
      (t) => [t * size - h, -h, -h],
      (t) => [t * size - h, h, -h],
      (t) => [t * size - h, -h, h],
      (t) => [t * size - h, h, h],
      (t) => [-h, t * size - h, -h],
      (t) => [h, t * size - h, -h],
      (t) => [-h, t * size - h, h],
      (t) => [h, t * size - h, h],
      (t) => [-h, -h, t * size - h],
      (t) => [h, -h, t * size - h],
      (t) => [-h, h, t * size - h],
      (t) => [h, h, t * size - h],
    ];

    let idx = faceN;
    for (let e = 0; e < 12; e++) {
      for (let i = 0; i < perEdge && idx < count; i++) {
        const [x, y, z] = edges[e](perEdge > 1 ? i / (perEdge - 1) : 0.5);
        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;
        idx++;
      }
    }
    while (idx < count) {
      const face = Math.floor(Math.random() * 6);
      const u = (Math.random() - 0.5) * size,
        v = (Math.random() - 0.5) * size;
      switch (face) {
        case 0:
          pos[idx * 3] = h;
          pos[idx * 3 + 1] = u;
          pos[idx * 3 + 2] = v;
          break;
        case 1:
          pos[idx * 3] = -h;
          pos[idx * 3 + 1] = u;
          pos[idx * 3 + 2] = v;
          break;
        case 2:
          pos[idx * 3] = u;
          pos[idx * 3 + 1] = h;
          pos[idx * 3 + 2] = v;
          break;
        case 3:
          pos[idx * 3] = u;
          pos[idx * 3 + 1] = -h;
          pos[idx * 3 + 2] = v;
          break;
        case 4:
          pos[idx * 3] = u;
          pos[idx * 3 + 1] = v;
          pos[idx * 3 + 2] = h;
          break;
        case 5:
          pos[idx * 3] = u;
          pos[idx * 3 + 1] = v;
          pos[idx * 3 + 2] = -h;
          break;
      }
      idx++;
    }
    return pos;
  }

  /** Geodesic icosphere — 4 subdivisions ≈ 2562 unique vertices */
  function generateGeodesic(count, radius = 3.0) {
    const t0 = (1 + Math.sqrt(5)) / 2;
    let verts = [
      [-1, t0, 0],
      [1, t0, 0],
      [-1, -t0, 0],
      [1, -t0, 0],
      [0, -1, t0],
      [0, 1, t0],
      [0, -1, -t0],
      [0, 1, -t0],
      [t0, 0, -1],
      [t0, 0, 1],
      [-t0, 0, -1],
      [-t0, 0, 1],
    ].map((v) => {
      const l = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
      return [v[0] / l, v[1] / l, v[2] / l];
    });

    let faces = [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1],
    ];

    const cache = {};
    function mid(a, b) {
      const key = Math.min(a, b) + "_" + Math.max(a, b);
      if (cache[key] !== undefined) return cache[key];
      const va = verts[a],
        vb = verts[b];
      const mx = (va[0] + vb[0]) / 2,
        my = (va[1] + vb[1]) / 2,
        mz = (va[2] + vb[2]) / 2;
      const l = Math.sqrt(mx * mx + my * my + mz * mz);
      verts.push([mx / l, my / l, mz / l]);
      return (cache[key] = verts.length - 1);
    }

    const subdivisions = isMobile ? 3 : 4;
    for (let s = 0; s < subdivisions; s++) {
      const next = [];
      for (const [a, b, c] of faces) {
        const ab = mid(a, b),
          bc = mid(b, c),
          ca = mid(c, a);
        next.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
      }
      faces = next;
    }

    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const v = verts[i % verts.length];
      pos[i * 3] = v[0] * radius;
      pos[i * 3 + 1] = v[1] * radius;
      pos[i * 3 + 2] = v[2] * radius;
    }
    return pos;
  }

  // ─── Section → shape mapping ───────────────────────────────────────────────
  const SHAPES = {
    hero: () => generateStarfield(PARTICLE_COUNT),
    skills: () => generateCodeIcon(PARTICLE_COUNT),
    experience: () => generateDoubleHelix(PARTICLE_COUNT, 5.0, 1.5, 4),
    portfolio: () => generateCubeGrid(PARTICLE_COUNT, 3.0),
    contact: () => generateGeodesic(PARTICLE_COUNT, 3.0),
  };

  // ─── Per-section world-space offsets (where the cloud is positioned) ────────
  const OFFSETS = {
    hero: new THREE.Vector3(0.0, 0.0, 0.0),
    skills: new THREE.Vector3(3.2, -0.8, 1.5),
    experience: new THREE.Vector3(-1.8, -1.2, 6.0),
    portfolio: new THREE.Vector3(1.8, 0.0, 2.8),
    contact: new THREE.Vector3(0.0, 0.0, 1.0),
  };

  // ─── Runtime state ─────────────────────────────────────────────────────────
  let canvasEl;
  let renderer, scene, camera, points, geometry, material;
  let frameId;

  let currentSection = "hero";
  let animState = "idle"; // 'idle' | 'destructing' | 'constructing'
  let animProg = { value: 0 };
  let currentTween = null;

  // Float32 working buffers
  let positions, targetPositions, snapshotPositions, scatterPositions;
  let opacities, sizes, colors, phaseOffsets, explosionVelocities;

  // ─── Buffer initialisation ─────────────────────────────────────────────────
  function initBuffers() {
    positions = new Float32Array(PARTICLE_COUNT * 3);
    targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    snapshotPositions = new Float32Array(PARTICLE_COUNT * 3);
    scatterPositions = new Float32Array(PARTICLE_COUNT * 3);
    opacities = new Float32Array(PARTICLE_COUNT);
    sizes = new Float32Array(PARTICLE_COUNT);
    colors = new Float32Array(PARTICLE_COUNT * 3);
    phaseOffsets = new Float32Array(PARTICLE_COUNT);
    explosionVelocities = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      opacities[i] = 0;
      sizes[i] = 0.5 + Math.random() * 1.2;
      phaseOffsets[i] = Math.random() * Math.PI * 2;

      // Colour: gradient from blue → cyan → slight white tint
      const blend = Math.random();
      const c =
        blend < 0.6
          ? C_PRIMARY.clone().lerp(C_SECONDARY, blend / 0.6)
          : C_SECONDARY.clone().lerp(C_WHITE, ((blend - 0.6) / 0.4) * 0.45);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
  }

  // ─── Helper: fill scatterPositions with random shell distribution ──────────
  function makeScatter(radius = 10) {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.45 + Math.random() * 0.8);
      scatterPositions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      scatterPositions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      scatterPositions[i * 3 + 2] = r * Math.cos(theta);
    }
  }

  // ─── Helper: fill explosionVelocities with random outward directions ───────
  function makeExplosion(strength = 7) {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const speed = strength * (0.35 + Math.random() * 0.9);
      explosionVelocities[i * 3] = Math.sin(theta) * Math.cos(phi) * speed;
      explosionVelocities[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * speed;
      explosionVelocities[i * 3 + 2] = Math.cos(theta) * speed;
    }
  }

  // ─── Transition to a new section shape ────────────────────────────────────
  function transitionTo(id) {
    if (id === currentSection) return;
    currentSection = id;

    if (currentTween) {
      currentTween.kill();
      currentTween = null;
    }

    // Snapshot the CURRENT VISUAL positions (whatever is rendered right now)
    snapshotPositions.set(geometry.attributes.position.array);
    makeExplosion(7);

    animState = "destructing";
    animProg.value = 0;

    currentTween = gsap.to(animProg, {
      value: 1,
      duration: 0.55,
      ease: "power2.in",
      onComplete() {
        const gen = SHAPES[id];
        if (!gen) return;

        targetPositions.set(gen());
        makeScatter(10);
        positions.set(scatterPositions);

        // Snap group to new offset while particles are invisible
        const off = OFFSETS[id];
        if (off) points.position.copy(off);

        animState = "constructing";
        animProg.value = 0;

        currentTween = gsap.to(animProg, {
          value: 1,
          duration: 1.3,
          ease: "power2.out",
          onComplete() {
            positions.set(targetPositions);
            opacities.fill(1);
            animState = "idle";
            currentTween = null;
          },
        });
      },
    });
  }

  // ─── Initial construction (no destructing phase) ───────────────────────────
  function constructInitial() {
    targetPositions.set(SHAPES.hero());
    makeScatter(10);
    positions.set(scatterPositions);

    animState = "constructing";
    animProg.value = 0;

    currentTween = gsap.to(animProg, {
      value: 1,
      duration: 2.0,
      ease: "power2.out",
      onComplete() {
        positions.set(targetPositions);
        opacities.fill(1);
        animState = "idle";
        currentTween = null;
      },
    });
  }

  // ─── Per-frame geometry update ─────────────────────────────────────────────
  function updateGeo(time) {
    const posArr = geometry.attributes.position.array;
    const opArr = geometry.attributes.aOpacity.array;
    const p = animProg.value;

    if (animState === "destructing") {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        posArr[i3] = snapshotPositions[i3] + explosionVelocities[i3] * p;
        posArr[i3 + 1] =
          snapshotPositions[i3 + 1] + explosionVelocities[i3 + 1] * p;
        posArr[i3 + 2] =
          snapshotPositions[i3 + 2] + explosionVelocities[i3 + 2] * p;
        opArr[i] = Math.max(0, 1 - p * 1.7);
      }
    } else if (animState === "constructing") {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        // Randomised stagger using precomputed phase offsets (0‥1)
        const jitter = phaseOffsets[i] / (Math.PI * 2);
        const t = Math.min(1, Math.max(0, p * 1.5 - jitter * 0.55));
        posArr[i3] = positions[i3] + (targetPositions[i3] - positions[i3]) * t;
        posArr[i3 + 1] =
          positions[i3 + 1] + (targetPositions[i3 + 1] - positions[i3 + 1]) * t;
        posArr[i3 + 2] =
          positions[i3 + 2] + (targetPositions[i3 + 2] - positions[i3 + 2]) * t;
        opArr[i] = Math.min(1, p * 2.8);
      }
    } else {
      // Idle — floating oscillation (larger amplitude for hero starfield)
      const oscAmp = currentSection === "hero" ? 0.08 : 0.03;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const osc = Math.sin(time * 0.45 + phaseOffsets[i]) * oscAmp;
        posArr[i3] = targetPositions[i3];
        posArr[i3 + 1] = targetPositions[i3 + 1] + osc;
        posArr[i3 + 2] = targetPositions[i3 + 2];
        opArr[i] = opacities[i];
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.aOpacity.needsUpdate = true;
  }

  // ─── Scroll-based section detection ───────────────────────────────────────
  function getActiveSection() {
    const trigger = window.innerHeight * 0.55;
    let active = SECTION_IDS[0];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= trigger) active = id;
    }
    return active;
  }

  // ─── Mount ────────────────────────────────────────────────────────────────
  onMount(() => {
    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: false,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x080e1a, 1);
    renderer.toneMapping = THREE.LinearToneMapping;

    // Scene & camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    // Buffers
    initBuffers();

    // Geometry
    geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3),
    );
    geometry.setAttribute(
      "aOpacity",
      new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT), 1),
    );
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    // Custom shader material
    material = new THREE.ShaderMaterial({
      uniforms: { uPR: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        attribute float aOpacity;
        attribute float aSize;
        attribute vec3  aColor;
        uniform   float uPR;
        varying   float vOpacity;
        varying   vec3  vColor;

        void main() {
          vOpacity = aOpacity;
          vColor   = aColor;
          vec4 mv  = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPR * (45.0 / -mv.z);
          gl_Position  = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vOpacity;
        varying vec3  vColor;

        void main() {
          float d    = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float core = 1.0 - smoothstep(0.0, 0.35, d);
          float halo = pow(1.0 - d, 1.5) * 0.65;
          float a    = (core * 0.55 + halo * 0.45) * vOpacity;
          gl_FragColor = vec4(vColor + core * 0.25, a);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: false,
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);

    // Kick off initial sphere construction
    constructInitial();

    // Scroll listener
    function onScroll() {
      const s = getActiveSection();
      if (s !== currentSection) transitionTo(s);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize
    function onResize() {
      const w = window.innerWidth,
        h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      material.uniforms.uPR.value = renderer.getPixelRatio();
    }
    window.addEventListener("resize", onResize);

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
      frameId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const t = clock.getElapsedTime();

      // Point cloud slow idle rotation — disabled for hero starfield
      if (currentSection !== "hero") {
        if (animState === "idle") {
          points.rotation.y += 0.00038;
          points.rotation.x += 0.00013;
        } else {
          points.rotation.y += 0.00008;
        }
      }

      updateGeo(t);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameId);
      if (currentTween) currentTween.kill();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  });
</script>

<canvas
  bind:this={canvasEl}
  style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;"
></canvas>
