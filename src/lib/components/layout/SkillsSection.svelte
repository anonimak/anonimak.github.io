<script>
  import Icon from "@iconify/svelte";
  import { skills } from "$lib/data/data.js";
</script>

<section class="relative py-24 md:py-36" id="skills">
  <!-- Ambient dari bawah — blackhole section ini sudah mendekat ke orbit ring -->
  <div
    class="pointer-events-none absolute inset-0 z-0"
    style="background: radial-gradient(ellipse 70% 50% at 50% 100%, rgba(100,231,213,0.05) 0%, transparent 70%);"
  ></div>

  <div class="container relative z-10 mx-auto max-w-screen-xl px-4">
    <!-- Header -->
    <div
      class="mb-16 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-end"
    >
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <span
            class="h-px w-8 rounded-full bg-gradient-to-r from-primary to-secondary opacity-60"
          ></span>
          <p
            class="text-[10px] font-bold uppercase tracking-[0.5em] text-base-content/60"
          >
            Skills & Tools
          </p>
        </div>
        <h2
          class="text-5xl font-black leading-[1.05] tracking-tight text-base-content md:text-6xl"
        >
          A practical<br />
          <span class="relative inline-block">
            <span
              class="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
            >
              toolkit
            </span>
            <span
              class="absolute -bottom-1 left-0 h-px w-full rounded-full bg-gradient-to-r from-primary to-secondary opacity-30"
            ></span>
          </span>
          &nbsp;for modern work.
        </h2>
      </div>
      <p class="max-w-xs text-sm leading-7 text-base-content/30 md:text-right">
        Frontend to backend, design to delivery — covering the full product
        lifecycle.
      </p>
    </div>

    <!-- Skills grid -->
    <div class="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3 lg:grid-cols-8">
      {#each skills as item, i}
        <div
          class="skill-card group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/2 p-4 backdrop-blur-sm cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-primary/5 sm:p-5"
          style="animation-delay: {i * 35}ms"
          title={item.name}
        >
          <!-- Inner glow on hover -->
          <div
            class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style="background: radial-gradient(ellipse at 50% 100%, rgba(122,167,255,0.1), transparent 70%);"
          ></div>

          <!-- Corner dot -->
          <div
            class="absolute right-2 top-2 h-1 w-1 rounded-full bg-primary/0 transition-all duration-300 group-hover:bg-primary/50 group-hover:shadow-[0_0_6px_2px_rgba(122,167,255,0.4)]"
          ></div>

          <Icon
            icon={item.icon}
            class="relative z-10 size-7 text-base-content/60 transition-all duration-300 group-hover:text-primary/80 group-hover:scale-110 print:hidden sm:size-9"
          />
          <span
            class="relative z-10 text-center text-[10px] font-medium leading-tight text-base-content/60 transition-colors duration-300 group-hover:text-base-content/60 sm:text-xs"
          >
            {item.name}
          </span>
          <span class="hidden print:inline">{item.name}</span>
        </div>
      {/each}
    </div>

    <!-- Stat bar -->
    <div class="mt-10 flex items-center gap-6 border-t border-white/5 pt-6">
      <div class="flex items-baseline gap-1.5">
        <span
          class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-black text-transparent"
        >
          {skills.length}
        </span>
        <span class="text-[10px] uppercase tracking-widest text-base-content/60"
          >tools</span
        >
      </div>
      <div class="h-4 w-px bg-white/8"></div>
      <p class="text-xs leading-relaxed text-base-content/60">
        Across frontend, backend, infrastructure & design tooling.
      </p>
      <div class="ml-auto hidden items-center gap-2 sm:flex">
        <span
          class="inline-block h-2 w-2 rounded-full bg-emerald-400/60 shadow-[0_0_6px_2px_rgba(52,211,153,0.35)]"
        ></span>
        <span class="text-xs text-base-content/60">Actively used</span>
      </div>
    </div>
  </div>
</section>

<style>
  .skill-card {
    animation: fadeSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
