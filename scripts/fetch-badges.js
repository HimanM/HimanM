const fs = require('fs');
const https = require('https');

const CREDLY_USER = 'himan';
const README_PATH = process.argv[2] || 'README.md';

function fetchBadges() {
    return new Promise((resolve, reject) => {
        const url = `https://www.credly.com/users/${CREDLY_USER}/badges.json`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json.data || []);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function generateBadgeHtml(badge) {
    // Use the badge image URL from the API
    const imageUrl = badge.image_url;
    const badgeUrl = `https://www.credly.com/badges/${badge.id}`;
    const title = badge.badge_template.name;

    // 110px height to match the requested size
    return `<a href="${badgeUrl}" target="_blank" rel="noreferrer" style="margin-right: 10px;">
    <img src="${imageUrl}" alt="${title}" height="110" />
  </a>`;
}

async function main() {
    try {
        console.log('Fetching badges...');
        const badges = await fetchBadges();
        console.log(`Found ${badges.length} badges.`);

        const badgeHtml = badges.map(generateBadgeHtml).join('\n  ');

        console.log('Reading README.md...');
        let readme = fs.readFileSync(README_PATH, 'utf8');

        const startMarker = '<!-- CREDLY_BADGES_START -->';
        const endMarker = '<!-- CREDLY_BADGES_END -->';

        const startIndex = readme.indexOf(startMarker);
        const endIndex = readme.indexOf(endMarker);

        if (startIndex === -1 || endIndex === -1) {
            console.error('Markers not found in README.md');
            process.exit(1);
        }

        const newReadme = readme.substring(0, startIndex + startMarker.length) +
            '\n  ' + badgeHtml + '\n' +
            readme.substring(endIndex);

        console.log('Updating README.md...');
        fs.writeFileSync(README_PATH, newReadme);
        console.log('Done!');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
