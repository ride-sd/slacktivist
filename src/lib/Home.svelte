<script>
  import { onMount } from 'svelte';
  import { link } from 'svelte-spa-router';

  let initiatives = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch('/data/initiatives.json');
      if (!response.ok) {
        throw new Error('Failed to load initiatives data');
      }
      const data = await response.json();
      initiatives = data;
      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
    }
  });

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
</script>

<div class="py-8">
  <section class="text-center mb-12">
    <h2 class="text-4xl font-bold mb-4 text-gray-800">Active Initiatives</h2>
    <p class="text-xl text-gray-600">Choose an initiative to view the template and submit your public comment</p>
  </section>

  {#if loading}
    <div class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p class="text-gray-600 text-lg font-medium">Loading initiatives...</p>
      </div>
    </div>
  {:else if error}
    <div class="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-red-800 mb-2">Error</h2>
      <p class="text-red-600">{error}</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
      {#each initiatives as initiative (initiative.slug)}
        <a
          href="/initiative/{initiative.slug}"
          use:link
          class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 block text-inherit no-underline group"
        >
          <div class="flex justify-between items-center mb-4">
            {#if initiative.metadata?.deadline}
              <span class="text-sm text-gray-500">Deadline: {formatDate(initiative.metadata.deadline)}</span>
            {/if}
          </div>
          <h3 class="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
            {initiative.metadata?.title}
          </h3>
          <p class="text-gray-600 mb-4 leading-relaxed">
            {initiative.metadata?.description}
          </p>
          <div class="border-t border-gray-200 pt-4 mt-4">
            <span class="text-blue-500 font-semibold group-hover:text-blue-600 transition-colors">
              View Template →
            </span>
          </div>
        </a>
      {/each}
    </div>
  {/if}

  <!-- Contribution Section -->
  <section class="mt-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 text-center">
    <div class="max-w-3xl mx-auto">
      <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </div>
      
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Help Grow This Platform</h2>
      <p class="text-xl text-gray-600 mb-6 leading-relaxed">
        Know about a local initiative that needs community input? You can help make civic engagement more accessible by adding new public comment opportunities to this platform.
      </p>
      
      <div class="bg-white rounded-xl p-6 mb-6 text-left max-w-2xl mx-auto">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">See an Example:</h3>
        <p class="text-gray-700 mb-4">
          Want to see how it works? Check out our example initiative about improving San Diego's bus rapid transit system. This shows how advocacy organizations can create effective public comment templates that make it easy for community members to participate in local government.
        </p>
        <a
          href="/initiative/make-the-215-faster"
          use:link
          class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          View Example: Make the 215 Faster
        </a>
      </div>
      
      <div class="bg-white rounded-xl p-6 mb-6 text-left max-w-2xl mx-auto">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">How to Contribute:</h3>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start">
            <span class="inline-block w-6 h-6 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mr-3 mt-0.5 flex items-center justify-center">1</span>
            Copy our initiative template with all the required fields
          </li>
          <li class="flex items-start">
            <span class="inline-block w-6 h-6 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mr-3 mt-0.5 flex items-center justify-center">2</span>
            Fill in the details about the initiative and create a comment template
          </li>
          <li class="flex items-start">
            <span class="inline-block w-6 h-6 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mr-3 mt-0.5 flex items-center justify-center">3</span>
            Test it locally to make sure everything works correctly
          </li>
          <li class="flex items-start">
            <span class="inline-block w-6 h-6 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mr-3 mt-0.5 flex items-center justify-center">4</span>
            Submit a pull request with your new initiative
          </li>
        </ul>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="https://github.com/ride-sd/slacktivist/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary inline-flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          Read Contributing Guide
        </a>
        <a
          href="https://github.com/ride-sd/slacktivist"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-secondary inline-flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  </section>
</div>
