<script>
  import { skills } from "$lib/data/data.js";
  import Icon from "@iconify/svelte";
</script>

<div id="hero" class="hero pb-16">
  <div class="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
    <div>
      <h2 class="text-primary">Hello</h2>
      <h1 class="text-5xl font-light text-gray-200">
        I'm Jonatan, Software Engineer
      </h1>
      <p class="py-6 text-gray-400">
        Experienced Software Engineer. Skilled in JavaScript, PHP, HTML, CSS,
        and various frameworks. Always eager to learn and adapt to new
        challenges in the ever-evolving tech landscape. Let's connect and
        explore opportunities to collaborate on exciting projects!
      </p>
      <!-- <button class="btn btn-primary">Hire Me</button> -->

      <div class="py-10">
        <h2 class="text-primary mb-4">Skills</h2>
        <div class="flex flex-wrap gap-4">
          {#each skills as item, index}
            <div class="tooltip" data-tip={item.name}>
              <div class="badge badge-soft badge-primary py-6">
                <Icon
                  icon={item.icon}
                  class="text-gray-400 print:hidden"
                  height={32}
                />
                <span class="text-gray-400 text-lg hidden print:inline"
                  >{item.name}</span
                >
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
