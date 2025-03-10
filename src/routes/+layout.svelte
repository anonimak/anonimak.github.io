<script>
  export const prerender = true;
  import "../app.css";
  import Header from "$lib/components/layout/Header.svelte";
  import ProfileCard from "$lib/components/features/ProfileCard.svelte";

  let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
  <Header />
  <main
    class="flex-grow container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-24 py-24"
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="relative">
        <ProfileCard />
      </div>
      <div class="col-span-2">{@render children()}</div>
    </div>
  </main>
</div>
