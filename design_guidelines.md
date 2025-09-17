# Design Guidelines for SN.SP Limited Travel Agency

## Design Approach
**Reference-Based Approach**: Drawing inspiration from leading travel platforms like Airbnb and Booking.com, emphasizing visual appeal, trust-building, and seamless booking experience.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Deep Travel Blue: 220 85% 25% (professional, trustworthy)
- Warm White: 45 20% 97% (clean, spacious)

**Accent Colors:**
- Sunset Orange: 25 90% 60% (adventure, warmth - use sparingly for CTAs)
- Sky Blue: 200 70% 85% (backgrounds, subtle highlights)

**Dark Mode:**
- Background: 220 15% 8%
- Surface: 220 10% 12%
- Text: 45 20% 95%

### Typography
**Primary:** Inter (Google Fonts) - clean, modern sans-serif
**Sizes:** Hero (text-6xl), Headings (text-3xl/2xl), Body (text-base), Small (text-sm)
**Weights:** Regular (400), Medium (500), Semibold (600), Bold (700)

### Layout System
**Spacing Units:** Consistent use of Tailwind units 4, 8, 12, 16, 24
- Small gaps: space-y-4, p-4
- Medium spacing: space-y-8, p-8
- Large sections: space-y-16, py-24

### Visual Treatment
**Gradients:** Subtle blue-to-sky gradients for hero backgrounds (220 85% 25% to 200 70% 85%)
**Background Treatments:** Clean whites with subtle blue accent blocks, gradient overlays on hero imagery
**Contrast:** High contrast for accessibility, bold typography hierarchy

## Component Library

### Navigation
- Clean horizontal nav with company logo
- Mobile hamburger menu with smooth slide-in
- Sticky header with subtle shadow on scroll

### Hero Section
- Full-viewport height with travel imagery background
- Centered content with company tagline
- Primary CTA button with outline variant on image background (blurred backdrop)
- Gradient overlay for text readability

### Booking Forms
- Multi-step flight booking with progress indicators
- Clean input fields with floating labels
- Date pickers and dropdown selectors
- Prominent search/book buttons

### Service Cards
- 6 service cards in responsive grid (2x3 on desktop, 1x6 on mobile)
- Icon, title, description format
- Subtle hover elevations with shadow effects

### Content Sections
- About section with CEO photo and company story
- Testimonials carousel with customer photos and star ratings
- Partners logo grid with trusted airline/hotel brands
- Contact section with office details and embedded map

### Interactive Elements
- Smooth scroll navigation between sections
- Image carousels for testimonials and partners
- Form validation with inline feedback
- Loading states for booking interactions

## Images
**Hero Image:** Large travel destination imagery (mountains, beaches, or cityscapes) as full-width background
**Service Icons:** Simple line icons for each travel service
**Team Photos:** Professional headshots for CEO and team members
**Partner Logos:** Airline and hotel brand logos for trust indicators
**Testimonial Photos:** Customer photos with reviews

## Key Principles
- **Trust-First Design:** Professional aesthetic with clear contact information and credentials
- **Mobile-Responsive:** Seamless experience across all devices
- **Conversion-Focused:** Clear CTAs and streamlined booking flow
- **Visual Hierarchy:** Strategic use of color and typography to guide user attention
- **Performance:** Optimized images and minimal animations for fast loading