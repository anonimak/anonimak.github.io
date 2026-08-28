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

  const pad = (n) => String(n).padStart(2, "0");
  const timeline = groupExperiences(experiences);

  const tabs = [
    { id: "professional", label: "Professional", data: professionalProjects },
    { id: "side", label: "Side Projects", data: sideProjects },
  ];

  let activeTab = $state("professional");
  let activeProjects = $derived(
    tabs.find((t) => t.id === activeTab)?.data ?? [],
  );

  function linksFor(item) {
    if (!item.link) return [];
    if (Array.isArray(item.link)) return item.link;
    return [{ name: item.link.replace(/^https?:\/\//, ""), url: item.link }];
  }

  function companyLabel(item) {
    if (item.company) return item.company;
    if (Array.isArray(item.clients)) return item.clients.join(", ");
    return item.clients ?? "";
  }

  const year = new Date().getFullYear();
</script>

<svelte:head>
  <title>{profile.name} — {profile.role}</title>
</svelte:head>

<div class="sw">
  <header class="sw-header">
    <div class="sw-header__inner">
      <a href="#hero" class="sw-logo"
        >{profile.initials}<span class="sw-logo__dot">.</span></a
      >
      <nav class="sw-nav" aria-label="Primary">
        {#each profile.nav as link, i}
          <a href={link.href} class="sw-nav__link">
            <span class="sw-nav__index">{pad(i + 1)}</span>{link.label}
          </a>
        {/each}
      </nav>
    </div>
  </header>

  <main>
    <!-- HERO -->
    <section id="hero" class="sw-section sw-hero">
      <div class="sw-rule sw-rule--top">
        <span class="sw-rule__index">{pad(1)}</span>
        <span class="sw-rule__label">Introduction</span>
      </div>

      <div class="sw-hero__grid">
        <div class="sw-hero__col sw-hero__col--main">
          <p class="sw-meta">
            <span class="sw-dot" aria-hidden="true"></span>
            {profile.availability} — {profile.location}
          </p>
          <h1 class="sw-headline">
            {profile.headline.prefix}<br />
            <span class="sw-headline__accent">{profile.headline.highlight}</span
            ><br />
            {profile.headline.suffix}
          </h1>
        </div>
        <div class="sw-hero__col sw-hero__col--side">
          <p class="sw-tagline">{profile.tagline}</p>
          <div class="sw-cta">
            <a href="#portfolio" class="sw-btn sw-btn--solid">
              View Projects
              <Icon icon="lucide:arrow-up-right" height={14} />
            </a>
            <a href="#contact" class="sw-btn sw-btn--outline">
              Get in touch
              <Icon icon="lucide:mail" height={14} />
            </a>
          </div>
        </div>
      </div>

      <div class="sw-hero__stats">
        {#each profile.heroStats as stat, i}
          <div class="sw-stat">
            <span class="sw-stat__index">{pad(i + 1)}</span>
            <span class="sw-stat__value">{stat.value}</span>
            <span class="sw-stat__label">{stat.label}</span>
          </div>
        {/each}
        <div class="sw-circle" aria-hidden="true"></div>
      </div>
    </section>

    <!-- SKILLS -->
    <section id="skills" class="sw-section">
      <div class="sw-rule sw-rule--top">
        <span class="sw-rule__index">{pad(2)}</span>
        <span class="sw-rule__label">Skills &amp; Tools</span>
      </div>

      <div class="sw-section__head">
        <h2 class="sw-h2">A practical<br /><em>toolkit.</em></h2>
        <p class="sw-lede">
          Frontend to backend, design to delivery — {skills.length} tools in active
          rotation.
        </p>
      </div>

      <div class="sw-skills">
        {#each skills as item}
          <div class="sw-skill" title={item.name}>
            <Icon icon={item.icon} height={18} class="sw-skill__icon" />
            <span class="sw-skill__name">{item.name}</span>
          </div>
        {/each}
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience" class="sw-section">
      <div class="sw-rule sw-rule--top">
        <span class="sw-rule__index">{pad(3)}</span>
        <span class="sw-rule__label">Career Path</span>
      </div>

      <div class="sw-section__head">
        <h2 class="sw-h2">Experience<br /><em>&amp; education.</em></h2>
        <div class="sw-exp-stats">
          {#each profile.experienceStats as stat}
            <div class="sw-stat sw-stat--inline">
              <span class="sw-stat__value">{stat.value}</span>
              <span class="sw-stat__label">{stat.label}</span>
            </div>
          {/each}
        </div>
      </div>

      <ol class="sw-timeline">
        {#each timeline as item, i}
          <li class="sw-timeline__row">
            <span class="sw-timeline__index">{pad(i + 1)}</span>
            <span class="sw-timeline__period">{item.period}</span>
            <div class="sw-timeline__body">
              <h3 class="sw-timeline__company">
                {item.company}
                <Icon
                  icon={item.type === "edu"
                    ? "lucide:graduation-cap"
                    : "lucide:briefcase"}
                  height={14}
                  class="sw-timeline__icon"
                />
              </h3>
              <p class="sw-timeline__desc">{item.description}</p>
              <div class="sw-tags">
                {#each item.tags as tag}
                  <span class="sw-tag">{tag}</span>
                {/each}
              </div>

              {#each item.concurrents as branch, bi}
                <div class="sw-branch">
                  <span class="sw-branch__index"
                    >{pad(i + 1)}{String.fromCharCode(97 + bi)}</span
                  >
                  <div class="sw-branch__body">
                    <p class="sw-branch__label">
                      Concurrent &middot; {branch.period}
                    </p>
                    <h4 class="sw-branch__company">
                      {branch.company}
                      <Icon
                        icon={branch.type === "edu"
                          ? "lucide:graduation-cap"
                          : "lucide:briefcase"}
                        height={12}
                        class="sw-timeline__icon"
                      />
                    </h4>
                    <p class="sw-branch__desc">{branch.description}</p>
                    <div class="sw-tags">
                      {#each branch.tags as tag}
                        <span class="sw-tag">{tag}</span>
                      {/each}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </li>
        {/each}
      </ol>
    </section>

    <!-- PROJECTS -->
    <section id="portfolio" class="sw-section">
      <div class="sw-rule sw-rule--top">
        <span class="sw-rule__index">{pad(4)}</span>
        <span class="sw-rule__label">Portfolio</span>
      </div>

      <div class="sw-section__head">
        <h2 class="sw-h2">Selected<br /><em>projects.</em></h2>
        <p class="sw-lede">
          Real-world work across enterprise systems and personal builds.
        </p>
      </div>

      <div class="sw-tabs" role="tablist" aria-label="Project category">
        {#each tabs as tab}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            class="sw-tab"
            class:sw-tab--active={activeTab === tab.id}
            onclick={() => (activeTab = tab.id)}
          >
            {tab.label} <span class="sw-tab__count">{pad(tab.data.length)}</span>
          </button>
        {/each}
      </div>

      <ol class="sw-projects">
        {#each activeProjects as item, i (item.title)}
          <li class="sw-project">
            <span class="sw-project__index">{pad(i + 1)}</span>
            <div class="sw-project__body">
              <div class="sw-project__head">
                <h3 class="sw-project__title">{item.title}</h3>
                <span class="sw-project__role">{item.role}</span>
              </div>
              <p class="sw-project__company">{companyLabel(item)}</p>
              <ul class="sw-project__contrib">
                {#each item.contributions as line}
                  <li>{line}</li>
                {/each}
              </ul>
              {#if linksFor(item).length}
                <div class="sw-project__links">
                  {#each linksFor(item) as l}
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="sw-project__link"
                    >
                      {l.name ?? l.url.replace(/^https?:\/\//, "")}
                      <Icon icon="lucide:arrow-up-right" height={12} />
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
            {#if item.image}
              <div class="sw-project__shot">
                <img src={item.image} alt="{item.title} screenshot" loading="lazy" />
              </div>
            {/if}
          </li>
        {/each}
      </ol>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="sw-section sw-contact">
      <div class="sw-rule sw-rule--top">
        <span class="sw-rule__index">{pad(5)}</span>
        <span class="sw-rule__label">Get In Touch</span>
      </div>

      <div class="sw-contact__grid">
        <h2 class="sw-h2 sw-h2--contact">
          {profile.contactHeadline.prefix}<br />
          <em>{profile.contactHeadline.highlight}</em>
        </h2>
        <div class="sw-contact__side">
          <p class="sw-lede">{profile.contactBody}</p>
          <div class="sw-socials">
            {#each profile.socials as s}
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                class="sw-social"
                aria-label={s.label}
              >
                <Icon icon={s.icon} height={16} />
                {s.label}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="sw-footer">
    <span class="sw-logo sw-logo--small"
      >{profile.initials}<span class="sw-logo__dot">.</span></span
    >
    <p class="sw-copyright">© {year} {profile.name} · All rights reserved</p>
    <a href="#hero" class="sw-back-top">
      <Icon icon="lucide:arrow-up" height={12} />
      Back to top
    </a>
  </footer>
</div>

<style>
  .sw {
    --sw-black: #0a0a0a;
    --sw-white: #f7f6f3;
    --sw-red: #e30613;
    --sw-line: rgba(10, 10, 10, 0.9);
    background: var(--sw-white);
    color: var(--sw-black);
    font-family: "Space Grotesk", system-ui, sans-serif;
    min-height: 100vh;
    position: relative;
    overflow: clip;
    -webkit-font-smoothing: antialiased;
  }

  :global(.sw *) {
    box-sizing: border-box;
  }

  em {
    font-style: normal;
    color: var(--sw-red);
  }

  /* Header */
  .sw-header {
    position: sticky;
    top: 0;
    z-index: 40;
    background: var(--sw-white);
    border-bottom: 1px solid var(--sw-line);
  }

  .sw-header__inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem clamp(1rem, 4vw, 2.5rem);
  }

  .sw-logo {
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--sw-black);
    text-decoration: none;
  }

  .sw-logo--small {
    font-size: 1.1rem;
  }

  .sw-logo__dot {
    color: var(--sw-red);
  }

  .sw-nav {
    display: none;
    gap: 1.75rem;
  }

  @media (min-width: 860px) {
    .sw-nav {
      display: flex;
    }
  }

  .sw-nav__link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--sw-black);
    text-decoration: none;
    padding: 0.25rem 0;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease, color 0.2s ease;
  }

  .sw-nav__link:hover,
  .sw-nav__link:focus-visible {
    border-color: var(--sw-red);
    color: var(--sw-red);
  }

  .sw-nav__index {
    color: var(--sw-red);
    font-weight: 700;
  }

  /* Section rule / number header */
  .sw-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 clamp(1rem, 4vw, 2.5rem) clamp(3.5rem, 8vw, 6rem);
    position: relative;
  }

  .sw-rule {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    border-top: 1px solid var(--sw-line);
    padding: 0.9rem 0 1.75rem;
  }

  .sw-rule__index {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--sw-red);
  }

  .sw-rule__label {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.35em;
    color: var(--sw-black);
  }

  .sw-section__head {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid var(--sw-line);
    margin-bottom: 2.5rem;
    align-items: end;
  }

  @media (min-width: 760px) {
    .sw-section__head {
      grid-template-columns: 1.4fr 1fr;
    }
  }

  .sw-h2 {
    font-size: clamp(2.2rem, 5.5vw, 3.6rem);
    font-weight: 700;
    line-height: 0.98;
    letter-spacing: -0.03em;
    margin: 0;
  }

  .sw-h2--contact {
    grid-row: 1;
  }

  .sw-lede {
    font-size: 0.95rem;
    line-height: 1.7;
    max-width: 32ch;
    margin: 0;
  }

  /* Hero */
  .sw-hero {
    padding-top: 0;
  }

  .sw-meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    margin: 0 0 1.25rem;
  }

  .sw-dot {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: var(--sw-red);
    flex-shrink: 0;
  }

  .sw-hero__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    border-bottom: 1px solid var(--sw-line);
    padding-bottom: 2.5rem;
  }

  @media (min-width: 900px) {
    .sw-hero__grid {
      grid-template-columns: 1.6fr 1fr;
      gap: 3rem;
    }
  }

  .sw-headline {
    font-size: clamp(2.75rem, 8vw, 6rem);
    font-weight: 700;
    line-height: 0.94;
    letter-spacing: -0.04em;
    margin: 0;
  }

  .sw-headline__accent {
    color: var(--sw-red);
  }

  .sw-hero__col--side {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--sw-line);
  }

  @media (min-width: 900px) {
    .sw-hero__col--side {
      border-top: none;
      border-left: 1px solid var(--sw-line);
      padding-left: 2rem;
      padding-top: 0;
    }
  }

  .sw-tagline {
    font-size: 1rem;
    line-height: 1.7;
    margin: 0;
  }

  .sw-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .sw-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    padding: 0.85rem 1.4rem;
    border: 1px solid var(--sw-black);
    transition: background 0.18s linear, color 0.18s linear;
  }

  .sw-btn--solid {
    background: var(--sw-black);
    color: var(--sw-white);
  }

  .sw-btn--solid:hover,
  .sw-btn--solid:focus-visible {
    background: var(--sw-red);
    border-color: var(--sw-red);
  }

  .sw-btn--outline {
    background: transparent;
    color: var(--sw-black);
  }

  .sw-btn--outline:hover,
  .sw-btn--outline:focus-visible {
    background: var(--sw-black);
    color: var(--sw-white);
  }

  .sw-hero__stats {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: clamp(1.5rem, 4vw, 3rem);
    padding-top: 2rem;
  }

  .sw-stat {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .sw-stat--inline {
    flex-direction: row;
    align-items: baseline;
    gap: 0.5rem;
  }

  .sw-stat__index {
    font-size: 0.65rem;
    color: var(--sw-red);
    font-weight: 700;
  }

  .sw-stat__value {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .sw-stat__label {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  .sw-circle {
    position: absolute;
    right: 0;
    top: -0.5rem;
    width: 34px;
    height: 34px;
    border-radius: 999px;
    background: var(--sw-red);
    display: none;
  }

  @media (min-width: 700px) {
    .sw-circle {
      display: block;
    }
  }

  /* Skills */
  .sw-skills {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-top: 1px solid var(--sw-line);
    border-left: 1px solid var(--sw-line);
  }

  @media (min-width: 560px) {
    .sw-skills {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 900px) {
    .sw-skills {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  .sw-skill {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1.1rem 1rem;
    border-right: 1px solid var(--sw-line);
    border-bottom: 1px solid var(--sw-line);
    transition: background 0.18s linear, color 0.18s linear;
  }

  .sw-skill:hover {
    background: var(--sw-black);
    color: var(--sw-white);
  }

  .sw-skill :global(.sw-skill__icon) {
    flex-shrink: 0;
  }

  .sw-skill__name {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  /* Experience */
  .sw-exp-stats {
    display: flex;
    gap: 1.5rem;
  }

  .sw-timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--sw-line);
  }

  .sw-timeline__row {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 1rem 1.5rem;
    padding: 1.75rem 0;
    border-bottom: 1px solid var(--sw-line);
    align-items: baseline;
  }

  .sw-timeline__index {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--sw-red);
  }

  .sw-timeline__period {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }

  .sw-timeline__body {
    grid-column: 1 / -1;
  }

  @media (min-width: 700px) {
    .sw-timeline__row {
      grid-template-columns: 2.5rem 9rem 1fr;
    }

    .sw-timeline__body {
      grid-column: auto;
    }
  }

  .sw-timeline__company {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 0 0.6rem;
  }

  .sw-timeline__company :global(.sw-timeline__icon) {
    color: var(--sw-red);
  }

  .sw-timeline__desc {
    font-size: 0.85rem;
    line-height: 1.7;
    max-width: 62ch;
    margin: 0 0 0.9rem;
  }

  .sw-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .sw-branch {
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
    padding: 1rem;
    border-left: 3px solid var(--sw-red);
    background: rgba(227, 6, 19, 0.03);
  }

  .sw-branch__index {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--sw-red);
  }

  .sw-branch__label {
    margin: 0 0 0.4rem;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--sw-red);
  }

  .sw-branch__company {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 0 0.55rem;
  }

  .sw-branch__desc {
    font-size: 0.78rem;
    line-height: 1.65;
    max-width: 58ch;
    margin: 0 0 0.7rem;
  }

  .sw-tag {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border: 1px solid var(--sw-black);
    padding: 0.3rem 0.6rem;
  }

  /* Tabs */
  .sw-tabs {
    display: flex;
    gap: 0;
    margin-bottom: 2rem;
    border: 1px solid var(--sw-black);
    width: fit-content;
  }

  .sw-tab {
    font-family: inherit;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    background: transparent;
    color: var(--sw-black);
    border: none;
    border-right: 1px solid var(--sw-black);
    padding: 0.7rem 1.1rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .sw-tab:last-child {
    border-right: none;
  }

  .sw-tab--active {
    background: var(--sw-black);
    color: var(--sw-white);
  }

  .sw-tab__count {
    color: var(--sw-red);
    font-weight: 700;
  }

  .sw-tab--active .sw-tab__count {
    color: var(--sw-red);
  }

  /* Projects */
  .sw-projects {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--sw-line);
  }

  .sw-project {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--sw-line);
  }

  @media (min-width: 860px) {
    .sw-project {
      grid-template-columns: 2rem 1fr 320px;
    }
  }

  .sw-project__index {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--sw-red);
  }

  .sw-project__head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 0.4rem;
  }

  .sw-project__title {
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .sw-project__role {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    border: 1px solid var(--sw-black);
    padding: 0.25rem 0.6rem;
    white-space: nowrap;
  }

  .sw-project__company {
    font-size: 0.78rem;
    margin: 0 0 1rem;
  }

  .sw-project__contrib {
    margin: 0 0 1rem;
    padding-left: 1rem;
    display: grid;
    gap: 0.45rem;
  }

  .sw-project__contrib li {
    font-size: 0.82rem;
    line-height: 1.6;
  }

  .sw-project__links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .sw-project__link {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--sw-black);
    text-decoration: none;
    border-bottom: 1px solid var(--sw-red);
  }

  .sw-project__link:hover {
    color: var(--sw-red);
  }

  .sw-project__shot {
    border: 1px solid var(--sw-line);
    overflow: hidden;
    max-height: 220px;
  }

  .sw-project__shot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    filter: grayscale(1) contrast(1.05);
    transition: filter 0.25s ease;
  }

  .sw-project:hover .sw-project__shot img {
    filter: grayscale(0);
  }

  /* Contact */
  .sw-contact {
    padding-bottom: clamp(3.5rem, 8vw, 6rem);
  }

  .sw-contact__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    border-bottom: 1px solid var(--sw-line);
    padding-bottom: 2.5rem;
  }

  @media (min-width: 760px) {
    .sw-contact__grid {
      grid-template-columns: 1.4fr 1fr;
      align-items: end;
    }
  }

  .sw-contact__side {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .sw-socials {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .sw-social {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    text-decoration: none;
    color: var(--sw-black);
    border: 1px solid var(--sw-black);
    padding: 0.6rem 1rem;
    transition: background 0.18s linear, color 0.18s linear;
  }

  .sw-social:hover,
  .sw-social:focus-visible {
    background: var(--sw-red);
    border-color: var(--sw-red);
    color: var(--sw-white);
  }

  /* Footer */
  .sw-footer {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem clamp(1rem, 4vw, 2.5rem) 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .sw-copyright {
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .sw-back-top {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    text-decoration: none;
    color: var(--sw-black);
  }

  .sw-back-top:hover {
    color: var(--sw-red);
  }
</style>
