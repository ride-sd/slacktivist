# Contributing to Slacktivist

Thank you for your interest in making local democracy more accessible! Here's how you can add new initiatives and contribute to the project.

## 🚀 Quick Start for Adding an Initiative

1. **Copy the template**: Use `public/initiatives/_template.md` as your starting point
2. **Fill out the details**: Add the initiative information and email template
3. **Test locally**: Run the project to make sure everything works
4. **Submit a PR**: Create a pull request with your new initiative

## 📝 Step-by-Step Guide

### Step 1: Copy the Template

```bash
# Navigate to the initiatives directory
cd public/initiatives/

# Copy the template to create your new initiative
cp _template.md your-initiative-name.md
```

**Naming Guidelines:**
- Use lowercase letters and hyphens: `downtown-bike-lanes.md`
- Be descriptive but concise: `city-budget-public-input.md`
- Avoid spaces and special characters

### Step 2: Fill Out the Frontmatter

Edit the YAML frontmatter (between the `---` lines) at the top of your file:

```yaml
---
title: "Support Downtown Bike Lanes"
description: "Public comment period for proposed protected bike lanes on Main Street"
subject: "Public Comment: Downtown Bike Lane Proposal"
deadline: "2024-12-15"
logo: "bike_advocacy_logo.png"  # Optional: place in public/logos/
logo_url: "https://bikeadvocacy.org"  # Optional
to:
  - "transportation@city.gov"
  - "mayor@city.gov"
  - "councilmember.district3@city.gov"
cc:  # Optional: carbon copy
  - "planning@city.gov"
bcc:  # Optional: blind carbon copy for your organization
  - "campaigns@bikeadvocacy.org"
---
```

**Required Fields:**
- `title`: Display name for the initiative
- `description`: One-sentence summary for the card view
- `to`: Array of email addresses where comments will be sent
- `subject`: Email subject line

**Optional Fields:**
- `deadline`: When comments are due (YYYY-MM-DD format)
- `logo`: Filename of logo in `public/logos/` directory
- `logo_url`: URL to link to when logo is clicked
- `cc`: Carbon copy recipients
- `bcc`: Blind carbon copy recipients (for your organization)

### Step 3: Write the Information Section

Replace the `# Information` section with background about your initiative:

```markdown
# Information

The City of Springfield is proposing protected bike lanes on Main Street from 1st to 10th Avenue. This project would:

- **Improve Safety**: Separate cyclists from vehicle traffic
- **Boost Local Business**: Studies show bike lanes increase foot traffic
- **Support Climate Goals**: Encourage sustainable transportation

**Key Details:**
- Construction planned for Spring 2025
- Cost: $2.3 million from federal grants
- Public comment period: November 1-December 15, 2024

**Learn More:**
- [Official proposal document](https://city.gov/bike-lanes-proposal)
- [City Council agenda item #47](https://city.gov/council/agenda)
```

### Step 4: Create the Comment Template

Replace the `# Content` section with a letter template that users can customize:

```markdown
# Content

Dear {{recipient_title}} {{recipient_name}},

I am writing as a {{your_role}} in {{your_neighborhood}} to support the proposed protected bike lanes on Main Street.

{{your_personal_story}}

As someone who {{your_connection_to_issue}}, I believe these bike lanes will {{your_main_benefit}}.

Key benefits I see include:
• {{benefit_1}}
• {{benefit_2}}
• {{benefit_3}}

{{additional_comments}}

I urge you to approve this proposal and prioritize safe, sustainable transportation infrastructure.

Thank you for considering community input.

Sincerely,

{{your_name}}
{{your_address}}
{{your_contact_info}}
```

**Template Variable Tips:**
- Use descriptive variable names with underscores
- Prompt for personal, specific responses
- Include context so users know what to write
- Variables will become form fields that users fill out

### Step 5: Test Your Initiative

```bash
# Build the initiatives data
npm run build:initiatives

# Start the development server  
npm run dev

# Visit http://localhost:5173 and check your initiative appears correctly
```

Verify:
- ✅ Initiative appears on the home page
- ✅ Clicking it opens the detail page
- ✅ All form fields render properly
- ✅ Email template populates correctly
- ✅ "Send via Email" generates the right mailto link

### Step 6: Submit Your Contribution

```bash
# Create a new branch
git checkout -b add-[initiative-name]

# Add your files
git add public/initiatives/your-initiative-name.md
git add public/logos/your-logo.png  # if you added a logo

# Commit with a descriptive message
git commit -m "Add [Initiative Name] public comment opportunity

- Deadline: [date]
- Recipients: [key officials]
- Organization: [your org if applicable]"

# Push to your fork
git push origin add-[initiative-name]
```

Then create a pull request on GitHub with:
- Clear title: "Add [Initiative Name] public comment opportunity"
- Description of what the initiative is about
- Links to official sources/documents
- Any special considerations

## 📋 Review Checklist

Your PR will be reviewed for:

- ✅ **Accurate Information**: Official email addresses and deadlines
- ✅ **Clear Writing**: Professional, accessible language
- ✅ **Good Template**: Prompts thoughtful, personal responses
- ✅ **Proper Formatting**: Valid YAML frontmatter and markdown
- ✅ **Testing**: Initiative builds and displays correctly
- ✅ **Verification**: Links to official sources when possible

## 🎯 Writing Effective Templates

**Do:**
- Use personal, engaging language
- Prompt for specific examples and stories
- Include clear action requests
- Make the tone professional but human
- Focus on community impact

**Don't:**
- Write generic, copy-paste comments
- Use overly technical language
- Make assumptions about user positions
- Include partisan political language
- Forget to include recipient and sender information

## 💡 Template Variables Reference

**Personal Info:**
- `{{your_name}}`, `{{your_address}}`, `{{your_phone}}`, `{{your_email}}`
- `{{your_neighborhood}}`, `{{your_role}}` (resident, business owner, etc.)

**Engagement:**
- `{{your_personal_story}}` - How this affects them
- `{{your_connection_to_issue}}` - Their relationship to the topic
- `{{support_or_oppose}}` - Their position
- `{{your_main_argument}}` - Primary reasoning

**Recipient:**
- `{{recipient_title}}` - "Councilmember", "Mayor", etc.
- `{{recipient_name}}` - Specific official name

**Issue-Specific:**
- Create custom variables for your specific initiative
- Use descriptive names: `{{proposed_location}}`, `{{budget_concern}}`, etc.

## 🤝 Getting Help

- **Questions?** Open an issue on GitHub
- **Need review?** Tag maintainers in your PR
- **Technical issues?** Check the development setup in README.md

Thank you for helping make local democracy more accessible! 🗳️