# SecureCodeBench

A security-focused benchmark for evaluating AI-generated code and engineering patches against correctness and secure coding expectations.

SecureCodeBench turns common application-security failures into explicit, reproducible evaluation cases. It is designed to show the overlap between software engineering, cybersecurity, and AI evaluation.

## Features

- React + TypeScript security dashboard
- FastAPI scoring service
- 10 secure coding checks across Python and JavaScript/TypeScript snippets
- OWASP-style vulnerability categories
- Deterministic static checks for a safe public demo
- Weighted security and correctness score
- Evidence-backed findings and remediation guidance
- Pytest, Docker, and GitHub Actions

## Checks

- SQL injection
- Missing object-level authorization
- Hard-coded secrets
- Unsafe shell execution
- Weak password hashing
- JWT verification mistakes
- Path traversal
- XSS-prone rendering
- Missing request timeouts
- Unbounded file upload handling

## Architecture

```text
React security console
        |
        v
FastAPI analyzer
        |
        +--> language-aware rules
        +--> weighted findings
        +--> remediation metadata
        +--> score / grade
```

The public demo intentionally uses deterministic static rules rather than executing submitted code.

## Run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001

cd ../frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL` in the frontend environment when deploying.

## Example

```python
query = f"SELECT * FROM users WHERE email = '{email}'"
cursor.execute(query)
```

SecureCodeBench flags the interpolation pattern and recommends a parameterized query.

## Portfolio value

This project demonstrates AI security evaluation, AppSec reasoning, Python API development, React/TypeScript, rubric design, safe code analysis boundaries, and reproducible testing.

## Author

**Yeabsira Mesfin**  
Full Stack Software Engineer | M.S. Cybersecurity in Computer Science
