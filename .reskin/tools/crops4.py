from PIL import Image
import os
base = r'E:\workspace\chuangye\solana\ppmt2s\website\.reskin'
im = Image.open(os.path.join(base,'current','home-desktop.png'))
print('desktop', im.size)
im.crop((0,0,1440,940)).save(os.path.join(base,'review','final-cover.png'))
im.crop((0,5900,1440,6900)).save(os.path.join(base,'review','final-alloc.png'))
m = Image.open(os.path.join(base,'current','home-mobile.png'))
print('mobile', m.size)
m.crop((0,600,390,1500)).save(os.path.join(base,'review','final-mobile-dock.png'))
# downscale full pages for the report
for src, out, w in [('current/home-desktop.png','review/final-desktop.png',700),('baseline/home-desktop.png','review/final-baseline.png',700)]:
    p = os.path.join(base, src.replace('/','\\'))
    img = Image.open(p); iw, ih = img.size
    sc = min(1.0, w/iw, 7600/ih)
    img.resize((int(iw*sc), int(ih*sc)), Image.LANCZOS).convert('RGB').save(os.path.join(base, out.replace('/','\\')))
    print(out, int(iw*sc), int(ih*sc))
