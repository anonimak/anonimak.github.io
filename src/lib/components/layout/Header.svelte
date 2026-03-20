<header class="sticky top-0 z-50 px-4 pt-4 md:px-8">
  <nav
    class="relative mx-auto flex max-w-screen-xl items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/50 px-5 py-3 shadow-[0_8px_40px_rgba(2,6,23,0.5)] backdrop-blur-xl"
  >
    <!-- Top accent line -->
    <div
      class="absolute top-0 left-0 right-0 h-px"
      style="background: linear-gradient(90deg, transparent, #7aa7ff60, #64e7d560, transparent);"
    ></div>

    <!-- Corner bracket left -->
    <div
      class="absolute top-2 left-2 h-3 w-3 border-t border-l border-primary/30"
    ></div>
    <div
      class="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-primary/30"
    ></div>

    <!-- Logo -->
    <a
      href="/"
      class="group relative flex items-center gap-2 text-2xl font-black tracking-tight text-base-content transition-all duration-300 hover:text-primary"
    >
      <span class="relative">
        JT
        <span
          class="text-transparent bg-clip-text"
          style="background: linear-gradient(90deg, #7aa7ff, #64e7d5);  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
          >.</span
        >
      </span>
      <!-- Underline sweep -->
      <span
        class="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
        style="background: linear-gradient(90deg, #7aa7ff, #64e7d5);"
      >
      </span>
    </a>

    <!-- Nav links (desktop) -->
    <div class="hidden items-center gap-1 md:flex">
      {#each [{ href: "#hero", label: "Home" }, { href: "#skills", label: "Skills" }, { href: "#experience", label: "Experience" }, { href: "#portfolio", label: "Projects" }, { href: "#contact", label: "Contact" }] as link}
        <a
          href={link.href}
          class="rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45 transition-all duration-200 hover:bg-white/6 hover:text-base-content/80"
        >
          {link.label}
        </a>
      {/each}
    </div>

    <!-- Right badge -->
    <div class="flex items-center gap-3">
      <div
        class="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-3 py-1.5"
      >
        <span class="relative flex h-1.5 w-1.5">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"
          ></span>
          <span
            class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"
          ></span>
        </span>
        <span
          class="text-[10px] font-bold uppercase tracking-[0.35em] text-base-content/40"
          >Portfolio</span
        >
      </div>
    </div>
  </nav>
</header>
