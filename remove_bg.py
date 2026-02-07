
from PIL import Image
import sys

def remove_background(input_path, output_path, mode="white"):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    
    # White pixel threshold
    threshold = 240
    
    # Checkerboard grey
    grey_target = (204, 204, 204) # approximate standard checkerboard grey
    
    for item in datas:
        # item is (R, G, B, A)
        
        if mode == "white":
            # If extremely close to white
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        elif mode == "checkerboard":
            # Remove White OR Grey squares
            is_white = item[0] > 250 and item[1] > 250 and item[2] > 250
            # Check for grey (often #CBCBCB or #C0C0C0)
            is_grey = (abs(item[0] - item[1]) < 10 and abs(item[1] - item[2]) < 10) and (180 < item[0] < 230)
            
            if is_white or is_grey:
                 new_data.append((255, 255, 255, 0))
            else:
                 new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: script.py <input> <output> [mode]")
    else:
        mode = sys.argv[3] if len(sys.argv) > 3 else "white"
        remove_background(sys.argv[1], sys.argv[2], mode)
