<script>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { THEMES, pickRandomTheme, themeById } from "$lib/theme.js";

  import MinimalistTheme from "$lib/themes/minimalist/MinimalistTheme.svelte";
  import SwissTheme from "$lib/themes/swiss/SwissTheme.svelte";
  import Y2kTheme from "$lib/themes/y2k/Y2kTheme.svelte";
  import CybercoreTheme from "$lib/themes/cybercore/CybercoreTheme.svelte";
  import SurrealismTheme from "$lib/themes/surrealism/SurrealismTheme.svelte";

  const themeComponents = {
    minimalist: MinimalistTheme,
    swiss: SwissTheme,
    y2k: Y2kTheme,
    cybercore: CybercoreTheme,
    surrealism: SurrealismTheme,
  };

  let themeId = $state(null);
  let ActiveTheme = $derived(themeId ? themeComponents[themeId] : null);
  let activeMeta = $derived(themeId ? themeById(themeId) : null);

  function shuffle() {
    themeId = pickRandomTheme(themeId);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  onMount(() => {
    themeId = pickRandomTheme();
  });
</script>

{#if ActiveTheme}
  <ActiveTheme />

  <div class="theme-switcher">
    <button
      type="button"
      onclick={shuffle}
      aria-label={`Shuffle design style (currently ${activeMeta.name})`}
      title={`Currently: ${activeMeta.name} — click to try another style`}
    >
      <Icon icon="lucide:shuffle" height={16} />
    </button>
  </div>
{:else}
  <div class="boot-screen" aria-hidden="true">
    <span>JT.</span>
  </div>
{/if}

<style>
  .boot-screen {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0a;
    color: #fafafa;
    font-family: "Space Grotesk", system-ui, sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .theme-switcher {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 999;
  }

  .theme-switcher button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(10, 10, 10, 0.82);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #f5f5f5;
    padding: 0;
    cursor: pointer;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
    transition:
      transform 0.25s ease,
      border-color 0.25s ease,
      background 0.25s ease;
  }

  .theme-switcher button:hover,
  .theme-switcher button:focus-visible {
    transform: translateY(-2px) rotate(90deg);
    border-color: rgba(255, 255, 255, 0.32);
    background: rgba(20, 20, 20, 0.92);
  }

  .theme-switcher button:active {
    transform: translateY(0) rotate(90deg);
  }
</style>
