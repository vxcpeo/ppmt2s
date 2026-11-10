from PIL import Image
import os
base = r'E:\workspace\chuangye\solana\ppmt2s\website\.reskin'
im = Image.open(os.path.join(base,'current','home-desktop.png'))
print('desktop', im.size)
cuts = {'cover2':(0,940),'facts2':(940,1880),'rewards2':(4820,5820),'tokenomics2':(5820,6820)}
for name,(y0,y1) in cuts.items():
    im.crop((0,y0,1440,min(y1,im.size[1]))).save(os.path.join(base,'review',f'{name}.png'))
m = Image.open(os.path.join(base,'current','home-mobile.png'))
print('mobile', m.size)
m.crop((0,0,390,1400)).save(os.path.join(base,'review','mobile-top.png'))
m.crop((0,1400,390,2800)).save(os.path.join(base,'review','mobile-mid.png'))
