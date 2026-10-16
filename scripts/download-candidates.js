const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(process.cwd(), 'public/images/candidates');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const candidates = [
  // 1. Hero candidates
  {
    name: 'hero-candidate-1-skyline.jpg',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2000&q=85',
    desc: 'Metropolis architectural skyline night blue'
  },
  {
    name: 'hero-candidate-2-workspace-night.jpg',
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2000&q=85',
    desc: 'Modern tech engineering workspace night view'
  },
  {
    name: 'hero-candidate-3-architectural.jpg',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
    desc: 'Modern glass corporate architectural tower looking up'
  },
  {
    name: 'hero-candidate-4-city-water.jpg',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2000&q=85',
    desc: 'Modern coastal skyline at twilight blue hour'
  },
  {
    name: 'hero-candidate-5-cloud-datacenter.jpg',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=85',
    desc: 'Network servers tech corridor blue'
  },

  // 2. About Workspace candidates
  {
    name: 'workspace-candidate-1.jpg',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    desc: 'Modern bright architectural tech office'
  },
  {
    name: 'workspace-candidate-2.jpg',
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
    desc: 'Architectural software studio workspace'
  },
  {
    name: 'workspace-candidate-3.jpg',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85',
    desc: 'Software developers collaborating around screens'
  },
  {
    name: 'workspace-candidate-4.jpg',
    url: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&w=1600&q=85',
    desc: 'Minimal modern architectural workspace'
  },
  {
    name: 'workspace-candidate-5.jpg',
    url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=85',
    desc: 'Modern software office with engineering workstation'
  },

  // 3. Turnkey Solutions / POS / Business Platform candidates
  {
    name: 'turnkey-candidate-1-pos.jpg',
    url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1600&q=85',
    desc: 'Tablet POS payment transaction at upscale store counter'
  },
  {
    name: 'turnkey-candidate-2-tablet.jpg',
    url: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?auto=format&fit=crop&w=1600&q=85',
    desc: 'Barista / retail operator using digital tablet POS'
  },
  {
    name: 'turnkey-candidate-3-payment.jpg',
    url: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=1600&q=85',
    desc: 'Contactless card payment at sleek modern terminal'
  },
  {
    name: 'turnkey-candidate-4-counter.jpg',
    url: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1600&q=85',
    desc: 'Customer checkout with modern digital POS screen'
  }
];

for (const c of candidates) {
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
