from PIL import Image
import os
base = r'E:\workspace\chuangye\solana\ppmt2s\website\.reskin'
im = Image.open(os.path.join(base,'current','home-desktop.png'))
for name,(y0,y1) in {'rewards':(4850,5850),'tokenomics':(5850,6850),'close':(7900,8900),'footer':(8900,9473)}.items():
    im.crop((0,y0,1440,min(y1,im.size[1]))).save(os.path.join(base,'review',f'{name}.png'))
    print(name, y0, y1)
