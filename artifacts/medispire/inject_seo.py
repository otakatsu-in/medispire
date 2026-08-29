import os
import re

pages_dir = 'src/pages'
for filename in os.listdir(pages_dir):
    if not filename.endswith('.tsx'):
        continue
    path = os.path.join(pages_dir, filename)
    with open(path, 'r') as f:
        content = f.read()
    
    # Extract title
    title_match = re.search(r'document\.title\s*=\s*["\']([^"\']+)["\'];?', content)
    if not title_match:
        print(f"No title found in {filename}")
        continue
    title = title_match.group(1)
    
    # Remove useEffect block for document.title
    content = re.sub(r'useEffect\(\(\)\s*=>\s*\{\s*document\.title\s*=\s*["\'][^"\']+["\'];?\s*\},?\s*\[\]\);?', '', content)
    
    # Remove unused useEffect import if it's now empty (optional, but let's just leave it or let linter handle it)
    
    # Add import
    if 'SEOHead' not in content:
        # Put it after the last import
        imports = re.findall(r'^import\s+.*$', content, re.MULTILINE)
        if imports:
            last_import = imports[-1]
            content = content.replace(last_import, last_import + '\nimport { SEOHead } from "@/components/SEOHead";')
        else:
            content = 'import { SEOHead } from "@/components/SEOHead";\n' + content
        
    # Inject SEOHead after first return (
    def inject_seo(match):
        return f'{match.group(1)}\n      <SEOHead title="{title}" description="Premium guidance and placement portal for healthcare professionals moving to Germany." />'
        
    content, count = re.subn(r'(return\s*(?:\(\s*)?<[a-zA-Z0-9_]+(?:(?:\s+[a-zA-Z0-9_-]+(?:=(?:["\'][^"\']*["\']|\{[^\}]+\}))?)*)\s*>)', inject_seo, content, count=1)
    
    if count == 0:
        # try fragment
        content, count = re.subn(r'(return\s*(?:\(\s*)?<>)\s*', lambda m: f'{m.group(1)}\n      <SEOHead title="{title}" description="Premium guidance and placement portal for healthcare professionals moving to Germany." />\n', content, count=1)
    
    if count > 0:
        with open(path, 'w') as f:
            f.write(content)
        print(f"Updated {filename}")
    else:
        print(f"Could not inject into {filename}")
