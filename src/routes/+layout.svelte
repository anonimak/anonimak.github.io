<script>
  import "../app.css";
  import Header from "$lib/components/layout/Header.svelte";
  import HeroScene from "$lib/components/features/BlackholeBackground.svelte";
  import ProfileCard from "$lib/components/features/ProfileCard.svelte";
  import BlackholeBackground from "$lib/components/features/BlackholeBackground.svelte";

  let { children } = $props();
</script>

<Header />
<BlackholeBackground />
<div class="relative flex min-h-screen flex-col overflow-x-hidden">
  <HeroScene />
  <main class="relative z-10 container mx-auto flex-grow max-w-screen-xl py-2">
    <div class="grid grid-cols-1 gap-8 lg:gap-10">
      <div class="min-w-0">{@render children()}</div>
    </div>
  </main>
</div>
