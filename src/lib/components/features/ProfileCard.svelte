<script>
  import avatar from "$lib/assets/avatar.jpg";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
  // onMount(() => {
  //   if (window.innerWidth >= 768) {
  //     const element = document.querySelector(".sticky-profile");
  //     const footerElement = document.querySelector("footer");
  //     const yOffset = (window.innerHeight - element.offsetHeight) / 2;

  //     // Set initial y position to 0
  //     gsap.set(element, { y: 0 });

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: element,
  //         start: "top top",
  //         end: "bottom top",
  //         scrub: 1,
  //       },
  //     });

  //     tl.to(element, {
  //       y: yOffset,
  //       ease: "power1.inOut",
  //     });

  //     tl.to(element, {
  //       y: window.innerHeight - footerElement.offsetHeight,
  //       ease: "power1.inOut",
  //       scrollTrigger: {
  //         trigger: footerElement,
  //         start: "top bottom",
  //         end: "bottom+=100% bottom",
  //         scrub: 1,
  //       },
  //     });
  //   }
  // });
</script>

<div class="card shadow-sm md:sticky sticky-profile top-6">
  <div class="justify-center w-full items-center flex">
    <div class="avatar">
      <div class="w-48 rounded-full">
        <img src={avatar} alt="Avatar" />
      </div>
    </div>
  </div>
  <div class="card-body text-center text-gray-400">
    <p>
      Software Enginer | Full-Stack Dev | Vue.js | Laravel | DevOps Enthusiast
    </p>
    <div class="card-actions justify-center">
      <a
        target="_blank"
        href="https://github.com/anonimak"
        class="btn btn-ghost btn-circle"
      >
        <Icon icon="entypo-social:github" class="text-primary" height={24} /></a
      >
      <a
        target="_blank"
        href="https://www.linkedin.com/in/jonatanteofilus5ba43a182"
        class="btn btn-ghost btn-circle"
      >
        <Icon icon="entypo-social:linkedin" class="text-primary" height={24} />
      </a>
      <a
        target="_blank"
        href="https://instagram.com/jonatan_teofilus"
        class="btn btn-ghost btn-circle"
      >
        <Icon icon="entypo-social:instagram" class="text-primary" height={24} />
      </a>
    </div>
  </div>
</div>
