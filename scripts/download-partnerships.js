const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(process.cwd(), 'public/images/partnerships');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const photos = [
  {
    name: 'partnership-handshake.jpg',
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
    desc: 'Business handshake / corporate agreement'
  },
  {
    name: 'enterprise-collaboration.jpg',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    desc: 'Tech team collaborating with client stakeholders'
  },
  {
    name: 'strategic-meeting.jpg',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    desc: 'Executive meeting / partnership alignment'
  },
  {
    name: 'corporate-architecture.jpg',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    desc: 'Modern financial / enterprise corporate headquarters'
  }
];

for (const photo of photos) {
  const dest = path.join(dir, photo.name);
  console.log(`Downloading ${photo.name} from Unsplash...`);
  execSync(`curl -sL "${photo.url}" -o "${dest}"`);
  console.log(`Saved: ${dest} (${fs.statSync(dest).size} bytes)`);
}
