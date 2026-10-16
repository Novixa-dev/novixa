const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(process.cwd(), 'public/images/candidates');

const heroCandidates = [
  {
    name: 'hero-candidate-6-corridor.jpg',
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2400&q=85',
    desc: 'Deep blue datacenter server room perspective'
  },
  {
    name: 'hero-candidate-7-modern-hq.jpg',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=2400&q=85',
    desc: 'Modern glass corporate architectural headquarters at dusk'
  },
  {
    name: 'hero-candidate-8-night-city-coastal.jpg',
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=85',
    desc: 'Panoramic Dubai coastal skyline night glowing lights'
  },
  {
    name: 'hero-candidate-9-futuristic-tunnel.jpg',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=2400&q=85',
    desc: 'Atmospheric dark architectural perspective'
  },
  {
    name: 'hero-candidate-10-architectural-night.jpg',
    url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2400&q=85',
    desc: 'Modern concert/tech hall glowing architectural roof'
  }
];

for (const c of heroCandidates) {
  const dest = path.join(dir, c.name);
  console.log('Downloading ' + c.name + '...');
  try {
    execSync('curl -sL --retry 2 "' + c.url + '" -o "' + dest + '"');
    const sz = fs.statSync(dest).size;
    console.log('  -> Saved ' + c.name + ' (' + Math.round(sz / 1024) + ' KB)');
  } catch (err) {
    console.error('  -> Failed ' + c.name + ':', err.message);
  }
}
