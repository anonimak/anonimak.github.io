<script>
  import Icon from "@iconify/svelte";
</script>

<footer
  class="footer footer-horizontal footer-center bg-base-300 text-primary-content p-10"
>
  <div class="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
    <div class="text-center">
      <h2 class=" text-gray-300 text-2xl md:text-3xl mb-5">Contact</h2>

      <p class="font-normal text-gray-400 text-md md:text-lg">
        I'm currently looking for new opportunities and would love to hear from
        you. Whether you have a question, a project proposal, or just want to
        connect, feel free to reach out through my social media channels.
      </p>
    </div>
  </div>
  <div class="card-actions justify-center">
    <a
      target="_blank"
      href="https://github.com/anonimak"
      class="btn btn-ghost btn-circle"
    >
      <Icon icon="entypo-social:github" class="text-primary" height={24} /></a
    >
    <a
      target="_blank"
      href="https://www.linkedin.com/in/jonatanteofilus5ba43a182"
      class="btn btn-ghost btn-circle"
    >
      <Icon icon="entypo-social:linkedin" class="text-primary" height={24} />
    </a>
    <a
      target="_blank"
      href="https://instagram.com/jonatan_teofilus"
      class="btn btn-ghost btn-circle"
    >
      <Icon icon="entypo-social:instagram" class="text-primary" height={24} />
    </a>
  </div>
  <aside>
    <p>
      Copyright © {new Date().getFullYear()} Jonatan Teofilus - All right reserved
    </p>
  </aside>
</footer>
