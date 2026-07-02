const fs = require('fs');
const path = 'artifacts/medispire/src/data/blogs.ts';
let text = fs.readFileSync(path, 'utf8');

const regex = /Book a free[^\.]*consultation[^\.]*/gi;
text = text.replace(regex, "Join our free weekly webinar on coming Sunday (12-2 PM) with Dr. Sangeeta to ask your questions directly and build your personalized roadmap");

// Handle brackets
const linkRegex = /\[Join our free[^\]]*\]/gi;
text = text.replace(linkRegex, "[Join our free weekly webinar on coming Sunday (12-2 PM) with Dr. Sangeeta]");

fs.writeFileSync(path, text);
console.log("Done");
