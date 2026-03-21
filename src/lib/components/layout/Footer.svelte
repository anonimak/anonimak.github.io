<script>
  import Icon from "@iconify/svelte";

  const socials = [
    {
      href: "https://github.com/anonimak",
      icon: "entypo-social:github",
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/jonatanteofilus5ba43a182",
      icon: "entypo-social:linkedin",
      label: "LinkedIn",
    },
    {
      href: "https://instagram.com/jonatan_teofilus",
      icon: "entypo-social:instagram",
      label: "Instagram",
    },
  ];
</script>

<footer class="relative mt-16 overflow-hidden" id="contact">
  <!-- Blackhole di section ini paling dekat ke inti — cahaya dari atas -->
  <div
    class="pointer-events-none absolute inset-0 z-0"
    style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(122,167,255,0.06) 0%, transparent 70%);"
  ></div>

  <!-- Top separator line -->
  <div
    class="absolute top-0 left-0 right-0 h-px"
    style="background: linear-gradient(90deg, transparent, rgba(122,167,255,0.2), rgba(100,231,213,0.2), transparent);"
  ></div>

  <div class="relative z-10 container mx-auto max-w-screen-xl px-4 py-20">
    <!-- CTA block -->
    <div
      class="relative overflow-hidden rounded-2xl border border-white/5 bg-white/2 p-8 backdrop-blur-md md:p-14"
      style="box-shadow: 0 0 80px rgba(122,167,255,0.04), inset 0 1px 0 rgba(255,255,255,0.03);"
    >
      <!-- Corner brackets -->
      <div
        class="absolute top-4 left-4 h-6 w-6 border-t border-l border-primary/20"
      ></div>
      <div
        class="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-primary/20"
      ></div>

      <!-- Inner glow -->
      <div
        class="pointer-events-none absolute inset-0 rounded-2xl"
        style="background: radial-gradient(ellipse at 50% 0%, rgba(122,167,255,0.05), transparent 60%);"
      ></div>

      <div class="relative z-10 flex flex-col items-center gap-8 text-center">
        <!-- Eyebrow -->
        <div class="flex items-center gap-3">
          <span
            class="h-px w-8 rounded-full bg-gradient-to-r from-transparent to-primary opacity-40"
          ></span>
          <p
            class="text-[10px] font-bold uppercase tracking-[0.5em] text-base-content/60"
          >
            Get In Touch
          </p>
          <span
            class="h-px w-8 rounded-full bg-gradient-to-l from-transparent to-secondary opacity-40"
          ></span>
        </div>

        <!-- Headline -->
        <div class="space-y-4">
          <h2
            class="text-4xl font-black tracking-tight text-base-content md:text-6xl"
          >
            Let's build<br />
            <span
              class="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
            >
              something great.
            </span>
          </h2>
          <p
            class="mx-auto max-w-md text-sm leading-7 text-base-content/60 md:text-base"
          >
            Open to new opportunities, collaborations, and interesting
            conversations. Whether it's a project proposal or just a hello —
            reach out.
          </p>
        </div>

        <!-- Social links -->
        <div class="flex items-center gap-3">
          {#each socials as s}
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              class="group flex items-center gap-2.5 rounded-xl border border-white/6 bg-white/2 px-4 py-2.5 text-sm font-semibold text-base-content/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-primary/8 hover:text-primary"
              style="transition: box-shadow 0.3s;"
              onmouseenter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(122,167,255,0.15)")}
              onmouseleave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <Icon icon={s.icon} height={17} />
              <span class="hidden sm:inline">{s.label}</span>
            </a>
          {/each}
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row"
    >
      <!-- Logo -->
      <span class="text-xl font-black tracking-tight text-base-content/80">
        JT<span
          class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >.</span
        >
      </span>

      <!-- Copyright -->
      <p class="text-[11px] tracking-wider text-base-content/50">
        © {new Date().getFullYear()} Jonatan Teofilus · All rights reserved
      </p>

      <!-- Back to top -->
      <a
        href="#hero"
        class="group flex items-center gap-2 rounded-xl border border-white/6 bg-white/2 px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-base-content/60 transition-all duration-300 hover:border-primary/20 hover:text-primary/60 hover:-translate-y-0.5"
      >
        <Icon
          icon="lucide:arrow-up"
          height={11}
          class="transition-transform duration-300 group-hover:-translate-y-0.5"
        />
        Back to top
      </a>
    </div>
  </div>
</footer>
