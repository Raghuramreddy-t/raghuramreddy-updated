# Raghuramreddy Thummalapalli - Portfolio

A premium, architect-level portfolio website showcasing platform engineering, DevSecOps, and AI-augmented operations expertise.

## Features

- **Premium Design**: Modern UI with glassmorphism, floating animations, and micro-interactions
- **Dark/Light Mode**: Automatic theme switching with manual toggle
- **AI Assistant Widget**: Interactive chatbot for portfolio navigation
- **Particle Effects**: Floating background particles
- **Responsive**: Fully responsive design for all devices
- **Performance**: Static site with optimized assets

## Structure

```
portfolio-site/
├── index.html              # Home page
├── CNAME                   # Custom domain config
├── assets/
│   ├── css/
│   │   ├── main.css        # Core styles
│   │   ├── animations.css  # Animation effects
│   │   └── pages.css       # Page-specific styles
│   ├── js/
│   │   ├── main.js         # Core functionality
│   │   ├── particles.js    # Particle effects
│   │   └── ai-assistant.js # AI chatbot
│   └── images/             # Image assets
├── pages/
│   ├── about.html          # About page
│   ├── projects.html       # Projects & case studies
│   ├── ai-systems.html     # AI systems showcase
│   ├── publications.html   # Publications & patents
│   └── contact.html        # Contact page
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages deployment
```

## Deployment to GitHub Pages

### Option 1: Push to Your Existing Repo

1. Copy all files from `portfolio-site/` to your local clone of `raghuramreddy-updated`
2. Commit and push:
   ```powershell
   cd path/to/raghuramreddy-updated
   git add .
   git commit -m "Deploy premium portfolio"
   git push origin main
   ```

### Option 2: Replace Repo Contents

1. Clone your repo:
   ```powershell
   git clone https://github.com/Raghuramreddy-t/raghuramreddy-updated.git
   ```
2. Remove old content (keep .git folder)
3. Copy new portfolio files
4. Push changes

### Configure Custom Domain (GoDaddy)

In GoDaddy DNS settings, add:

| Type  | Name | Value                           |
|-------|------|---------------------------------|
| A     | @    | 185.199.108.153                 |
| A     | @    | 185.199.109.153                 |
| A     | @    | 185.199.110.153                 |
| A     | @    | 185.199.111.153                 |
| CNAME | www  | raghuramreddy-t.github.io       |

Then in GitHub repo settings:
1. Go to Settings > Pages
2. Enter custom domain: `raghuramreddy.tech`
3. Check "Enforce HTTPS"

## Local Development

Simply open `index.html` in a browser, or use a local server:

```powershell
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## Customization

### Update Content
- Edit HTML files in `pages/` directory
- Modify text content directly in HTML

### Update Styling
- Colors/theme: Edit CSS variables in `assets/css/main.css` (`:root` section)
- Animations: Modify `assets/css/animations.css`

### Update AI Assistant Knowledge
- Edit knowledge base in `assets/js/ai-assistant.js`

## License

© 2026 Raghuramreddy Thummalapalli. All rights reserved.
