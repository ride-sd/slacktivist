# Slacktivist 📢# Slacktivist

**Make your voice heard in local government.**A civic engagement platform that helps citizens submit public comments on local initiatives and government proposals. Built with Svelte and Vite.

Slacktivist is a civic engagement platform that makes it easy for citizens to participate in local democracy by submitting public comments on initiatives and government proposals. Instead of struggling with complex government websites or missing important deadlines, Slacktivist provides a streamlined interface to draft, personalize, and submit your comments directly to the appropriate officials.## Recommended IDE Setup

## 🎯 What Does Slacktivist Do?[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

- **Discover Local Initiatives**: Browse current proposals, initiatives, and public comment opportunities in your area## Need an official Svelte framework?

- **Template-Based Comments**: Use pre-written, expert-crafted comment templates that you can personalize with your own story and details

- **Easy Submission**: Generate properly formatted emails with all the right recipients and subject linesCheck out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

- **Never Miss a Deadline**: Clear deadline tracking so you know when comments are due

- **Your Voice, Your Way**: Customize templates with your personal experiences and concerns## Technical considerations

## 🚀 Getting Started**Why use this over SvelteKit?**

### For Contributors- It brings its own routing solution which might not be preferable for some users.

- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

```bash

# Clone the repositoryThis template contains as little as possible to get started with Vite + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

git clone https://github.com/ride-sd/slacktivist.git

cd slacktivistShould you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.



# Install dependencies**Why include `.vscode/extensions.json`?**

npm install

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

# Start the development server

npm run dev**Why enable `checkJs` in the JS template?**

# Run testsIt is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.

npm test

**Why is HMR not preserving my local component state?**

# Lint the code

npm run lintHMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#preservation-of-local-state).

```

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

### For Users

```js

1. Visit the Slacktivist website// store.js

2. Browse available initiatives and proposals// An extremely simple external store

3. Click on an initiative that interests youimport { writable } from 'svelte/store'

4. Fill in your personal information in the formexport default writable(0)

5. Review and customize the generated comment```

6. Click "Send via Email" to submit your comment to officials

## 📝 Adding a New Initiative

Want to add a new local initiative or proposal? Follow these steps to contribute:

### Step 1: Create the Markdown File

Create a new markdown file in the `public/initiatives/` directory. Use this naming convention:
- Use lowercase letters and hyphens: `my-initiative-name.md`
- Be descriptive but concise: `downtown-parking-meter-expansion.md`

### Step 2: Structure Your Initiative File

Your markdown file should follow this structure:

```markdown
---
title: "Your Initiative Title"
description: "A brief description of what this initiative is about"
to: ["email1@city.gov", "email2@planning.gov"]
subject: "Public Comment: Your Initiative Title"
deadline: "2024-12-31"
---

## Information

Provide background information about the initiative here. This section should help users understand:
- What the proposal is about
- Why it matters
- Key facts and figures
- Links to official documents

Use markdown formatting for readability.

## Content

This is the template for the comment that users will customize. You can include template variables using double curly braces:

Dear {{official_title}} {{official_name}},

I am writing as a {{your_role}} in {{your_neighborhood}} to comment on {{initiative_name}}.

{{your_personal_story}}

Based on my experience, I {{support_or_oppose}} this proposal because {{your_reasoning}}.

{{additional_comments}}

Thank you for your consideration.

Sincerely,
{{your_name}}
{{your_address}}
{{your_contact_info}}
```

### Step 3: Template Variables

When creating the `Content` section, you can use template variables that users will fill out:

**Common Variables:**
- `{{your_name}}` - User's full name
- `{{your_address}}` - User's address
- `{{your_neighborhood}}` - User's neighborhood or district
- `{{your_role}}` - e.g., "resident", "business owner", "parent"
- `{{your_personal_story}}` - User's personal connection to the issue
- `{{support_or_oppose}}` - "support" or "oppose"
- `{{your_reasoning}}` - User's main arguments

**Tips for Good Templates:**
- Keep variable names descriptive and lowercase with underscores
- Use variables that prompt thoughtful, personal responses
- Include context around variables so users know what to write
- Make the template sound natural when filled out

### Step 4: Metadata Requirements

The frontmatter (between `---` lines) must include:

- **title**: The display name of the initiative
- **description**: A one-sentence summary for the card view
- **to**: Array of email addresses where comments should be sent
- **subject**: Email subject line (will be used as-is)
- **deadline**: Deadline for comments in YYYY-MM-DD format

### Step 5: Submit Your Contribution

1. **Fork the Repository**
   ```bash
   # On GitHub, click "Fork" button
   git clone https://github.com/YOUR-USERNAME/slacktivist.git
   cd slacktivist
   ```

2. **Create a Branch**
   ```bash
   git checkout -b add-[initiative-name]
   ```

3. **Add Your Initiative File**
   ```bash
   # Create your markdown file
   # public/initiatives/your-initiative-name.md

   # Test locally
   npm run dev
   npm run build
   ```

4. **Test the Build Process**
   ```bash
   # This generates the initiatives.json file
   npm run build:initiatives

   # Verify your initiative appears correctly
   cat public/data/initiatives.json
   ```

5. **Commit and Push**
   ```bash
   git add public/initiatives/your-initiative-name.md
   git commit -m "Add [Initiative Name] public comment opportunity"
   git push origin add-[initiative-name]
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Provide a clear description of the initiative you're adding
   - Include any relevant links to official sources

### Step 6: Review Process

Your PR will be reviewed for:
- ✅ Accurate information and official email addresses
- ✅ Clear, helpful template content
- ✅ Proper markdown formatting
- ✅ Appropriate deadline and metadata
- ✅ No spelling or grammatical errors

## 🛠️ Development

Built with modern web technologies:
- **Svelte** - Reactive UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Handlebars** - Template engine for dynamic content
- **Marked** - Markdown parser

### Project Structure

```
slacktivist/
├── public/
│   ├── initiatives/          # Individual initiative markdown files
│   └── data/
│       └── initiatives.json  # Generated from markdown files
├── src/
│   ├── lib/
│   │   ├── Home.svelte      # Initiative listing page
│   │   ├── InitiativeView.svelte  # Individual initiative page
│   │   └── utils/           # Utility functions
│   └── App.svelte           # Main app component
└── scripts/
    └build-initiatives.js    # Builds JSON from markdown files
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

We welcome contributions! Whether you're adding new initiatives, fixing bugs, or improving the user experience, your help makes local democracy more accessible.

**Questions?** Open an issue or reach out to the maintainers.
