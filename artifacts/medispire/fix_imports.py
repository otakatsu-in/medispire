import os
import re

pages_dir = 'src/pages'
for filename in os.listdir(pages_dir):
    if not filename.endswith('.tsx'):
        continue
    path = os.path.join(pages_dir, filename)
    with open(path, 'r') as f:
        content = f.read()
    
    # Fix the duplicated imports
    # The bad pattern is:
    # import { 
    # import { SEO } from "@/components/SEO";
    
    content = content.replace('import { \nimport { SEO } from "@/components/SEO";', 'import { ')
    content = content.replace('import {\nimport { SEO } from "@/components/SEO";', 'import {')
    
    # Sometimes it might be on a single line import that was matched?
    # Let's just make sure there is at least one import { SEO }
    
    # Remove ALL occurrences of import { SEO } from "@/components/SEO";
    content = re.sub(r'import\s+\{\s*SEO\s*\}\s+from\s+["\']@/components/SEO["\'];?\n?', '', content)
    
    # Add it exactly once at the top
    if '<SEO' in content:
        content = 'import { SEO } from "@/components/SEO";\n' + content
        
    with open(path, 'w') as f:
        f.write(content)
    print(f"Fixed {filename}")
