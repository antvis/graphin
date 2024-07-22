import fs from 'fs';

fs.copyFileSync('../../README.md', './README.md');
fs.copyFileSync('../../README.en-US.md', './README.en-US.md');
