<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import gsap from "gsap";

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

  let sectionEl;

  onMount(() => {
    const q = gsap.utils.selector(sectionEl);

    gsap.set(q('[data-anim="exp-header"] > *'), { opacity: 0, x: 30 });
    gsap.set(q(".exp-item"), { opacity: 0, x: 24 });
    gsap.set(q('[data-anim="exp-stat"]'), { opacity: 0, y: 14 });

    let visible = false;

    const animateIn = () => {
      visible = true;
      gsap.to(q('[data-anim="exp-header"] > *'), {
        opacity: 1,
        x: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(q(".exp-item"), {
        opacity: 1,
        x: 0,
        duration: 0.65,
        stagger: 0.18,
        ease: "power2.out",
        overwrite: true,
      });
      gsap.to(q('[data-anim="exp-stat"]'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const animateOut = () => {
      visible = false;
      gsap.to(q('[data-anim="exp-header"] > *'), {
        opacity: 0,
        x: 30,
        duration: 0.4,
        stagger: { amount: 0.2, from: "end" },
        ease: "power2.in",
        overwrite: true,
      });
      gsap.to(q(".exp-item"), {
        opacity: 0,
        x: 24,
        duration: 0.4,
        stagger: { amount: 0.4, from: "end" },
        ease: "power2.in",
        overwrite: true,
      });
      gsap.to(q('[data-anim="exp-stat"]'), {
        opacity: 0,
        y: 14,
        duration: 0.3,
        ease: "power2.in",
        overwrite: true,
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !visible) animateIn();
          else if (!entry.isIntersecting && visible) animateOut();
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  });
</script>

<section class="relative py-24 md:py-36" id="experience" bind:this={sectionEl}>
  <!-- Ambient cahaya -->
  <div
    class="pointer-events-none absolute inset-0 z-0"
    style="background: radial-gradient(ellipse 70% 50% at 50% 110%, rgba(122,167,255,0.06) 0%, transparent 70%);"
  ></div>

  <div class="container relative z-10 mx-auto max-w-screen-xl px-4">
    <!-- Dorong semua konten ke kanan dengan margin-left 50% di desktop -->
    <div class="md:ml-[50%]">
      <!-- Header -->
      <div class="mb-20 space-y-4" data-anim="exp-header">
        <div class="flex items-center gap-3">
          <span
            class="h-px w-8 rounded-full bg-gradient-to-r from-primary to-secondary opacity-60"
          ></span>
          <p
            class="text-[10px] font-bold uppercase tracking-[0.5em] text-base-content/60"
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
        <p class="max-w-sm text-sm leading-7 text-base-content/60">
          A timeline of roles, projects, and learning milestones.
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Spine -->
        <div
          class="absolute left-4 top-0 bottom-0 w-px"
          style="background: linear-gradient(to bottom, transparent, rgba(122,167,255,0.2) 10%, rgba(100,231,213,0.2) 90%, transparent);"
        ></div>

        <div class="space-y-0">
          {#each experiences as item, i}
            <div class="exp-item relative flex gap-6 pb-12">
              <!-- Node -->
              <div class="relative z-10 flex-shrink-0">
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
              <div class="flex-1 pt-0.5">
                <p
                  class="mb-2 font-mono text-[10px] tracking-widest text-base-content/60"
                >
                  {item.period}
                </p>

                <!-- Card -->
                <div
                  class="group relative overflow-hidden rounded-2xl border border-white/5 bg-black/30 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5"
                  style="box-shadow: 0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03);"
                >
                  <div
                    class="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-primary to-secondary transition-transform duration-500 group-hover:scale-x-100"
                  ></div>
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
                    <p class="text-xs leading-6 text-base-content/60">
                      {item.description}
                    </p>
                    <div class="flex flex-wrap gap-1.5 pt-1">
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
      <div
        class="mt-4 flex items-center gap-6 border-t border-white/5 pt-6"
        data-anim="exp-stat"
      >
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
              class="text-[10px] uppercase tracking-widest text-base-content/60"
              >{label}</span
            >
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
