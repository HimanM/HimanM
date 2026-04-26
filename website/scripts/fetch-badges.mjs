import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchBadges() {
  try {
    const res = await fetch('https://www.credly.com/users/himan/badges.json', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch badges: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    let badges = [];
    if (data && data.data) {
      badges = data.data.map((b) => ({
        name: b.badge_template.name,
        url: b.image_url || b.badge_template.image_url,
        link: 'https://www.credly.com/badges/' + b.id
      }));
    }

    const outputPath = path.join(__dirname, '..', 'data', 'badges.json');
    // Ensure the data directory exists
    const dataDir = path.dirname(outputPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Always sort by name to ensure stable JSON output
    badges.sort((a, b) => a.name.localeCompare(b.name));

    fs.writeFileSync(outputPath, JSON.stringify(badges, null, 2));
    console.log(`Successfully fetched ${badges.length} badges to ${outputPath}`);
  } catch (error) {
    console.error('Error fetching badges from Credly:', error);
    process.exit(1);
  }
}

fetchBadges();
