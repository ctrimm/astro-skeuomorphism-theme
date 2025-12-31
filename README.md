# Astro Skeuomorphism Theme

A modern, beautiful skeuomorphic personal portfolio theme built with Astro, React, shadcn/ui, and Tailwind CSS. Features tactile, depth-rich design elements following 2025 skeuomorphic and neumorphic design trends.

![Astro Skeuomorphism Theme](https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=400&fit=crop)

## ✨ Features

- 🎨 **Modern Skeuomorphism** - Beautiful depth-rich design with realistic shadows and gradients
- 🎛️ **10+ Skeuomorphic Components** - Buttons, knobs, dials, sliders, meters, LEDs, and more
- 📄 **Components Showcase Page** - Interactive demo of all components at `/components`
- ⚡️ **Astro 5** - Ultra-fast static site generation
- ⚛️ **React 19** - Interactive UI components with islands architecture
- 🎯 **TypeScript** - Full type safety
- 💅 **Tailwind CSS 4** - Utility-first styling with custom neumorphic utilities
- 🎭 **shadcn/ui** - Accessible, customizable components
- 📱 **Fully Responsive** - Mobile-first design approach
- ♿️ **Accessible** - WCAG 2.1 AA compliant
- 🚀 **GitHub Pages Ready** - Automated deployment workflow included
- 🎪 **Performance Optimized** - Lighthouse 90+ scores

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Fork or use this template**
   - Click "Use this template" on GitHub, or
   - Fork this repository

2. **Clone your repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/astro-skeuomorphism-theme.git
   cd astro-skeuomorphism-theme
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:4321`
   - Visit `/components` to see the full component showcase

## 🎛️ Skeuomorphic Components

This theme includes 10+ interactive skeuomorphic components:

### Core Components
- **SkeuoButton** - 4 variants (primary, raised, flat, glass)
- **NeuCard** - Raised and pressed card variants
- **SkeuoToggle** - Tactile toggle switch

### Rotary Controls
- **SkeuoKnob** - Draggable rotary knob with 3D appearance
- **SkeuoDial** - Step-based dial with metallic finish

### Linear Controls
- **SkeuoSlider** - Horizontal slider with gradient fill

### Meters & Indicators
- **SkeuoMeter** - Analog-style gauge with animated needle
- **SkeuoLED** - Glowing LED indicators (5 colors, 3 sizes)

### Form Inputs
- **SkeuoCheckbox** - 3D checkbox control
- **SkeuoRadio** - Radio button group

**See them all in action:** Visit `/components` route for interactive demos and usage examples!

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro` | Run Astro CLI commands |

