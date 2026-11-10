from PIL import Image
import os
base = r'E:\workspace\chuangye\solana\ppmt2s\website\.reskin\tools'
for name in ['capture-protocol.png','capture-cover.png']:
    im = Image.open(os.path.join(base, name))
    im2 = im.resize((im.size[0]//2, im.size[1]//2), Image.LANCZOS).convert('RGB')
    im2.save(os.path.join(base, name.replace('.png','-small.png')))
    print(name, im2.size, im2.mode)
