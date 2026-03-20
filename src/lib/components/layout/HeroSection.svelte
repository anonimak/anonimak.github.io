<script>
  import Icon from "@iconify/svelte";
  import ProfileCard from "../features/ProfileCard.svelte";
</script>

<section
  class="hero-section relative overflow-hidden flex items-center"
  id="hero"
>
  <!-- Hanya satu gradient tipis di bawah agar konten terbaca di atas blackhole -->
  <div
    class="pointer-events-none absolute bottom-0 left-0 right-0 h-2/3 z-0"
    style="background: linear-gradient(to top, rgba(8,14,26,0.85) 0%, rgba(8,14,26,0.4) 60%, transparent 100%);"
  ></div>

  <!-- Bottom fade ke section berikutnya -->
  <div
    class="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-0"
    style="background: linear-gradient(to bottom, transparent, #080e1a);"
  ></div>

  <div class="container relative z-10 mx-auto max-w-screen-xl px-4 py-8">
    <div
      class="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_360px] lg:gap-12"
    >
      <!-- Left: Main content -->
      <div class="hero-left space-y-8">
        <!-- Eyebrow -->
        <div class="hero-item flex items-center gap-3">
          <div class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"
            ></span>
            <span
              class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"
              style="box-shadow: 0 0 8px 2px rgba(52,211,153,0.6);"
            ></span>
          </div>
          <p
            class="text-xs font-bold uppercase tracking-[0.45em] text-base-content/40"
          >
            Available for work · Jakarta, ID
          </p>
        </div>

        <!-- Headline -->
        <div class="hero-item space-y-2">
          <h1
            class="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.95] tracking-tight text-base-content"
          >
            Building<br />
            <span class="relative inline-block">
              <span
                class="text-transparent bg-clip-text"
                style="background: linear-gradient(100deg, #7aa7ff 0%, #64e7d5 60%, #7aa7ff 100%); background-size: 200%; animation: shimmer 4s ease-in-out infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
                >products</span
              >
              <span
                class="absolute -bottom-1 left-0 h-[2px] w-full rounded-full opacity-30"
                style="background: linear-gradient(90deg, #7aa7ff, #64e7d5);"
              ></span>
            </span><br />
            that ship.
          </h1>
        </div>

        <!-- Description -->
        <p
          class="hero-item max-w-lg text-base leading-8 text-base-content/50 md:text-lg"
        >
          Full-stack engineer crafting clean systems and modern web experiences
          — from architecture to deployment.
        </p>

        <!-- CTA -->
        <div class="hero-item flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#projects"
            class="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(122,167,255,0.3)] hover:-translate-y-0.5"
            style="background: linear-gradient(110deg, #7aa7ff, #64e7d5);"
          >
            <span>View Projects</span>
            <Icon
              icon="lucide:arrow-right"
              height={15}
              class="transition-transform duration-300 group-hover:translate-x-1"
            />
            <span
              class="absolute inset-0 translate-x-[-100%] skew-x-[-20deg] bg-white/20 transition-transform duration-500 group-hover:translate-x-[150%]"
            ></span>
          </a>

          <a
            href="#contact"
            class="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/3 px-6 py-3 text-sm font-semibold text-base-content/60 backdrop-blur-sm transition-all duration-300 hover:border-white/18 hover:bg-white/6 hover:text-base-content hover:-translate-y-0.5"
          >
            <Icon icon="lucide:mail" height={15} />
            <span>Get in touch</span>
          </a>
        </div>

        <!-- Stats -->
        <div class="hero-item flex items-center gap-6 pt-4">
          {#each [["8+", "Years exp."], ["10+", "Projects"], ["∞", "Coffee cups"]] as [val, label], i}
            {#if i > 0}
              <div class="h-8 w-px bg-white/8"></div>
            {/if}
            <div class="flex flex-col">
              <span class="text-2xl font-black text-base-content">{val}</span>
              <span
                class="text-[10px] uppercase tracking-widest text-base-content/30"
                >{label}</span
              >
            </div>
          {/each}
        </div>
      </div>

      <!-- Right: Profile card -->
      <ProfileCard />
    </div>
  </div>
</section>

<style>
  .hero-item {
    opacity: 0;
    animation: slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .hero-item:nth-child(1) {
    animation-delay: 0.1s;
  }
  .hero-item:nth-child(2) {
    animation-delay: 0.2s;
  }
  .hero-item:nth-child(3) {
    animation-delay: 0.32s;
  }
  .hero-item:nth-child(4) {
    animation-delay: 0.44s;
  }
  .hero-item:nth-child(5) {
    animation-delay: 0.56s;
  }

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

  @keyframes shimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
</style>
