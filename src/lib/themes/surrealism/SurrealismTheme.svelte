<script>
  import { onMount } from "svelte";
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
    { id: "side", label: "Side Projects", data: sideProjects },
  ];

  let activeTab = $state("professional");
  let activeProjects = $derived(
    tabs.find((t) => t.id === activeTab)?.data ?? [],
  );

  function projectHref(link) {
    if (Array.isArray(link)) return link[0]?.url ?? null;
    return link || null;
  }
  function displayUrl(href) {
    return href ? href.replace(/^https?:\/\//, "") : "";
  }
  function companyLine(item) {
    const c = item.company ?? item.clients;
    return Array.isArray(c) ? c.join(", ") : c;
  }

  let year = new Date().getFullYear();

  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,500;1,600&family=Inter:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="surreal" class:is-in={mounted}>
  <!-- Ambient drifting blobs -->
  <div class="blob blob--pink" aria-hidden="true"></div>
  <div class="blob blob--lav" aria-hidden="true"></div>
  <div class="blob blob--sky" aria-hidden="true"></div>
  <div class="blob blob--sm" aria-hidden="true"></div>

  <header class="s-header">
    <a href="#hero" class="s-word">
      {profile.initials}<span class="s-word__dot">.</span>
    </a>
    <nav class="s-nav" aria-label="Primary">
      {#each profile.nav as link}
        <a href={link.href}>{link.label}</a>
      {/each}
    </nav>
  </header>

  <main>
    <!-- HERO -->
    <section id="hero" class="s-hero">
      <div class="s-hero__grid">
        <div class="s-hero__text">
          <p class="s-eyebrow">
            <span class="s-dot" aria-hidden="true"></span>
            {profile.availability} · {profile.location}
          </p>
          <h1 class="s-h1">
            {profile.headline.prefix}
            <em>{profile.headline.highlight}</em><br />
            {profile.headline.suffix}
          </h1>
          <p class="s-lede">{profile.tagline}</p>

          <div class="s-cta">
            <a href="#portfolio" class="s-btn s-btn--fill">
              View projects
              <Icon icon="lucide:arrow-right" height={15} />
            </a>
            <a href="#contact" class="s-btn s-btn--ghost">
              <Icon icon="lucide:mail" height={15} />
              Get in touch
            </a>
          </div>

          <div class="s-stats">
            {#each profile.heroStats as stat, i}
              {#if i > 0}<span class="s-stats__sep" aria-hidden="true"
                ></span>{/if}
              <div class="s-stat">
                <span class="s-stat__v">{stat.value}</span>
                <span class="s-stat__l">{stat.label}</span>
              </div>
            {/each}
          </div>
        </div>

        <div class="s-hero__portrait">
          <div class="s-frame">
            <img src={avatar} alt={profile.name} />
          </div>
          <p class="s-portrait-cap">{profile.motto}</p>
        </div>
      </div>
    </section>

    <!-- SKILLS -->
    <section id="skills" class="s-section">
      <div class="s-section__head">
        <p class="s-eyebrow">Skills &amp; Tools</p>
        <h2 class="s-h2">A toolkit for<br /><em>quietly impossible</em> work.</h2>
      </div>
      <ul class="s-skills">
        {#each skills as item, i}
          <li class="s-skill" style="--tilt: {(i % 5) - 2}deg">
            <Icon icon={item.icon} height={20} />
            <span>{item.name}</span>
          </li>
        {/each}
      </ul>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience" class="s-section s-section--tint">
      <div class="s-section__head">
        <p class="s-eyebrow">Career Path</p>
        <h2 class="s-h2">Experience &amp;<br /><em>education</em></h2>
      </div>

      <ol class="s-timeline">
        {#each timeline as item, i}
          <li class="s-tl-item" class:s-tl-item--alt={i % 2 === 1}>
            <div class="s-tl-icon">
              <Icon
                icon={item.type === "edu"
                  ? "lucide:graduation-cap"
                  : "lucide:briefcase"}
                height={16}
              />
            </div>
            <div class="s-tl-card">
              <p class="s-tl-period">{item.period}</p>
              <h3>{item.company}</h3>
              <p class="s-tl-desc">{item.description}</p>
              <div class="s-tags">
                {#each item.tags as tag}
                  <span>{tag}</span>
                {/each}
              </div>

              {#each item.concurrents as branch}
                <div class="s-tl-branch">
                  <p class="s-tl-branch__label"><em>— pursued alongside —</em></p>
                  <p class="s-tl-period">{branch.period}</p>
                  <h4>{branch.company}</h4>
                  <p class="s-tl-desc">{branch.description}</p>
                  <div class="s-tags">
                    {#each branch.tags as tag}
                      <span>{tag}</span>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </li>
        {/each}
      </ol>

      <div class="s-stats s-stats--line">
        {#each profile.experienceStats as stat, i}
          {#if i > 0}<span class="s-stats__sep" aria-hidden="true"></span>{/if}
          <div class="s-stat">
            <span class="s-stat__v">{stat.value}</span>
            <span class="s-stat__l">{stat.label}</span>
          </div>
        {/each}
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="portfolio" class="s-section">
      <div class="s-section__head">
        <p class="s-eyebrow">Portfolio</p>
        <h2 class="s-h2">Selected<br /><em>projects</em></h2>
      </div>

      <div class="s-tabs" role="tablist" aria-label="Project category">
        {#each tabs as tab}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            class:is-active={activeTab === tab.id}
            onclick={() => (activeTab = tab.id)}
          >
            {tab.label}
            <span>{tab.data.length}</span>
          </button>
        {/each}
      </div>

      <div class="s-projects">
        {#each activeProjects as item, index (item.title)}
          {@const href = projectHref(item.link)}
          <article class="s-project" class:s-project--alt={index % 2 === 1}>
            <div class="s-project__media">
              {#if item.image}
                <img src={item.image} alt={item.title} loading="lazy" />
              {:else}
                <div class="s-project__placeholder">
                  <Icon icon="lucide:monitor" height={28} />
                </div>
              {/if}
            </div>
            <div class="s-project__body">
              <span class="s-project__no">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p class="s-project__meta">
                <Icon icon="lucide:building-2" height={12} />
                {companyLine(item)} · {item.role}
              </p>
              <ul class="s-project__contrib">
                {#each item.contributions as c}
                  <li>{c}</li>
                {/each}
              </ul>
              {#if href}
                <a {href} target="_blank" rel="noopener noreferrer" class="s-project__link">
                  <Icon icon="lucide:external-link" height={12} />
                  {displayUrl(href)}
                </a>
              {/if}
            </div>
          </article>
        {/each}
      </div>
    </section>

    <!-- CONTACT -->
    <footer id="contact" class="s-footer">
      <div class="s-footer__card">
        <p class="s-eyebrow">Get in touch</p>
        <h2 class="s-h2">
          {profile.contactHeadline.prefix}<br />
          <em>{profile.contactHeadline.highlight}</em>
        </h2>
        <p class="s-lede">{profile.contactBody}</p>
        <div class="s-socials">
          {#each profile.socials as s}
            <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <Icon icon={s.icon} height={17} />
              <span>{s.label}</span>
            </a>
          {/each}
        </div>
      </div>

      <div class="s-footer__bottom">
        <span class="s-word s-word--sm">{profile.initials}<span class="s-word__dot">.</span></span>
        <p>© {year} {profile.name} · All rights reserved</p>
        <a href="#hero" class="s-back-top">
          <Icon icon="lucide:arrow-up" height={12} />
          Back to top
        </a>
      </div>
    </footer>
  </main>
</div>

<style>
  .surreal {
    --ink: #3d2b1f;
    --accent: #b5533c;
    --pink: #f2d9d9;
    --lav: #d9d2f0;
    --sky: #d2e8f0;
    position: relative;
    isolation: isolate;
    min-height: 100vh;
    overflow: clip;
    color: var(--ink);
    font-family: "Inter", system-ui, sans-serif;
    background: linear-gradient(
      170deg,
      var(--pink) 0%,
      var(--lav) 48%,
      var(--sky) 100%
    );
  }

  .surreal em {
    font-family: "Fraunces", serif;
    font-style: italic;
    font-weight: 500;
  }

  /* ---------- ambient blobs ---------- */
  .blob {
    position: absolute;
    z-index: 0;
    border-radius: 42% 58% 61% 39% / 43% 40% 60% 57%;
    filter: blur(48px);
    opacity: 0.55;
    pointer-events: none;
  }
  .blob--pink {
    top: -6rem;
    left: -8rem;
    width: 26rem;
    height: 22rem;
    background: radial-gradient(circle at 30% 30%, #f7c6c6, transparent 70%);
    animation: drift1 26s ease-in-out infinite alternate;
  }
  .blob--lav {
    top: 30%;
    right: -10rem;
    width: 30rem;
    height: 26rem;
    background: radial-gradient(circle at 60% 40%, #cabcf0, transparent 70%);
    animation: drift2 32s ease-in-out infinite alternate;
  }
  .blob--sky {
    bottom: -8rem;
    left: 10%;
    width: 28rem;
    height: 24rem;
    background: radial-gradient(circle at 40% 60%, #bfe1ef, transparent 70%);
    animation: drift1 30s ease-in-out infinite alternate-reverse;
  }
  .blob--sm {
    top: 55%;
    left: 45%;
    width: 14rem;
    height: 14rem;
    background: radial-gradient(circle, #e7bfa5, transparent 70%);
    opacity: 0.4;
    animation: drift2 20s ease-in-out infinite alternate;
  }

  @keyframes drift1 {
    from {
      transform: translate(0, 0) rotate(0deg);
    }
    to {
      transform: translate(3rem, 4rem) rotate(12deg);
    }
  }
  @keyframes drift2 {
    from {
      transform: translate(0, 0) rotate(0deg);
    }
    to {
      transform: translate(-4rem, -2rem) rotate(-10deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .blob {
      animation: none !important;
    }
  }

  /* ---------- header ---------- */
  .s-header {
    position: relative;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 78rem;
    margin: 0 auto;
    padding: 1.75rem 1.5rem;
  }
  .s-word {
    font-family: "Fraunces", serif;
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--ink);
    text-decoration: none;
  }
  .s-word--sm {
    font-size: 1.1rem;
  }
  .s-word__dot {
    color: var(--accent);
  }
  .s-nav {
    display: none;
    gap: 1.75rem;
  }
  .s-nav a {
    color: var(--ink);
    opacity: 0.65;
    text-decoration: none;
    font-size: 0.85rem;
    letter-spacing: 0.02em;
    transition: opacity 0.25s ease;
  }
  .s-nav a:hover,
  .s-nav a:focus-visible {
    opacity: 1;
  }
  @media (min-width: 768px) {
    .s-nav {
      display: flex;
    }
  }

  /* ---------- shared type ---------- */
  .s-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.28em;
    font-weight: 600;
    color: var(--accent);
    margin: 0 0 1rem;
  }
  .s-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--accent);
    display: inline-block;
  }
  .s-h1 {
    font-family: "Fraunces", serif;
    font-weight: 600;
    font-size: clamp(2.6rem, 6.2vw, 4.6rem);
    line-height: 1.05;
    margin: 0 0 1.25rem;
    letter-spacing: -0.01em;
  }
  .s-h2 {
    font-family: "Fraunces", serif;
    font-weight: 600;
    font-size: clamp(2.1rem, 4.4vw, 3.2rem);
    line-height: 1.1;
    margin: 0 0 2.5rem;
  }
  .s-lede {
    font-size: 1.05rem;
    line-height: 1.75;
    max-width: 34rem;
    opacity: 0.82;
    margin: 0 0 2rem;
  }

  /* ---------- hero ---------- */
  .s-hero {
    position: relative;
    z-index: 10;
    max-width: 78rem;
    margin: 0 auto;
    padding: 2rem 1.5rem 6rem;
  }
  .s-hero__grid {
    display: grid;
    gap: 3.5rem;
    align-items: center;
  }
  @media (min-width: 960px) {
    .s-hero__grid {
      grid-template-columns: 1.15fr 0.85fr;
      gap: 2rem;
    }
    .s-hero__portrait {
      transform: translateY(-1.5rem) rotate(2deg);
    }
  }

  .s-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2.5rem;
  }
  .s-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 1.5rem;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .s-btn--fill {
    background: var(--ink);
    color: #fbeee5;
    box-shadow: 0 10px 26px rgba(61, 43, 31, 0.25);
  }
  .s-btn--ghost {
    border: 1px solid rgba(61, 43, 31, 0.3);
    color: var(--ink);
    background: rgba(255, 255, 255, 0.35);
  }
  .s-btn:hover,
  .s-btn:focus-visible {
    transform: translateY(-2px);
  }

  .s-stats {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .s-stats--line {
    border-top: 1px solid rgba(61, 43, 31, 0.15);
    padding-top: 1.75rem;
    margin-top: 3rem;
  }
  .s-stats__sep {
    width: 1px;
    height: 1.75rem;
    background: rgba(61, 43, 31, 0.2);
  }
  .s-stat {
    display: flex;
    flex-direction: column;
  }
  .s-stat__v {
    font-family: "Fraunces", serif;
    font-weight: 600;
    font-size: 1.4rem;
  }
  .s-stat__l {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    opacity: 0.55;
  }

  .s-hero__portrait {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .s-frame {
    width: min(20rem, 80vw);
    aspect-ratio: 1;
    border-radius: 58% 42% 39% 61% / 55% 48% 52% 45%;
    overflow: hidden;
    border: 6px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 30px 60px -20px rgba(61, 43, 31, 0.35);
  }
  .s-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .s-portrait-cap {
    font-family: "Fraunces", serif;
    font-style: italic;
    text-align: center;
    opacity: 0.7;
    font-size: 0.9rem;
    max-width: 16rem;
  }

  /* ---------- generic section ---------- */
  .s-section {
    position: relative;
    z-index: 10;
    max-width: 78rem;
    margin: 0 auto;
    padding: 5rem 1.5rem;
  }
  .s-section--tint {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 3rem;
    max-width: 74rem;
  }
  .s-section__head {
    margin-bottom: 3rem;
    max-width: 34rem;
  }

  /* ---------- skills ---------- */
  .s-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .s-skill {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.7rem 1.1rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.55);
    border: 1px solid rgba(61, 43, 31, 0.12);
    font-size: 0.82rem;
    font-weight: 500;
    transform: rotate(var(--tilt, 0deg));
    transition: transform 0.3s ease, background 0.3s ease;
  }
  .s-skill:hover {
    transform: rotate(0deg) translateY(-2px);
    background: #fff;
  }

  /* ---------- timeline ---------- */
  .s-timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }
  .s-tl-item {
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    gap: 1.25rem;
  }
  .s-tl-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
  }
  .s-tl-card {
    background: rgba(255, 255, 255, 0.55);
    border-radius: 1.5rem;
    padding: 1.5rem 1.75rem;
  }
  .s-tl-item--alt .s-tl-card {
    border-radius: 0.5rem 1.5rem 1.5rem 1.5rem;
  }
  .s-tl-period {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    opacity: 0.5;
    margin: 0 0 0.4rem;
  }
  .s-tl-card h3 {
    font-family: "Fraunces", serif;
    font-weight: 600;
    font-size: 1.15rem;
    margin: 0 0 0.6rem;
  }
  .s-tl-desc {
    font-size: 0.88rem;
    line-height: 1.65;
    opacity: 0.78;
    margin: 0 0 0.9rem;
  }
  .s-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .s-tags span {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    background: rgba(181, 83, 60, 0.1);
    color: var(--accent);
  }

  .s-tl-branch {
    margin-top: 1.35rem;
    margin-left: 1.5rem;
    padding: 1.1rem 1.35rem;
    border-radius: 0.5rem 1.25rem 1.25rem 1.25rem;
    background: rgba(255, 255, 255, 0.4);
    border: 1.5px dashed rgba(61, 43, 31, 0.2);
    transform: rotate(-1deg);
  }
  .s-tl-branch__label {
    margin: 0 0 0.5rem;
    font-family: "Fraunces", serif;
    font-size: 0.8rem;
    opacity: 0.6;
  }
  .s-tl-branch h4 {
    font-family: "Fraunces", serif;
    font-weight: 600;
    font-size: 1rem;
    margin: 0 0 0.55rem;
  }

  @media (min-width: 768px) {
    .s-tl-item {
      grid-template-columns: 3rem 1fr;
    }
  }

  /* ---------- projects ---------- */
  .s-tabs {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 2.5rem;
  }
  .s-tabs button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.1rem;
    border-radius: 999px;
    border: 1px solid rgba(61, 43, 31, 0.18);
    background: rgba(255, 255, 255, 0.4);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--ink);
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .s-tabs button span {
    font-size: 0.68rem;
    opacity: 0.6;
  }
  .s-tabs button.is-active {
    background: var(--ink);
    color: #fbeee5;
    border-color: var(--ink);
  }

  .s-projects {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
  .s-project {
    display: grid;
    gap: 1.75rem;
    align-items: center;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 2rem;
    padding: 1.5rem;
  }
  @media (min-width: 900px) {
    .s-project {
      grid-template-columns: 0.85fr 1.15fr;
      padding: 1.75rem;
    }
    .s-project--alt {
      grid-template-columns: 1.15fr 0.85fr;
    }
    .s-project--alt .s-project__media {
      order: 2;
    }
  }
  .s-project__media {
    border-radius: 1.5rem;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: rgba(61, 43, 31, 0.06);
  }
  .s-project__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .s-project__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.3;
  }
  .s-project__body {
    padding: 0.5rem 1rem 0.5rem 0;
    position: relative;
  }
  .s-project__no {
    font-family: "Fraunces", serif;
    font-style: italic;
    font-size: 2.2rem;
    opacity: 0.18;
    display: block;
    line-height: 1;
  }
  .s-project__body h3 {
    font-family: "Fraunces", serif;
    font-weight: 600;
    font-size: 1.4rem;
    margin: 0.25rem 0 0.5rem;
  }
  .s-project__meta {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    opacity: 0.6;
    margin: 0 0 1rem;
  }
  .s-project__contrib {
    list-style: none;
    margin: 0 0 1.25rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .s-project__contrib li {
    font-size: 0.85rem;
    line-height: 1.6;
    opacity: 0.78;
    padding-left: 1.1rem;
    position: relative;
  }
  .s-project__contrib li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.55rem;
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: var(--accent);
  }
  .s-project__link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent);
    text-decoration: none;
  }
  .s-project__link:hover {
    text-decoration: underline;
  }

  /* ---------- footer ---------- */
  .s-footer {
    position: relative;
    z-index: 10;
    max-width: 78rem;
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;
  }
  .s-footer__card {
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 2.5rem;
    padding: 4rem 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .s-footer__card .s-lede {
    margin-left: auto;
    margin-right: auto;
  }
  .s-socials {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
  .s-socials a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.2rem;
    border-radius: 999px;
    background: #fff;
    color: var(--ink);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    transition: transform 0.25s ease;
  }
  .s-socials a:hover,
  .s-socials a:focus-visible {
    transform: translateY(-2px);
  }
  .s-footer__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2.5rem;
    font-size: 0.78rem;
    opacity: 0.65;
    text-align: center;
  }
  .s-back-top {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    text-decoration: none;
    color: var(--ink);
  }
  @media (min-width: 640px) {
    .s-footer__bottom {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
