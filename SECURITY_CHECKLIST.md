# 🔒 Security Verification Checklist

Use this checklist before pushing to GitHub to ensure no sensitive data is committed.

---

## Pre-Push Verification

### ✅ Environment Variables

```bash
# 1. Verify .env is not staged
git status | grep .env
# Output should be empty or show ".env" in "Untracked files"

# 2. Verify .env is in .gitignore
cat .gitignore | grep "^.env"
# Output should show: .env

# 3. Check if accidentally committed
git ls-files | grep ".env"
# Output should be empty (except .env.example)

# 4. List all environment files in git
git ls-files | grep "env"
# Should ONLY show:
#   .env.example
# Should NOT show:
#   .env
#   .env.local
#   .env.production.local
```

### ✅ Hardcoded Secrets

```bash
# 1. Search for API keys in code
grep -r "VITE_GOOGLE_API_KEY=" . --exclude-dir=node_modules
# Should ONLY show in .env.example
# Should NOT show in .tsx, .ts, or .json files

# 2. Search for Bearer tokens
grep -r "Bearer" . --exclude-dir=node_modules
# Should return empty

# 3. Search for hardcoded passwords
grep -r "password:" . --exclude-dir=node_modules
# Should return empty

# 4. Search for AWS keys
grep -r "AKIA" . --exclude-dir=node_modules
# Should return empty
```

### ✅ Package.json Security

```bash
# 1. Check for credentials in package.json
cat package.json | grep -i "key\|secret\|token\|password"
# Should return empty or only mention "package-lock.json"

# 2. Verify no private registry credentials
cat package.json | grep "registry"
# Should not contain authentication
```

### ✅ Version Control

```bash
# 1. Check git history for secrets
git log --all --full-history -- .env
# Should return empty (not in history)

# 2. Verify no .env in git cache
git ls-tree -r HEAD | grep .env
# Should only show .env.example

# 3. Check all git remotes are safe
git remote -v
# Verify all remotes are correct
```

### ✅ Node Modules

```bash
# 1. Verify node_modules is ignored
git check-ignore node_modules
# Output: node_modules (should appear)

# 2. Check node_modules not staged
git status | grep node_modules
# Should not appear in staged files

# 3. Verify package-lock is correct
git ls-files package-lock.json
# Should be in git (or not, depending on your choice)
```

### ✅ Build Artifacts

```bash
# 1. Verify dist is ignored
git check-ignore dist
# Output: dist (should appear)

# 2. Verify build cache is ignored
git check-ignore -v .vite/
# Should show in .gitignore

# 3. Verify IDE files are ignored
git check-ignore .vscode .idea
# Should show in .gitignore
```

---

## Command-Line Security Check

Run this script before pushing:

```bash
#!/bin/bash
# save as: pre-push-check.sh
# run as: bash pre-push-check.sh

echo "🔒 Security Pre-Push Check"
echo "=========================="

# Check 1: .env file not staged
echo "✓ Checking .env not staged..."
if git status | grep -q "\.env\b"; then
    echo "  ❌ FAIL: .env is staged"
    exit 1
fi
echo "  ✅ PASS"

# Check 2: .env in .gitignore
echo "✓ Checking .env in .gitignore..."
if ! git check-ignore .env > /dev/null; then
    echo "  ❌ FAIL: .env not in .gitignore"
    exit 1
fi
echo "  ✅ PASS"

# Check 3: No API keys in code
echo "✓ Checking for hardcoded API keys..."
if grep -r "VITE_GOOGLE_API_KEY=" . --exclude-dir=node_modules \
   | grep -v ".env.example" | grep -v ".gitignore" | grep -v "SECURITY"; then
    echo "  ❌ FAIL: API key found in code"
    exit 1
fi
echo "  ✅ PASS"

# Check 4: No tokens in git history
echo "✓ Checking git history..."
if git log --all --full-history -- .env | grep -q "commit"; then
    echo "  ❌ FAIL: .env in git history"
    exit 1
fi
echo "  ✅ PASS"

# Check 5: node_modules not staged
echo "✓ Checking node_modules not staged..."
if git status | grep -q "node_modules"; then
    echo "  ❌ FAIL: node_modules staged"
    exit 1
fi
echo "  ✅ PASS"

# Check 6: dist not staged
echo "✓ Checking dist not staged..."
if git status | grep -q "dist/"; then
    echo "  ❌ FAIL: dist folder staged"
    exit 1
fi
echo "  ✅ PASS"

echo ""
echo "✅ All security checks passed!"
echo "Ready to push to GitHub"
```

---

## GitHub Security Checks

After pushing to GitHub, verify:

### Repository Settings

```
Go to Settings > Code security and analysis

✅ Enable: Dependabot alerts
✅ Enable: Dependabot security updates
✅ Enable: Secret scanning (GitHub Pro+ / Enterprise)

These will alert you if secrets are accidentally committed
```

### Security Tab

```
Go to Security tab

✅ Check: No vulnerabilities found
✅ Check: Dependencies up to date
✅ Check: No security alerts
```

---

## If a Secret Was Accidentally Committed

### Immediate Actions (CRITICAL)

```bash
# 1. IMMEDIATELY revoke the secret in the service
#    (e.g., regenerate API key in Google Cloud Console)

# 2. Remove from git history
git rm --cached .env
git commit -m "Remove .env file (contains secrets)"

# 3. FORCE push (only if repository is new)
git push --force-with-lease origin main
# WARNING: Only do this on your own repo!

# 4. For existing repos with collaborators:
# Use git filter-branch or BFG Repo-Cleaner instead
```

### Prevention Going Forward

```bash
# 1. Set up pre-commit hooks
# Install: pip install pre-commit
# Create .pre-commit-config.yaml

# 2. Use git-secrets
# https://github.com/awslabs/git-secrets

# 3. Use detect-secrets
# https://github.com/Yelp/detect-secrets
```

---

## Final Checklist Before GitHub Push

- [ ] `.env` file exists locally (not in git)
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` has no real keys
- [ ] Ran `git status` - no sensitive files staged
- [ ] Ran `git diff --cached` - reviewed all changes
- [ ] No hardcoded API keys in code
- [ ] No credentials in package.json
- [ ] `node_modules` is ignored
- [ ] `dist/` folder is ignored
- [ ] `.vscode/` or `.idea/` are ignored
- [ ] Ran pre-push-check.sh script (if created)
- [ ] Verified git history has no secrets
- [ ] GitHub security alerts are disabled during import
- [ ] Ready to push to GitHub

---

## Documentation References

- [SECURITY.md](SECURITY.md) - Full security policy
- [GITHUB_PUBLICATION.md](GITHUB_PUBLICATION.md) - GitHub publishing guide
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
- [Git Security Best Practices](https://git-scm.com/book/en/v2/Git-Internals-Maintaining-Git#_git_gc)

---

## After Publishing

### Ongoing Security

```bash
# Weekly
npm audit
npm update

# Monthly
git log --oneline -20  # Check recent commits

# Quarterly
Review GitHub security alerts
Update dependencies
Rotate API keys
```

---

**Last Updated:** December 23, 2025  
**Status:** ✅ Ready for GitHub Publication
