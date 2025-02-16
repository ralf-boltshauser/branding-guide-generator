# Branding Guide Generator

A modern web application that helps you create beautiful, consistent brand identities with ease. Generate, customize, and export professional branding guides for your projects.

🚀 **Live Demo**: [https://branding-guide-generator.ralfboltshauser.com/](https://branding-guide-generator.ralfboltshauser.com/)

## Features

- **Interactive Brand Guide Creation**: Easily customize your brand's visual identity with an intuitive form interface
- **AI-Powered Generation**: Generate complete brand guides from text descriptions using GPT-4
- **Color Palette Management**: Define and visualize primary, secondary, and accent colors
- **Typography Selection**: Choose from a wide range of web and system fonts with live preview
- **Icon Customization**: Select from 500+ icons with customizable backgrounds and gradients
- **Custom Icon Upload**: Upload your own icons to use in the branding guide
- **Export Functionality**: Export your branding guide as a high-quality PNG image
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Preview**: See your changes instantly as you customize your brand guide

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI Integration**: OpenAI GPT-4
- **Font Management**: Google Fonts
- **Icon Generation**: Ray.so API
- **Image Export**: html-to-image

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/branding-guide-generator.git
cd branding-guide-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```env
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Manual Creation**:
   - Fill out the brand basics (name and tagline)
   - Choose your color palette
   - Select and customize your brand icon
   - Pick a font family
   - Click "Generate Branding Guide" to preview

2. **AI Generation**:
   - Click "Generate with AI"
   - Enter a description of your brand
   - Let the AI create a complete brand identity for you
   - Customize the generated guide as needed

3. **Exporting**:
   - Preview your branding guide
   - Click "Export as PNG" to download
   - Use the exported guide in your projects

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Ray.so](https://ray.so/) for the icon generation API
- [OpenAI](https://openai.com/) for the AI capabilities
