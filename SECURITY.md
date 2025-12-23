# 🔒 Security Policy & Data Privacy

## Overview

This is a **privacy-first** application. All user data stays on the device - nothing is sent to external servers except for public API calls (prayer times and maps data).

---

## 🛡️ Security Features

### Client-Side Only
- ✅ All data processing happens in the browser
- ✅ No backend server required
- ✅ No user account system
- ✅ No data storage on external servers
- ✅ No analytics or tracking

### Data Storage
- ✅ Uses **IndexedDB** (browser local storage)
- ✅ Data never leaves your device
- ✅ Survives app updates
- ✅ User can clear anytime (browser settings)

### API Integration
- ✅ **Aladhan API** - Prayer times (public, no auth)
- ✅ **Quran API** - Quran content (public, no auth)
- ✅ **Google Gemini API** - Location search (requires optional key)
- ✅ **Google Maps API** - Location services (requires optional key)

### API Key Security
- ✅ **Never committed to repository** (see `.gitignore`)
- ✅ Stored locally in user's `.env` file (machine-only)
- ✅ Only sent to official Google APIs
- ✅ Can be revoked anytime

---

## 🚫 What We DON'T Do

- ❌ We don't collect personal information
- ❌ We don't track user behavior
- ❌ We don't store user data
- ❌ We don't use analytics
- ❌ We don't send data to external servers
- ❌ We don't use ads or third-party trackers
- ❌ We don't require login or registration
- ❌ We don't have access to your location (you control it)
- ❌ We don't access your contacts or files

---

## 📁 Sensitive Data Handling

### What's Sensitive
- Google API Keys
- User's location data
- Device information

### How It's Protected

#### API Keys (.env file)
```bash
# Location: .env (NOT in git repository)
VITE_GOOGLE_API_KEY=your_key_here

# This file is:
✅ In .gitignore (never committed)
✅ User-specific (each dev has their own)
✅ Never exposed in code
✅ Optional (app works without it)
```

#### User Location Data
```typescript
// Only collected when:
✅ User grants permission
✅ User is in Prayer Times section
✅ User clicks "Explore" section

// Handled by:
✅ Browser's Geolocation API (user controls permission)
✅ Sent only to prayer time APIs (public endpoints)
✅ Never stored on servers
✅ Never shared with third parties
```

#### Device Information
```typescript
// Only accessed when necessary:
✅ Vibration (Android vibration feedback)
✅ Notifications (prayer alerts)
✅ Storage (IndexedDB - local only)
✅ Audio (Adhan playback)

// All require explicit permission
✅ Browser permission system
✅ User can revoke anytime
✅ Settings > Apps > Permissions
```

---

## 🔐 For Developers

### Before Publishing on GitHub

#### 1. Never Commit Secrets
```bash
# GOOD ✅ - In .gitignore
.env
.env.local
.env.*.local

# BAD ❌ - Don't do this
git add .env                          # Never!
echo "API_KEY=xyz" >> index.tsx       # Never!
```

#### 2. Use .env.example for Documentation
```bash
# File: .env.example (SAFE to commit)
VITE_GOOGLE_API_KEY=YOUR_API_KEY_HERE

# Users copy to .env (NOT committed):
cp .env.example .env
# Then add their actual key to .env
```

#### 3. Check Before Pushing
```bash
# See what will be committed
git status

# See what's in .gitignore
cat .gitignore

# Verify no secrets are staged
git diff --cached | grep -i "key\|secret\|token"
# Should return nothing
```

#### 4. If You Accidentally Committed a Secret
```bash
# Immediately revoke the secret/key in the service
# Then remove from git history:
git rm --cached .env
git commit -m "Remove .env file"
git push

# Never push after accidentally committing secrets!
```

---

## 🔑 API Key Best Practices

### Setting Up API Keys

#### Step 1: Get API Key from Google Cloud Console
```
1. Go to https://console.cloud.google.com/
2. Create new project
3. Enable APIs:
   - Gemini API
   - Maps API
4. Create API Key credential
5. Copy the key
```

#### Step 2: Store Securely (Never in Code)
```bash
# Create .env file (in .gitignore)
VITE_GOOGLE_API_KEY=your_actual_key_here

# NOT in code files:
❌ Don't hardcode in .tsx files
❌ Don't put in constants.tsx
❌ Don't commit to git
```

