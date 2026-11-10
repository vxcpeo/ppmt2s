from PIL import Image
import os
base = r'E:\workspace\chuangye\solana\ppmt2s\website\.reskin\tools'
for name in ['capture-market.png','capture-protocol.png','capture-cover.png']:
    p = os.path.join(base, name)
    im = Image.open(p)
    print(name, im.size)
    im2 = im.resize((im.size[0]//2, im.size[1]//2), Image.LANCZOS)
    im2.convert('RGB').save(os.path.join(base, name.replace('.png','-small.jpg')), quality=88)
    print(' saved', im2.size)
