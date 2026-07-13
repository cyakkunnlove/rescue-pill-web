#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
console.error(
  'This script is retired: coordinates are not used by the site and direct edits would invalidate pharmacy metadata. Run npm run update:pharmacies instead.'
);
process.exit(1);

/**
 * 薬局データに緯度経度を追加するスクリプト
 * 国土地理院APIを使用（無料）
 */

const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../public/data/otc_pharmacies.json');
const OUTPUT_FILE = path.join(__dirname, '../public/data/otc_pharmacies.json');
const PROGRESS_FILE = path.join(__dirname, '../geocode-progress.json');

// Rate limit: 10 requests per second to be safe
const DELAY_MS = 100;
const BATCH_SIZE = 100;

async function geocodeAddress(address) {
  try {
    const url = `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${encodeURIComponent(address)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (data && data.length > 0 && data[0].geometry && data[0].geometry.coordinates) {
      const [lon, lat] = data[0].geometry.coordinates;
      return { lat, lon };
    }
    
    return null;
  } catch (err) {
    console.error(`Error geocoding ${address}:`, err.message);
    return null;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('Loading pharmacy data...');
  const pharmacies = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  console.log(`Total pharmacies: ${pharmacies.length}`);
  
  // Load progress if exists
  let startIndex = 0;
  if (fs.existsSync(PROGRESS_FILE)) {
    const progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    startIndex = progress.lastIndex + 1;
    console.log(`Resuming from index ${startIndex}`);
  }
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = startIndex; i < pharmacies.length; i++) {
    const pharmacy = pharmacies[i];
    
    // Skip if already has coordinates
    if (pharmacy.lat !== undefined && pharmacy.lon !== undefined) {
      successCount++;
      continue;
    }
    
    const result = await geocodeAddress(pharmacy.a);
    
    if (result) {
      pharmacy.lat = result.lat;
      pharmacy.lon = result.lon;
      successCount++;
    } else {
      // Mark as failed but continue
      pharmacy.lat = null;
      pharmacy.lon = null;
      failCount++;
    }
    
    // Progress update
    if ((i + 1) % BATCH_SIZE === 0 || i === pharmacies.length - 1) {
      const percent = ((i + 1) / pharmacies.length * 100).toFixed(1);
      console.log(`Progress: ${i + 1}/${pharmacies.length} (${percent}%) - Success: ${successCount}, Failed: ${failCount}`);
      
      // Save progress
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ lastIndex: i }));
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(pharmacies, null, 0));
    }
    
    await sleep(DELAY_MS);
  }
  
  // Final save (minified)
  console.log('Saving final data...');
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(pharmacies));
  
  // Clean up progress file
  if (fs.existsSync(PROGRESS_FILE)) {
    fs.unlinkSync(PROGRESS_FILE);
  }
  
  console.log(`\nComplete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
}

main().catch(console.error);
