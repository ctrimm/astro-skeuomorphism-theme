# Product Requirements Document: Skeuomorphic Personal Portfolio Website

**Version:** 1.0  
**Last Updated:** December 30, 2025  
**Project Type:** Coding Agent Implementation  
**Tech Stack:** Astro, shadcn/ui, Tailwind CSS

---

## 1. Executive Summary

This PRD defines the requirements for a coding agent to create a modern skeuomorphic personal portfolio website that balances nostalgic, tactile design elements with contemporary web standards and performance. The site will leverage Astro for static site generation, shadcn/ui for component patterns, and Tailwind CSS for styling, while implementing authentic skeuomorphic design principles that create depth, texture, and real-world metaphors in the digital interface.

---

## 2. Background & Context

### 2.1 What is Skeuomorphism?

**Skeuomorphism** is a design technique where digital elements mimic their real-world counterparts to create familiar, intuitive user experiences. The term derives from Greek words "skeuos" (container/tool) and "morphḗ" (shape).

**Key Characteristics:**
- Digital objects that resemble physical items
- Realistic textures, shadows, and gradients
- Three-dimensional appearance using lighting effects
- Tactile, touch-friendly visual cues
- Familiar metaphors from the physical world

### 2.2 The 2025 Skeuomorphism Revival

As documented in recent design trend analyses, skeuomorphism is experiencing a comeback in late 2025:

- **Modern Implementation:** Blends skeuomorphic elements with flat design principles
- **Technology Enablers:** Ultra-high resolution displays and advanced graphics processors
- **User Psychology:** Growing nostalgia and desire for emotional connections in digital experiences
- **AR/VR Influence:** Apple Vision Pro and mixed reality devices incorporate skeuomorphic textures

**Contemporary Approach (Neumorphism):**
- Soft, extruded look using subtle shadows and highlights
- Limited color palettes (often monochromatic)
- Elements appear sculpted from the interface surface
- Cleaner than traditional skeuomorphism but more tactile than flat design

---

## 3. Design Principles & References

### 3.1 Skeuomorphic Design Principles

The coding agent must implement these core principles:

1. **Real-World Metaphors**
   - Use recognizable objects from everyday life
   - Leverage existing knowledge of physical interactions
   - Make digital functions instantly comprehensible

2. **Realistic Textures**
   - Mimic materials (leather, wood, metal, paper, glass)
   - Add subtle grain, bumps, or surface details
   - Use CSS gradients and box-shadows for depth

3. **Three-Dimensional Elements**
   - Multiple shadow layers (light and dark)
   - Highlights and lowlights to suggest lighting
   - Soft or hard edges based on material type

4. **Balance with Clarity**
   - Ensure realism doesn't sacrifice usability
   - Maintain accessibility standards (WCAG 2.1 AA)
   - Avoid visual clutter

5. **Modern Minimalism Hybrid**
   - Selective skeuomorphism (not everything needs texture)
   - Clean typography alongside tactile elements
   - Generous white space

### 3.2 Example Websites (December 2025)

**Reference Sites from onepagelove.com/tag/skeuomorphism:**

