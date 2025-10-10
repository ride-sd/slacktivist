<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import Handlebars from 'handlebars';

  export let params = {};

  let loading = true;
  let error = null;
  let templateContent = '';
  let editableContent = '';
  let metadata = {};
  let templateVariables = [];
  let formData = {};

  // Extract variables from Handlebars template
  function extractVariables(template) {
    const regex = /\{\{([^}]+)\}\}/g;
    const variables = new Set();
    let match;

    while ((match = regex.exec(template)) !== null) {
      const varName = match[1].trim();
      variables.add(varName);
    }

    return Array.from(variables);
  }

  // Compile and render template with form data
  function renderTemplate() {
    try {
      const template = Handlebars.compile(templateContent);
      editableContent = template(formData);
    } catch (err) {
      console.error('Template rendering error:', err);
    }
  }

  // Initialize form data when variables change
  $: if (templateVariables.length > 0 && Object.keys(formData).length === 0) {
    templateVariables.forEach(varName => {
      formData[varName] = '';
    });
  }

  // Re-render template when form data changes
  $: if (templateContent && Object.keys(formData).length > 0) {
    renderTemplate();
  }

  onMount(async () => {
    try {
      // Load the initiatives JSON file
      const response = await fetch('/data/initiatives.json');
      if (!response.ok) {
        throw new Error('Failed to load initiatives data');
      }
      const initiatives = await response.json();

      // Find the initiative matching the slug
      const initiative = initiatives.find(i => i.slug === params.slug);

      if (!initiative) {
        throw new Error('Initiative not found');
      }

      metadata = initiative.metadata;
      templateContent = initiative.content;

      // Extract variables from template
      templateVariables = extractVariables(templateContent);

      // Initialize form data
      templateVariables.forEach(varName => {
        formData[varName] = '';
      });

      // Initial render
      renderTemplate();

      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
    }
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(editableContent);
    alert('Comment text copied to clipboard!');
  }

  function downloadAsText() {
    const blob = new Blob([editableContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${params.slug}-comment.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  $: htmlContent = editableContent ? marked(editableContent) : '';
</script>

<div class="py-8 animate-fade-in">
  {#if loading}
    <div class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
        <p class="text-gray-600 text-lg font-medium">Loading initiative...</p>
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
    <div class="card p-8 mb-8 animate-slide-up">
      <div class="flex flex-wrap items-center gap-4 mb-6">
        <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          {metadata.category}
        </span>
        <div class="flex items-center text-gray-600">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span class="font-medium">Deadline:</span>
          <span class="ml-1">{new Date(metadata.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
      
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
        {metadata.title}
      </h1>
      
      <p class="text-xl text-gray-600 mb-6 leading-relaxed">
        {metadata.description}
      </p>
      
      <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-primary-500">
        <div class="flex items-center">
          <svg class="w-6 h-6 text-primary-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <div>
            <p class="font-semibold text-gray-900">Recipient:</p>
            <p class="text-gray-700">{metadata.recipientName} ({metadata.recipientEmail})</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card p-8 mb-8">
      {#if templateVariables.length > 0}
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Fill in Your Information</h2>
              <p class="text-gray-600">Complete the fields below to personalize your comment</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each templateVariables as varName}
              <div class="space-y-2">
                <label for={varName} class="block text-sm font-semibold text-gray-700">
                  {varName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </label>
                {#if varName.toLowerCase().includes('story') || varName.toLowerCase().includes('connection') || varName.toLowerCase().includes('experience')}
                  <textarea
                    id={varName}
                    bind:value={formData[varName]}
                    placeholder="Enter your {varName.replace(/_/g, ' ')}"
                    class="form-textarea"
                    rows="4"
                  ></textarea>
                {:else}
                  <input
                    id={varName}
                    type="text"
                    bind:value={formData[varName]}
                    placeholder="Enter your {varName.replace(/_/g, ' ')}"
                    class="form-input"
                  />
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <div class="border-t border-gray-200 pt-8">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900">Your Personalized Comment</h3>
            <p class="text-gray-600">Review and edit your comment before sending</p>
          </div>
        </div>
        
        <div class="relative">
          <textarea
            bind:value={editableContent}
            placeholder="Edit your comment here..."
            class="form-textarea min-h-[400px] font-serif text-gray-800 leading-relaxed"
            rows="20"
          ></textarea>
          <div class="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm text-gray-500 border">
            {editableContent.length} characters
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
        <button class="btn-secondary flex items-center justify-center" on:click={copyToClipboard}>
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Copy to Clipboard
        </button>
        <button class="btn-secondary flex items-center justify-center" on:click={downloadAsText}>
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Download as Text
        </button>
        <button class="btn-primary flex items-center justify-center flex-1" on:click={() => {
          window.open(`mailto:${metadata.recipientEmail}?subject=${encodeURIComponent(metadata.title)}&body=${encodeURIComponent(editableContent)}`);
        }}>
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          Send via Email
        </button>
      </div>
    </div>
  {/if}
</div>
