<script>
  import Icon from "@iconify/svelte";
  import {
    profile,
    experiences,
    groupExperiences,
    skills,
    professionalProjects,
    sideProjects,
  } from "$lib/data/data.js";
  import avatar from "$lib/assets/avatar.jpg";

  const timeline = groupExperiences(experiences);

  let activeTab = $state("professional");
  let activeProjects = $derived(
    activeTab === "professional" ? professionalProjects : sideProjects,
  );

  function companyLabel(item) {
    const c = item.company ?? item.clients;
    return Array.isArray(c) ? c.join(", ") : c;
  }

  function linkList(link) {
    if (!link) return [];
    if (Array.isArray(link)) return link;
    return [{ name: link.replace(/^https?:\/\//, ""), url: link }];
  }

  // One-shot scroll-reveal: fades/pops in any `.reveal-item` descendant of
  // the node this action is attached to, the first time it enters view.
  function reveal(node) {
    const items = node.querySelectorAll(".reveal-item");
    if (!items.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((item) => io.observe(item));
    return { destroy: () => io.disconnect() };
  }

  const currentYear = new Date().getFullYear();
</script>

<svelte:head>
  <title>{profile.name} · {profile.role}</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="y2k-theme">
  <!-- Nav -->
  <header class="y2k-nav-wrap">
    <nav class="y2k-nav">
      <a href="#hero" class="y2k-logo">JT<span class="chrome-text">.</span></a>
      <div class="y2k-nav-links">
        {#each profile.nav as link}
          <a href={link.href}>{link.label}</a>
        {/each}
      </div>
      <div class="y2k-badge">
        <span class="dot" aria-hidden="true"></span>
        {profile.availability}
      </div>
    </nav>
  </header>

  <!-- Hero -->
  <section id="hero" class="y2k-hero" use:reveal>
    <div
      class="blob blob-pink"
      style="top:-5rem;left:-6rem;width:24rem;height:24rem;"
      aria-hidden="true"
    ></div>
    <div
      class="blob blob-blue"
      style="bottom:-8rem;right:-6rem;width:28rem;height:28rem;"
      aria-hidden="true"
    ></div>
    <svg
      class="sparkle sparkle-a"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      ><path
        d="M12 0l2.2 8.1L22 10l-7.8 2.2L12 20l-2.2-7.8L2 10l7.8-1.9L12 0z"
      /></svg
    >
    <svg
      class="sparkle sparkle-b"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      ><path
        d="M12 0l2.2 8.1L22 10l-7.8 2.2L12 20l-2.2-7.8L2 10l7.8-1.9L12 0z"
      /></svg
    >
    <svg
      class="sparkle sparkle-c"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      ><path
        d="M12 0l2.2 8.1L22 10l-7.8 2.2L12 20l-2.2-7.8L2 10l7.8-1.9L12 0z"
      /></svg
    >

    <div class="y2k-container hero-grid">
      <div class="hero-copy">
        <p class="reveal-item eyebrow" style="transition-delay:40ms">
          <span class="dot" aria-hidden="true"></span>
          {profile.availability} · {profile.location}
        </p>
        <h1 class="reveal-item hero-headline" style="transition-delay:100ms">
          {profile.headline.prefix}
          <span class="holo-text">{profile.headline.highlight}</span>
          {profile.headline.suffix}
        </h1>
        <p class="reveal-item hero-tagline" style="transition-delay:160ms">
          {profile.tagline}
        </p>
        <div class="reveal-item hero-cta" style="transition-delay:220ms">
          <a href="#portfolio" class="gel-btn" style="--btn-color:#3b6dfb">
            View Projects
            <Icon icon="lucide:arrow-right" height={16} />
          </a>
          <a href="#contact" class="ghost-btn">
            <Icon icon="lucide:mail" height={16} />
            Get in touch
          </a>
        </div>
        <div class="reveal-item hero-stats" style="transition-delay:280ms">
          {#each profile.heroStats as stat, i}
            {#if i > 0}<span class="stat-sep" aria-hidden="true"></span>{/if}
            <div class="stat">
              <span class="stat-value holo-text">{stat.value}</span>
              <span class="stat-label">{stat.label}</span>
            </div>
          {/each}
        </div>
      </div>

      <div class="reveal-item hero-avatar-wrap" style="transition-delay:180ms">
        <div class="avatar-frame">
          <img src={avatar} alt={profile.name} width="256" height="256" />
        </div>
        <div class="avatar-chip">
          <p><strong>Stack</strong> {profile.stack}</p>
          <p><strong>Focus</strong> {profile.focus}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Skills -->
  <section id="skills" class="y2k-section" use:reveal>
    <div class="y2k-container">
      <div class="section-head reveal-item">
        <p class="kicker">Skills &amp; Tools</p>
        <h2 class="section-title">
          A toolkit <span class="holo-text">built for shipping.</span>
        </h2>
        <p class="section-desc">
          Frontend to backend, design to delivery — covering the full product
          lifecycle.
        </p>
      </div>
      <div class="skills-grid reveal-item" style="transition-delay:80ms">
        {#each skills as skill}
          <div class="skill-chip" title={skill.name}>
            <Icon icon={skill.icon} height={22} />
            <span>{skill.name}</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Experience -->
  <section id="experience" class="y2k-section alt" use:reveal>
    <div
      class="blob blob-lime blob-soft"
      style="top:2rem;right:-8rem;width:22rem;height:22rem;"
      aria-hidden="true"
    ></div>
    <div class="y2k-container">
      <div class="section-head reveal-item">
        <p class="kicker">Career Path</p>
        <h2 class="section-title">
          Experience <span class="holo-text">&amp; education</span>
        </h2>
        <p class="section-desc">
          A timeline of roles, projects, and learning milestones.
        </p>
      </div>
      <div class="timeline reveal-item" style="transition-delay:80ms">
        {#each timeline as item}
          <div class="timeline-item">
            <div class="timeline-node">
              <Icon
                icon={item.type === "edu"
                  ? "lucide:graduation-cap"
                  : "lucide:briefcase"}
                height={16}
              />
            </div>
            <div class="timeline-card">
              <p class="timeline-period">{item.period}</p>
              <h3>{item.company}</h3>
              <p class="timeline-desc">{item.description}</p>
              <div class="tag-row">
                {#each item.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>

              {#each item.concurrents as branch}
                <div class="branch-bubble">
                  <p class="branch-bubble-label">
                    &#10022; Concurrent &middot; {branch.period}
                  </p>
                  <h4>{branch.company}</h4>
                  <p>{branch.description}</p>
                  <div class="tag-row">
                    {#each branch.tags as tag}
                      <span class="tag">{tag}</span>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
      <div class="stat-bar reveal-item" style="transition-delay:120ms">
        {#each profile.experienceStats as stat, i}
          {#if i > 0}<span class="stat-sep" aria-hidden="true"></span>{/if}
          <div class="stat">
            <span class="stat-value holo-text">{stat.value}</span>
            <span class="stat-label">{stat.label}</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Projects -->
  <section id="portfolio" class="y2k-section" use:reveal>
    <div class="y2k-container">
      <div class="section-head reveal-item">
        <p class="kicker">Portfolio</p>
        <h2 class="section-title">
          Selected <span class="holo-text">projects.</span>
        </h2>
        <p class="section-desc">
          Real-world work across enterprise systems and personal builds.
        </p>
      </div>

      <div class="tabs reveal-item" style="transition-delay:60ms">
        <button
          type="button"
          class="tab"
          class:active={activeTab === "professional"}
          onclick={() => (activeTab = "professional")}
        >
          <Icon icon="lucide:briefcase" height={14} />
          Professional
          <span class="count">{professionalProjects.length}</span>
        </button>
        <button
          type="button"
          class="tab"
          class:active={activeTab === "side"}
          onclick={() => (activeTab = "side")}
        >
          <Icon icon="lucide:flask-conical" height={14} />
          Side Projects
          <span class="count">{sideProjects.length}</span>
        </button>
      </div>

      <div class="project-list">
        {#each activeProjects as item, index (item.title)}
          <article
            class="project-card reveal-item"
            style="transition-delay:{Math.min(index, 6) * 70}ms"
          >
            <div class="project-info">
              <div class="project-top">
                <span class="project-no" aria-hidden="true"
                  >{String(index + 1).padStart(2, "0")}</span
                >
                <span class="role-badge"
                  ><Icon icon="lucide:briefcase" height={10} />{item.role}</span
                >
              </div>
              <h3>{item.title}</h3>
              <p class="project-company">
                <Icon icon="lucide:building-2" height={12} />
                {companyLabel(item)}
              </p>
              <ul class="contrib-list">
                {#each item.contributions as c}
                  <li>
                    <Icon icon="lucide:sparkles" height={12} />
                    {c}
                  </li>
                {/each}
              </ul>
              {#if linkList(item.link).length}
                <div class="link-row">
                  {#each linkList(item.link) as l}
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="link-chip"
                    >
                      <Icon icon="lucide:external-link" height={12} />
                      {l.name}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
            {#if item.image}
              <div class="project-shot">
                <div class="browser-bar" aria-hidden="true">
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

  <!-- Contact / Footer -->
  <footer id="contact" class="y2k-footer" use:reveal>
    <div
      class="blob blob-blue blob-soft"
      style="top:-8rem;left:50%;transform:translateX(-50%);width:32rem;height:20rem;"
      aria-hidden="true"
    ></div>
    <div class="y2k-container">
      <div class="contact-card reveal-item">
        <p class="kicker center">Get In Touch</p>
        <h2 class="section-title center">
          {profile.contactHeadline.prefix}
          <span class="holo-text">{profile.contactHeadline.highlight}</span>
        </h2>
        <p class="section-desc center">{profile.contactBody}</p>
        <div class="social-row">
          {#each profile.socials as s}
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              class="social-btn"
            >
              <Icon icon={s.icon} height={18} />
            </a>
          {/each}
        </div>
      </div>

      <div class="footer-bottom">
        <span class="y2k-logo small"
          >JT<span class="chrome-text">.</span></span
        >
        <p>© {currentYear} {profile.name} · All rights reserved</p>
        <a href="#hero" class="back-top">
          <Icon icon="lucide:arrow-up" height={12} />
          Back to top
        </a>
      </div>
    </div>
  </footer>
</div>

<style>
  .y2k-theme {
    --ink: #1a1a2e;
    --muted: #5c5c78;
    --bg: #f6f5fb;
    --bg-alt: #ffffff;
    /* Named for their original hue, but re-tuned toward a calmer
       chrome/electric-blue Y2K-tech palette: --pink now carries the
       dominant accent role (was hot pink, now electric blue), --blue is
       the secondary teal, --lime stays a sparse, muted accent pop. */
    --pink: #3b6dfb;
    --blue: #00c2b8;
    --lime: #8fd13f;
    position: relative;
    min-height: 100vh;
    overflow: clip;
    background:
      radial-gradient(circle at 1px 1px, rgba(26, 26, 46, 0.06) 1px, transparent 0)
        0 0 / 22px 22px,
      var(--bg);
    color: var(--ink);
    font-family: "Inter", system-ui, sans-serif;
    padding-bottom: 5rem;
  }

  .y2k-container {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 1.25rem;
  }

  @media (min-width: 768px) {
    .y2k-container {
      padding: 0 2rem;
    }
  }

  /* Chrome / holo text */
  .chrome-text,
  .holo-text {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    background-size: 200% auto;
  }

  .chrome-text {
    background-image: linear-gradient(
      120deg,
      #b8c6d9 0%,
      #ffffff 25%,
      #8fa3bf 50%,
      #ffffff 75%,
      #b8c6d9 100%
    );
    animation: shift 6s ease-in-out infinite;
  }

  .holo-text {
    background-image: linear-gradient(
      100deg,
      #3b6dfb 0%,
      #00c2b8 45%,
      #8fd13f 75%,
      #3b6dfb 100%
    );
    animation: shift 5s ease-in-out infinite;
  }

  @keyframes shift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  /* Blobs & sparkles */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(50px);
    opacity: 0.45;
    pointer-events: none;
    z-index: 0;
    animation: float 9s ease-in-out infinite;
  }
  .blob-pink {
    background: radial-gradient(circle, var(--pink), transparent 70%);
  }
  .blob-blue {
    background: radial-gradient(circle, var(--blue), transparent 70%);
  }
  .blob-lime {
    background: radial-gradient(circle, var(--lime), transparent 70%);
  }
  .blob-soft {
    opacity: 0.3;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(12px, -22px);
    }
  }

  .sparkle {
    position: absolute;
    width: 1.1rem;
    height: 1.1rem;
    color: var(--pink);
    z-index: 1;
    animation: twinkle 2.6s ease-in-out infinite;
  }
  .sparkle-a {
    top: 14%;
    left: 6%;
    color: var(--blue);
    animation-delay: 0.2s;
  }
  .sparkle-b {
    top: 62%;
    left: 2%;
    color: var(--lime);
    animation-delay: 0.9s;
  }
  .sparkle-c {
    top: 20%;
    right: 8%;
    color: var(--pink);
    animation-delay: 1.4s;
  }

  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.25;
      transform: scale(0.8) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1.15) rotate(20deg);
    }
  }

  /* Nav */
  .y2k-nav-wrap {
    position: sticky;
    top: 0;
    z-index: 50;
    padding: 1rem 1.25rem 0;
  }
  .y2k-nav {
    max-width: 72rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-radius: 1.5rem;
    border: 1px solid rgba(26, 26, 46, 0.08);
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    padding: 0.7rem 1rem;
    box-shadow: 0 10px 30px rgba(26, 26, 46, 0.08);
  }
  .y2k-logo {
    font-family: "Orbitron", "Inter", system-ui, sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    color: var(--ink);
    text-decoration: none;
    flex-shrink: 0;
  }
  .y2k-logo.small {
    font-size: 1.15rem;
  }
  .y2k-nav-links {
    display: flex;
    gap: 0.25rem;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .y2k-nav-links::-webkit-scrollbar {
    display: none;
  }
  .y2k-nav-links a {
    white-space: nowrap;
    padding: 0.5rem 0.9rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted);
    text-decoration: none;
    transition: all 0.25s ease;
  }
  .y2k-nav-links a:hover,
  .y2k-nav-links a:focus-visible {
    background: rgba(26, 26, 46, 0.06);
    color: var(--ink);
  }
  .y2k-badge {
    display: none;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
    flex-shrink: 0;
    padding: 0.4rem 0.7rem;
    border-radius: 999px;
    background: rgba(26, 26, 46, 0.05);
  }
  @media (min-width: 640px) {
    .y2k-badge {
      display: inline-flex;
    }
  }

  .dot {
    display: inline-block;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 999px;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
  }

  /* Hero */
  .y2k-hero {
    position: relative;
    padding: 4.5rem 0 5rem;
  }
  .hero-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
  }
  @media (min-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1fr 320px;
      gap: 3.5rem;
    }
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--muted);
    margin: 0 0 1.25rem;
  }
  .hero-headline {
    font-family: "Orbitron", "Inter", system-ui, sans-serif;
    font-weight: 800;
    font-size: clamp(2.4rem, 6.6vw, 4.4rem);
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin: 0 0 1.25rem;
  }
  .hero-tagline {
    max-width: 34rem;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--muted);
    margin: 0 0 1.75rem;
  }
  .hero-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-bottom: 2.25rem;
  }
  .hero-stats {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }
  .stat {
    display: flex;
    flex-direction: column;
  }
  .stat-value {
    font-family: "Orbitron", "Inter", system-ui, sans-serif;
    font-weight: 800;
    font-size: 1.6rem;
  }
  .stat-label {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
  }
  .stat-sep {
    width: 1px;
    height: 1.75rem;
    background: rgba(26, 26, 46, 0.12);
  }

  .hero-avatar-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .avatar-frame {
    position: relative;
    width: 15rem;
    height: 15rem;
    max-width: 70vw;
    max-height: 70vw;
    border-radius: 999px;
    padding: 0.4rem;
    background: linear-gradient(135deg, var(--pink), var(--blue), var(--lime));
    box-shadow: 0 20px 50px rgba(26, 26, 46, 0.18);
  }
  .avatar-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 999px;
    border: 4px solid #fff;
  }
  .avatar-chip {
    width: 100%;
    border-radius: 1.25rem;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(26, 26, 46, 0.08);
    backdrop-filter: blur(10px);
    padding: 0.9rem 1.1rem;
    font-size: 0.78rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    box-shadow: 0 12px 30px rgba(26, 26, 46, 0.1);
  }
  .avatar-chip strong {
    color: var(--muted);
    font-weight: 700;
    margin-right: 0.35rem;
  }

  /* Buttons */
  .gel-btn,
  .ghost-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    border-radius: 999px;
    padding: 0.85rem 1.6rem;
    font-weight: 700;
    font-size: 0.85rem;
    text-decoration: none;
    transition:
      transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.3s ease;
  }
  .gel-btn {
    color: #1a1a2e;
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      var(--btn-color, var(--pink)) 60%,
      var(--btn-color, var(--pink)) 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      inset 0 -8px 12px rgba(0, 0, 0, 0.12),
      0 10px 24px rgba(255, 110, 199, 0.35);
  }
  .gel-btn:hover,
  .gel-btn:focus-visible {
    transform: translateY(-3px) scale(1.03);
  }
  .gel-btn:active {
    transform: translateY(0) scale(0.98);
  }
  .ghost-btn {
    color: var(--ink);
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(26, 26, 46, 0.14);
  }
  .ghost-btn:hover,
  .ghost-btn:focus-visible {
    transform: translateY(-3px);
    background: #fff;
  }

  /* Sections */
  .y2k-section {
    position: relative;
    padding: 4.5rem 0;
  }
  .y2k-section.alt {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.65) 15%,
      rgba(255, 255, 255, 0.65) 85%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  .section-head {
    max-width: 34rem;
    margin-bottom: 2.75rem;
  }
  .kicker {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    color: var(--pink);
    margin: 0 0 0.75rem;
  }
  .section-title {
    font-family: "Orbitron", "Inter", system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(1.9rem, 4vw, 2.75rem);
    line-height: 1.15;
    margin: 0 0 0.85rem;
  }
  .section-desc {
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.65;
    margin: 0;
  }
  .center {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  /* Skills */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  @media (min-width: 640px) {
    .skills-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (min-width: 1024px) {
    .skills-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  .skill-chip {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.9rem 1rem;
    border-radius: 1.1rem;
    background: #fff;
    border: 1.5px solid rgba(26, 26, 46, 0.08);
    box-shadow: 0 6px 16px rgba(26, 26, 46, 0.05);
    font-size: 0.8rem;
    font-weight: 600;
    transition:
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }
  .skill-chip:hover {
    transform: translateY(-3px) rotate(-1deg);
    border-color: var(--pink);
    box-shadow: 0 12px 26px rgba(255, 110, 199, 0.22);
  }

  /* Timeline */
  .timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-left: 3px dashed rgba(26, 26, 46, 0.15);
    padding-left: 1.5rem;
  }
  .timeline-item {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .timeline-node {
    position: absolute;
    left: -2.35rem;
    top: 0;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--pink), var(--blue));
    color: #fff;
    box-shadow: 0 6px 16px rgba(26, 26, 46, 0.15);
  }
  .timeline-card {
    background: #fff;
    border: 1.5px solid rgba(26, 26, 46, 0.08);
    border-radius: 1.25rem;
    padding: 1.25rem 1.4rem;
    box-shadow: 0 10px 26px rgba(26, 26, 46, 0.06);
  }
  .timeline-period {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--pink);
    margin: 0 0 0.4rem;
  }
  .timeline-card h3 {
    margin: 0 0 0.5rem;
    font-family: "Orbitron", "Inter", system-ui, sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
  }
  .timeline-desc {
    margin: 0 0 0.75rem;
    font-size: 0.85rem;
    line-height: 1.65;
    color: var(--muted);
  }
  .branch-bubble {
    margin-top: 1rem;
    padding: 1rem 1.1rem;
    border-radius: 1rem;
    border: 1.5px dashed rgba(255, 110, 199, 0.4);
    background: linear-gradient(
      135deg,
      rgba(255, 110, 199, 0.06),
      rgba(0, 229, 255, 0.06)
    );
  }
  .branch-bubble-label {
    margin: 0 0 0.4rem;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--pink);
  }
  .branch-bubble h4 {
    margin: 0 0 0.5rem;
    font-family: "Orbitron", "Inter", system-ui, sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
  }
  .branch-bubble > p {
    margin: 0 0 0.6rem;
    font-size: 0.8rem;
    line-height: 1.6;
    color: var(--muted);
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .tag {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    background: rgba(0, 229, 255, 0.12);
    color: #0891a8;
  }

  .stat-bar {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1.5px dashed rgba(26, 26, 46, 0.15);
  }

  /* Tabs */
  .tabs {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1.75rem;
    flex-wrap: wrap;
  }
  .tab {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.1rem;
    border-radius: 999px;
    border: 1.5px solid rgba(26, 26, 46, 0.1);
    background: #fff;
    color: var(--muted);
    font-weight: 700;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .tab.active {
    color: #1a1a2e;
    border-color: var(--pink);
    background: linear-gradient(
      180deg,
      #fff,
      rgba(255, 110, 199, 0.18)
    );
    box-shadow: 0 8px 18px rgba(255, 110, 199, 0.2);
  }
  .tab .count {
    font-size: 0.65rem;
    padding: 0.1rem 0.4rem;
    border-radius: 999px;
    background: rgba(26, 26, 46, 0.08);
  }

  /* Project cards */
  .project-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .project-card {
    display: grid;
    grid-template-columns: 1fr;
    border-radius: 1.5rem;
    overflow: hidden;
    background: #fff;
    border: 1.5px solid rgba(26, 26, 46, 0.08);
    box-shadow: 0 14px 34px rgba(26, 26, 46, 0.07);
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .project-card:hover {
    transform: translateY(-4px);
  }
  @media (min-width: 1024px) {
    .project-card {
      grid-template-columns: 1fr 22rem;
    }
  }
  .project-info {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }
  .project-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .project-no {
    font-family: "Orbitron", "Inter", system-ui, sans-serif;
    font-size: 2.2rem;
    font-weight: 800;
    color: rgba(26, 26, 46, 0.08);
  }
  .role-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    background: rgba(255, 110, 199, 0.14);
    color: #c2418f;
  }
  .project-info h3 {
    margin: 0;
    font-family: "Orbitron", "Inter", system-ui, sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
  }
  .project-company {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    font-size: 0.78rem;
    color: var(--muted);
  }
  .contrib-list {
    list-style: none;
    margin: 0.25rem 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }
  .contrib-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.82rem;
    line-height: 1.6;
    color: var(--muted);
  }
  .contrib-list :global(svg) {
    margin-top: 0.2rem;
    flex-shrink: 0;
    color: var(--pink);
  }
  .link-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.4rem;
  }
  .link-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--ink);
    text-decoration: none;
    padding: 0.5rem 0.85rem;
    border-radius: 999px;
    background: rgba(0, 229, 255, 0.12);
    transition: all 0.25s ease;
  }
  .link-chip:hover,
  .link-chip:focus-visible {
    background: rgba(0, 229, 255, 0.22);
    transform: translateY(-2px);
  }

  .project-shot {
    position: relative;
    border-top: 1.5px solid rgba(26, 26, 46, 0.08);
    background: #f2f1f8;
  }
  @media (min-width: 1024px) {
    .project-shot {
      border-top: none;
      border-left: 1.5px solid rgba(26, 26, 46, 0.08);
    }
  }
  .browser-bar {
    display: flex;
    gap: 0.35rem;
    padding: 0.6rem 0.8rem;
    background: rgba(26, 26, 46, 0.04);
  }
  .browser-bar span {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    background: rgba(26, 26, 46, 0.16);
  }
  .project-shot img {
    width: 100%;
    max-height: 15.5rem;
    object-fit: cover;
    object-position: top;
  }

  /* Contact */
  .y2k-footer {
    position: relative;
    padding-top: 3rem;
  }
  .contact-card {
    position: relative;
    z-index: 1;
    max-width: 40rem;
    margin: 0 auto;
    text-align: center;
    background: #fff;
    border: 1.5px solid rgba(26, 26, 46, 0.08);
    border-radius: 2rem;
    padding: 3rem 2rem;
    box-shadow: 0 24px 60px rgba(26, 26, 46, 0.1);
  }
  .contact-card .section-title,
  .contact-card .section-desc {
    max-width: none;
  }
  .social-row {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 1.75rem;
  }
  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.9rem;
    height: 2.9rem;
    border-radius: 999px;
    background: linear-gradient(135deg, #fff, rgba(255, 110, 199, 0.16));
    border: 1.5px solid rgba(26, 26, 46, 0.1);
    color: var(--ink);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .social-btn:hover,
  .social-btn:focus-visible {
    transform: translateY(-3px) scale(1.06);
    border-color: var(--pink);
  }
  .footer-bottom {
    position: relative;
    z-index: 1;
    max-width: 72rem;
    margin: 2.5rem auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem 0 0;
    font-size: 0.75rem;
    color: var(--muted);
  }
  @media (min-width: 640px) {
    .footer-bottom {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .back-top {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--ink);
    text-decoration: none;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
  }

  /* Scroll reveal */
  .reveal-item {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
    transition:
      opacity 0.6s ease,
      transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .reveal-item:global(.is-visible) {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  @media (prefers-reduced-motion: reduce) {
    .blob,
    .sparkle,
    .chrome-text,
    .holo-text {
      animation: none !important;
    }
    .reveal-item {
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style>
