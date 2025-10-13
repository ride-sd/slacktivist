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
</div>
