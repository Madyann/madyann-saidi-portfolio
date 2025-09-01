# Engineering Portfolio Website Template

A modern, responsive portfolio website template designed for engineers, inventors, and technical professionals. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern Design**: Dark theme with neon cyan accents inspired by top engineering portfolios
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Fast & Lightweight**: Built with Vite for optimal performance
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Accessible**: WCAG 2.2 AA compliant with keyboard navigation
- **Easy to Customize**: Simple data structure for quick content updates

## 🚀 Quick Start

### 1. Customize Your Content

Edit the following files to add your personal information:

#### Update Project Data (`src/data/projects.ts`)
```typescript
export const projects: Project[] = [
  {
    title: "Your Project Title",
    slug: "your-project-slug",
    year: 2024,
    tags: ["Technology", "Tags"],
    thumbnail: "/path/to/your/image.jpg",
    shortDescription: "Brief project description...",
    // ... add your project details
  }
];
```

#### Update Personal Information
- **Navigation/Header**: Edit `src/components/Navigation.tsx` (line 25)
- **Hero Section**: Edit `src/pages/Index.tsx` (line 34)
- **About Page**: Edit `src/pages/About.tsx` 
- **Contact Info**: Edit `src/pages/Contact.tsx`
- **Footer**: Edit `src/components/Footer.tsx`

### 2. Add Your Images

Replace placeholder images in `src/assets/` with your own:
- `hero-bg.jpg` - Hero section background
- `project-*.jpg` - Project thumbnails
- Add your professional headshot for the About page

### 3. Update Links

Find and replace the following placeholder links throughout the codebase:
- `https://github.com/yourname` → Your GitHub profile
- `https://linkedin.com/in/yourname` → Your LinkedIn profile  
- `your.email@example.com` → Your email address
- Resume download link in multiple files

### 4. Customize Colors (Optional)

The design system is defined in `src/index.css`. You can customize:
- **Primary Color**: Change the neon cyan accent color
- **Background**: Adjust the dark theme colors
- **Typography**: Modify font choices and sizes

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── Navigation.tsx  # Main navigation
│   ├── Footer.tsx      # Site footer
│   └── ProjectCard.tsx # Project card component
├── data/
│   └── projects.ts     # Project data (EDIT THIS!)
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── Projects.tsx    # Projects listing
│   ├── ProjectDetail.tsx # Individual project pages
│   ├── About.tsx       # About page
│   ├── Contact.tsx     # Contact page
│   └── NotFound.tsx    # 404 page
├── assets/             # Images and static files
└── lib/                # Utility functions
```

## 🎨 Design System

The template uses a carefully crafted design system:

- **Typography**: Space Grotesk (headings) + Inter (body)
- **Colors**: Dark background (#0D0D0D) with neon cyan (#00E0FF) accents
- **Spacing**: 4-point grid system for consistent spacing
- **Components**: Built on Shadcn UI for consistency and accessibility

## 🛠 Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Routing**: React Router
- **Icons**: Lucide React
- **Animations**: CSS animations with Tailwind

## 📱 Responsive Design

The template is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- High contrast color ratios
- Screen reader compatible

## 🚀 Deployment

The template is ready to deploy to any static hosting service:

- **Vercel**: `npm run build` → Connect GitHub repo
- **Netlify**: `npm run build` → Drag and drop `dist` folder
- **GitHub Pages**: Enable Pages in repository settings

## 📝 Content Guidelines

### Project Descriptions
- **Overview**: What problem did you solve?
- **Solution**: How did you solve it technically?
- **Results**: What was the measurable impact?

### Writing Style
- Use active voice and first person
- Focus on technical challenges and solutions
- Include specific metrics and outcomes
- Keep descriptions concise but informative

### Images
- Use high-quality images (minimum 1200px wide)
- Maintain consistent aspect ratios
- Optimize for web (use WebP when possible)
- Include alt text for accessibility

## 🔧 Customization Tips

### Adding New Project Categories
1. Add new tags to your projects in `src/data/projects.ts`
2. The filter system will automatically include them

### Changing the Color Scheme
1. Edit CSS variables in `src/index.css`
2. Update Tailwind config in `tailwind.config.ts` if needed

### Adding New Pages
1. Create new component in `src/pages/`
2. Add route to `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`

## 🤝 Contributing

This is a template designed to be customized. Feel free to:
- Modify the design to match your personal brand
- Add new features or components
- Share improvements back to the community

## 📄 License

This template is open source and available under the MIT License.

---

**Built with ❤️ & caffeine**

Made for engineers who want to showcase their work professionally without spending weeks building a portfolio from scratch.