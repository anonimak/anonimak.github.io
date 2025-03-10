<script>
  let { title, no, link, company, role, contribution, image } = $props();
  import Icon from "@iconify/svelte";
</script>

<article class="flex flex-col md:flex-row space-x-6">
  <h3 class="font-normal text-gray-400 text-3xl md:text-4xl">
    {no < 10 ? "0" + no : no}
  </h3>
  <span class="w-16 h-0.5 bg-gray-300 mt-5"></span>
  <div class="gap-4 flex flex-col">
    <a target="_blank" href={Array.isArray(link) ? link[0].url : link}>
      <div class="mockup-browser border-base-300 border w-full">
        <div class="mockup-browser-toolbar">
          <div class="input">{Array.isArray(link) ? link[0].url : link}</div>
        </div>
        <figure>
          <img src={image} alt={title} />
        </figure>
      </div>
    </a>
    <div>
      <h3 class="font-normal text-gray-300 text-xl md:text-2xl">
        {title}
      </h3>
      <h4 class="font-medium text-primary text-lg">
        {role} -
        {Array.isArray(company) ? company.join(", ") : company}
      </h4>
    </div>

    <ul class="list bg-base-100 rounded-box shadow-md">
      <li class="p-4 pb-2 text-sm opacity-80 font-bold tracking-wide">
        Contributions
      </li>

      {#each contribution as item}
        <li class="list-row">
          <div class="list-col-grow">
            <div class="text-sm text-gray-300 md:text-base opacity-80">
              {item}
            </div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</article>
