import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

async function generateOG() {
  const svg = fs.readFileSync(path.join(publicDir, 'og-image.svg'));
  
  await sharp(svg)
    .resize(1200, 630)
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Generated: og-image.png');
  
  // Also create Twitter card (smaller)
  await sharp(svg)
    .resize(800, 418)
    .png()
    .toFile(path.join(publicDir, 'twitter-image.png'));
  console.log('Generated: twitter-image.png');
}

generateOG().catch(console.error);
