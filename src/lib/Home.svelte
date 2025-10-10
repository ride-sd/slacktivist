<script>
  import { link } from 'svelte-spa-router';

  // In a real app, this would be fetched from an API or generated from scanning the initiatives folder
  const initiatives = [
    {
      slug: 'climate-action',
      title: 'Support Climate Action Initiative',
      category: 'Environment',
      deadline: '2025-12-31',
      description: 'Help us push for stronger climate action policies in our city'
    },
    {
      slug: 'affordable-housing',
      title: 'Increase Affordable Housing',
      category: 'Housing',
      deadline: '2025-11-15',
      description: 'Advocate for more affordable housing units in our community'
    }
  ];

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
</script>

<div class="home">
  <section class="hero">
    <h2>Active Initiatives</h2>
    <p>Choose an initiative to view the template and submit your public comment</p>
  </section>

  <div class="initiatives-grid">
    {#each initiatives as initiative}
      <a href="/initiative/{initiative.slug}" use:link class="initiative-card">
        <div class="card-header">
          <span class="category-badge">{initiative.category}</span>
          <span class="deadline">Deadline: {formatDate(initiative.deadline)}</span>
        </div>
        <h3>{initiative.title}</h3>
        <p>{initiative.description}</p>
        <div class="card-footer">
          <span class="cta">View Template →</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .home {
    padding: 2rem 0;
  }

  .hero {
    text-align: center;
    margin-bottom: 3rem;
  }

  .hero h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2d3748;
  }

  .hero p {
    font-size: 1.2rem;
    color: #718096;
  }

  .initiatives-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .initiative-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .initiative-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
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
    font-size: 0.85rem;
    color: #718096;
  }

  .initiative-card h3 {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    color: #2d3748;
  }

  .initiative-card p {
    color: #4a5568;
    margin: 0 0 1rem 0;
  }

  .card-footer {
    border-top: 1px solid #e2e8f0;
    padding-top: 1rem;
    margin-top: 1rem;
  }

  .cta {
    color: #667eea;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .initiatives-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
