<script>
  import Router from 'svelte-spa-router';
  import InitiativeView from './lib/InitiativeView.svelte';

  const routes = {
    '/:slug': InitiativeView,
  };
</script>

<main>
  <header>
    <div class="container">
      <h1 class="logo">SoapCast</h1>
      <p class="tagline">Make Your Voice Heard</p>
    </div>
  </header>

  <div class="container">
    <Router {routes} />
  </div>

  <footer>
    <div class="container">
      <p>Powered by SoapCast - Amplifying civic engagement</p>
    </div>
  </footer>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
  }

  :global(*) {
    box-sizing: border-box;
  }

  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .logo {
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
  }

  .tagline {
    margin: 0.5rem 0 0 0;
    font-size: 1.1rem;
    opacity: 0.9;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    flex: 1;
  }

  footer {
    background-color: #2d3748;
    color: white;
    padding: 2rem 0;
    margin-top: 4rem;
    text-align: center;
  }

  footer p {
    margin: 0;
    opacity: 0.8;
  }
</style>
