# Heard - Women's Healthcare Support Platform

A fully responsive mobile-first web app built for women and marginalized patients navigating chronic illness, misdiagnosis, delayed diagnosis, and the frustration of medical gaslighting.

## 🎨 Design System

### Brand Personality
- Warm, inviting, empowering, calming
- Inclusive to women, non-binary, and marginalized patients

### Color Palette
- **Backgrounds**: Cream (#FAF8F5)
- **Accent 1**: Dusty Pink (#E6B7B0)
- **Accent 2**: Sage (#B7C8B5)
- **Text**: Charcoal (#333333)

### Typography
- **Headings**: Playfair Display (serif, elegant, calm)
- **Body**: Lato (sans-serif, clean, readable)

### Design Principles
- Soft, airy spacing
- Rounded corners
- Plenty of white space
- No harsh borders
- Friendly, warm tone in UI text
- Avoid cold or overly clinical styles

## 📱 Features

### Pages
1. **Home Page** - Welcome message and introduction to the platform
2. **About Us** - Information about Heard's mission and purpose
3. **Community Guidelines** - Rules and expectations for the community
4. **Privacy Policy** - Clear, simple privacy information

### Navigation
- Bottom mobile navigation bar
- Icons for each page: Home, About, Guidelines, Privacy
- Soft hover states and active states in dusty pink

## 🛠️ Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Fonts**: Google Fonts (Playfair Display, Lato)
- **Illustrations**: Custom Open Peeps-style illustrations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd heardapp
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and TailwindCSS
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── guidelines/
│   │   └── page.tsx         # Community guidelines page
│   └── privacy/
│       └── page.tsx         # Privacy policy page
└── components/
    ├── Navigation.tsx       # Bottom navigation component
    └── Illustration.tsx     # Reusable illustration component
```

## 🎯 Key Components

### Navigation Component
- Fixed bottom navigation
- Active state highlighting
- Smooth hover transitions
- Mobile-first design

### Illustration Component
- Four different illustration types:
  - `group-support` - People in supportive circle
  - `conversation` - Two people in conversation
  - `friendly-interaction` - Support and care symbols
  - `lock-shield` - Privacy and security

## 📱 Responsive Design

- Mobile-first approach
- Optimized for mobile devices
- Responsive typography and spacing
- Touch-friendly navigation

## 🔮 Future Enhancements (Stage 2)

The app is designed to be easily extensible for future features:

- User authentication and profiles
- Symptom tracking functionality
- Community forums and messaging
- Resource library and scripts
- Appointment preparation tools
- Integration with healthcare providers

## 🤝 Contributing

This project is designed to be a supportive platform for women's healthcare. All contributions should align with the inclusive, supportive mission of the platform.

## 📄 License

This project is licensed under the ISC License.

---

Built with ❤️ for women and marginalized patients navigating their healthcare journey.