1. **Arrow Dynamics** (https://onepagelove.com/arrow-dynamics)
   - Digital product landing page
   - Clean skeuomorphic card elements
   - Subtle depth with modern minimalism

2. **AuthKit** (https://onepagelove.com/authkit)
   - SaaS landing page
   - Neumorphic buttons and containers
   - Professional, contemporary skeuomorphism

3. **Vid2txt** (https://onepagelove.com/vid2txt)
   - Product showcase
   - Tactile UI elements
   - Balance of flat and dimensional design

4. **instaprice** (https://onepagelove.com/instaprice)
   - Finance/SaaS product
   - Modern skeuomorphic dashboard elements
   - Professional color palette with depth

**Additional Inspiration Sources:**
- **Webflow Skeuomorphism Gallery:** https://webflow.com/made-in-webflow/skeuomorphism
- **FreeFrontend Neumorphism Examples:** https://freefrontend.com/css-neumorphism-examples/
- **Dribbble Neumorphism Shots:** Search "neumorphism 2025"

### 3.3 Design Trend Articles (Late 2025)

**Key References:**
- Big Human Guide (Dec 9, 2025): https://www.bighuman.com/blog/guide-to-skeuomorphic-design-style
- Kryzalid Analysis (Feb 6, 2025): https://kryzalid.net/en/web-marketing-blog/skeuomorphism-an-unexpected-comeback-in-2025/
- TBH Creative Trends (Jan 24, 2025): https://blog.tbhcreative.com/web-design-trends-of-2025/

---

## 4. Technical Requirements

### 4.1 Core Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Astro** | ^4.0.0 | Static site generator, component framework |
| **TypeScript** | ^5.0.0 | Type safety and better DX |
| **Tailwind CSS** | ^3.4.0 | Utility-first CSS framework |
| **shadcn/ui** | Latest | Pre-built accessible components |
| **React** | ^18.0.0 | For interactive islands (Astro integration) |

### 4.2 Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Let shadcn handle base styles
    }),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
```

### 4.3 Tailwind Configuration for Skeuomorphism

```javascript
// tailwind.config.mjs
export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        // Neutral palette for neumorphic design
        neubg: {
          light: '#e0e5ec',
          DEFAULT: '#d1d9e6',
          dark: '#b8c2cc',
        },
        // Add custom colors as needed
      },
      boxShadow: {
        // Neumorphic shadows
        'neu-sm': '2px 2px 4px rgba(0,0,0,0.1), -2px -2px 4px rgba(255,255,255,0.8)',
        'neu': '4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.8)',
        'neu-lg': '8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,0.8)',
        'neu-inset': 'inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.8)',
        // Skeuomorphic shadows
        'skeuo-soft': '0 2px 4px rgba(0,0,0,0.05), 0 4px 8px rgba(0,0,0,0.05)',
        'skeuo-raised': '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
        'skeuo-deep': '0 10px 20px rgba(0,0,0,0.15), 0 6px 6px rgba(0,0,0,0.1)',
      },
      backdropBlur: {
        glass: '12px',
      },
      backgroundImage: {
        'leather-texture': 'url("/textures/leather.png")',
        'paper-texture': 'url("/textures/paper.png")',
        'wood-grain': 'url("/textures/wood.png")',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

### 4.4 Project Structure

```
/
├── public/
│   ├── textures/           # Material textures for backgrounds
│   ├── icons/              # Custom skeuomorphic icons
│   └── fonts/              # Web fonts
├── src/
│   ├── components/
│   │   ├── ui/             # shadcn components
│   │   ├── skeuomorphic/   # Custom skeuo components
│   │   │   ├── Card.astro
│   │   │   ├── Button.tsx
│   │   │   ├── Toggle.tsx
│   │   │   └── Calculator.tsx
│   │   └── sections/       # Page sections
│   │       ├── Hero.astro
│   │       ├── About.astro
│   │       ├── Projects.astro
│   │       └── Contact.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── types.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 5. Component Requirements

### 5.1 Core Components

#### 5.1.1 Skeuomorphic Button

**Requirements:**
- Raised appearance with realistic lighting
- Pressed state with inset shadow
- Hover state with subtle lift
- Multiple variants: primary, secondary, glass
- Accessibility: keyboard navigation, ARIA labels

**Implementation Pattern:**
```tsx
// src/components/skeuomorphic/Button.tsx
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'raised' | 'flat' | 'glass';
  children: React.ReactNode;
  onClick?: () => void;
}

export const SkeuoButton = ({ variant = 'raised', children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-6 py-3 rounded-xl font-medium transition-all duration-200',
        variant === 'raised' && 'bg-gradient-to-b from-blue-400 to-blue-600 shadow-skeuo-raised active:shadow-neu-inset',
        variant === 'glass' && 'bg-white/20 backdrop-blur-glass border border-white/30',
      )}
    >
      {children}
    </button>
  );
};
```

#### 5.1.2 Neumorphic Card

**Requirements:**
- Soft extruded or pressed appearance
- Consistent with background color
- Optional content slot
- Hover interaction (subtle depth change)

**Design Pattern:**
```css
.neu-card {
  background: var(--neu-bg);
  box-shadow: 
    4px 4px 8px rgba(0,0,0,0.1),
    -4px -4px 8px rgba(255,255,255,0.8);
  border-radius: 1rem;
  padding: 1.5rem;
}