#### Step 3: Restrict API Key (Optional but Recommended)
```
In Google Cloud Console:
1. API Keys > Select your key
2. Add restrictions:
   ✅ HTTP referrers: https://yourdomain.com/*
   ✅ APIs: Only enable needed APIs
   ❌ Don't leave unrestricted
```

#### Step 4: Rotate Regularly
```bash
# Every 3-6 months:
1. Generate new API key
2. Update .env locally
3. Delete old key from Google Cloud Console

# If compromised:
1. Immediately delete key
2. Create new one
3. Update .env
4. Verify no unauthorized usage
```

---

## 🌍 Deployment Security

### GitHub Repository (Public)
```
✅ Safe to publish:
  - All source code
  - Documentation
  - Configuration files (without secrets)
  - .env.example (template only)

❌ Never publish:
  - .env (actual keys)
  - credentials.json
  - Any real API keys
  - Private data
```

### Web Server (Production)
```
Environment Setup:
1. SSH into server
2. Create .env file with real keys:
   VITE_GOOGLE_API_KEY=real_key_here
3. Build app: npm run build
4. Deploy dist/ folder
5. Never commit .env to git

GitHub Actions (CI/CD):
1. Store secrets in GitHub Secrets
2. Access in workflow: ${{ secrets.API_KEY }}
3. Never echo or log secrets
4. Pass to build: npm run build
```

### GitHub Secrets (For CI/CD)
```yaml
# .github/workflows/deploy.yml
name: Deploy

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        env:
          VITE_GOOGLE_API_KEY: ${{ secrets.VITE_GOOGLE_API_KEY }}
        run: npm run build
      - name: Deploy
        run: # deploy script
```

---

## 📋 Security Checklist for GitHub

### Before Publishing
- [ ] No `.env` file in git
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` has no real keys
- [ ] No hardcoded API keys in code
- [ ] No hardcoded URLs or secrets
- [ ] No credentials in package.json
- [ ] No test data with real keys
- [ ] `.gitignore` includes: `.env*`, `node_modules/`, `dist/`
- [ ] README explains how to set up .env
- [ ] SECURITY.md document included

### After Publishing
- [ ] Monitor for accidentally committed secrets
- [ ] Set up branch protection rules
- [ ] Require PR reviews before merge
- [ ] Use GitHub security scanning
- [ ] Monitor GitHub alerts
- [ ] Update dependencies regularly
- [ ] Test security in CI/CD pipeline

---

## 🚨 If You Find a Security Issue

### Reporting
```
DO NOT open a public issue
Instead:
1. Email security team
2. Use responsible disclosure
3. Give 90 days to fix
4. Don't share details publicly
```

### Our Commitment
- We take security seriously
- We'll respond within 48 hours
- We'll fix and release patch
- We'll credit you (if desired)

---

## 📚 Security Resources

### General Best Practices
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Academy](https://portswigger.net/web-security)
- [Node.js Security](https://nodejs.org/en/docs/guides/security/)

### JavaScript/React Security
- [React Security Best Practices](https://www.owasp.org/index.php/XSS)
- [npm Security](https://docs.npmjs.com/policies/security)
- [Dependency Vulnerabilities](https://www.npmjs.com/advisories)

### API Security
- [Google API Security](https://cloud.google.com/docs/authentication/end-user)
- [REST API Security](https://tools.ietf.org/html/rfc6749)

---

## 🔄 Regular Security Tasks

### Weekly
- [ ] Check GitHub for security alerts
- [ ] Review dependency updates

### Monthly
- [ ] Update dependencies: `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Check for vulnerabilities: `npm audit fix`

### Quarterly
- [ ] Rotate API keys
- [ ] Review access logs
- [ ] Audit permissions
- [ ] Security code review

### Annually
- [ ] Security audit
- [ ] Penetration testing
- [ ] Privacy review
- [ ] Update security documentation

---

## 📞 Security Contact

For security concerns:
- Email: [Your Security Email]
- PGP Key: [Optional - link to key]
- Response Time: 48 hours max

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Dec 23, 2025 | Initial security policy |

---

## License

This security policy is part of the Azan & Quran application.

---

**Last Updated:** December 23, 2025  
**Status:** ✅ Active  
**Review Date:** Every 6 months
