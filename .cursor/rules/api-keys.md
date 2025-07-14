# API Keys & Secrets Management

## Never Commit Secrets
- Never commit API keys, secrets, or credentials to version control.
- Use environment variables or secret management tools for sensitive data.

## .gitignore
- Add .env, .env.local, and any secret config files to .gitignore.

## Cloudflare/Hosting
- Use your hosting provider’s environment variable management for production secrets.

## Code Practices
- Never hardcode secrets in JS, HTML, or config files.
- Use placeholders or config files excluded from version control.

## Auditing
- Regularly audit your repository for accidentally committed secrets (use tools like git-secrets or truffleHog).

## References
- https://12factor.net/config
- https://docs.github.com/en/actions/security-guides/encrypted-secrets
