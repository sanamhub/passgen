# Password Generator

A sleek, modern password generator with customizable options

## Features

- Generate secure passwords with customizable length
- Select character types (uppercase, lowercase, numbers, symbols)
- Easy-to-say option (avoids confusing characters)
- Easy-to-read option (avoids similar-looking characters)
- Copy to clipboard functionality
- Password strength indicator
- Responsive design for all devices
- One-click password regeneration

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- shadcn/ui components

## Deployment Options

### GitHub Pages

This project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

To set up GitHub Pages deployment:

1. Push your code to a GitHub repository
2. Go to your repository settings > Pages
3. Select "GitHub Actions" as the source
4. The site will be deployed automatically on push to main

### Netlify

To deploy on Netlify:

1. Create a Netlify account
2. Add a new site from Git
3. Connect to your GitHub repository
4. Netlify will automatically detect the build settings from netlify.toml
5. Click "Deploy site"

### Cloudflare Pages

To deploy on Cloudflare Pages:

1. Create a Cloudflare account
2. Go to Pages and create a new project
3. Connect to your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click "Save and Deploy"

## Development

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd password-generator

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
