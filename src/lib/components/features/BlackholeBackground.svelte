<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import * as THREE from "three";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
  import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
  import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
  import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
  import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
  import blackhole from "$lib/assets/blackhole.glb";

  let canvas;
  let renderer, scene, camera, animationId, composer, bloomPass;
  let blackholeMesh, mixer;
  const clock = new THREE.Clock();

  const CAMERA_KEYFRAMES = {
    // hero: { pos: [-12, -2, 20], rotZ: 0.15, rotY: 0, bloom: 0.5 },
    hero: { pos: [-0.2, 0, 20], rotZ: 0.2, rotY: 0.1, bloom: 0.6 },
    skills: { pos: [-0.2, 0, 7], rotZ: 0.4, rotY: 0.1, bloom: 0.3 },
    experience: { pos: [1.6, 0.5, 0.8], rotZ: -0.1, rotY: 1, bloom: 0.4 },
    portfolio: { pos: [-3, 0.2, 3], rotZ: 0.2, rotY: -0.9, bloom: 0.3 },
    contact: { pos: [0, 0.3, 0.78], rotZ: 0.2, rotY: 0.0, bloom: 0.2 },
  };

  let target = { ...CAMERA_KEYFRAMES.hero };
  const LERP_SPEED = 0.1;

  function lerpCamera() {
    if (!camera || !blackholeMesh || !bloomPass) return;

    camera.position.x += (target.pos[0] - camera.position.x) * LERP_SPEED;
    camera.position.y += (target.pos[1] - camera.position.y) * LERP_SPEED;
    camera.position.z += (target.pos[2] - camera.position.z) * LERP_SPEED;

    blackholeMesh.rotation.z +=
      (target.rotZ - blackholeMesh.rotation.z) * LERP_SPEED;
    blackholeMesh.rotation.y +=
      (target.rotY - blackholeMesh.rotation.y) * LERP_SPEED;

    bloomPass.strength += (target.bloom - bloomPass.strength) * LERP_SPEED;
  }

  function setupIntersectionObserver() {
    const sectionIds = Object.keys(CAMERA_KEYFRAMES);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (CAMERA_KEYFRAMES[id]) {
              target = { ...CAMERA_KEYFRAMES[id] };
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return observer;
  }

  onMount(() => {
    if (!browser) return;

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(-0.2, 0, 30);

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Post processing
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3,
      0.4,
      0.1,
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    const loader = new GLTFLoader();
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
      },
      undefined,
      (err) => console.error("Gagal load blackhole.glb:", err),
    );

    const observer = setupIntersectionObserver();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer?.update(delta);
      lerpCamera(); // ← gerakkan kamera tiap frame
      composer.render();
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
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
></canvas>
