# Event App Development Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Repository Status
This is a minimal repository currently containing only a README.md file. The repository is intended to become an event management application but does not yet have implemented features or a defined technology stack.

## Working Effectively

### Environment Setup
- The development environment has the following tools available:
  - Node.js v20.19.4
  - npm v10.8.2  
  - Python 3.12.3
  - Docker 28.0.4
  - git 2.51.0

### Initial Project Setup
When setting up the project for the first time:
- Run `npm init -y` to create package.json (takes < 5 seconds)
- Install dependencies with `npm install` when package.json is created
- NEVER CANCEL: Initial npm install may take 2-5 minutes depending on dependencies. Set timeout to 10+ minutes.

### Building and Testing
Currently no build process exists. When a build process is added:
- NEVER CANCEL: Build commands may take 5-30 minutes. Always set timeout to 60+ minutes.
- NEVER CANCEL: Test suites may take 2-15 minutes. Always set timeout to 30+ minutes.
- Always wait for builds and tests to complete fully before proceeding.

### Running the Application
No application entry point currently exists. When the application is developed:
- Check package.json scripts for available commands
- Common patterns for event apps: `npm run dev`, `npm start`, `npm run serve`
- NEVER CANCEL: Application startup may take 1-5 minutes. Set timeout to 10+ minutes.

## Development Guidelines

### Technology Stack Preparation
Since this will be an event application, prepare for common technologies:
- **Frontend**: Likely React, Vue.js, or similar JavaScript framework
- **Backend**: Likely Node.js/Express, Python/Flask/Django, or similar
- **Database**: Likely PostgreSQL, MongoDB, or MySQL
- **Real-time features**: Possibly WebSockets for live event updates

### File Structure Expectations
When the project is developed, expect these common directories:
- `src/` or `app/` - Main application source code
- `public/` or `static/` - Static assets (HTML, CSS, images)
- `components/` - UI components (if using component-based framework)
- `api/` or `routes/` - Backend API routes
- `models/` - Data models and database schemas
- `tests/` or `__tests__/` - Test files
- `docs/` - Documentation
- `config/` - Configuration files

### Validation Requirements

#### Manual Testing Scenarios
When the application is functional, ALWAYS test these scenarios after making changes:
- **Basic Navigation**: Verify the main application loads without errors
- **Event Creation**: Test creating a new event with sample data
- **Event Listing**: Verify events display correctly in list views
- **Event Details**: Test viewing individual event details
- **User Authentication**: Test login/logout flows if implemented
- **Data Persistence**: Verify changes are saved and persist after page refresh

#### Development Validation
- Always run linting tools if configured: `npm run lint` or similar
- Always run tests if they exist: `npm test` or `npm run test`
- Always check for TypeScript errors if using TS: `npx tsc --noEmit`
- Verify no console errors in browser developer tools

## Common Commands

### Git Operations
- Check status: `git status`
- View changes: `git diff`
- Stage changes: `git add .`
- Commit changes: `git commit -m "message"`

### Dependency Management
- Install new package: `npm install package-name`
- Install dev dependency: `npm install --save-dev package-name`
- Update dependencies: `npm update`
- Check outdated packages: `npm outdated`

### Development Server Commands (when implemented)
Expected patterns:
- Development server: `npm run dev` or `npm start`
- Production build: `npm run build`
- Test runner: `npm test` or `npm run test`
- Linting: `npm run lint`
- Code formatting: `npm run format` or `npm run prettier`

## Troubleshooting

### Common Issues
- **npm install fails**: Check Node.js version compatibility in package.json
- **Port already in use**: Kill existing processes with `kill -9 $(lsof -t -i:PORT)`
- **Permission errors**: Use `sudo` for global npm installs if needed
- **Build failures**: Check for missing dependencies or environment variables

### Performance Notes
- **Initial setup**: Allow 5-15 minutes for complete environment setup
- **Dependency installation**: NEVER CANCEL - may take 5+ minutes with slow network
- **First build**: NEVER CANCEL - may take 10-45 minutes depending on project size
- **Test execution**: NEVER CANCEL - comprehensive test suites may take 15+ minutes

## Repository Structure (Current)
```
.
├── .git/                 # Git repository data
├── .github/             # GitHub configuration
│   └── copilot-instructions.md
└── README.md            # Project documentation
```

## Repository Structure (Expected Future)
```
event-app/
├── .github/             # GitHub workflows and config
├── src/                 # Source code
│   ├── components/      # UI components
│   ├── pages/          # Application pages
│   ├── api/            # Backend API
│   ├── models/         # Data models
│   └── utils/          # Utility functions
├── public/             # Static assets
├── tests/              # Test files
├── docs/               # Documentation
├── package.json        # Node.js dependencies
├── README.md          # Project documentation
└── .env.example       # Environment variables template
```

## Key Points for Developers
- **CRITICAL**: Always set appropriate timeouts (60+ minutes for builds, 30+ minutes for tests)
- **CRITICAL**: NEVER CANCEL long-running operations - they may take 45+ minutes
- Always validate changes through manual testing scenarios
- Always run existing linting and testing tools before committing
- Check the README.md for project-specific setup instructions as they are added
- When in doubt, search the codebase for similar patterns before implementing new features
- Document any new setup steps or requirements for future developers