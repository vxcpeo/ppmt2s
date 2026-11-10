from PIL import Image
import os
base = r'E:\workspace\chuangye\solana\ppmt2s\website\.reskin'
for name, out in [('current/home-mobile.png','review/current-mobile.png'),('current/home-desktop.png','review/current-desktop.png')]:
    im = Image.open(os.path.join(base, name.replace('/','\\')))
    w,h = im.size
    scale = min(1.0, 640/w, 7600/h)
    im2 = im.resize((int(w*scale), int(h*scale)), Image.LANCZOS).convert('RGB')
    im2.save(os.path.join(base, out.replace('/','\\')))
    print(name, im.size, '->', im2.size)
# crops of desktop at 2x detail
im = Image.open(os.path.join(base,'current','home-desktop.png'))
print('desktop size', im.size)
for i,(y0,y1) in enumerate([(0,900),(900,1800),(1800,2700)]):
    im.crop((0,y0,1440,y1)).save(os.path.join(base,'review',f'desk-part{i}.png'))
