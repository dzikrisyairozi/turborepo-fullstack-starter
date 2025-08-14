# CI/CD Documentation

This document provides detailed information about the CI/CD pipeline setup for this NestJS TypeScript Prisma starter.

## 🏗️ Architecture Overview

The CI/CD pipeline is built using GitHub Actions and consists of multiple workflows:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Developer     │    │   Pull Request  │    │   Main Branch   │
│   Push/PR       │───▶│   Validation    │───▶│   Full Pipeline │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                               │                        │
                               ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Fast Checks   │    │   Quality +     │
                       │   - Type Check  │    │   Security +    │
                       │   - Lint        │    │   Build +       │
                       │   - Format      │    │   Deploy        │
                       │   - Unit Tests  │    └─────────────────┘
                       └─────────────────┘
```

## 📋 Workflows

### 1. CI/CD Pipeline (ci.yml)

**Trigger**: Push to main, Pull Requests
**Purpose**: Complete quality assurance and deployment pipeline

#### Jobs:

- **Quality**: Type checking, linting, formatting, tests, coverage
- **Build**: Application build and artifact upload
- **Security**: Dependency audit, CodeQL scanning
- **Deploy Staging**: Automatic staging deployment
- **Deploy Production**: Manual approval required
- **Notify**: Slack notifications

### 2. Pull Request Checks (pr-checks.yml)

**Trigger**: PR opened/updated
**Purpose**: Fast feedback for developers

#### Features:

- Lightweight quality checks
- Build verification
- Automated PR comments with results
- Caching for faster execution

### 3. Release Management (release.yml)

**Trigger**: Git tags (v\*)
**Purpose**: Automated releases and production deployment

#### Features:

- Automated changelog generation
- GitHub release creation
- Docker image building
- Production deployment
- Release notifications

### 4. Dependency Updates (dependabot.yml)

**Purpose**: Automated dependency management

#### Features:

- Weekly dependency updates
- Security patch automation
- Grouped updates for related packages
- Automatic PR creation

## 🛠️ Setup Instructions

### 1. Repository Configuration

#### Required Secrets:

```bash
# Optional: For test coverage reports
CODECOV_TOKEN=your_codecov_token

# Optional: For Slack notifications
SLACK_WEBHOOK=your_slack_webhook_url

# Optional: For NPM publishing
NPM_TOKEN=your_npm_token
```

#### Repository Settings:

1. **Enable GitHub Actions**: Settings → Actions → Allow all actions
2. **Branch Protection**: Settings → Branches → Add rule for `main`
   - Require PR before merging
   - Require status checks to pass
   - Require up-to-date branches
   - Include administrators

#### Environment Setup:

1. **Staging Environment**:
   - Settings → Environments → New environment: `staging`
   - Add environment-specific secrets/variables

2. **Production Environment**:
   - Settings → Environments → New environment: `production`
   - Enable required reviewers
   - Add environment-specific secrets/variables

### 2. Codecov Integration (Optional)

1. Sign up at [codecov.io](https://codecov.io)
2. Add your repository
3. Copy the upload token
4. Add `CODECOV_TOKEN` to repository secrets

### 3. Slack Integration (Optional)

1. Create a Slack webhook URL
2. Add `SLACK_WEBHOOK` to repository secrets
3. Configure channels in workflow files

### 4. Docker Registry (Optional)

For container deployments, configure registry access:

```bash
# Docker Hub
DOCKER_USERNAME=your_username
DOCKER_PASSWORD=your_password

