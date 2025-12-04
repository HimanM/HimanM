const fs = require('fs');
const https = require('https');
const path = require('path');

const CREDLY_USER = 'himan';
const README_PATH = process.argv[2] || 'README.md';
const ASSETS_DIR = 'assets/badges';

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

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };
        https.get(url, options, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(filepath);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
                file.on('error', (err) => {
                    fs.unlink(filepath, () => reject(err));
                });
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function main() {
    try {
        // Ensure assets directory exists
        if (!fs.existsSync(ASSETS_DIR)) {
            fs.mkdirSync(ASSETS_DIR, { recursive: true });
        }

        console.log('Fetching badges...');
        const badges = await fetchBadges();
        console.log(`Found ${badges.length} badges.`);

        const badgeHtmlParts = [];

        for (const badge of badges) {
            const imageUrl = badge.image_url;
            const badgeId = badge.id;
            const badgeUrl = `https://www.credly.com/badges/${badgeId}`;
            const title = badge.badge_template.name;
            const localImagePath = `${ASSETS_DIR}/${badgeId}.png`;

            console.log(`Downloading image for ${title}...`);
            try {
                await downloadImage(imageUrl, localImagePath);

                // Use local path in HTML (relative to README.md)
                // 110px height to match the requested size
                badgeHtmlParts.push(`<a href="${badgeUrl}" target="_blank" rel="noreferrer" style="margin-right: 10px;">
    <img src="${localImagePath}" alt="${title}" height="110" />
  </a>`);
            } catch (err) {
                console.error(`Failed to download image for ${title}:`, err);
                // Fallback to remote URL if download fails? Or just skip?
                // Let's fallback to remote URL but log error
                badgeHtmlParts.push(`<a href="${badgeUrl}" target="_blank" rel="noreferrer" style="margin-right: 10px;">
    <img src="${imageUrl}" alt="${title}" height="110" />
  </a>`);
            }
        }

        const badgeHtml = badgeHtmlParts.join('\n  ');

        console.log('Reading README.md...');
        let readme = fs.readFileSync(README_PATH, 'utf8');

        const placeholder = '__CREDLY_BADGES__';

        if (!readme.includes(placeholder)) {
            console.error('Placeholder not found in README.md');
            process.exit(1);
        }

        const newReadme = readme.replace(placeholder, badgeHtml);

        console.log('Updating README.md...');
        fs.writeFileSync(README_PATH, newReadme);
        console.log('Done!');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
