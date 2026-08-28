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

  const tabs = [
    { id: "professional", label: "Professional", data: professionalProjects },
    { id: "side", label: "Side projects", data: sideProjects },
  ];

  let activeTab = $state("professional");
  let activeProjects = $derived(
    tabs.find((t) => t.id === activeTab)?.data ?? [],
  );

  function companyLine(item) {
    return Array.isArray(item.clients) ? item.clients.join(", ") : item.company;
  }

  function links(item) {
    if (!item.link) return [];
    if (Array.isArray(item.link)) return item.link;
    return [{ name: item.link.replace(/^https?:\/\//, ""), url: item.link }];
  }

  /** @param {HTMLElement} node */
  function reveal(node) {
    node.classList.add("reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  let year = new Date().getFullYear();
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@500;700;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="mini">
  <header class="mini-header">
    <a href="#hero" class="mini-wordmark">JT<span>.</span></a>
    <nav class="mini-nav" aria-label="Primary">
      {#each profile.nav as link}
        <a href={link.href}>{link.label}</a>
      {/each}
    </nav>
  </header>

  <main>
    <section id="hero" class="mini-hero">
      <p class="mini-eyebrow" use:reveal>
        <span class="mini-dot" aria-hidden="true"></span>
        {profile.availability} &middot; {profile.location}
      </p>

      <h1 class="mini-headline" use:reveal>
        {profile.headline.prefix}
        <em>{profile.headline.highlight}</em>
        {profile.headline.suffix}
      </h1>

      <p class="mini-tagline" use:reveal>{profile.tagline}</p>

      <div class="mini-cta" use:reveal>
        <a href="#portfolio" class="mini-link mini-link--strong">
          View projects <Icon icon="lucide:arrow-up-right" height={14} />
        </a>
        <a href="#contact" class="mini-link">
          Get in touch <Icon icon="lucide:arrow-up-right" height={14} />
        </a>
      </div>

      <dl class="mini-stats" use:reveal>
        {#each profile.heroStats as stat}
          <div>
            <dt>{stat.value}</dt>
            <dd>{stat.label}</dd>
          </div>
        {/each}
      </dl>
    </section>

    <section id="skills" class="mini-section">
      <div class="mini-section-head" use:reveal>
        <p class="mini-label">01 &mdash; Skills &amp; tools</p>
        <h2>A practical toolkit for modern work.</h2>
      </div>

      <ul class="mini-skills" use:reveal>
        {#each skills as skill}
          <li>
            <Icon icon={skill.icon} height={16} />
            {skill.name}
          </li>
        {/each}
      </ul>
    </section>

    <section id="experience" class="mini-section">
      <div class="mini-section-head" use:reveal>
        <p class="mini-label">02 &mdash; Career path</p>
        <h2>Experience &amp; education.</h2>
      </div>

      <ol class="mini-timeline">
        {#each timeline as item}
          <li use:reveal>
            <p class="mini-period">{item.period}</p>
            <div class="mini-timeline-body">
              <h3>
                {item.company}
                <span class="mini-type">{item.type === "edu" ? "Education" : "Work"}</span>
              </h3>
              <p>{item.description}</p>
              <p class="mini-tags">
                {#each item.tags as tag, i}{i > 0 ? " · " : ""}{tag}{/each}
              </p>

              {#each item.concurrents as branch}
                <div class="mini-branch">
                  <p class="mini-branch-label">
                    Concurrent &middot; {branch.period} &middot; {branch.type === "edu" ? "Education" : "Work"}
                  </p>
                  <h4>{branch.company}</h4>
                  <p>{branch.description}</p>
                  <p class="mini-tags">
                    {#each branch.tags as tag, i}{i > 0 ? " · " : ""}{tag}{/each}
                  </p>
                </div>
              {/each}
            </div>
          </li>
        {/each}
      </ol>

      <dl class="mini-stats mini-stats--tight" use:reveal>
        {#each profile.experienceStats as stat}
          <div>
            <dt>{stat.value}</dt>
            <dd>{stat.label}</dd>
          </div>
        {/each}
      </dl>
    </section>

    <section id="portfolio" class="mini-section">
      <div class="mini-section-head" use:reveal>
        <p class="mini-label">03 &mdash; Selected work</p>
        <h2>Projects.</h2>
      </div>

      <div class="mini-tabs" use:reveal>
        {#each tabs as tab}
          <button
            type="button"
            class:is-active={activeTab === tab.id}
            onclick={() => (activeTab = tab.id)}
          >
            {tab.label} <span>{tab.data.length}</span>
          </button>
        {/each}
      </div>

      <ol class="mini-projects">
        {#each activeProjects as item, index (item.title)}
          <li use:reveal>
            <div class="mini-project-index">{String(index + 1).padStart(2, "0")}</div>
            <div class="mini-project-body">
              <h3>{item.title}</h3>
              <p class="mini-project-meta">
                {item.role} &middot; {companyLine(item)}
              </p>
              <ul class="mini-project-contrib">
                {#each item.contributions as line}
                  <li>{line}</li>
                {/each}
              </ul>
              {#if links(item).length}
                <div class="mini-project-links">
                  {#each links(item) as l}
                    <a href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.name} <Icon icon="lucide:arrow-up-right" height={12} />
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
            {#if item.image}
              <div class="mini-project-shot">
                <img src={item.image} alt="Screenshot of {item.title}" loading="lazy" />
              </div>
            {/if}
          </li>
        {/each}
      </ol>
    </section>

    <section id="contact" class="mini-contact">
      <div class="mini-section-head" use:reveal>
        <p class="mini-label">04 &mdash; Get in touch</p>
        <h2>
          {profile.contactHeadline.prefix} <em>{profile.contactHeadline.highlight}</em>
        </h2>
        <p class="mini-contact-body">{profile.contactBody}</p>
      </div>

      <div class="mini-socials" use:reveal>
        {#each profile.socials as s}
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
            <Icon icon={s.icon} height={16} />
            {s.label}
          </a>
        {/each}
      </div>
    </section>
  </main>

  <footer class="mini-footer">
    <span>&copy; {year} {profile.name}. All rights reserved.</span>
    <a href="#hero">Back to top <Icon icon="lucide:arrow-up" height={12} /></a>
  </footer>
</div>

<style>
  .mini {
    --ink: #111111;
    --ink-soft: rgba(17, 17, 17, 0.55);
    --ink-faint: rgba(17, 17, 17, 0.32);
    --paper: #fafaf9;
    --rule: rgba(17, 17, 17, 0.12);
    --accent: #3d4a7a;

    background: var(--paper);
    color: var(--ink);
    font-family: "Inter", system-ui, sans-serif;
    min-height: 100vh;
    line-height: 1.5;
    position: relative;
    overflow: clip;
  }

  img {
    filter: grayscale(1);
    transition: filter 0.5s ease;
  }
  .mini-project-shot:hover img {
    filter: grayscale(0);
  }

  .mini-header {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 1.5rem;
    border-bottom: 1px solid var(--rule);
    background: var(--paper);
  }
  @media (min-width: 768px) {
    .mini-header {
      padding: 1.6rem 3rem;
    }
  }

  .mini-wordmark {
    font-family: "Inter Tight", "Inter", sans-serif;
    font-weight: 800;
    font-size: 1.15rem;
    letter-spacing: -0.02em;
    color: var(--ink);
    text-decoration: none;
  }
  .mini-wordmark span {
    color: var(--accent);
  }

  .mini-nav {
    display: none;
    gap: 1.75rem;
  }
  @media (min-width: 768px) {
    .mini-nav {
      display: flex;
    }
  }
  .mini-nav a {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--ink-soft);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .mini-nav a:hover,
  .mini-nav a:focus-visible {
    color: var(--ink);
  }

  main {
    max-width: 1040px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  @media (min-width: 768px) {
    main {
      padding: 0 3rem;
    }
  }

  .mini-hero {
    padding: 5rem 0 6rem;
  }
  @media (min-width: 768px) {
    .mini-hero {
      padding: 8rem 0 8rem;
    }
  }

  .mini-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    color: var(--ink-faint);
    margin: 0 0 1.75rem;
  }
  .mini-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--accent);
  }

  .mini-headline {
    font-family: "Inter Tight", "Inter", sans-serif;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.04;
    font-size: clamp(2.5rem, 7vw, 5.25rem);
    max-width: 18ch;
    margin: 0 0 1.75rem;
  }
  .mini-headline em {
    font-style: italic;
    font-weight: 500;
    color: var(--accent);
  }

  .mini-tagline {
    max-width: 42ch;
    font-size: clamp(1rem, 1.6vw, 1.15rem);
    color: var(--ink-soft);
    margin: 0 0 2.5rem;
  }

  .mini-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
    margin-bottom: 3.5rem;
  }
  .mini-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid var(--ink);
    padding-bottom: 2px;
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  .mini-link--strong {
    color: var(--accent);
    border-color: var(--accent);
  }
  .mini-link:hover,
  .mini-link:focus-visible {
    color: var(--ink-soft);
  }

  .mini-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem;
    margin: 0;
    padding-top: 2rem;
    border-top: 1px solid var(--rule);
  }
  .mini-stats--tight {
    margin-top: 3rem;
    padding-top: 1.75rem;
  }
  .mini-stats dt {
    font-family: "Inter Tight", sans-serif;
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .mini-stats dd {
    margin: 0.15rem 0 0;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--ink-faint);
  }

  .mini-section {
    padding: 5rem 0;
    border-top: 1px solid var(--rule);
  }
  @media (min-width: 768px) {
    .mini-section {
      padding: 7rem 0;
    }
  }

  .mini-section-head h2 {
    font-family: "Inter Tight", sans-serif;
    font-weight: 800;
    letter-spacing: -0.02em;
    font-size: clamp(1.9rem, 4vw, 2.75rem);
    margin: 0.6rem 0 0;
  }
  .mini-section-head h2 em {
    font-style: italic;
    font-weight: 500;
    color: var(--accent);
  }
  .mini-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--ink-faint);
    margin: 0;
  }

  .mini-skills {
    list-style: none;
    margin: 3rem 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    border-top: 1px solid var(--rule);
    border-left: 1px solid var(--rule);
  }
  @media (min-width: 640px) {
    .mini-skills {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 900px) {
    .mini-skills {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  .mini-skills li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1.1rem 1.1rem;
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--ink-soft);
    border-right: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    transition: color 0.2s ease, background 0.2s ease;
  }
  .mini-skills li:hover {
    color: var(--ink);
    background: rgba(17, 17, 17, 0.03);
  }

  .mini-timeline {
    list-style: none;
    margin: 3rem 0 0;
    padding: 0;
  }
  .mini-timeline li {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 1rem 1.5rem;
    padding: 2rem 0;
    border-top: 1px solid var(--rule);
  }
  @media (min-width: 768px) {
    .mini-timeline li {
      grid-template-columns: 160px 1fr;
      gap: 2rem;
    }
  }
  .mini-period {
    margin: 0;
    font-family: "Inter Tight", sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--ink-faint);
  }
  .mini-timeline-body h3 {
    margin: 0 0 0.6rem;
    font-family: "Inter Tight", sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .mini-type {
    margin-left: 0.6rem;
    font-size: 0.62rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent);
  }
  .mini-timeline-body p {
    margin: 0 0 0.75rem;
    font-size: 0.88rem;
    line-height: 1.7;
    color: var(--ink-soft);
    max-width: 62ch;
  }
  .mini-tags {
    font-size: 0.75rem !important;
    color: var(--ink-faint) !important;
  }

  .mini-branch {
    margin-top: 1.25rem;
    padding-left: 1.1rem;
    border-left: 2px solid var(--rule);
  }
  .mini-branch-label {
    margin: 0 0 0.4rem;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent);
  }
  .mini-branch h4 {
    margin: 0 0 0.5rem;
    font-family: "Inter Tight", sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .mini-branch p {
    margin: 0 0 0.6rem;
    font-size: 0.82rem;
    line-height: 1.65;
    color: var(--ink-soft);
    max-width: 58ch;
  }

  .mini-tabs {
    display: flex;
    gap: 1.75rem;
    margin: 3rem 0 0;
    border-bottom: 1px solid var(--rule);
  }
  .mini-tabs button {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 0 0 0.9rem;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--ink-faint);
    cursor: pointer;
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  .mini-tabs button span {
    font-size: 0.68rem;
    color: inherit;
    margin-left: 0.3rem;
  }
  .mini-tabs button:hover {
    color: var(--ink-soft);
  }
  .mini-tabs button.is-active {
    color: var(--ink);
    border-color: var(--accent);
  }

  .mini-projects {
    list-style: none;
    margin: 0.5rem 0 0;
    padding: 0;
  }
  .mini-projects > li {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 1.25rem 1.5rem;
    padding: 2.75rem 0;
    border-top: 1px solid var(--rule);
  }
  @media (min-width: 900px) {
    .mini-projects > li {
      grid-template-columns: 64px 1fr 320px;
    }
  }
  .mini-project-index {
    font-family: "Inter Tight", sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--ink-faint);
  }
  .mini-project-body h3 {
    margin: 0 0 0.4rem;
    font-family: "Inter Tight", sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .mini-project-meta {
    margin: 0 0 1rem;
    font-size: 0.78rem;
    color: var(--ink-faint);
  }
  .mini-project-contrib {
    list-style: none;
    margin: 0 0 1.1rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 56ch;
  }
  .mini-project-contrib li {
    position: relative;
    padding-left: 1rem;
    font-size: 0.86rem;
    line-height: 1.65;
    color: var(--ink-soft);
  }
  .mini-project-contrib li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 5px;
    height: 1px;
    background: var(--ink-faint);
  }
  .mini-project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
  }
  .mini-project-links a {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent);
    text-decoration: none;
    border-bottom: 1px solid transparent;
  }
  .mini-project-links a:hover {
    border-color: var(--accent);
  }
  .mini-project-shot {
    grid-column: 1 / -1;
    border: 1px solid var(--rule);
  }
  @media (min-width: 900px) {
    .mini-project-shot {
      grid-column: auto;
    }
  }
  .mini-project-shot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 220px;
  }

  .mini-contact {
    padding: 6rem 0 7rem;
    border-top: 1px solid var(--rule);
  }
  .mini-contact-body {
    max-width: 46ch;
    margin: 1.25rem 0 0;
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--ink-soft);
  }
  .mini-socials {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 2.5rem;
    margin-top: 3rem;
  }
  .mini-socials a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid var(--rule);
    padding-bottom: 3px;
    transition: border-color 0.2s ease, color 0.2s ease;
  }
  .mini-socials a:hover {
    border-color: var(--ink);
    color: var(--accent);
  }

  .mini-footer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.75rem 1.5rem 2.5rem;
    border-top: 1px solid var(--rule);
    font-size: 0.75rem;
    color: var(--ink-faint);
  }
  @media (min-width: 768px) {
    .mini-footer {
      padding: 1.75rem 3rem 2.5rem;
    }
  }
  .mini-footer a {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--ink-faint);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  .mini-footer a:hover {
    color: var(--ink);
  }

  :global(.reveal) {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  :global(.reveal.is-visible) {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.reveal) {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
