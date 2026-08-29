/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Target directory where your image subfolders live
const baseDir = path.join(__dirname, 'public', 'images', 'products');

// Mapping exact image names to their target code-matched filename
const fileMappings = {
  // RICE COOKERS
  'rice-cookers': [
    { oldName: 'rice-cooker-1.jpeg', newName: 'rice-cooker-1.jpeg' }, // Esodora
    { oldName: 'rice-cooker-2.jpeg', newName: 'rice-cooker-2.jpeg' }, // Ajayb UK
    { oldName: 'rice-cooker-3.jpeg', newName: 'rice-cooker-3.jpeg' }, // Miyako
    { oldName: 'rice-cooker-4.jpeg', newName: 'rice-cooker-4.jpeg' }, // Cosmos
    { oldName: 'rice-cooker-5.jpeg', newName: 'rice-cooker-5.jpeg' }, // Continental
  ],

  // BLENDERS
  'blenders': [
    { oldName: 'Screenshot 2026-08-28 at 6.30.29 AM.jpg', newName: 'blender-1.jpeg' }, // Slivers Criest 5500W
    { oldName: 'Screenshot 2026-08-28 at 6.30.37 AM.jpg', newName: 'blender-2.jpeg' }, // Avelon 2-in-1
    { oldName: 'Screenshot 2026-08-28 at 6.30.49 AM.jpg', newName: 'blender-3.jpeg' }, // Binatone 2-in-1
  ],

  // EXTENSIONS
  'extensions': [
    { oldName: 'Screenshot 2026-08-28 at 6.31.29 AM.jpg', newName: 'extension-1.jpeg' }, // TENGRENG Heavy Duty
    { oldName: 'Screenshot 2026-08-28 at 6.31.42 AM.jpg', newName: 'extension-2.jpeg' }, // Newman 5-Way Color
    { oldName: 'Screenshot 2026-08-28 at 6.31.54 AM.jpg', newName: 'extension-3.jpeg' }, // Newman Wooden Grain
    { oldName: 'Screenshot 2026-08-28 at 6.32.06 AM.jpg', newName: 'extension-4.jpeg' }, // Newman 3-Way Compact
  ],

  // POWER BANKS
  'powerbanks': [
    { oldName: 'Screenshot 2026-08-28 at 6.33.20 AM.jpg', newName: 'powerbank-1.jpeg' }, // New Age 30,000mAh
    { oldName: 'Screenshot 2026-08-28 at 6.33.31 AM.jpg', newName: 'powerbank-2.jpeg' }, // Vorrence 10,000mAh
  ],

  // SPEAKERS
  'speakers': [
    { oldName: 'Screenshot 2026-08-28 at 6.33.43 AM.jpg', newName: 'speaker-1.jpeg' }, // RGB Speaker
    { oldName: 'Screenshot 2026-08-28 at 6.33.56 AM.jpg', newName: 'speaker-2.jpeg' }, // WAF Sound System
  ],

  // IRONS
  'irons': [
    { oldName: 'Screenshot 2026-08-28 at 6.34.07 AM.jpg', newName: 'iron-1.jpeg' }, // Philips Dry Iron
    { oldName: 'Screenshot 2026-08-28 at 6.34.19 AM.jpg', newName: 'iron-2.jpeg' }, // Royal Deluxe Dry Iron
  ],

  // KETTLES
  'kettles': [
    { oldName: 'Screenshot 2026-08-28 at 6.45.19 AM.jpg', newName: 'kettle-1.jpeg' }, // Glass LED Kettle
    { oldName: 'Screenshot 2026-08-28 at 6.45.31 AM.jpg', newName: 'kettle-2.jpeg' }, // Visioneer 2.0L
    { oldName: 'Screenshot 2026-08-28 at 6.45.41 AM.jpg', newName: 'kettle-3.jpeg' }, // Elgin Matte Black
    { oldName: 'Screenshot 2026-08-28 at 6.45.54 AM.jpg', newName: 'kettle-4.jpeg' }, // Ailyons Black/Red
    { oldName: 'Screenshot 2026-08-28 at 6.46.06 AM.jpg', newName: 'kettle-5.jpeg' }, // Ailyons Cream
  ],

  // FANS
  'fans': [
    { oldName: 'Screenshot 2026-08-28 at 6.56.19 AM.jpg', newName: 'fan-1.jpeg' }, // Orient Wall Fan
    { oldName: 'Screenshot 2026-08-28 at 6.56.29 AM.jpg', newName: 'fan-2.jpeg' }, // 5-Blade Blades Set
    { oldName: 'Screenshot 2026-08-28 at 6.56.40 AM.jpg', newName: 'fan-3.jpeg' }, // D&H Orange Fan
    { oldName: 'Screenshot 2026-08-28 at 6.57.11 AM.jpg', newName: 'fan-4.jpeg' }, // Weyon 18" Standing Fan
  ]
};

// Execute renaming operation
Object.entries(fileMappings).forEach(([folder, items]) => {
  const folderPath = path.join(baseDir, folder);

  items.forEach(({ oldName, newName }) => {
    const srcPath = path.join(folderPath, oldName);
    const destPath = path.join(folderPath, newName);

    if (fs.existsSync(srcPath)) {
      fs.renameSync(srcPath, destPath);
      console.log(`✅ Renamed [${folder}]: ${oldName} -> ${newName}`);
    } else if (fs.existsSync(destPath)) {
      console.log(`ℹ️ Already up to date: ${folder}/${newName}`);
    } else {
      console.warn(`⚠️ File not found: ${folder}/${oldName}`);
    }
  });
});

console.log('\n🎉 Finished matching images to products.ts array!');