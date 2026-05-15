<script>
  import "../app.css";
  import { onMount } from "svelte";
  import Header from "$lib/components/layout/Header.svelte";
  import PointCloudBackground from "$lib/components/features/PointCloudBackground.svelte";
  import BlackholeBackground from "$lib/components/features/BlackholeBackground.svelte";

  let { children } = $props();

  let bg = $state(null);

  onMount(() => {
    bg = Math.random() < 0.5 ? "point" : "blackhole";
  });
</script>

<Header />
{#if bg === "point"}
  <PointCloudBackground />
{:else if bg === "blackhole"}
  <BlackholeBackground />
{/if}
<div class="relative flex min-h-screen flex-col overflow-x-hidden">
  <main class="relative z-10 container mx-auto flex-grow max-w-screen-xl py-2">
    <div class="grid grid-cols-1 gap-8 lg:gap-10">
      <div class="min-w-0">{@render children()}</div>
    </div>
  </main>
</div>
