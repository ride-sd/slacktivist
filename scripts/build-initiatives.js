/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initiativesDir = path.join(__dirname, '../public/initiatives');
const outputDir = path.join(__dirname, '../public/data');
const outputFile = path.join(outputDir, 'initiatives.json');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all markdown files (excluding templates that start with underscore)
const files = fs.readdirSync(initiativesDir).filter(file => 
  file.endsWith('.md') && !file.startsWith('_')
);

const initiatives = files.map(file => {
  const filePath = path.join(initiativesDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const slug = file.replace('.md', '');

  // Parse content by H1 sections
  const sections = {};
  const lines = content.trim().split('\n');
  let currentSection = null;
  let currentContent = [];

  for (const line of lines) {
    if (line.startsWith('# ')) {
      // Save previous section if exists
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      // Start new section
      currentSection = line.substring(2).trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  // Save the last section
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  return {
    slug,
    metadata: data,
    sections
  };
});

// Write JSON file
fs.writeFileSync(outputFile, JSON.stringify(initiatives, null, 2));

console.log(`✅ Built ${initiatives.length} initiatives to ${outputFile}`);
initiatives.forEach(i => console.log(`   - ${i.slug}`));
