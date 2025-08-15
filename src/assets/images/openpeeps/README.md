# Open Peeps Images for Heard App

This folder contains Open Peeps illustrations for the Heard app UI/UX.

## 📁 Folder Structure

```
openpeeps/
├── coolkids/           # "Cool Kids" style character illustrations
├── plants/             # Calming plant and nature illustrations  
├── patterns/           # Background patterns and decorative elements
└── index.ts           # Image management utility
```

## 🖼️ How to Add Images

### 1. Download Open Peeps Images
- Go to [Open Peeps](https://openpeeps.com)
- Download PNG or SVG files in flat-color style
- Use "Cool Kids" collection for characters

### 2. Place Images in Correct Folders

**For Characters (coolkids/):**
- `forum-group.png` - People talking/discussing
- `profile-portrait.png` - Single person portrait
- `doctor-helpful.png` - Doctor or healthcare professional
- `music-listening.png` - Person with headphones
- `reading-book.png` - Person reading or studying
- `appointment-prep.png` - Person with clipboard/notes
- `symptom-tracker.png` - Person tracking health data
- `resource-library.png` - Person accessing resources
- `group-support.png` - Group of people supporting each other

**For Plants (plants/):**
- `decorative-plant.png` - Simple plant illustration
- `leaf-pattern.png` - Leaf pattern
- `calming-plant.png` - Soothing plant design

**For Patterns (patterns/):**
- `wave-pattern.png` - Wave background pattern
- `dot-pattern.png` - Dot background pattern
- `sage-dots.png` - Sage-colored dots
- `pink-waves.png` - Dusty pink waves

### 3. Image Requirements
- **Format**: PNG or SVG (PNG recommended for consistency)
- **Style**: Flat-color, no gradients
- **Size**: 200x200px minimum (will be scaled in app)
- **Background**: Transparent or white
- **Colors**: Match app palette (sage, dusty pink, charcoal)

## 🔧 How to Use Images in Components

### Option 1: Using the Image Utility
```typescript
import { getImageByType } from '@/assets/images/openpeeps'

// In your component
<Image 
  src={getImageByType('forum-discussion')}
  alt="Forum discussion"
  width={200}
  height={200}
/>
```

### Option 2: Direct Import
```typescript
import forumGroup from '@/assets/images/openpeeps/coolkids/forum-group.png'

// In your component
<Image 
  src={forumGroup}
  alt="Forum discussion"
  width={200}
  height={200}
/>
```

### Option 3: Update Illustration Component
```typescript
// In src/components/Illustration.tsx
import { getImageByType } from '@/assets/images/openpeeps'

// Replace emoji-based illustrations with actual images
const illustrations = {
  'forum-discussion': (
    <Image 
      src={getImageByType('forum-discussion')}
      alt="Forum discussion"
      width={96}
      height={96}
      className="rounded-full"
    />
  ),
  // ... other illustrations
}
```

## 🎨 Color Palette Reference
- **Sage**: #9CAF88
- **Dusty Pink**: #D4A5A5  
- **Charcoal**: #2C2C2C
- **Cream**: #FDFBF7

## 📝 Notes
- Keep file names lowercase with hyphens
- Update `index.ts` when adding new images
- Test images at different sizes (small, medium, large)
- Ensure good contrast with background colors
- Consider accessibility (alt text, color contrast)
