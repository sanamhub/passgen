[![Netlify Status](https://api.netlify.com/api/v1/badges/d7e4210e-05a7-4f98-adba-154a9ef643c1/deploy-status)](https://app.netlify.com/sites/passgenfly/deploys)

# PassGenFly - Secure Password Generator

A sleek, modern password generator with customizable options and public API

Live site: [passgen.sanam.me](https://passgen.sanam.me)

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
    "characterMode": "all",
    "uppercase": true,
    "lowercase": true,
    "numbers": true,
    "symbols": true
  }
}
```

For different character modes, the response will reflect the appropriate settings. For example, with `characterMode=easyToSay`:

```json
{
  "password": "bapoludefi",
  "strength": {
    "score": 75,
    "label": "Good"
  },
  "options": {
    "length": 12,
    "characterMode": "easyToSay",
    "uppercase": false,
    "lowercase": true,
    "numbers": false,
    "symbols": false
  }
}
```

## Running Locally

To run the application locally:

```sh
# Clone the repository
git clone https://github.com/sanamhub/passgen.git

# Navigate to the project directory
cd passgen

# Install dependencies
npm install

# Start the development server
npm run dev

# Start the API server
npm run api
```

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- shadcn/ui components
- Express.js (API server)
- Netlify Functions (for production API)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
