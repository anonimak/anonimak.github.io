<script>
  import Icon from "@iconify/svelte";
  import avatar from "$lib/assets/avatar.jpg";
  import {
    profile,
    experiences,
    groupExperiences,
    skills,
    professionalProjects,
    sideProjects,
  } from "$lib/data/data.js";

  const timeline = groupExperiences(experiences);
  const year = new Date().getFullYear();

  let navOpen = $state(false);
  let activeTab = $state("professional");
  let activeList = $derived(
    activeTab === "professional" ? professionalProjects : sideProjects,
  );

  const tabs = [
    { id: "professional", label: "PROFESSIONAL", data: professionalProjects },
    { id: "side", label: "SIDE_PROJECTS", data: sideProjects },
  ];

  function companyLabel(item) {
    if (item.company) return item.company;
    if (Array.isArray(item.clients)) return item.clients.join(", ");
    return item.clients ?? "";
  }

  function linksOf(item) {
    if (Array.isArray(item.link)) return item.link;
    if (typeof item.link === "string" && item.link.trim() !== "") {
      return [{ name: item.link.replace(/^https?:\/\//, ""), url: item.link }];
    }
    return [];
  }

  // Reveal-on-scroll action: adds .is-visible once a node enters the
  // viewport so terminal panels "boot in" as the visitor scrolls.
  function reveal(node) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
  <title>{profile.name} · {profile.role}</title>
</svelte:head>

<div class="cc-root">
  <!-- ===== Header / nav ===== -->
  <header class="cc-header">
    <div class="cc-header__inner">
      <a href="#hero" class="cc-logo">{profile.initials}<span class="cc-cursor">_</span></a>

      <nav class="cc-nav">
        {#each profile.nav as link, i}
          <a href={link.href}>
            <span class="cc-nav__idx">{String(i + 1).padStart(2, "0")}</span>[{link.label}]
          </a>
        {/each}
      </nav>

      <div class="cc-status">
        <span class="cc-status__dot"></span>
        <span class="cc-status__text">{profile.availability.toUpperCase()}</span>
      </div>

      <button
        type="button"
        class="cc-burger"
        aria-label={navOpen ? "Close menu" : "Open menu"}
        aria-expanded={navOpen}
        onclick={() => (navOpen = !navOpen)}
      >
        <Icon icon={navOpen ? "lucide:x" : "lucide:menu"} height={18} />
      </button>
    </div>

    {#if navOpen}
      <nav class="cc-nav--mobile">
        {#each profile.nav as link, i}
          <a href={link.href} onclick={() => (navOpen = false)}>
            {String(i + 1).padStart(2, "0")}_{link.label}
          </a>
        {/each}
      </nav>
    {/if}
  </header>

  <main>
    <!-- ===== Hero ===== -->
    <section id="hero" class="cc-hero">
      <div class="cc-grid-floor" aria-hidden="true"></div>
      <div class="cc-scanlines" aria-hidden="true"></div>
      <div class="cc-hero__vignette" aria-hidden="true"></div>

      <div class="cc-shell cc-hero__inner">
        <div class="cc-hero__main">
          <p class="cc-eyebrow">
            <span class="cc-cursor">&gt;</span> whoami &mdash; {profile.role} / {profile.location}
          </p>

          <h1 class="cc-glitch-title">
            {profile.headline.prefix}
            <span class="cc-glow">{profile.headline.highlight}</span>
            {profile.headline.suffix}
          </h1>

          <p class="cc-tagline">{profile.tagline}</p>

          <div class="cc-cta-row">
            <a href="#portfolio" class="cc-btn cc-btn--solid">
              <Icon icon="lucide:terminal" height={14} />
              View_Projects
            </a>
            <a href="#contact" class="cc-btn cc-btn--ghost">
              <Icon icon="lucide:radio" height={14} />
              Open_Channel
            </a>
          </div>

          <div class="cc-stats">
            {#each profile.heroStats as stat, i}
              {#if i > 0}<span class="cc-stats__sep"></span>{/if}
              <div class="cc-stat">
                <span class="cc-stat__value">{stat.value}</span>
                <span class="cc-stat__label">{stat.label}</span>
              </div>
            {/each}
          </div>
        </div>

        <aside class="cc-idcard">
          <div class="cc-idcard__head">
            <span>ID_CARD.SYS</span>
            <span class="cc-status__dot cc-status__dot--sm"></span>
          </div>
          <div class="cc-idcard__body">
            <div class="cc-idcard__avatar">
              <img src={avatar} alt={profile.name} loading="lazy" />
            </div>
            <p class="cc-idcard__name">{profile.name}</p>
            <p class="cc-idcard__role">{profile.role}</p>
            <div class="cc-idcard__rows">
              <div><span>STACK</span><span>{profile.stack}</span></div>
              <div><span>FOCUS</span><span>{profile.focus}</span></div>
              <div><span>NODE</span><span>{profile.location}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- ===== Skills ===== -->
    <section id="skills" class="cc-section">
      <div class="cc-shell">
        <div class="cc-section__head" use:reveal>
          <p class="cc-label">// SKILLS.LOG</p>
          <h2 class="cc-heading">Toolchain <span class="cc-glow">Index</span></h2>
          <p class="cc-subcopy">Frontend to backend, design to delivery.</p>
        </div>

        <div class="cc-skills-grid">
          {#each skills as item, i}
            <div class="cc-skill-card" use:reveal style="transition-delay: {Math.min(i * 35, 400)}ms">
              <Icon icon={item.icon} height={26} />
              <span>{item.name}</span>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- ===== Experience ===== -->
    <section id="experience" class="cc-section cc-section--alt">
      <div class="cc-shell">
        <div class="cc-section__head" use:reveal>
          <p class="cc-label">// EXPERIENCE.LOG</p>
          <h2 class="cc-heading">Runtime <span class="cc-glow">History</span></h2>
          <p class="cc-subcopy">A commit history of roles, projects &amp; milestones.</p>
        </div>

        <div class="cc-timeline">
          {#each timeline as item}
            <div class="cc-timeline__row" use:reveal>
              <div class="cc-timeline__node">
                <Icon
                  icon={item.type === "edu" ? "lucide:graduation-cap" : "lucide:cpu"}
                  height={14}
                />
              </div>
              <div class="cc-timeline__card">
                <div class="cc-timeline__meta">
                  <span class="cc-mono-tag">{item.period}</span>
                  <span class="cc-mono-tag cc-mono-tag--type">{item.type}</span>
                </div>
                <h3>{item.company}</h3>
                <p>{item.description}</p>
                <div class="cc-chip-row">
                  {#each item.tags as tag}
                    <span class="cc-chip">{tag}</span>
                  {/each}
                </div>

                {#each item.concurrents as branch}
                  <div class="cc-branch">
                    <span class="cc-branch__glyph" aria-hidden="true"
                      >&#9500;&#9472;&#9472;</span
                    >
                    <div class="cc-branch__body">
                      <div class="cc-timeline__meta">
                        <span class="cc-mono-tag cc-mono-tag--branch"
                          >branch: {branch.period}</span
                        >
                        <span class="cc-mono-tag cc-mono-tag--type"
                          >{branch.type}</span
                        >
                      </div>
                      <h4>{branch.company}</h4>
                      <p>{branch.description}</p>
                      <div class="cc-chip-row">
                        {#each branch.tags as tag}
                          <span class="cc-chip">{tag}</span>
                        {/each}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>

        <div class="cc-stats cc-stats--bordered" use:reveal>
          {#each profile.experienceStats as stat, i}
            {#if i > 0}<span class="cc-stats__sep"></span>{/if}
            <div class="cc-stat">
              <span class="cc-stat__value">{stat.value}</span>
              <span class="cc-stat__label">{stat.label}</span>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- ===== Projects ===== -->
    <section id="portfolio" class="cc-section">
      <div class="cc-shell">
        <div class="cc-section__head" use:reveal>
          <p class="cc-label">// PROJECTS.LOG</p>
          <h2 class="cc-heading">Deployed <span class="cc-glow">Builds</span></h2>
          <p class="cc-subcopy">Real-world systems shipped to production.</p>
        </div>

        <div class="cc-tabs" use:reveal role="tablist">
          {#each tabs as tab}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              class="cc-tab"
              class:cc-tab--active={activeTab === tab.id}
              onclick={() => (activeTab = tab.id)}
            >
              [{tab.label}] <span class="cc-tab__count">{tab.data.length}</span>
            </button>
          {/each}
        </div>

        <div class="cc-project-list">
          {#each activeList as item, index (item.title)}
            <article class="cc-project" use:reveal style="transition-delay: {Math.min(index * 60, 360)}ms">
              <div class="cc-project__info">
                <div class="cc-project__top">
                  <span class="cc-project__no">{String(index + 1).padStart(2, "0")}</span>
                  <span class="cc-mono-tag">{item.role}</span>
                </div>
                <h3>{item.title}</h3>
                <p class="cc-project__company">
                  <Icon icon="lucide:server" height={12} /> {companyLabel(item)}
                </p>
                <ul class="cc-project__list">
                  {#each item.contributions as line}
                    <li><span>&gt;</span>{line}</li>
                  {/each}
                </ul>
                {#if linksOf(item).length}
                  <div class="cc-chip-row">
                    {#each linksOf(item) as l}
                      <a href={l.url} target="_blank" rel="noopener noreferrer" class="cc-link-chip">
                        <Icon icon="lucide:external-link" height={11} />
                        {l.name}
                      </a>
                    {/each}
                  </div>
                {/if}
              </div>
              {#if item.image}
                <div class="cc-project__media">
                  <div class="cc-project__chrome">
                    <span></span><span></span><span></span>
                  </div>
                  <img src={item.image} alt="{item.title} screenshot" loading="lazy" />
                </div>
              {/if}
            </article>
          {/each}
        </div>
      </div>
    </section>

    <!-- ===== Contact / Footer ===== -->
    <footer id="contact" class="cc-footer">
      <div class="cc-shell">
        <div class="cc-footer__panel" use:reveal>
          <p class="cc-label">// CONTACT.LOG</p>
          <h2 class="cc-heading">
            {profile.contactHeadline.prefix} <span class="cc-glow">{profile.contactHeadline.highlight}</span>
          </h2>
          <p class="cc-subcopy cc-subcopy--center">{profile.contactBody}</p>

          <div class="cc-social-row">
            {#each profile.socials as s}
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} class="cc-btn cc-btn--ghost">
                <Icon icon={s.icon} height={15} />
                {s.label}
              </a>
            {/each}
          </div>
        </div>

        <div class="cc-footer__bottom">
          <span>{profile.initials}<span class="cc-cursor">_</span></span>
          <p>&copy; {year} {profile.name} &middot; all rights reserved</p>
          <a href="#hero" class="cc-back-top">
            <Icon icon="lucide:arrow-up" height={12} /> top
          </a>
        </div>
      </div>
    </footer>
  </main>
</div>

<style>
  .cc-root {
    --cc-bg: #05070a;
    --cc-panel: #0a0f14;
    --cc-line: rgba(57, 255, 20, 0.16);
    --cc-green: #39ff14;
    --cc-cyan: #00fff2;
    --cc-magenta: #ff2fd0;
    --cc-text: #d7ffe0;
    --cc-text-dim: rgba(215, 255, 224, 0.55);
    --cc-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;

    background: var(--cc-bg);
    color: var(--cc-text);
    font-family: var(--cc-mono);
    position: relative;
    min-height: 100vh;
    overflow: clip;
  }

  .cc-shell {
    max-width: 78rem;
    margin: 0 auto;
    padding: 0 1.25rem;
  }

  @media (min-width: 768px) {
    .cc-shell {
      padding: 0 2rem;
    }
  }

  .cc-cursor {
    color: var(--cc-green);
    animation: cc-blink 1.1s steps(1) infinite;
  }

  @keyframes cc-blink {
    50% { opacity: 0; }
  }

  /* Header */
  .cc-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(5, 7, 10, 0.86);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--cc-line);
  }

  .cc-header__inner {
    max-width: 78rem;
    margin: 0 auto;
    padding: 0.9rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .cc-header__inner {
      padding: 0.9rem 2rem;
    }
  }

  .cc-logo {
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--cc-text);
    text-decoration: none;
    letter-spacing: 0.05em;
  }

  .cc-nav {
    display: none;
    align-items: center;
    gap: 0.25rem;
    margin-left: 0.5rem;
  }

  @media (min-width: 900px) {
    .cc-nav { display: flex; }
  }

  .cc-nav a {
    color: var(--cc-text-dim);
    text-decoration: none;
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    padding: 0.4rem 0.6rem;
    border-radius: 2px;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .cc-nav a:hover, .cc-nav a:focus-visible {
    color: var(--cc-green);
    background: rgba(57, 255, 20, 0.06);
  }

  .cc-nav__idx {
    color: var(--cc-magenta);
    margin-right: 0.15rem;
  }

  .cc-status {
    margin-left: auto;
    display: none;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--cc-line);
    padding: 0.35rem 0.7rem;
    border-radius: 2px;
  }

  @media (min-width: 640px) {
    .cc-status { display: flex; }
  }

  .cc-status__dot {
    height: 7px;
    width: 7px;
    border-radius: 50%;
    background: var(--cc-green);
    box-shadow: 0 0 8px 2px var(--cc-green);
    animation: cc-pulse 1.8s ease-in-out infinite;
  }

  .cc-status__dot--sm {
    height: 6px;
    width: 6px;
  }

  @keyframes cc-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }

  .cc-status__text {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: var(--cc-green);
  }

  .cc-burger {
    margin-left: auto;
    background: none;
    border: 1px solid var(--cc-line);
    color: var(--cc-text);
    padding: 0.4rem;
    border-radius: 2px;
    cursor: pointer;
  }

  @media (min-width: 900px) {
    .cc-burger { display: none; }
  }

  .cc-nav--mobile {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--cc-line);
    padding: 0.5rem 1.25rem 1rem;
  }

  .cc-nav--mobile a {
    color: var(--cc-text-dim);
    text-decoration: none;
    padding: 0.55rem 0;
    font-size: 0.8rem;
    border-bottom: 1px dashed rgba(57, 255, 20, 0.1);
  }

  /* Hero */
  .cc-hero {
    position: relative;
    padding: 4.5rem 0 5rem;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .cc-hero { padding: 7rem 0 6rem; }
  }

  .cc-grid-floor {
    position: absolute;
    inset: auto 0 0 0;
    height: 55%;
    background-image:
      linear-gradient(var(--cc-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--cc-line) 1px, transparent 1px);
    background-size: 48px 48px;
    transform: perspective(420px) rotateX(62deg);
    transform-origin: bottom;
    mask-image: linear-gradient(to top, black, transparent);
    -webkit-mask-image: linear-gradient(to top, black, transparent);
    opacity: 0.8;
  }

  .cc-scanlines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.025) 0px,
      rgba(255, 255, 255, 0.025) 1px,
      transparent 1px,
      transparent 3px
    );
    mix-blend-mode: overlay;
  }

  .cc-hero__vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 20%, rgba(57, 255, 20, 0.07), transparent 65%);
    pointer-events: none;
  }

  .cc-hero__inner {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 3rem;
  }

  @media (min-width: 1024px) {
    .cc-hero__inner {
      grid-template-columns: 1fr 320px;
      align-items: center;
    }
  }

  .cc-eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--cc-text-dim);
    margin: 0 0 1.25rem;
  }

  .cc-glitch-title {
    font-size: clamp(2.1rem, 6vw, 4.2rem);
    line-height: 1.05;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 1.25rem;
    text-shadow: 0 0 18px rgba(57, 255, 20, 0.25);
    animation: cc-glitch-in 0.6s ease-out both;
  }

  @keyframes cc-glitch-in {
    0% { opacity: 0; transform: translate3d(-6px, 0, 0); filter: blur(2px); }
    30% { opacity: 1; transform: translate3d(4px, 0, 0); filter: blur(0); }
    45% { transform: translate3d(-2px, 0, 0); }
    60% { transform: translate3d(0, 0, 0); }
    100% { opacity: 1; transform: none; }
  }

  .cc-glow {
    color: var(--cc-green);
    text-shadow: 0 0 6px rgba(57, 255, 20, 0.55), 0 0 22px rgba(57, 255, 20, 0.35);
  }

  .cc-tagline {
    max-width: 34rem;
    color: var(--cc-text-dim);
    line-height: 1.7;
    font-size: 0.95rem;
    margin: 0 0 1.75rem;
  }

  .cc-cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2.25rem;
  }

  .cc-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.1rem;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-decoration: none;
    border-radius: 2px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }

  .cc-btn--solid {
    background: var(--cc-green);
    color: #04140a;
    font-weight: 700;
  }

  .cc-btn--solid:hover, .cc-btn--solid:focus-visible {
    box-shadow: 0 0 22px rgba(57, 255, 20, 0.5);
    transform: translateY(-2px);
  }

  .cc-btn--ghost {
    border: 1px solid var(--cc-line);
    color: var(--cc-text);
  }

  .cc-btn--ghost:hover, .cc-btn--ghost:focus-visible {
    border-color: var(--cc-cyan);
    color: var(--cc-cyan);
    box-shadow: 0 0 16px rgba(0, 255, 242, 0.25);
    transform: translateY(-2px);
  }

  .cc-stats {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
  }

  .cc-stats--bordered {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--cc-line);
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .cc-stats--bordered:global(.is-visible) {
    opacity: 1;
    transform: translateY(0);
  }

  .cc-stats__sep {
    width: 1px;
    height: 1.75rem;
    background: var(--cc-line);
  }

  .cc-stat { display: flex; flex-direction: column; gap: 0.15rem; }

  .cc-stat__value {
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--cc-text);
  }

  .cc-stat__label {
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    color: var(--cc-text-dim);
    text-transform: uppercase;
  }

  /* ID card */
  .cc-idcard {
    border: 1px solid var(--cc-line);
    background: rgba(10, 15, 20, 0.7);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
  }

  .cc-idcard__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.9rem;
    border-bottom: 1px solid var(--cc-line);
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    color: var(--cc-cyan);
  }

  .cc-idcard__body {
    padding: 1.5rem 1.25rem;
    text-align: center;
  }

  .cc-idcard__avatar {
    width: 84px;
    height: 84px;
    margin: 0 auto 1rem;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid var(--cc-green);
    box-shadow: 0 0 18px rgba(57, 255, 20, 0.3);
  }

  .cc-idcard__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cc-idcard__name {
    font-weight: 700;
    font-size: 0.95rem;
    margin: 0;
  }

  .cc-idcard__role {
    font-size: 0.68rem;
    color: var(--cc-text-dim);
    margin: 0.25rem 0 1.25rem;
  }

  .cc-idcard__rows {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;
    border-top: 1px dashed rgba(57, 255, 20, 0.15);
    padding-top: 1rem;
  }

  .cc-idcard__rows div {
    display: flex;
    justify-content: space-between;
    font-size: 0.65rem;
  }

  .cc-idcard__rows span:first-child {
    color: var(--cc-text-dim);
    letter-spacing: 0.08em;
  }

  /* Sections */
  .cc-section {
    padding: 4.5rem 0;
    position: relative;
  }

  .cc-section--alt {
    background: linear-gradient(180deg, transparent, rgba(57, 255, 20, 0.03), transparent);
  }

  .cc-section__head {
    margin-bottom: 2.5rem;
    max-width: 40rem;
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .cc-section__head:global(.is-visible) {
    opacity: 1;
    transform: translateY(0);
  }

  .cc-label {
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    color: var(--cc-magenta);
    margin: 0 0 0.75rem;
  }

  .cc-heading {
    font-size: clamp(1.7rem, 4vw, 2.6rem);
    font-weight: 800;
    letter-spacing: -0.01em;
    margin: 0 0 0.75rem;
  }

  .cc-subcopy {
    color: var(--cc-text-dim);
    font-size: 0.85rem;
    line-height: 1.6;
    margin: 0;
  }

  .cc-subcopy--center { margin: 0 auto; text-align: center; max-width: 32rem; }

  /* Skills */
  .cc-skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  @media (min-width: 640px) {
    .cc-skills-grid { grid-template-columns: repeat(4, 1fr); }
  }

  @media (min-width: 1024px) {
    .cc-skills-grid { grid-template-columns: repeat(5, 1fr); }
  }

  .cc-skill-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    padding: 1.25rem 0.75rem;
    border: 1px solid var(--cc-line);
    border-radius: 3px;
    background: rgba(10, 15, 20, 0.5);
    font-size: 0.68rem;
    text-align: center;
    color: var(--cc-text-dim);
    opacity: 0;
    transform: translateY(14px) scale(0.97);
    transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.25s ease, color 0.25s ease;
  }

  .cc-skill-card:global(.is-visible) {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .cc-skill-card:hover {
    border-color: var(--cc-green);
    color: var(--cc-text);
    box-shadow: 0 0 16px rgba(57, 255, 20, 0.18);
  }

  /* Timeline */
  .cc-timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-left: 1px solid var(--cc-line);
    padding-left: 1.5rem;
    margin-left: 0.5rem;
  }

  .cc-timeline__row {
    position: relative;
    opacity: 0;
    transform: translateX(16px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }

  .cc-timeline__row:global(.is-visible) {
    opacity: 1;
    transform: translateX(0);
  }

  .cc-timeline__node {
    position: absolute;
    left: -2.05rem;
    top: 0.15rem;
    height: 1.6rem;
    width: 1.6rem;
    border-radius: 50%;
    border: 1px solid var(--cc-green);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--cc-bg);
    color: var(--cc-green);
    box-shadow: 0 0 10px rgba(57, 255, 20, 0.3);
  }

  .cc-timeline__card {
    border: 1px solid var(--cc-line);
    background: rgba(10, 15, 20, 0.55);
    border-radius: 4px;
    padding: 1.25rem 1.4rem;
  }

  .cc-timeline__meta {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.6rem;
  }

  .cc-mono-tag {
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    color: var(--cc-cyan);
    border: 1px solid rgba(0, 255, 242, 0.25);
    padding: 0.15rem 0.5rem;
    border-radius: 2px;
  }

  .cc-mono-tag--type {
    color: var(--cc-magenta);
    border-color: rgba(255, 47, 208, 0.3);
    text-transform: uppercase;
  }

  .cc-timeline__card h3 {
    font-size: 0.98rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
  }

  .cc-timeline__card p {
    font-size: 0.78rem;
    line-height: 1.65;
    color: var(--cc-text-dim);
    margin: 0 0 0.85rem;
  }

  .cc-branch {
    display: flex;
    gap: 0.6rem;
    margin-top: 1.1rem;
    padding-top: 1.1rem;
    border-top: 1px dashed var(--cc-line);
  }

  .cc-branch__glyph {
    flex-shrink: 0;
    color: var(--cc-magenta);
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .cc-branch__body {
    flex: 1;
    min-width: 0;
  }

  .cc-branch__body h4 {
    font-size: 0.9rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    color: var(--cc-text);
  }

  .cc-branch__body p {
    font-size: 0.76rem;
    line-height: 1.6;
    color: var(--cc-text-dim);
    margin: 0 0 0.75rem;
  }

  .cc-mono-tag--branch {
    color: var(--cc-magenta);
    border-color: rgba(255, 47, 208, 0.3);
  }

  .cc-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .cc-chip {
    font-size: 0.62rem;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.55rem;
    border-radius: 2px;
    border: 1px solid var(--cc-line);
    color: var(--cc-text-dim);
  }

  /* Projects */
  .cc-tabs {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1.75rem;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .cc-tabs:global(.is-visible) { opacity: 1; transform: translateY(0); }

  .cc-tab {
    background: none;
    border: 1px solid var(--cc-line);
    color: var(--cc-text-dim);
    font-family: var(--cc-mono);
    font-size: 0.72rem;
    letter-spacing: 0.05em;
    padding: 0.55rem 0.9rem;
    border-radius: 2px;
    cursor: pointer;
  }

  .cc-tab--active {
    color: var(--cc-green);
    border-color: var(--cc-green);
    box-shadow: 0 0 14px rgba(57, 255, 20, 0.2);
  }

  .cc-tab__count {
    color: var(--cc-text-dim);
    font-size: 0.65rem;
  }

  .cc-project-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .cc-project {
    border: 1px solid var(--cc-line);
    border-radius: 4px;
    background: rgba(10, 15, 20, 0.5);
    display: grid;
    grid-template-columns: 1fr;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.25s ease;
  }

  .cc-project:global(.is-visible) { opacity: 1; transform: translateY(0); }
  .cc-project:hover { border-color: rgba(57, 255, 20, 0.4); }

  @media (min-width: 960px) {
    .cc-project { grid-template-columns: 1fr 360px; }
  }

  .cc-project__info {
    padding: 1.5rem 1.5rem 1.75rem;
  }

  .cc-project__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .cc-project__no {
    font-size: 1.8rem;
    font-weight: 800;
    color: rgba(215, 255, 224, 0.12);
  }

  .cc-project__info h3 {
    font-size: 1.15rem;
    font-weight: 700;
    margin: 0 0 0.4rem;
  }

  .cc-project__company {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    color: var(--cc-text-dim);
    margin: 0 0 1rem;
  }

  .cc-project__list {
    list-style: none;
    margin: 0 0 1rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .cc-project__list li {
    display: flex;
    gap: 0.5rem;
    font-size: 0.76rem;
    line-height: 1.6;
    color: var(--cc-text-dim);
  }

  .cc-project__list li span {
    color: var(--cc-green);
    flex-shrink: 0;
  }

  .cc-link-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.68rem;
    border: 1px solid var(--cc-line);
    color: var(--cc-cyan);
    text-decoration: none;
    padding: 0.35rem 0.65rem;
    border-radius: 2px;
  }

  .cc-link-chip:hover {
    border-color: var(--cc-cyan);
    box-shadow: 0 0 12px rgba(0, 255, 242, 0.25);
  }

  .cc-project__media {
    position: relative;
    border-top: 1px solid var(--cc-line);
  }

  @media (min-width: 960px) {
    .cc-project__media { border-top: none; border-left: 1px solid var(--cc-line); }
  }

  .cc-project__chrome {
    display: flex;
    gap: 0.35rem;
    padding: 0.6rem 0.75rem;
    background: rgba(0, 0, 0, 0.4);
    border-bottom: 1px solid var(--cc-line);
  }

  .cc-project__chrome span {
    height: 7px;
    width: 7px;
    border-radius: 50%;
    background: rgba(215, 255, 224, 0.2);
  }

  .cc-project__media img {
    width: 100%;
    max-height: 230px;
    object-fit: cover;
    object-position: top;
    filter: saturate(0.9) contrast(1.05);
  }

  /* Footer */
  .cc-footer {
    padding: 5rem 0 2.5rem;
    border-top: 1px solid var(--cc-line);
    margin-top: 2rem;
  }

  .cc-footer__panel {
    text-align: center;
    max-width: 40rem;
    margin: 0 auto 3rem;
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .cc-footer__panel:global(.is-visible) { opacity: 1; transform: translateY(0); }
  .cc-footer__panel .cc-label,
  .cc-footer__panel .cc-heading { text-align: center; }

  .cc-social-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.75rem;
  }

  .cc-footer__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.72rem;
    color: var(--cc-text-dim);
    padding-top: 1.5rem;
    border-top: 1px dashed rgba(57, 255, 20, 0.15);
    text-align: center;
  }

  @media (min-width: 640px) {
    .cc-footer__bottom { flex-direction: row; justify-content: space-between; }
  }

  .cc-back-top {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--cc-text-dim);
    text-decoration: none;
  }

  .cc-back-top:hover { color: var(--cc-green); }
</style>
