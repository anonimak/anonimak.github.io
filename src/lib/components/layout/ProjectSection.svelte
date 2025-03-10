<script>
  import ProjectCard from "$lib/components/features/ProjectCard.svelte";
  import { professionalProjects, sideProjects } from "$lib/data/data.js";
  import Icon from "@iconify/svelte";
</script>

<section class="py-10 md:py-16 break-before-page" id="portfolio">
  <div class="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
    <h2 class="text-primary print:hidden">Porfolio</h2>
    <h1 class="text-5xl font-light mb-14 print:hidden">
      Professional Projects
    </h1>
    <div class="flex flex-col lg:flex-row justify-between">
      <div class="space-y-24 print:space-y-0">
        {#each professionalProjects as item, index}
          <h2 class="text-primary hidden print:block print:break-before-page">
            Porfolio
          </h2>
          <h1
            class={index === 0
              ? "text-5xl font-light mb-14 hidden print:block"
              : "text-3xl font-light mb-14 hidden print:block"}
          >
            Professional Projects
          </h1>
          <ProjectCard
            no={index + 1}
            title={item.title}
            link={item.link}
            company={item.company ?? item.clients}
            role={item.role}
            contribution={item.contributions}
            image={item.image}
          />
        {/each}
      </div>
    </div>
    <h1 class="text-5xl font-light my-14 print:hidden">Side Projects</h1>
    <div class="flex flex-col lg:flex-row justify-between">
      <div class="space-y-24 print:space-y-0">
        {#each sideProjects as item, index}
          <h2 class="text-primary hidden print:block print:break-before-page">
            Porfolio
          </h2>
          <h1
            class={index === 0
              ? "text-5xl font-light mb-14 hidden print:block"
              : "text-3xl font-light mb-14 hidden print:block"}
          >
            Side Projects
          </h1>
          <ProjectCard
            no={index + 1}
            title={item.title}
            link={item.link}
            company={item.clients}
            role={item.role}
            contribution={item.contributions}
            image={item.image}
          />
        {/each}
      </div>
    </div>
  </div>
</section>
