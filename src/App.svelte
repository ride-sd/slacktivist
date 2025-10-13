<script>
  import Router from 'svelte-spa-router';
  import Home from './lib/Home.svelte';
  import InitiativeView from './lib/InitiativeView.svelte';

  const routes = {
    '/': Home,
    '/initiative/:slug': InitiativeView,
  };
</script>

<main class="min-h-screen flex flex-col">
  <header class="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white py-12 shadow-2xl relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-black opacity-10"></div>
    <div class="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
    <div class="absolute -bottom-5 -left-5 w-24 h-24 bg-white opacity-5 rounded-full"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center animate-fade-in">
        <h1 class="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          Slacktivist
        </h1>
        <p class="text-xl md:text-2xl opacity-90 font-light">
          Make Your Voice Heard
        </p>
        <div class="mt-6 flex justify-center">
          <div class="w-16 h-1 bg-white opacity-30 rounded-full"></div>
        </div>
      </div>
    </div>
  </header>

  <div class="container mx-auto px-6 py-8 flex-1">
    <Router {routes} />
  </div>

  <footer class="bg-gray-900 text-white py-8 mt-16">
    <div class="container mx-auto px-6 text-center">
      <p class="text-gray-300 font-medium">
        Powered by <span class="text-primary-400 font-semibold">Slacktivist</span> - Amplifying civic engagement
      </p>
      <div class="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
        <span>Built for advocates</span>
        <span>•</span>
        <span>Made with ❤️</span>
      </div>
    </div>
  </footer>
</main>

