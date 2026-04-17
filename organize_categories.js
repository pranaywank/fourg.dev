const fs = require('fs');
const path = require('path');
const dir = './src/content/articles';

const mappings = {
  'aesthetic-agencies-winning-tiktok.md': 'Brand Architecture',
  'ai-strategy-playbook.md': 'AI Integration',
  'automating-agency-ai-workflows.md': 'AI Integration',
  'converting-views-venture-capital.md': 'Video Strategy',
  'high-velocity-product-framework.md': 'Product Management',
  'landing-page-leaking-conversions.md': 'UI/UX Design',
  'pre-seed-grind-solopreneurs.md': 'Solo Operations',
  'prompt-engineering-pm.md': 'AI Integration',
  'repurposing-docs-into-shorts.md': 'Video Strategy',
  'roi-ai-integration-startups.md': 'AI Integration',
  'testing-offers-vs-features.md': 'Startup Growth & GTM',
  'tiktok-b2b-architecture.md': 'Video Strategy',
  'vibe-coder-approach.md': 'Vibe Coding Tactics',
  'vibe-coding-redefining-solopreneurship.md': 'Vibe Coding Tactics',
  'youtube-brand-technical-founder.md': 'Video Strategy'
};

for (const [file, newCategory] of Object.entries(mappings)) {
  const filepath = path.join(dir, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    content = content.replace(/category:\s*".*?"/, `category: "${newCategory}"`);
    fs.writeFileSync(filepath, content);
    console.log(`Updated ${file} to ${newCategory}`);
  }
}
