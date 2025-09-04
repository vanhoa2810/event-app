# Event App - GitHub Copilot Instructions

Event App is currently a minimal project in early development stages. This repository contains only a basic README.md file and is ready for initial development.

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information here is incomplete or found to be in error.**

## Current Repository State

**IMPORTANT**: This repository is in its initial state with minimal content:
- Contains only README.md with project name
- No build system, dependencies, or source code implemented yet
- No CI/CD pipelines or automated testing configured
- Project structure and technology stack to be determined

## Working Effectively

### Initial Setup for New Development
Since this is a minimal repository, follow these steps when beginning development:

1. **Determine Technology Stack**: Before implementing any features, establish the technology stack (e.g., Node.js + React, Python + Django, etc.)

2. **Initialize Build System**: Once technology stack is chosen:
   - For Node.js projects: `npm init` or `yarn init`
   - For Python projects: Set up virtual environment and requirements.txt
   - For other stacks: Follow appropriate initialization procedures

3. **Set Up Development Environment**:
   - Create appropriate project structure (src/, tests/, docs/, etc.)
   - Add .gitignore for chosen technology stack
   - Set up linting and formatting tools
   - Configure development dependencies

### Future Build and Test Commands
**When actual code is implemented, update these commands with real values:**

- **Build**: [TO BE DETERMINED - will depend on chosen technology stack]
  - NEVER CANCEL build commands. Set timeout to 60+ minutes for safety.
  - Document actual build time once implemented (typically 5-45 minutes for web apps)
  
- **Test**: [TO BE DETERMINED - will depend on testing framework]
  - NEVER CANCEL test commands. Set timeout to 30+ minutes for comprehensive test suites.
  - Document actual test execution time once implemented
  
- **Development Server**: [TO BE DETERMINED]
  - Typically `npm run dev`, `python manage.py runserver`, or similar
  - Document port and access URL once implemented

### Expected Development Workflow (For Event Management App)
Based on the project name "event-app", this will likely be an event management application. Common patterns include:

1. **Frontend Development**:
   - User interface for event creation, viewing, and management
   - Calendar/scheduling components
   - User authentication and authorization
   - Responsive design for mobile and desktop

2. **Backend Development**:
   - RESTful API for event CRUD operations
   - User management and authentication
   - Database integration for event storage
   - Email notifications and reminders

3. **Database Schema** (typical for event apps):
   - Users table (authentication, profiles)
   - Events table (title, description, date, location, etc.)
   - Registrations/Attendees table (many-to-many relationship)
   - Categories/Tags for event organization

## Validation Requirements

### Manual Testing (When Application is Implemented)
**ALWAYS perform these validation steps after making changes:**

1. **Complete User Workflows**:
   - Create a new event with all required fields
   - Edit an existing event
   - Register for an event (if registration feature exists)
   - View event details and event list
   - Test user authentication (login/logout/registration)

2. **Cross-Browser Testing**:
   - Test in Chrome, Firefox, Safari, and Edge
   - Verify mobile responsiveness
   - Check for JavaScript errors in console

3. **API Testing** (if backend exists):
   - Test all CRUD operations for events
   - Verify authentication endpoints
   - Check error handling for invalid requests
   - Validate data persistence

### Pre-Commit Validation
**ALWAYS run these commands before committing changes (update when implemented):**
- Linting: [TO BE DETERMINED - e.g., `npm run lint`, `flake8`, etc.]
- Formatting: [TO BE DETERMINED - e.g., `npm run format`, `black .`, etc.]
- Type checking: [TO BE DETERMINED - e.g., `npm run type-check`, `mypy .`, etc.]
- Unit tests: [TO BE DETERMINED - but NEVER CANCEL, allow 30+ minutes]
- Integration tests: [TO BE DETERMINED - but NEVER CANCEL, allow 60+ minutes]

## Critical Timing Guidelines