# GitHub Container Registry
GHCR_TOKEN=your_personal_access_token
```

## 🚀 Deployment Strategies

### Staging Deployment

- **Trigger**: Every push to main
- **Environment**: staging
- **Purpose**: Testing and validation
- **Rollback**: Automatic on failure

### Production Deployment

- **Trigger**: Manual approval after staging
- **Environment**: production
- **Purpose**: Live application
- **Rollback**: Manual process

### Release Deployment

- **Trigger**: Git tags (v1.0.0, v1.0.1, etc.)
- **Purpose**: Versioned releases
- **Features**: Changelog, GitHub release, Docker images

## 📊 Quality Gates

All deployments must pass these quality gates:

### Code Quality

- ✅ TypeScript compilation
- ✅ ESLint rules compliance
- ✅ Prettier formatting
- ✅ Unit test coverage > 80%
- ✅ E2E tests passing

### Security

- ✅ Dependency vulnerability scan
- ✅ CodeQL security analysis
- ✅ No high/critical vulnerabilities

### Performance

- ✅ Build time < 5 minutes
- ✅ Docker image size < 500MB
- ✅ Application startup < 30 seconds

## 🔄 Workflow Examples

### Creating a Release

```bash
# Create and push a tag
git tag v1.0.0
git push origin v1.0.0

# This triggers:
# 1. Release workflow
# 2. Automated changelog
# 3. GitHub release
# 4. Docker image build
# 5. Production deployment
```

### Hotfix Process

```bash
# Create hotfix branch
git checkout -b hotfix/critical-fix

# Make changes and commit
git commit -m "fix: critical security issue"

# Create PR
gh pr create --title "Hotfix: Critical Security Issue"

# After review and merge:
git tag v1.0.1
git push origin v1.0.1
```

### Dependency Updates

```bash
# Dependabot automatically creates PRs
# Review and merge dependency updates
# CI/CD pipeline automatically tests and deploys
```

## 🐛 Troubleshooting

### Common Issues

#### Build Failures

```bash
# Check build logs in GitHub Actions
# Common causes:
# - TypeScript errors
# - Test failures
# - Dependency issues
# - Configuration problems
```

#### Deployment Failures

```bash
# Check deployment logs
# Common causes:
# - Environment configuration
# - Service dependencies
# - Resource limitations
# - Network issues
```

#### Security Alerts

```bash
# Review CodeQL alerts
# Update vulnerable dependencies
# Apply security patches
# Re-run security scans
```

### Debug Commands

```bash
# Local testing
pnpm run type-check
pnpm run lint:check
pnpm run format:check
pnpm run test:cov

# Docker testing
docker build -t app:test .
docker run -p 3000:3000 app:test

# Pipeline testing
act -j quality  # Using nektos/act
```

## 📈 Monitoring & Metrics

### Key Metrics

- **Build Success Rate**: Target > 95%
- **Test Coverage**: Target > 80%
- **Build Time**: Target < 5 minutes
- **Deployment Frequency**: Target > 1/day
- **Lead Time**: Target < 2 hours
- **Mean Time to Recovery**: Target < 30 minutes

### Monitoring Tools

- GitHub Actions dashboard
- Codecov coverage reports
- Dependabot security alerts
- Slack notifications
- Custom metrics (optional)

## 🔧 Customization

### Adding New Checks

```yaml
# In ci.yml, add new job:
custom-check:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Custom Check
      run: your-custom-command
```

### Environment Variables

```yaml
# Add to workflow env section:
env:
  CUSTOM_VAR: value
  NODE_ENV: production
```

### Custom Deployment

```yaml
# Replace deployment steps:
- name: Deploy
  run: |
    echo "Custom deployment logic"
    # Your deployment commands
```

## 📚 Best Practices

### Security

- Use least privilege access
- Store secrets securely
- Regular security updates
- Code scanning enabled
- Branch protection rules

### Performance

- Cache dependencies
- Parallel job execution
- Artifact reuse
- Minimal Docker images
- Build optimization

### Reliability

- Comprehensive testing
- Gradual rollouts
- Monitoring & alerting
- Rollback procedures
- Documentation

### Maintenance

- Regular workflow updates
- Dependency management
- Performance monitoring
- Security reviews
- Team training

## 📞 Support

For issues with CI/CD pipeline:

1. Check GitHub Actions logs
2. Review this documentation
3. Check common troubleshooting steps
4. Create issue with detailed logs
5. Contact team leads for assistance
