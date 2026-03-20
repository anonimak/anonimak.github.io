<script>
  import Icon from "@iconify/svelte";

  const experiences = [
    {
      period: "2025 — Present",
      company: "Marugame Udon Indonesia",
      type: "work",
      tags: ["Laravel 12", "Livewire", "Power BI", "DevOps"],
      description:
        "Analyzed business processes and translated them into scalable web applications utilizing the TALL stack. Managed the end-to-end deployment lifecycle and code versioning via GitLab. Architected seamless integrations across multiple internal systems and developed comprehensive data analytics solutions—including sales tracking and reporting dashboards—using both custom in-house tools and Microsoft Power BI.",
    },
    {
      period: "2020 — 2025",
      company: "Sinarmas Hana Finance",
      type: "work",
      tags: ["Vue", "PHP", "DevOps"],
      description:
        "Developed and maintained scalable software systems, integrated new technologies, led HRIS, e-Approval, and e-Auction projects, collaborated with stakeholders, participated in agile processes, implemented version control, optimized databases, and coordinated deployments.",
    },
    {
      period: "2017 — 2020",
      company: "PT Sysware Indonesia",
      type: "work",
      tags: ["PHP", "JavaScript", "Swift"],
      description:
        "Specialized in backend development with PHP frameworks, frontend with JavaScript, and mobile development with Swift, delivering custom software solutions tailored to business needs.",
    },
    {
      period: "2013 — 2016",
      company: "State Polytechnic of Lampung",
      type: "edu",
      tags: ["D3", "Information Management"],
      description:
        "Associate's Degree in Information Management, focusing on programming, database management, system analysis, and IT project management.",
    },
  ];
</script>

<section class="relative py-24 md:py-36" id="experience">
  <!-- Ambient cahaya dari bawah — seperti accretion disk menyinari section ini -->
  <div
    class="pointer-events-none absolute inset-0 z-0"
    style="background: radial-gradient(ellipse 70% 50% at 50% 110%, rgba(122,167,255,0.06) 0%, transparent 70%);"
  ></div>

  <div class="container relative z-10 mx-auto max-w-screen-xl px-4">
    <!-- Header -->
    <div class="mb-20 space-y-4">
      <div class="flex items-center gap-3">
        <span
          class="h-px w-8 rounded-full bg-gradient-to-r from-primary to-secondary opacity-60"
        ></span>
        <p
          class="text-[10px] font-bold uppercase tracking-[0.5em] text-base-content/30"
        >
          Career Path
        </p>
      </div>
      <h2
        class="text-5xl font-black leading-[1.05] tracking-tight text-base-content md:text-6xl"
      >
        Experience<br />
        <span class="relative inline-block">
          <span
            class="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
          >
            &amp; Education
          </span>
          <span
            class="absolute -bottom-1 left-0 h-px w-full rounded-full bg-gradient-to-r from-primary to-secondary opacity-30"
          ></span>
        </span>
      </h2>
      <p class="max-w-sm text-sm leading-7 text-base-content/30">
        A timeline of roles, projects, and learning milestones.
      </p>
    </div>

    <!-- Timeline -->
    <div class="relative">
      <!-- Spine -->
      <div
        class="absolute left-4 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2"
        style="background: linear-gradient(to bottom, transparent, rgba(122,167,255,0.2) 10%, rgba(100,231,213,0.2) 90%, transparent);"
      ></div>

      <div class="space-y-0">
        {#each experiences as item, i}
          <div
            class="relative flex gap-6 pb-12 md:gap-0"
            style="animation: slideUp 0.7s cubic-bezier(0.22,1,0.36,1) {i *
              0.12}s both;"
          >
            <!-- Left: period (desktop even) -->
            <div
              class="hidden md:flex md:w-1/2 md:pr-12 md:justify-end md:items-start md:pt-1.5"
            >
              {#if i % 2 === 0}
                <p
                  class="font-mono text-[10px] tracking-widest text-base-content/25"
                >
                  {item.period}
                </p>
              {/if}
            </div>

            <!-- Node -->
            <div
              class="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0"
            >
              <div class="relative flex h-8 w-8 items-center justify-center">
                {#if i === 0}
                  <span
                    class="absolute h-8 w-8 animate-ping rounded-full bg-primary opacity-10"
                  ></span>
                {/if}
                <div
                  class="absolute h-8 w-8 rounded-full bg-primary opacity-10 blur-sm"
                ></div>
                <div
                  class="relative flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-base-100/70 backdrop-blur-sm"
                  style="box-shadow: 0 0 16px rgba(122,167,255,0.12);"
                >
                  <Icon
                    icon={item.type === "edu"
                      ? "lucide:graduation-cap"
                      : "lucide:briefcase"}
                    height={13}
                    class="text-primary/70"
                  />
                </div>
              </div>
            </div>

            <!-- Content -->
            <div
              class="flex-1 pl-4 md:pl-0 md:w-1/2 {i % 2 === 0
                ? 'md:pl-12'
                : 'md:pr-12 md:flex md:flex-col md:items-end md:order-first'}"
            >
              <p
                class="mb-2 font-mono text-[10px] tracking-widest text-base-content/25 md:hidden"
              >
                {item.period}
              </p>
              {#if i % 2 !== 0}
                <p
                  class="hidden md:block mb-2 font-mono text-[10px] tracking-widest text-base-content/25"
                >
                  {item.period}
                </p>
              {/if}

              <!-- Card -->
              <div
                class="group relative overflow-hidden rounded-2xl border border-white/5 bg-base-200/40 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 md:max-w-md"
                style="box-shadow: 0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03);"
              >
                <!-- Top gradient line on hover -->
                <div
                  class="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-primary to-secondary transition-transform duration-500 group-hover:scale-x-100"
                ></div>

                <!-- Inner glow on hover -->
                <div
                  class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style="background: radial-gradient(ellipse at 50% -10%, rgba(122,167,255,0.07), transparent 65%);"
                ></div>

                <div class="relative z-10 space-y-3">
                  <h3
                    class="text-sm font-black tracking-tight text-base-content/90 leading-tight"
                  >
                    {item.company}
                  </h3>
                  <p class="text-xs leading-6 text-base-content/35">
                    {item.description}
                  </p>
                  <div
                    class="flex flex-wrap gap-1.5 pt-1 {i % 2 !== 0
                      ? 'md:justify-end'
                      : ''}"
                  >
                    {#each item.tags as tag}
                      <span
                        class="inline-flex items-center rounded-md border border-primary/10 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary/50 transition-all duration-300 group-hover:border-primary/20 group-hover:text-primary/70"
                      >
                        {tag}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Stat bar -->
    <div class="mt-4 flex items-center gap-6 border-t border-white/5 pt-6">
      {#each [["8+", "years total"], ["2", "companies"], ["1", "degree"]] as [val, label], i}
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
            class="text-[10px] uppercase tracking-widest text-base-content/25"
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
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
