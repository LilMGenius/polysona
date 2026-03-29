import re

with open(r'C:\Users\smsme\Desktop\supersona\assets\banner.svg', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace text
content = re.sub(r'(?i)supersona', 'polysona', content)
content = content.replace('YOUR PERSONA, AUTOMATED.', 'BUILD AND RUN MULTIPLE PERSONAS.')

# Remove hyphen layer
hyphen_pattern = r'<!-- ============================================ -->\s*<!-- LAYER 5B: Typography — Hyphen Accent         -->\s*<!-- Bright highlight on the "-" character        -->\s*<!-- ============================================ -->\s*<text[^>]*>\s*-\s*</text>'
content = re.sub(hyphen_pattern, '', content, flags=re.DOTALL)

# Replace gradients
title_grad_old = r'<linearGradient id="title-fill" x1="0%" y1="0%" x2="100%" y2="0%">\s*<stop offset="0%" stop-color="#FF6B9D"/>\s*<stop offset="35%" stop-color="#CC7BFF"/>\s*<stop offset="65%" stop-color="#7BAFFF"/>\s*<stop offset="100%" stop-color="#00D4AA"/>\s*</linearGradient>'
title_grad_new = '''<linearGradient id="title-fill" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0891B2"/>
      <stop offset="35%" stop-color="#6366F1"/>
      <stop offset="65%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#22D3EE"/>
    </linearGradient>'''
content = re.sub(title_grad_old, title_grad_new, content)

tagline_grad_old = r'<linearGradient id="tagline-fill" x1="0%" y1="0%" x2="100%" y2="0%">\s*<stop offset="0%" stop-color="#FFB8D0"/>\s*<stop offset="50%" stop-color="#C4B8FF"/>\s*<stop offset="100%" stop-color="#80E8CC"/>\s*</linearGradient>'
tagline_grad_new = '''<linearGradient id="tagline-fill" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#67E8F9"/>
      <stop offset="50%" stop-color="#A5B4FC"/>
      <stop offset="100%" stop-color="#22D3EE"/>
    </linearGradient>'''
content = re.sub(tagline_grad_old, tagline_grad_new, content)

# Replace individual colors
content = content.replace('#FF6B9D', '#0891B2')
content = content.replace('#00D4AA', '#06B6D4')
content = content.replace('#9D6BFF', '#6366F1')

with open(r'assets/banner.svg', 'w', encoding='utf-8') as f:
    f.write(content)
