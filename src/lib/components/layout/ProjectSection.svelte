<script>
  import ProjectCard from "$lib/components/features/ProjectCard.svelte";
  import { professionalProjects, sideProjects } from "$lib/data/data.js";
  import Icon from "@iconify/svelte";

  const tabs = [
    {
      id: "professional",
      label: "Professional",
      icon: "lucide:briefcase",
      data: professionalProjects,
    },
    {
      id: "side",
      label: "Side Projects",
      icon: "lucide:flask-conical",
      data: sideProjects,
    },
  ];

  let activeTab = $state("professional");
  let activeProjects = $derived(
    tabs.find((t) => t.id === activeTab)?.data ?? [],
  );
</script>

<section class="relative py-24 md:py-36 break-before-page" id="portfolio">
  <!-- Ambient dari atas — blackhole di section ini sudah zoom in, cahaya lebih intens -->
  <div
    class="pointer-events-none absolute inset-0 z-0"
    style="background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(122,167,255,0.05) 0%, transparent 70%);"
  ></div>

  <div class="container relative z-10 mx-auto max-w-screen-xl px-4">
    <!-- Header -->
    <div class="mb-16 space-y-4">
      <div class="flex items-center gap-3">
        <span
          class="h-px w-8 rounded-full bg-gradient-to-r from-primary to-secondary opacity-60"
        ></span>
        <p
          class="text-[10px] font-bold uppercase tracking-[0.5em] text-base-content/60 print:hidden"
        >
          Portfolio
        </p>
      </div>
      <h2
        class="text-5xl font-black leading-[1.05] tracking-tight text-base-content md:text-6xl"
      >
        Selected<br />
        <span class="relative inline-block">
          <span
            class="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
          >
            Projects
          </span>
          <span
            class="absolute -bottom-1 left-0 h-px w-full rounded-full bg-gradient-to-r from-primary to-secondary opacity-30"
          ></span>
        </span>
      </h2>
      <p class="max-w-sm text-sm leading-7 text-base-content/60 print:hidden">
        Real-world work across enterprise systems and personal builds.
      </p>
    </div>

    <!-- Tab switcher -->
    <div class="mb-8 flex items-center gap-2 print:hidden">
      {#each tabs as tab}
        <button
          onclick={() => (activeTab = tab.id)}
          class="group relative inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-all duration-300 {activeTab ===
          tab.id
            ? 'border-primary/25 bg-primary/8 text-primary'
            : 'border-white/6 bg-white/2 text-base-content/60 hover:border-white/12 hover:bg-white/4 hover:text-base-content/60'}"
          style={activeTab === tab.id
            ? "box-shadow: 0 0 20px rgba(122,167,255,0.1);"
            : ""}
        >
          <!-- Top line aktif -->
          {#if activeTab === tab.id}
            <span
              class="absolute top-0 left-0 right-0 h-px rounded-t-xl bg-gradient-to-r from-primary to-secondary"
            ></span>
          {/if}

          <Icon icon={tab.icon} height={14} />
          {tab.label}
          <span
            class="ml-1 rounded-md border px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 {activeTab ===
            tab.id
              ? 'border-primary/20 bg-primary/8 text-primary/60'
              : 'border-white/8 bg-white/3 text-base-content/60'}"
          >
            {tab.data.length}
          </span>
        </button>
      {/each}
    </div>

    <!-- Project list -->
    <div class="space-y-4 print:space-y-0">
      {#each activeProjects as item, index (item.title)}
        <h2 class="hidden text-primary print:block print:break-before-page">
          Portfolio
        </h2>
        <h1
          class="hidden text-3xl font-semibold text-base-content print:block mb-6"
        >
          {activeTab === "professional"
            ? "Professional Projects"
            : "Side Projects"}
        </h1>

        <div
          style="animation: slideUp 0.6s cubic-bezier(0.22,1,0.36,1) {index *
            80}ms both;"
        >
          <ProjectCard
            no={index + 1}
            title={item.title}
            link={item.link}
            company={item.company ?? item.clients}
            role={item.role}
            contribution={item.contributions}
            image={item.image}
          />
        </div>
      {/each}
    </div>

    <!-- Stat bar -->
    <div
      class="mt-10 flex items-center gap-6 border-t border-white/5 pt-6 print:hidden"
    >
      {#each [[professionalProjects.length + sideProjects.length, "total projects"], [professionalProjects.length, "professional"], [sideProjects.length, "side projects"]] as [val, label], i}
        {#if i > 0}
          <div class="h-4 w-px bg-white/8"></div>
        {/if}
        <div class="flex items-baseline gap-1.5">
          <span
            class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-black text-transparent"
          >
            {val}
          </span>
          <span
            class="text-[10px] uppercase tracking-widest text-base-content/60"
            >{label}</span
          >
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
