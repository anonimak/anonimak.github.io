<script>
  import Icon from "@iconify/svelte";

  let { title, no, link, company, role, contribution, image } = $props();

  // ✅ $derived agar reaktif
  let href = $derived(Array.isArray(link) ? link[0].url : link);
  let displayUrl = $derived(href?.replace(/^https?:\/\//, "") ?? "");
  let companyDisplay = $derived(
    Array.isArray(company) ? company.join(", ") : company,
  );
</script>

<article
  class="project-card group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/6 hover:shadow-[0_16px_60px_rgba(2,6,23,0.5)]"
  style="animation: slideUp 0.6s cubic-bezier(0.22,1,0.36,1) both;"
>
  <!-- Top accent line sweep on hover -->
  <div
    class="absolute top-0 left-0 right-0 h-px scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
    style="background: linear-gradient(90deg, #7aa7ff, #64e7d5);"
  ></div>

  <!-- Corner brackets -->
  <div
    class="absolute top-3 left-3 h-5 w-5 border-t border-l border-primary/25 transition-colors duration-300 group-hover:border-primary/50"
  ></div>
  <div
    class="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-primary/25 transition-colors duration-300 group-hover:border-primary/50"
  ></div>

  <!-- Glow blob -->
  <div
    class="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
    style="background: radial-gradient(ellipse at 50% 0%, rgba(122,167,255,0.07), transparent 65%);"
  ></div>

  <div
    class="relative z-10 grid grid-cols-1 gap-0 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_400px]"
  >
    <!-- Left: info -->
    <div class="flex flex-col gap-5 p-6 md:p-8">
      <!-- Number + role row -->
      <div class="flex items-start justify-between">
        <span
          class="font-mono text-5xl font-black leading-none tracking-tight text-base-content/10 select-none"
        >
          {no < 10 ? "0" + no : no}
        </span>
        <span
          class="inline-flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60"
        >
          <Icon icon="lucide:briefcase" height={10} />
          {role}
        </span>
      </div>

      <!-- Title + company -->
      <div class="space-y-1">
        <h3
          class="text-xl font-black tracking-tight text-base-content md:text-2xl leading-tight"
        >
          {title}
        </h3>
        <p class="flex items-center gap-1.5 text-xs text-base-content/40">
          <Icon icon="lucide:building-2" height={11} />
          {companyDisplay}
        </p>
      </div>

      <!-- Divider -->
      <div class="flex items-center gap-3">
        <div class="h-px flex-1 bg-white/8"></div>
        <span
          class="text-[9px] uppercase tracking-[0.35em] text-base-content/25"
          >Contributions</span
        >
        <div class="h-px flex-1 bg-white/8"></div>
      </div>

      <!-- Contributions -->
      <ul class="space-y-2.5">
        {#each contribution as item, i}
          <li
            class="flex items-start gap-3 text-xs leading-6 text-base-content/50 transition-colors duration-300 group-hover:text-base-content/60"
            style="animation-delay: {i * 60}ms"
          >
            <span
              class="mt-1.5 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-primary/40"
            ></span>
            {item}
          </li>
        {/each}
      </ul>

      <!-- Link -->
      {#if href}
        <a
          {href}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-auto inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-base-content/50 transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(122,167,255,0.15)]"
        >
          <Icon icon="lucide:external-link" height={12} />
          {displayUrl}
        </a>
      {/if}
    </div>

    <!-- Right: browser mockup -->
    <div
      class="relative overflow-hidden border-t border-white/8 lg:border-t-0 lg:border-l"
    >
      <!-- Browser chrome bar -->
      <div
        class="flex items-center gap-2 border-b border-white/8 bg-black/30 px-4 py-3 backdrop-blur-sm"
      >
        <div class="flex gap-1.5">
          <span class="h-2.5 w-2.5 rounded-full bg-white/15"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-white/15"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-white/15"></span>
        </div>
        <div
          class="flex-1 rounded-md bg-white/5 border border-white/8 px-3 py-1 text-center"
        >
          <span
            class="text-[10px] text-base-content/30 font-mono truncate block"
            >{displayUrl}</span
          >
        </div>
      </div>
      <!-- Screenshot -->
      <div class="relative overflow-hidden">
        {#if image}
          <img
            src={image}
            alt={title}
            class="w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            style="max-height: 280px;"
          />
          <!-- Fade overlay bottom -->
          <div
            class="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style="background: linear-gradient(to bottom, transparent, rgba(7,17,31,0.7));"
          ></div>
        {:else}
          <div class="flex h-48 items-center justify-center bg-white/3">
            <Icon
              icon="lucide:monitor"
              height={32}
              class="text-base-content/15"
            />
          </div>
        {/if}
      </div>
    </div>
  </div>
</article>