.neu-card:hover {
  box-shadow: 
    6px 6px 12px rgba(0,0,0,0.12),
    -6px -6px 12px rgba(255,255,255,0.9);
}
```

#### 5.1.3 Skeuomorphic Toggle/Switch

**Requirements:**
- Physical toggle switch appearance
- Smooth animation between states
- Tactile feedback (scale transform on click)
- Accessible (keyboard control, screen reader support)

#### 5.1.4 Textured Container

**Requirements:**
- Background texture options (paper, leather, linen)
- Subtle texture overlay that doesn't impair readability
- Blend modes for natural integration
- Optional depth with inner shadows

### 5.2 Section Components

#### 5.2.1 Hero Section

**Requirements:**
- Large, attention-grabbing headline
- Skeuomorphic name badge or card
- Subtle background texture or gradient
- Call-to-action buttons with depth
- Optional: Animated 3D name plate

**Layout:**
```astro
---
// src/components/sections/Hero.astro
import { SkeuoButton } from '../skeuomorphic/Button';
---

<section class="min-h-screen flex items-center justify-center bg-neubg relative">
  <!-- Subtle texture overlay -->
  <div class="absolute inset-0 bg-paper-texture opacity-5"></div>
  
  <div class="relative z-10 text-center max-w-4xl px-4">
    <!-- Neumorphic name card -->
    <div class="inline-block p-8 rounded-2xl shadow-neu mb-8">
      <h1 class="text-6xl font-bold bg-gradient-to-br from-gray-700 to-gray-900 bg-clip-text text-transparent">
        Your Name
      </h1>
      <p class="text-xl text-gray-600 mt-2">Your Title</p>
    </div>
    
    <!-- CTA Buttons -->
    <div class="flex gap-4 justify-center">
      <SkeuoButton variant="raised">View Projects</SkeuoButton>
      <SkeuoButton variant="glass">Contact Me</SkeuoButton>
    </div>
  </div>
