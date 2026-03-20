<script>
  import avatar from "$lib/assets/avatar.jpg";
  import Icon from "@iconify/svelte";
</script>

<div
  class="profile-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl shadow-[0_32px_80px_rgba(2,6,23,0.6)]"
>
  <!-- Dot grid background -->
  <div
    class="pointer-events-none absolute inset-0 z-0 opacity-40"
    style="background-image: radial-gradient(circle, rgba(122,167,255,0.1) 1px, transparent 1px); background-size: 24px 24px;"
  ></div>

  <!-- Top gradient accent -->
  <div
    class="absolute top-0 left-0 right-0 h-px"
    style="background: linear-gradient(90deg, transparent, #7aa7ff, #64e7d5, transparent);"
  ></div>

  <!-- Corner brackets (top-left, bottom-right) -->
  <div
    class="absolute top-3 left-3 h-5 w-5 border-t border-l border-primary/40"
  ></div>
  <div
    class="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-primary/40"
  ></div>

  <div class="relative z-10 p-6 md:p-8 flex flex-col gap-7">
    <!-- Avatar with targeting ring -->
    <div class="flex flex-col items-center gap-4">
      <div class="relative">
        <!-- Outer rotating ring -->
        <div
          class="avatar-ring absolute -inset-3 rounded-full border border-dashed border-primary/20"
        ></div>
        <!-- Static glow ring -->
        <div
          class="absolute -inset-1.5 rounded-full"
          style="background: conic-gradient(from 0deg, transparent 60%, rgba(122,167,255,0.3) 80%, rgba(100,231,213,0.3) 90%, transparent 100%);"
        ></div>

        <!-- Avatar -->
        <div
          class="relative h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-full border border-white/15"
        >
          <img
            src={avatar}
            alt="Jonatan Teofilus"
            class="h-full w-full object-cover"
          />
          <!-- Scan line sweep -->
          <div class="scan-line absolute inset-0"></div>
        </div>

        <!-- Status dot -->
        <div
          class="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-black/60 bg-emerald-400"
          style="box-shadow: 0 0 8px 2px rgba(52,211,153,0.5);"
        ></div>
      </div>

      <!-- Identity -->
      <div class="text-center space-y-1.5">
        <div class="flex items-center justify-center gap-2">
          <span class="h-px w-5 bg-primary/40"></span>
          <p
            class="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/70"
          >
            Full-Stack Developer
          </p>
          <span class="h-px w-5 bg-primary/40"></span>
        </div>
        <h2
          class="text-2xl font-black tracking-tight text-base-content md:text-3xl"
        >
          Jonatan Teofilus
        </h2>
        <p class="text-xs leading-6 text-base-content/50 max-w-[220px] mx-auto">
          Clean systems · Product delivery · Modern web
        </p>
      </div>
    </div>

    <!-- Divider with label -->
    <div class="flex items-center gap-3">
      <div class="h-px flex-1 bg-white/8"></div>
      <span class="text-[9px] uppercase tracking-[0.35em] text-base-content/25"
        >Profile</span
      >
      <div class="h-px flex-1 bg-white/8"></div>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-2 gap-2">
      <div
        class="group relative overflow-hidden rounded-xl border border-white/8 bg-white/4 p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/7"
      >
        <div
          class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-xl"
          style="background: radial-gradient(ellipse at 50% 100%, rgba(122,167,255,0.1), transparent 70%);"
        ></div>
        <div class="relative">
          <p
            class="text-[9px] font-bold uppercase tracking-[0.3em] text-base-content/35"
          >
            Stack
          </p>
          <p class="mt-2 text-sm font-semibold text-base-content">
            JS · PHP · Vue
          </p>
        </div>
      </div>
      <div
        class="group relative overflow-hidden rounded-xl border border-white/8 bg-white/4 p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/7"
      >
        <div
          class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-xl"
          style="background: radial-gradient(ellipse at 50% 100%, rgba(100,231,213,0.08), transparent 70%);"
        ></div>
        <div class="relative">
          <p
            class="text-[9px] font-bold uppercase tracking-[0.3em] text-base-content/35"
          >
            Focus
          </p>
          <p class="mt-2 text-sm font-semibold text-base-content">
            Web · DevOps
          </p>
        </div>
      </div>
    </div>

    <!-- Social links -->
    <div class="flex items-center justify-center gap-2">
      {#each [{ href: "https://github.com/anonimak", icon: "entypo-social:github", label: "GitHub" }, { href: "https://www.linkedin.com/in/jonatanteofilus5ba43a182", icon: "entypo-social:linkedin", label: "LinkedIn" }, { href: "https://instagram.com/jonatan_teofilus", icon: "entypo-social:instagram", label: "Instagram" }] as link}
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          class="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-base-content/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:shadow-[0_4px_20px_rgba(122,167,255,0.2)]"
        >
          <Icon icon={link.icon} height={18} />
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .avatar-ring {
    animation: spin 12s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .scan-line {
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 45%,
      rgba(122, 167, 255, 0.12) 50%,
      transparent 55%,
      transparent 100%
    );
    animation: scan 3.5s ease-in-out infinite;
  }

  @keyframes scan {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  .profile-card {
    animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
