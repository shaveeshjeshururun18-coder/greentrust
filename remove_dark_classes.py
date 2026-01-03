import re
import os

# List of all component files
files = [
    r'd:\ECOMMMERCE\greentrust\components\ProductCard.tsx',
    r'd:\ECOMMMERCE\greentrust\components\Header.tsx',
    r'd:\ECOMMMERCE\greentrust\components\DesktopHeader.tsx',
    r'd:\ECOMMMERCE\greentrust\components\BottomNav.tsx',
    r'd:\ECOMMMERCE\greentrust\components\Footer.tsx',
    r'd:\ECOMMMERCE\greentrust\components\CategoryGrid.tsx',
    r'd:\ECOMMMERCE\greentrust\components\CartView.tsx',
    r'd:\ECOMMMERCE\greentrust\components\CategoriesView.tsx',
    r'd:\ECOMMMERCE\greentrust\components\ProductDetail.tsx',
    r'd:\ECOMMMERCE\greentrust\components\AnimatedBanner.tsx',
    r'd:\ECOMMMERCE\greentrust\components\BasketBuddyView.tsx',
    r'd:\ECOMMMERCE\greentrust\components\AIAssistant.tsx',
    r'd:\ECOMMMERCE\greentrust\components\SupportView.tsx',
    r'd:\ECOMMMERCE\greentrust\components\OrderSuccessView.tsx',
    r'd:\ECOMMMERCE\greentrust\components\DeveloperView.tsx',
    r'd:\ECOMMMERCE\greentrust\components\DesktopHero.tsx',
    r'd:\ECOMMMERCE\greentrust\index.css',
]

# Pattern to match dark: classes
pattern = r'dark:[^\s"\']*'

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove all dark: classes
        new_content = re.sub(pattern, '', content)
        
        # Clean up extra spaces
        new_content = re.sub(r'\s+', ' ', new_content)
        new_content = re.sub(r'\s+>', '>', new_content)
        new_content = re.sub(r'\s+"', '"', new_content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Processed: {file_path}")
    else:
        print(f"File not found: {file_path}")

print("Done! All dark: classes removed.")
