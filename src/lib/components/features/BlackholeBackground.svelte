<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import * as THREE from "three";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
  import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
  import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
  import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
  import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
  import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
  import blackhole from "$lib/assets/blackhole-compressed-1.glb";

  let canvas;
  let renderer, scene, camera, animationId, composer, bloomPass;
  let blackholeMesh, mixer, lensPass;
  let stars;
  const clock = new THREE.Clock();

  let activeSection = "hero";

  const CAMERA_KEYFRAMES = {
    hero: { pos: [-0.2, 0, 20], rotZ: 0.3, rotY: 0.1, bloom: 0.4 },
    skills: { pos: [-0.2, 0, 7], rotZ: 0.4, rotY: 0.1, bloom: 0.3 },
    experience: { pos: [1.6, 0.5, 0.8], rotZ: -0.1, rotY: 1, bloom: 0.4 },
    portfolio: { pos: [-3.8, 0.2, 3], rotZ: 0.2, rotY: -0.9, bloom: 0.3 },
    contact: { pos: [0, 0.3, 0.78], rotZ: 0.2, rotY: 0.0, bloom: 0.2 },
  };

  const PULSE = {
    hero: { amplitude: 0.8, speed: 70 },
    skills: { amplitude: 0.1, speed: 70 },
    experience: { amplitude: 0.1, speed: 80 },
    portfolio: { amplitude: 0.2, speed: 80 },
    contact: { amplitude: 0.08, speed: 80 },
  };

  const IDLE_ROTZ = { range: 0.3, speed: 0.005 };
  const LERP_SPEED = 0.1;
  const STAR_ROT = { x: 0.00003, y: 0.00008, z: 0.000015 };
  const MOUSE_INFLUENCE = 0.12;
  const MOUSE_LERP = 0.01;

  const _bhWorld = new THREE.Vector3();
  const _bhScreen = new THREE.Vector2();
  const _projVec = new THREE.Vector3();

  let mouseNormX = 0,
    mouseNormY = 0;
  let spinX = 0,
    spinY = 0,
    spinZ = 0;
  let idleTime = 0;

  // ─── Star Field ───────────────────────────────────────────────────────────
  function createStarField() {
    const STAR_COUNT = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);

    const palette = [
      new THREE.Color(1.0, 1.0, 1.0),
      new THREE.Color(0.8, 0.9, 1.0),
      new THREE.Color(1.0, 0.95, 0.8),
      new THREE.Color(0.7, 0.85, 1.0),
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 40 + Math.random() * 160;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      sizes[i] =
        Math.random() < 0.05
          ? 1 + Math.random() * 1.5
          : 0.5 + Math.random() * 1.2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: { uOpacity: { value: 0.85 } },
      vertexShader: /* glsl */ `
        attribute float size;
        varying vec3  vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          float dist = length(position);
          vAlpha = 1.0 - smoothstep(80.0, 200.0, dist) * 0.5;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position  = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uOpacity;
        varying vec3  vColor;
        varying float vAlpha;
        void main() {
          vec2  uv   = gl_PointCoord - vec2(0.5);
          float dist = length(uv);
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.1, dist) * uOpacity * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    return new THREE.Points(geometry, material);
  }

  // ─── Gravitational Lens Pass ──────────────────────────────────────────────
  const GravitationalLensShader = {
    name: "GravitationalLensShader",
    uniforms: {
      tDiffuse: { value: null },
      bhCenter: { value: new THREE.Vector2(0.5, 0.5) },
      lensRadius: { value: 0.01 },
      lensStrength: { value: 0.2 },
      innerCutoff: { value: 0.17 },
      aspect: { value: 1.0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tDiffuse;
      uniform vec2  bhCenter;
      uniform float lensRadius;
      uniform float lensStrength;
      uniform float innerCutoff;
      uniform float aspect;
      varying vec2 vUv;
      void main() {
        vec2  delta     = vUv - bhCenter;
        delta.x        *= aspect;
        float dist      = length(delta);
        float outerFade = smoothstep(lensRadius, lensRadius * 0.15, dist);
        float innerFade = smoothstep(innerCutoff, innerCutoff * 2.5, dist);
        float fade      = outerFade * innerFade;
        float deflect   = lensStrength * fade / (dist * dist + 0.0005);
        vec2 dir        = normalize(delta);
        dir.x          /= aspect;
        gl_FragColor    = texture2D(tDiffuse, vUv - dir * deflect);
      }
    `,
  };
  // ─────────────────────────────────────────────────────────────────────────

  function lerpCamera(delta) {
    if (!camera || !blackholeMesh || !bloomPass) return;

    const dt = Math.min(delta, 0.05);
    idleTime += dt;

    const tp = target.pos;
    const cp = camera.position;
    cp.x += (tp[0] - cp.x) * LERP_SPEED;
    cp.y += (tp[1] - cp.y) * LERP_SPEED;
    cp.z += (tp[2] - cp.z) * LERP_SPEED;

    const mr = blackholeMesh.rotation;
    if (activeSection === "hero") {
      const tzZ =
        target.rotZ + Math.sin(idleTime * IDLE_ROTZ.speed) * IDLE_ROTZ.range;
      mr.z += (tzZ - mr.z) * 0.03;
    } else {
      mr.z += (target.rotZ - mr.z) * LERP_SPEED;
    }
    mr.y += (target.rotY - mr.y) * LERP_SPEED;

    const pulse = PULSE[activeSection];
    const tBloom =
      target.bloom + Math.sin(idleTime * pulse.speed) * pulse.amplitude;
    bloomPass.strength += (tBloom - bloomPass.strength) * 0.04;

    if (lensPass) {
      blackholeMesh.getWorldPosition(_bhWorld);
      _projVec.copy(_bhWorld).project(camera);
      _bhScreen.set((_projVec.x + 1) * 0.5, (_projVec.y + 1) * 0.5);
      lensPass.uniforms.bhCenter.value.copy(_bhScreen);

      const camDist = cp.distanceTo(_bhWorld);
      const rawStr = 0.025 + ((camDist - 0.5) * (0.005 - 0.025)) / (22 - 0.5);
      const tStr = rawStr < 0.005 ? 0.005 : rawStr > 0.025 ? 0.025 : rawStr;
      lensPass.uniforms.lensStrength.value +=
        (tStr - lensPass.uniforms.lensStrength.value) * 0.05;

      const rawRad = 0.5 + ((camDist - 0.5) * (0.28 - 0.5)) / (22 - 0.5);
      const tRad = rawRad < 0.28 ? 0.28 : rawRad > 0.5 ? 0.5 : rawRad;
      lensPass.uniforms.lensRadius.value +=
        (tRad - lensPass.uniforms.lensRadius.value) * 0.05;
    }

    if (stars) {
      spinX += STAR_ROT.x * dt * 60;
      spinY += STAR_ROT.y * dt * 60;
      spinZ += STAR_ROT.z * dt * 60;

      const tX = spinX + -mouseNormY * MOUSE_INFLUENCE;
      const tY = spinY + -mouseNormX * MOUSE_INFLUENCE;

      stars.rotation.x += (tX - stars.rotation.x) * MOUSE_LERP;
      stars.rotation.y += (tY - stars.rotation.y) * MOUSE_LERP;
      stars.rotation.z = spinZ;
    }
  }

  let target = { ...CAMERA_KEYFRAMES.hero };

  function setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (CAMERA_KEYFRAMES[id]) {
              activeSection = id;
              target = { ...CAMERA_KEYFRAMES[id] };
            }
          }
        });
      },
      { threshold: 0.2 },
    );
    Object.keys(CAMERA_KEYFRAMES).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return observer;
  }

  onMount(() => {
    if (!browser) return;

    // ── Deteksi mobile — pakai pointer: coarse sebagai sinyal layar sentuh
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    const dpr = Math.min(
      window.devicePixelRatio,
      window.devicePixelRatio > 2 ? 1.5 : 2,
    );

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
      precision: "mediump",
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = false;
    renderer.autoClear = false;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(-0.2, 0, 20);

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    stars = createStarField();
    scene.add(stars);

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    lensPass = new ShaderPass(GravitationalLensShader);
    lensPass.uniforms.aspect.value = window.innerWidth / window.innerHeight;
    composer.addPass(lensPass);

    const bloomW = Math.round(window.innerWidth / 2);
    const bloomH = Math.round(window.innerHeight / 2);
    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(bloomW, bloomH),
      0.3,
      0.4,
      0.1,
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
    );
    dracoLoader.preload();

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      blackhole,
      (gltf) => {
        blackholeMesh = gltf.scene;
        const box = new THREE.Box3().setFromObject(blackholeMesh);
        blackholeMesh.position.sub(box.getCenter(new THREE.Vector3()));
        blackholeMesh.rotation.z = 0.06;
        blackholeMesh.rotation.y = 0.2;
        scene.add(blackholeMesh);

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(blackholeMesh);
          gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
        }

        dracoLoader.dispose();
      },
      undefined,
      (err) => console.error("Gagal load blackhole.glb:", err),
    );

    // ── Observer hanya aktif di desktop ───────────────────────────────────
    // Di mobile target tetap hero — tidak ada transisi posisi kamera
    let observer;
    if (!isMobile) {
      observer = setupIntersectionObserver();
    }
    // ─────────────────────────────────────────────────────────────────────

    // Mouse parallax juga hanya relevan di desktop (ada pointer)
    let onMouseMove;
    if (!isMobile) {
      onMouseMove = (e) => {
        mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseNormY = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.setSize(
        Math.round(window.innerWidth / 2),
        Math.round(window.innerHeight / 2),
      );
      if (lensPass)
        lensPass.uniforms.aspect.value = window.innerWidth / window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const onVisibility = () => {
      if (!document.hidden) clock.start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (document.hidden) return;
      const delta = clock.getDelta();
      mixer?.update(delta);
      lerpCamera(delta);
      composer.render();
    };
    animate();

    return () => {
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  });

  onDestroy(() => {
    if (!browser) return;
    cancelAnimationFrame(animationId);
    mixer?.stopAllAction();
    renderer?.dispose();
  });
</script>

<canvas
  bind:this={canvas}
  class="pointer-events-none fixed inset-0 z-0"
  aria-hidden="true"
  style="will-change: transform;"
></canvas>