</section>
```

#### 5.2.2 About Section

**Requirements:**
- Bio text in readable container
- Profile image with realistic frame or shadow
- Skills displayed as tactile badges or cards
- Timeline or experience cards with depth

#### 5.2.3 Projects Section

**Requirements:**
- Project cards with hover effects
- Image with subtle frame or border
- Depth on hover (lift effect)
- Category tags as raised pills
- Links with button styling

**Design Pattern:**
```css
.project-card {
  background: linear-gradient(145deg, #f0f0f3 0%, #e6e9ed 100%);
  box-shadow: 
    8px 8px 16px rgba(0,0,0,0.1),
    -8px -8px 16px rgba(255,255,255,0.8);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    12px 12px 24px rgba(0,0,0,0.12),
    -12px -12px 24px rgba(255,255,255,0.9);
}
```

#### 5.2.4 Contact Section

**Requirements:**
- Form inputs with inset neumorphic style
- Submit button with raised appearance
- Social links as icon buttons with depth
- Optional: Email displayed in realistic "envelope" card

---

## 6. Design Specifications

### 6.1 Color Palette

**Primary Neumorphic Palette:**
```css
:root {
  --neu-bg-light: #e0e5ec;
  --neu-bg: #d1d9e6;
  --neu-bg-dark: #b8c2cc;
  
  --neu-shadow-dark: rgba(0, 0, 0, 0.1);
  --neu-shadow-light: rgba(255, 255, 255, 0.8);
  
  --accent-primary: #3b82f6;
  --accent-secondary: #8b5cf6;
  
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
}
```

**Accent Colors (customizable):**
- Primary: Blue (#3b82f6)
- Secondary: Purple (#8b5cf6)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)

### 6.2 Typography

**Font Stack:**
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Playfair Display', Georgia, serif; /* For headings */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

**Type Scale:**
- Heading 1: 3.5rem (56px), font-weight: 700
- Heading 2: 2.5rem (40px), font-weight: 600
- Heading 3: 2rem (32px), font-weight: 600
- Body Large: 1.25rem (20px), font-weight: 400
- Body: 1rem (16px), font-weight: 400
- Small: 0.875rem (14px), font-weight: 400

### 6.3 Spacing System

Use Tailwind's default spacing scale (0.25rem increments)
- Extra tight: 0.5rem (2)
- Tight: 1rem (4)
- Normal: 1.5rem (6)
- Loose: 2rem (8)
- Extra loose: 3rem (12)

### 6.4 Animation & Transitions

**Standard Transitions:**
```css
.transition-standard {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Hover Effects:**
- Buttons: scale(1.02) + shadow increase
- Cards: translateY(-4px) + shadow increase
- Links: color shift + underline

---

## 7. Content Requirements

### 7.1 Required Pages

1. **Home (/)** - Single page portfolio
   - Hero section
   - About section
   - Projects/Work section
   - Skills/Tech stack section
   - Contact section

### 7.2 Content Placeholders

The coding agent should use realistic placeholder content:

**Personal Info:**
- Name: "Alex Morgan"
- Title: "Full-Stack Developer & UI/UX Designer"
- Bio: 2-3 paragraph professional summary
- Location: "San Francisco, CA"

**Projects:**
- Minimum 4 project cards
- Each with: title, description, tech stack, image, link
- Mix of personal and professional work

**Skills:**
- Frontend: React, TypeScript, Astro, Tailwind
- Backend: Node.js, Python, PostgreSQL
- Design: Figma, Adobe XD, UI/UX principles

**Contact Methods:**
- Email form (non-functional, UI only)
- Social links: GitHub, LinkedIn, Twitter
- Optional: Resume download button

---

## 8. Accessibility Requirements

### 8.1 WCAG 2.1 Level AA Compliance

**Color Contrast:**
- Text on neumorphic backgrounds must meet 4.5:1 ratio
- Interactive elements must meet 3:1 ratio
- Test with tools like WebAIM Contrast Checker

**Keyboard Navigation:**
- All interactive elements focusable via Tab
- Focus indicators clearly visible
- Skip navigation link for screen readers

**ARIA Labels:**
- Proper semantic HTML (nav, main, section, article)
- ARIA labels for icon buttons
- Alt text for all images

**Screen Reader Support:**
- Logical heading hierarchy (h1 → h2 → h3)
- Descriptive link text
- Form labels properly associated

### 8.2 Performance Requirements

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Optimization Strategies:**
- Lazy load images below fold
- Optimize texture images (WebP format, < 100KB)
- Minimize CSS (use PurgeCSS with Tailwind)
- Inline critical CSS
- Use Astro's built-in optimization

---

## 9. Browser Support

**Target Browsers:**
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari (iOS): Last 2 versions
- Chrome Mobile (Android): Last 2 versions

**Progressive Enhancement:**
- Base functionality works without JavaScript
- Enhanced interactions require modern CSS (backdrop-filter, box-shadow)
- Graceful degradation for older browsers

---

## 10. Development Guidelines for Coding Agent

### 10.1 Code Quality Standards

**TypeScript:**
- Strict mode enabled
- Proper type definitions for all props
- No `any` types unless absolutely necessary

**Components:**
- Single responsibility principle
- Reusable and composable
- Well-documented with JSDoc comments

**CSS/Tailwind:**
- Use Tailwind utilities first
- Custom CSS only when necessary
- CSS modules for complex components

**Naming Conventions:**
- Components: PascalCase (SkeuoButton.tsx)
- Files: kebab-case for pages, PascalCase for components
- CSS classes: BEM or Tailwind utilities

### 10.2 File Organization

```
Each component should have:
1. Type definitions (if TypeScript)
2. Component implementation
3. Optional: Styles (if using CSS modules)
4. Export statement
```

### 10.3 Documentation

**README.md should include:**
- Project overview
- Tech stack
- Installation instructions
- Development commands
- Deployment guide
- Credits and references

**Component Documentation:**
- Props interface with descriptions
- Usage examples
- Accessibility notes

---

## 11. Testing & Quality Assurance

### 11.1 Manual Testing Checklist

- [ ] All sections render correctly
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Skeuomorphic effects visible and performant
- [ ] All links functional
- [ ] Form inputs styled correctly (if interactive)
- [ ] Hover states work as expected
- [ ] Keyboard navigation functional
- [ ] No console errors

### 11.2 Automated Testing (Optional)

- Lighthouse score: 90+ in all categories
- axe DevTools: 0 accessibility violations
- PageSpeed Insights: Pass Core Web Vitals

---

## 12. Deployment

### 12.1 Build Process

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### 12.2 Recommended Hosting

- **Vercel** (recommended for Astro)
- **Netlify**
- **Cloudflare Pages**
- **GitHub Pages**

### 12.3 Environment Configuration

```env
# .env.example
PUBLIC_SITE_URL=https://yoursite.com
PUBLIC_SITE_TITLE=Your Name - Portfolio
PUBLIC_SITE_DESCRIPTION=Personal portfolio website
```

---

## 13. Success Criteria

### 13.1 Functional Requirements ✓

- [ ] Site builds without errors
- [ ] All sections present and populated
- [ ] Responsive across device sizes
- [ ] Semantic HTML structure
- [ ] Working navigation

### 13.2 Design Requirements ✓

- [ ] Clear skeuomorphic elements throughout
- [ ] Consistent neumorphic styling
- [ ] Realistic textures and shadows
- [ ] Professional, modern aesthetic
- [ ] Balance of depth and clarity

### 13.3 Technical Requirements ✓

- [ ] Built with Astro + React
- [ ] Uses Tailwind CSS
- [ ] Includes shadcn/ui components
- [ ] TypeScript configured
- [ ] Performance optimized

### 13.4 Accessibility Requirements ✓

- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigable
- [ ] Screen reader friendly
- [ ] Proper ARIA labels
- [ ] Sufficient color contrast

---

## 14. Future Enhancements (Out of Scope)

These features are not required for v1.0 but could be added later:

1. **Dark Mode**
   - Inverted neumorphic shadows
   - Darker background palette
   - Toggle switch with skeuomorphic design

2. **Blog Section**
   - Markdown-based posts
   - Article cards with skeuomorphic styling
   - Reading time estimates

3. **Interactive Elements**
   - 3D parallax effects
   - Animated skill meters
   - Project filtering system

4. **Advanced Skeuomorphic Components**
   - Realistic calculator
   - Vintage camera interface
   - Leather-bound notebook design

5. **Internationalization**
   - Multi-language support
   - Content translation

---

## 15. Reference Links

### Design Inspiration
- One Page Love Skeuomorphism Gallery: https://onepagelove.com/tag/skeuomorphism
- Webflow Skeuomorphism Examples: https://webflow.com/made-in-webflow/skeuomorphism
- FreeFrontend Neumorphism: https://freefrontend.com/css-neumorphism-examples/
- Dribbble Neumorphism: https://dribbble.com/search/neumorphism

### Articles & Guides
- Big Human: Complete 2026 Guide to Skeuomorphic Design (Dec 2025)
  https://www.bighuman.com/blog/guide-to-skeuomorphic-design-style
- Kryzalid: Skeuomorphism Comeback in 2025 (Feb 2025)
  https://kryzalid.net/en/web-marketing-blog/skeuomorphism-an-unexpected-comeback-in-2025/
- TBH Creative: Web Design Trends of 2025 (Jan 2025)
  https://blog.tbhcreative.com/web-design-trends-of-2025/
- JustInMind: Skeuomorphism Guide (Feb 2025)
  https://www.justinmind.com/ui-design/skeuomorphic

### Technical Documentation
- Astro Documentation: https://docs.astro.build
- shadcn/ui: https://ui.shadcn.com
- Tailwind CSS: https://tailwindcss.com/docs
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

### Tools
- Neumorphism.io (CSS Generator): https://neumorphism.io
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Lighthouse (Chrome DevTools): Built-in performance testing

---

## 16. Glossary

**Skeuomorphism:** Design technique mimicking real-world objects in digital interfaces

**Neumorphism:** Modern skeuomorphism combining soft shadows for extruded/pressed appearance

**Glassmorphism:** Design trend using frosted glass effect with backdrop blur

**Affordance:** Visual cues that suggest how an element can be interacted with

**Shadow Stacking:** Using multiple box-shadow layers to create depth

**Extruded:** Appearance of element rising from surface

**Pressed/Inset:** Appearance of element pushed into surface

---

## Appendix A: Example Component Code

### A.1 Complete Neumorphic Card Component

```tsx
// src/components/skeuomorphic/NeuCard.tsx
import { cn } from '@/lib/utils';

interface NeuCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'raised' | 'pressed';
  hoverable?: boolean;
}

export const NeuCard = ({ 
  children, 
  className, 
  variant = 'raised',
  hoverable = false 
}: NeuCardProps) => {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variant === 'raised' && 'shadow-neu',
        variant === 'pressed' && 'shadow-neu-inset',
        hoverable && 'hover:shadow-neu-lg hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};
```

### A.2 Skeuomorphic Project Card

```astro
---
// src/components/ProjectCard.astro
interface Props {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  projectUrl: string;
}

const { title, description, techStack, imageUrl, projectUrl } = Astro.props;
---

<article class="group">
  <div class="
    bg-gradient-to-br from-gray-50 to-gray-100
    rounded-2xl overflow-hidden
    shadow-skeuo-raised
    transition-all duration-300
    hover:shadow-skeuo-deep
    hover:-translate-y-2
  ">
    <!-- Image Container -->
    <div class="relative overflow-hidden h-48">
      <img 
        src={imageUrl} 
        alt={title}
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <!-- Subtle gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
    
    <!-- Content -->
    <div class="p-6">
      <h3 class="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <p class="text-gray-600 mb-4">{description}</p>
      
      <!-- Tech Stack Pills -->
      <div class="flex flex-wrap gap-2 mb-4">
        {techStack.map(tech => (
          <span class="
            px-3 py-1 text-sm
            bg-white rounded-full
            shadow-neu-sm
            text-gray-700
          ">
            {tech}
          </span>
        ))}
      </div>
      
      <!-- CTA Button -->
      <a 
        href={projectUrl}
        class="
          inline-block px-6 py-3
          bg-gradient-to-br from-blue-400 to-blue-600
          text-white font-medium rounded-xl
          shadow-skeuo-raised
          active:shadow-neu-inset
          transition-all duration-200
          hover:from-blue-500 hover:to-blue-700
        "
      >
        View Project →
      </a>
    </div>
  </div>
</article>
```

---

**End of PRD**

*This document should be used by a coding agent to implement a complete, modern skeuomorphic personal portfolio website following 2025 design trends and best practices.*
