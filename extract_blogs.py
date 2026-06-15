import os
import re
import json

blog_dir = 'blog'
blogs = []

for filename in os.listdir(blog_dir):
    if not filename.endswith('.html'):
        continue
    path = os.path.join(blog_dir, filename)
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Extract metadata
    title_match = re.search(r'<title>(.*?)</title>', html)
    title = title_match.group(1).replace(' | Ranjeet Sahoo', '') if title_match else ''
    
    desc_match = re.search(r'<meta name="description" content="(.*?)"', html)
    desc = desc_match.group(1) if desc_match else ''
    
    keywords_match = re.search(r'<meta name="keywords" content="(.*?)"', html)
    keywords = keywords_match.group(1) if keywords_match else ''
    
    category_match = re.search(r'<span class="article-cat">(.*?)</span>', html)
    category = category_match.group(1) if category_match else ''
    
    # Extract all matching dates/times
    dates_and_times = re.findall(r'<span class="article-date">(.*?)</span>', html)
    date = dates_and_times[0] if len(dates_and_times) > 0 else ''
    read_time = dates_and_times[1] if len(dates_and_times) > 1 else '8 min read'
    
    lead_match = re.search(r'<p class="article-lead">(.*?)</p>', html)
    lead = lead_match.group(1) if lead_match else ''
    
    # Extract article body content (between article-body class and back-link anchor)
    body_match = re.search(r'<div class="container article-body">(.*?)<a href="\.\./index\.html#blog"', html, re.DOTALL)
    if not body_match:
        # Fallback if URL is different (e.g. index.html#blog without leading dots)
        body_match = re.search(r'<div class="container article-body">(.*?)<a href=".*index\.html#blog"', html, re.DOTALL)
    body = body_match.group(1).strip() if body_match else ''
    
    slug = filename.replace('.html', '')
    
    blogs.append({
        'slug': slug,
        'title': title,
        'desc': desc,
        'keywords': keywords,
        'category': category,
        'date': date,
        'readTime': read_time,
        'lead': lead,
        'body': body
    })

# Write out the javascript file
js_content = 'export const blogsData = ' + json.dumps(blogs, indent=2) + ';'
os.makedirs('src/data', exist_ok=True)
with open('src/data/blogsData.js', 'w', encoding='utf-8') as f:
    f.write(js_content)
print(f'Successfully generated src/data/blogsData.js with {len(blogs)} posts!')
