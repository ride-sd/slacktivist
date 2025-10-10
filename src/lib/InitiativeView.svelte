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

<div class="initiative-view">
  {#if loading}
    <div class="loading">Loading initiative...</div>
  {:else if error}
    <div class="error">
      <h2>Error</h2>
      <p>{error}</p>
    </div>
  {:else}
    <div class="initiative-header">
      <div class="metadata">
        <span class="category-badge">{metadata.category}</span>
        <span class="deadline">Deadline: {new Date(metadata.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
      <h1>{metadata.title}</h1>
      <p class="description">{metadata.description}</p>
      <div class="recipient-info">
        <strong>Recipient:</strong> {metadata.recipientName} ({metadata.recipientEmail})
      </div>
    </div>

    <div class="content-section">
      {#if templateVariables.length > 0}
        <div class="form-section">
          <h2>Fill in Your Information</h2>
          <p class="form-instructions">Complete the fields below to personalize your comment</p>

          <div class="form-grid">
            {#each templateVariables as varName}
              <div class="form-field">
                <label for={varName}>
                  {varName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </label>
                {#if varName.toLowerCase().includes('story') || varName.toLowerCase().includes('connection') || varName.toLowerCase().includes('experience')}
                  <textarea
                    id={varName}
                    bind:value={formData[varName]}
                    placeholder="Enter your {varName.replace(/_/g, ' ')}"
                    rows="4"
                  ></textarea>
                {:else}
                  <input
                    id={varName}
                    type="text"
                    bind:value={formData[varName]}
                    placeholder="Enter your {varName.replace(/_/g, ' ')}"
                  />
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <div class="editor-section">
        <h3>Your Personalized Comment</h3>
        <textarea
          bind:value={editableContent}
          placeholder="Edit your comment here..."
          rows="20"
        ></textarea>
      </div>

      <div class="actions">
        <button class="btn btn-secondary" on:click={copyToClipboard}>
          Copy to Clipboard
        </button>
        <button class="btn btn-secondary" on:click={downloadAsText}>
          Download as Text
        </button>
        <button class="btn btn-primary" on:click={() => {
          window.open(`mailto:${metadata.recipientEmail}?subject=${encodeURIComponent(metadata.title)}&body=${encodeURIComponent(editableContent)}`);
        }}>
          Send via Email
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .initiative-view {
    padding: 2rem 0;
  }

  .loading, .error {
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 12px;
  }

  .error {
    color: #e53e3e;
  }

  .initiative-header {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .metadata {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: center;
  }

  .category-badge {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .deadline {
    font-size: 0.9rem;
    color: #718096;
  }

  .initiative-header h1 {
    font-size: 2.5rem;
    margin: 0 0 1rem 0;
    color: #2d3748;
  }

  .description {
    font-size: 1.2rem;
    color: #4a5568;
    margin-bottom: 1rem;
  }

  .recipient-info {
    color: #718096;
    font-size: 0.95rem;
  }

  .content-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .form-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid #e2e8f0;
  }

  .form-section h2 {
    font-size: 1.8rem;
    margin: 0 0 0.5rem 0;
    color: #2d3748;
  }

  .form-instructions {
    color: #718096;
    margin: 0 0 1.5rem 0;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
  }

  .form-field label {
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .form-field input,
  .form-field textarea {
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .form-field input:focus,
  .form-field textarea:focus {
    outline: none;
    border-color: #667eea;
  }

  .form-field textarea {
    resize: vertical;
    min-height: 100px;
  }

  .editor-section {
    margin-bottom: 2rem;
  }

  .editor-section h3 {
    font-size: 1.3rem;
    margin: 0 0 1rem 0;
    color: #2d3748;
  }

  .editor-section textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-family: 'Georgia', serif;
    font-size: 1rem;
    line-height: 1.6;
    resize: vertical;
    min-height: 300px;
    transition: border-color 0.2s;
  }

  .editor-section textarea:focus {
    outline: none;
    border-color: #667eea;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .btn-secondary {
    background: #e2e8f0;
    color: #2d3748;
  }

  .btn-secondary:hover {
    background: #cbd5e0;
  }

  @media (max-width: 768px) {
    .actions {
      flex-direction: column;
    }

    .btn {
      width: 100%;
    }

    .initiative-header h1 {
      font-size: 1.8rem;
    }
  }
</style>