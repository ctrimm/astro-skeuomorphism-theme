# Placeholder Images Guide

This theme includes placeholder images that you should replace with your own content.

## 📍 Placeholder Image Locations

### 1. Profile Image
**Location:** `public/images/placeholder-profile.svg`
**Used in:** `src/components/sections/About.astro` (line ~18)
**Recommended size:** 400x400px (square)
**Format:** JPG, PNG, or WebP
**Alt text to update:** "Profile photo of Alex Morgan" → "Profile photo of [Your Name]"

#### To Replace:
1. Add your profile photo to `public/images/`
2. Example: `public/images/profile.jpg`
3. Update `About.astro`:
   ```astro
   <img
     src="/images/profile.jpg"  <!-- Change this -->
     alt="Profile photo of [Your Name]"  <!-- Change this -->
     class="w-full h-full rounded-3xl object-cover bg-neubg"
     loading="lazy"
   />
   ```

---

### 2. Project Images (4 placeholders)
**Location:** `public/images/placeholder-project.svg`
**Used in:** `src/components/sections/Projects.astro` (lines ~13, 21, 29, 37)
**Recommended size:** 800x400px (16:9 ratio)
**Format:** JPG, PNG, or WebP (WebP preferred for performance)

#### Current Projects:
1. **E-Commerce Platform** - Line 13
2. **Task Management App** - Line 21
3. **Design System Library** - Line 29
4. **Weather Dashboard** - Line 37

#### To Replace:
1. Add your project screenshots to `public/images/`
2. Example naming: `project-ecommerce.jpg`, `project-taskapp.jpg`, etc.
3. Update `Projects.astro`:
   ```javascript
   const projects = [
     {
       title: "E-Commerce Platform",
       description: "...",
       techStack: [...],
       imageUrl: "/images/project-ecommerce.jpg",  // Change this
       projectUrl: "#",  // Change this to your project URL
     },
     // ... repeat for other projects
   ];
   ```

---

## 🎨 Image Optimization Tips

### Before Adding Images:

1. **Resize to exact dimensions:**
   - Profile: 400x400px
   - Projects: 800x400px

2. **Compress images:**
   - Use [Squoosh.app](https://squoosh.app/)
   - Target: < 100KB per image
   - WebP format recommended

3. **Use descriptive filenames:**
   - ✅ `profile-headshot.webp`
   - ✅ `project-ecommerce-dashboard.webp`
   - ❌ `IMG_1234.jpg`
   - ❌ `Screenshot 2024-01-01.png`

### Tools for Image Optimization:

- **[Squoosh](https://squoosh.app/)** - Browser-based, free
- **[TinyPNG](https://tinypng.com/)** - PNG/JPG compression
- **[ImageOptim](https://imageoptim.com/)** - Mac app
- **CLI:** Use `sharp` or `imagemagick` for batch processing

---

## 📝 Content Checklist

### About Section
- [ ] Replace profile placeholder image
- [ ] Update alt text with your name
- [ ] Update bio text (lines ~29-42 in `About.astro`)
- [ ] Update statistics (Years, Projects, etc.)

### Projects Section
- [ ] Replace all 4 project placeholder images
- [ ] Update project titles
- [ ] Update project descriptions
- [ ] Update tech stacks
- [ ] Add real project URLs (replace `#`)
- [ ] Verify alt text is descriptive

### Hero Section
- [ ] Update name from "Alex Morgan" (`Hero.astro` line ~16)
- [ ] Update title/role (line ~20)
- [ ] Update location (line ~22)
- [ ] Update description (lines ~27-29)

### Contact Section
- [ ] Update email address (`Contact.astro` line ~108)
- [ ] Update social media links (lines ~140-152 in `Contact.astro`)
- [ ] Update location (line ~138)

---

## 🖼️ Image Directory Structure

```
public/
├── images/
│   ├── placeholder-profile.svg    ← Replace this
│   ├── placeholder-project.svg    ← Replace this (4 times)
│   │
│   │ Your images should be added here:
│   ├── profile.webp              ← Add your profile photo
│   ├── project-1.webp            ← Add project screenshots
│   ├── project-2.webp
│   ├── project-3.webp
│   └── project-4.webp
```

---

## ⚡ Quick Replace Command

If using the same filenames, you can quickly replace with:

```bash
# Replace profile image
# 1. Add your image as: public/images/profile.webp

# 2. Update About.astro:
# Find:  src="/images/placeholder-profile.svg"
# Replace: src="/images/profile.webp"

# Replace project images
# 1. Add your images as: public/images/project-{1,2,3,4}.webp

# 2. Update Projects.astro line by line:
imageUrl: "/images/project-1.webp",
imageUrl: "/images/project-2.webp",
imageUrl: "/images/project-3.webp",
imageUrl: "/images/project-4.webp",
```

---

## 🎯 Accessibility Reminder

When adding images, ensure:
- [ ] All images have descriptive `alt` text
- [ ] Decorative images use `alt=""` or `aria-hidden="true"`
- [ ] File sizes are optimized (< 100KB each)
- [ ] Images use lazy loading: `loading="lazy"`
- [ ] Images have appropriate aspect ratios

---

## 📚 Additional Resources

- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Astro Image Optimization](https://docs.astro.build/en/guides/images/)

---

**Need Help?** See `README.md` for full customization guide or open an issue on GitHub.
