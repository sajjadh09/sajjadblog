const { execSync } = require('child_process');
console.log(execSync('git show HEAD~2:src/pages/Home.tsx').toString());
