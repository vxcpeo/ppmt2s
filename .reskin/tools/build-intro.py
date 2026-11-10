import base64
import random
from PIL import Image

BASE = r'E:\workspace\chuangye\solana\ppmt2s\website\.reskin\tools'
TW = r'E:\workspace\chuangye\solana\ppmt2s\twitter'

# Crop the product capture to the panel aspect (2.56) and downscale for embedding.
im = Image.open(BASE + r'\capture-market.png').convert('RGB')
crop = im.crop((0, 560, 3200, 1810))          # 3200 x 1250  -> 2.56
crop = crop.resize((2048, 800), Image.LANCZOS)
crop.save(BASE + r'\intro-panel.jpg', quality=88, optimize=True)
b64 = base64.b64encode(open(BASE + r'\intro-panel.jpg', 'rb').read()).decode('ascii')

random.seed(77)
stars = ''.join(
    '<circle cx="%.1f" cy="%.1f" r="%.2f" fill="#FFFFFF" opacity="%.2f"/>' % (
        random.uniform(0, 1600), random.uniform(0, 900), random.uniform(0.6, 2.0), random.uniform(0.10, 0.5))
    for _ in range(80)
)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 900" width="1600" height="900">
  <defs>
    <radialGradient id="ig-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#40B3FF" stop-opacity="0.22"/><stop offset="1" stop-color="#40B3FF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ig-glow2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#A78BFA" stop-opacity="0.18"/><stop offset="1" stop-color="#A78BFA" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="ig-panel"><rect x="84" y="248" width="1432" height="560" rx="20"/></clipPath>
  </defs>
  <rect width="1600" height="900" fill="#05060B"/>
  <g>{stars}</g>
  <ellipse cx="300" cy="120" rx="520" ry="360" fill="url(#ig-glow)"/>
  <ellipse cx="1420" cy="840" rx="480" ry="340" fill="url(#ig-glow2)"/>

  <text x="84" y="78" font-family='"Cascadia Mono",ui-monospace,Consolas,monospace' font-size="13" letter-spacing="3.2" fill="#7E8299">KEEPORA</text>
  <circle cx="228" cy="73" r="3.5" fill="#40B3FF"/>
  <text x="1516" y="78" text-anchor="end" font-family='"Cascadia Mono",ui-monospace,Consolas,monospace' font-size="13" letter-spacing="3.2" fill="#9A9DB2">SOLANA</text>

  <text x="84" y="168" font-family='"Century Gothic","Futura","Segoe UI",Arial,sans-serif' font-size="52" letter-spacing="-1" fill="#F4F5FA">Escrow, review, <tspan fill="#40B3FF">mint.</tspan></text>
  <text x="86" y="210" font-family='"Cascadia Mono",ui-monospace,Consolas,monospace' font-size="12" letter-spacing="2.6" fill="#7E8299">THE PROTOTYPE, IN ONE SCREEN</text>

  <image x="84" y="248" width="1432" height="560" preserveAspectRatio="xMidYMid slice" clip-path="url(#ig-panel)" href="data:image/jpeg;base64,{b64}"/>
  <rect x="84" y="248" width="1432" height="560" rx="20" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
  <rect x="84" y="248" width="1432" height="560" rx="20" fill="none" stroke="rgba(64,179,255,0.28)" stroke-width="1"/>

  <line x1="84" y1="838" x2="1516" y2="838" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <text x="84" y="870" font-family='"Cascadia Mono",ui-monospace,Consolas,monospace' font-size="12" letter-spacing="2.4" fill="#7E8299">DEMO DATA &#183; PREVIEW BUILD &#183; NO WALLET CONNECTED</text>
  <text x="1516" y="870" text-anchor="end" font-family='"Cascadia Mono",ui-monospace,Consolas,monospace' font-size="12" letter-spacing="2.4" fill="#7E8299">keepora.xyz</text>
</svg>
'''

open(TW + r'\intro-graphic.svg', 'w', encoding='utf-8', newline='\n').write(svg)
print('intro-graphic.svg written', len(svg))
