# News Aggregator

A modern news aggregation platform built with TypeScript and React that collects and displays news from various sources in one unified interface.

## Features

- 🌐 Multi-language support (English, German)
- 🔍 Advanced search and filtering capabilities
- 📱 Responsive design for all devices
- 🎨 Customizable theme options
- 🔄 Real-time news updates
- 📊 News categorization and sorting

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: SCSS
- **Internationalization**: i18next
- **Container**: Docker
- **Package Manager**: npm

## Prerequisites

Before getting started, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)
- Docker (optional, for containerized deployment)

## Installation

### Using npm

1. Clone the repository:
```bash
git clone https://github.com/mr-deveoper/news-aggregator.git
```

2. Navigate to the project directory:
```bash
cd news-aggregator
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Using Docker

1. Build the Docker image:
```bash
docker build -t news-aggregator .
```

2. Run the container:
```bash
docker run -p 3000:3000 news-aggregator
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_NEWS_ORG_API_KEY=ADD_YOUR_API_KEY  => `https://newsapi.org`
REACT_APP_NEWS_AI_API_KEY=ADD_YOUR_API_KEY   => `https://www.newsapi.ai`
REACT_APP_GUARDIAN_API_KEY=ADD_YOUR_API_KEY  => `https://open-platform.theguardian.com/access/`
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint for code quality
- `npm run format` - Formats code using Prettier

## Project Structure

```
news-aggregator/
├── src/
│   ├── components/
│   ├── config/
│   ├── constants/
│   ├── i18n/
│   ├── styles/
│   └── types/
├── public/
├── docker/
└── package.json
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Development

### Code Style

- We use ESLint for linting
- Prettier for code formatting
- Follow the existing code style patterns

### Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes

## Testing

Run the test suite:

```bash
npm test
```

For coverage report:

```bash
npm run test:coverage
```

## Deployment

### Production Build

```bash
npm run build
```

### Docker Production

```bash
docker build -t news-aggregator:prod -f Dockerfile.prod .
docker run -p 80:80 news-aggregator:prod
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@news-aggregator.com or open an issue in the GitHub repository.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community
- News API providers and partners

---

Made with ❤️ by Ahmed Aly