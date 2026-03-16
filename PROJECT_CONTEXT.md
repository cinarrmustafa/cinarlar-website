# Çınarlar Website - Project Context & Knowledge Base

This document serves as the "source of truth" for the project. Provide this file to any AI assistant to instantly sync context and save tokens by avoiding redundant exploration.

## 1. Project Overview
- **Name**: Çınarlar Boru ve Sulama Sistemleri
- **Purpose**: Corporate website for an irrigation and boring company based in Torbalı, İzmir.
- **Language**: Turkish (all UI text must be in Turkish).

## 2. Technical Stack
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS 4 (using `@theme` variables in `index.css`)
- **Icons**: Lucide React
- **Animations**: Framer Motion (imported as `motion` from `motion/react`)
- **SEO**: `react-helmet-async`
- **Metadata**: JSON-LD schema for LocalBusiness in `Home.tsx`.

## 3. Key Design Decisions & Fixes
- **Fonts**: Loaded via `<link>` in `index.html` (NOT via CSS `@import`) to prevent PostCSS timeout errors.
- **Logo**: `public/logo.png`. Vertically centered in the navbar with text.
- **Hero**: Shimmer animation on "En Hızlı Yolu" text. Background: `public/hero-bg.jpg`.
- **Contact**: Floating WhatsApp button (+90 532 311 25 58) always visible. All phone links use `tel:`, emails use `mailto:`.

## 4. Project Roadmap
### Phase 1: UI & Content (COMPLETED)
- Homepage (Hero, Services, Why Us, Map, Contact).
- Layout (Sticky header, Footer with active links).
- Blog (Mocked list and detail pages with fixed Unsplash images).
- Mobile responsive audit.

### Phase 2: Backend & Automation (IN PROGRESS)
- Supabase integration for dynamic blog posts.
- n8n integration for automated content.
- Contact form logic.

## 5. Branding & Styles
- **Primary Color**: `#004f4a` (Dark Teal) - `--color-agri-green`
- **Secondary**: `#00B4D8` (Cyan) - `--color-agri-water`
- **Background**: `#FAFAFA`
- **Typography**: Inter (Sans-serif), Noto Serif (Headings)

## 6. Important Files
- `src/components/Layout.tsx`: Main navigation/footer/WhatsApp.
- `src/index.css`: Tailwind 4 theme and global styles.
- `src/pages/Home.tsx`: Main landing page logic.
- `src/pages/BlogList.tsx` & `src/pages/BlogDetail.tsx`: Content pages.
