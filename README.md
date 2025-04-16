[![Netlify Status](https://api.netlify.com/api/v1/badges/d7e4210e-05a7-4f98-adba-154a9ef643c1/deploy-status)](https://app.netlify.com/sites/passgenfly/deploys)

# PassGenFly - Password Generator

A sleek, modern password generator with customizable options and public API

Find at [passgenfly.netlify.app](https://passgenfly.netlify.app)

![PassGen Thumb](public/passgenthumb.svg)

## Features

- Generate secure passwords with customizable length
- Select character types (uppercase, lowercase, numbers, symbols)
- Easy-to-say option (avoids confusing characters)
- Easy-to-read option (avoids similar-looking characters)
- Copy to clipboard functionality
- Password strength indicator
- Responsive design for all devices
- One-click password regeneration
- **NEW**: Public API for password generation

## API Usage

PassGenFly provides a public API that can be used to generate passwords programmatically:

```
GET https://passgenfly.netlify.app/api/generate
```

### Query Parameters

- `length`: Password length (number, default: 12)
- `characterMode`: Character set mode ("all", "easyToSay", or "easyToRead", default: "all")
- When `characterMode="all"`, you can also use:
  - `uppercase`: Include uppercase letters (boolean, default: true)
  - `lowercase`: Include lowercase letters (boolean, default: true)
  - `numbers`: Include numbers (boolean, default: true)
  - `symbols`: Include symbols (boolean, default: true)

### Examples

Default password (12 characters):
```
https://passgenfly.netlify.app/api/generate
```

Custom 16-character password with all character types:
```
https://passgenfly.netlify.app/api/generate?length=16
```

Easy-to-say password:
```
https://passgenfly.netlify.app/api/generate?characterMode=easyToSay
```

Password with only lowercase and numbers:
```
https://passgenfly.netlify.app/api/generate?uppercase=false&symbols=false
```

### Response Format

```json
{
  "password": "X4$9aB!pR2@kL7",
  "strength": {
    "score": 85,
    "label": "Strong"
  },
  "options": {
    "length": 16,
    "uppercase": true,
    "lowercase": true,
    "numbers": true,
    "symbols": true,
    "easyToSay": false,
    "easyToRead": false
  }
}
```

### Alternative Endpoint

The API is also accessible through the Netlify Functions path:

```
https://passgenfly.netlify.app/.netlify/functions/api/generate
```

### Local Development

When developing locally, run both the development server and the API server:

```sh
# Start the API server
node api-server.js

# In another terminal, start the Vite dev server
npm run dev
```

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- shadcn/ui components

## Development

```sh
# Clone the repository
git clone https://github.com/sanamhub/password-generator.git

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
