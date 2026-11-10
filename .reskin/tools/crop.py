from PIL import Image
import os
base = r'E:\workspace\chuangye\solana\ppmt2s\website\.reskin\tools'
im = Image.open(os.path.join(base,'capture-market.png'))
# crop the filter row area at 2x coords: y 600..700, x 200..3200
crop = im.crop((200, 600, 3200, 720))
crop.save(os.path.join(base,'crop-filter.png'))
print(crop.size)