## 📁 Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment workflow
├── public/
│   ├── textures/               # Background textures (SVG)
│   │   ├── paper.svg
│   │   ├── leather.svg
│   │   └── wood.svg
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── skeuomorphic/       # Custom skeuomorphic components
│   │   │   ├── Button.tsx      # Skeuomorphic button variants
│   │   │   ├── NeuCard.tsx     # Neumorphic card component
│   │   │   └── Toggle.tsx      # Tactile toggle switch
│   │   ├── sections/           # Page sections
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── Projects.astro
│   │   │   ├── Skills.astro
│   │   │   └── Contact.astro
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   └── ProjectCard.astro
│   ├── layouts/
│   │   └── main.astro          # Base layout with SEO
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── pages/
│   │   └── index.astro         # Homepage
│   └── styles/
│       └── global.css          # Global styles & CSS variables
├── astro.config.js             # Astro configuration
├── tailwind.config.mjs         # Tailwind configuration with custom shadows
├── tsconfig.json               # TypeScript configuration
├── package.json
├── PRD.md                      # Product Requirements Document
└── README.md
```

## 🎨 Customization

### Personal Information

Edit the content in each section component:

1. **Hero Section** - `src/components/sections/Hero.astro`
   - Update name, title, location
   - Modify call-to-action buttons

2. **About Section** - `src/components/sections/About.astro`
   - Replace bio text
   - Update statistics (years, projects, etc.)

3. **Projects Section** - `src/components/sections/Projects.astro`
   - Add your own projects in the `projects` array
   - Update project images (use Unsplash or your own)

4. **Skills Section** - `src/components/sections/Skills.astro`
   - Modify skill categories and items

5. **Contact Section** - `src/components/sections/Contact.astro`
   - Update email and social links
   - Configure form action (currently UI-only)

### Colors & Theming

Edit `src/styles/global.css` to customize the color scheme:

```css
:root {
  /* Neumorphic backgrounds */
  --neu-bg-light: #e0e5ec;
  --neu-bg: #d1d9e6;
  --neu-bg-dark: #b8c2cc;

  /* Accent colors */
  --accent-blue: #3b82f6;
  --accent-purple: #8b5cf6;
  /* ... add your own colors */
}
```

### Custom Shadows

Modify `tailwind.config.mjs` to adjust neumorphic shadows:

```javascript
boxShadow: {
  "neu": "4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.8)",
  // Adjust values for different depth effects
}
```

### Textures

Replace SVG textures in `public/textures/` with your own:
- `paper.svg` - Paper-like background
- `leather.svg` - Leather texture
- `wood.svg` - Wood grain

Or use PNG/JPG images and update references in `tailwind.config.mjs`.

## 🌐 Deployment

### GitHub Pages (Recommended)

This theme includes automatic GitHub Pages deployment:

1. **Enable GitHub Pages**
   - Go to your repository Settings
   - Navigate to Pages
   - Source: GitHub Actions

2. **Push to main branch**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Automated deployment**
   - The workflow (`.github/workflows/deploy.yml`) runs automatically
   - Your site will be live at: `https://USERNAME.github.io/REPO_NAME/`

### Other Platforms

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Cloudflare Pages
- Connect your GitHub repository
- Build command: `npm run build`
- Build output directory: `dist`

## 🎯 Design Philosophy

This theme follows **modern skeuomorphic design principles**:

1. **Real-World Metaphors** - UI elements mimic physical objects
2. **Realistic Depth** - Multi-layered shadows create tactile appearance
3. **Neumorphism** - Soft, extruded elements that appear sculpted from the interface
4. **Balance** - Combines skeuomorphism with clean, modern aesthetics
5. **Accessibility First** - Beautiful design that doesn't sacrifice usability

### Key Design Elements

- **Neumorphic Shadows**: Dual light/dark shadows create raised/pressed effects
- **Gradient Buttons**: Realistic depth with gradient backgrounds
- **Soft Edges**: Rounded corners (xl, 2xl) for friendly, tactile feel
- **Subtle Textures**: Light overlays add depth without clutter
- **Smooth Animations**: 200-300ms transitions for responsive feel

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 5.16.6 | Static site generator |
| React | 19.2.3 | Interactive components |
| TypeScript | Latest | Type safety |
| Tailwind CSS | 4.1.18 | Utility-first styling |
| shadcn/ui | Latest | Accessible components |

## 📝 Content Guidelines

### Images

- **Projects**: Use 800x400px images (16:9 ratio)
- **Profile**: 320x320px square image
- **Format**: WebP for best performance, fallback to JPG
- **Optimization**: Use tools like [Squoosh](https://squoosh.app/)

### Accessibility

- Maintain WCAG 2.1 AA contrast ratios
- Add descriptive alt text to all images
- Use semantic HTML
- Test with keyboard navigation
- Verify with screen readers

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this theme for your own portfolio!

## 🙏 Credits & References

### Design Inspiration
- [One Page Love - Skeuomorphism](https://onepagelove.com/tag/skeuomorphism)
- [Neumorphism.io](https://neumorphism.io)
- [Big Human - Skeuomorphic Design Guide](https://www.bighuman.com/blog/guide-to-skeuomorphic-design-style)

### Technologies
- Built with [Astro](https://astro.build/)
- Components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

### Images
- Placeholder images from [Unsplash](https://unsplash.com/)

## 📧 Support

If you have questions or need help:

- Open an issue on GitHub
- Check the [PRD.md](./PRD.md) for detailed specifications
- Review [Astro documentation](https://docs.astro.build)

---

**Built with ❤️ using modern web technologies and skeuomorphic design principles.**