**NEVER CANCEL LONG-RUNNING COMMANDS**
- Build operations may take 45+ minutes - ALWAYS wait for completion
- Test suites may take 15-60 minutes - ALWAYS wait for completion  
- Database migrations may take 10+ minutes - ALWAYS wait for completion
- CI/CD pipelines may take 30+ minutes - ALWAYS wait for completion

**Set explicit timeouts:**
- Build commands: minimum 60 minutes
- Test commands: minimum 30 minutes
- Database operations: minimum 15 minutes

## Repository Structure (To Be Implemented)

Expected future structure for an event management application:
```
/
├── README.md                 # Current file
├── .github/
│   ├── workflows/           # CI/CD pipelines (to be added)
│   └── copilot-instructions.md
├── src/                     # Source code (to be added)
├── tests/                   # Test files (to be added)
├── docs/                    # Documentation (to be added)
├── package.json             # Node.js deps (if Node.js stack chosen)
├── requirements.txt         # Python deps (if Python stack chosen)
└── .gitignore              # To be added based on tech stack
```

## Environment Setup (Future Implementation)

### Prerequisites (Update when stack is chosen)
- [TO BE DETERMINED - e.g., Node.js 18+, Python 3.9+, etc.]
- [TO BE DETERMINED - Database system if needed]
- [TO BE DETERMINED - Additional tools and dependencies]

### Database Setup (If Required)
- [TO BE DETERMINED - Database installation and configuration]
- [TO BE DETERMINED - Migration commands]
- [TO BE DETERMINED - Seed data commands]

### Environment Variables (When Implemented)
Common environment variables for event applications:
- Database connection strings
- API keys for external services
- Email service configuration
- Authentication secrets
- File upload storage configuration

## Common Development Tasks

### When Adding New Features
1. Create feature branch from main
2. Implement feature with comprehensive tests
3. Run all validation commands (linting, testing, etc.)
4. Perform manual testing of complete user workflows
5. Document any new environment variables or setup steps
6. Update these instructions if new commands or processes are added

### Database Operations (When Implemented)
- Migration creation: [TO BE DETERMINED]
- Migration execution: [TO BE DETERMINED - NEVER CANCEL, allow 15+ minutes]
- Backup procedures: [TO BE DETERMINED]
- Data seeding: [TO BE DETERMINED]

### Deployment (When Implemented)
- Staging deployment: [TO BE DETERMINED - NEVER CANCEL, allow 30+ minutes]
- Production deployment: [TO BE DETERMINED - NEVER CANCEL, allow 45+ minutes]
- Health checks: [TO BE DETERMINED]
- Rollback procedures: [TO BE DETERMINED]

## Troubleshooting

### Common Issues (To Be Updated)
Since no code exists yet, this section will be populated as issues are encountered:
- [TO BE DOCUMENTED - Build failures and solutions]
- [TO BE DOCUMENTED - Test failures and solutions]
- [TO BE DOCUMENTED - Development server issues]
- [TO BE DOCUMENTED - Database connection problems]

### Performance Monitoring (Future Implementation)
- [TO BE DETERMINED - Monitoring tools and dashboards]
- [TO BE DETERMINED - Performance benchmarks]
- [TO BE DETERMINED - Memory and CPU usage guidelines]

## Important Notes for Developers

1. **Update These Instructions**: As the project develops, ALWAYS update this file with:
   - Actual build and test commands with measured execution times
   - Real validation procedures
   - Specific troubleshooting solutions
   - Performance benchmarks and expectations

2. **Technology Stack Documentation**: Once chosen, document:
   - Exact versions of all major dependencies
   - Installation procedures for development environment
   - IDE/editor recommendations and configurations

3. **Security Considerations**: When implementing authentication and data handling:
   - Document security testing procedures
   - Include penetration testing guidelines
   - Specify data privacy compliance requirements

4. **Scaling Considerations**: For production deployment:
   - Document load testing procedures
   - Include database optimization guidelines
   - Specify monitoring and alerting setup

**Remember**: This is a living document that should evolve with the project. Always validate and update instructions as the codebase grows and matures.