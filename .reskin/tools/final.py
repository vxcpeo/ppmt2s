from PIL import Image
import os
base = r'E:\workspace\chuangye\solana\ppmt2s\website\.reskin'
im = Image.open(os.path.join(base,'current','home-desktop.png'))
print('desktop', im.size)
im.crop((0,0,1440,960)).save(os.path.join(base,'review','final2-cover.png'))
w,h = im.size
sc = min(1.0, 700/w, 7600/h)
im.resize((int(w*sc), int(h*sc)), Image.LANCZOS).convert('RGB').save(os.path.join(base,'review','final2-desktop.png'))
print('full', int(w*sc), int(h*sc))
