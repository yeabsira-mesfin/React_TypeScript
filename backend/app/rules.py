import re
from dataclasses import dataclass
from typing import Callable

@dataclass(frozen=True)
class Rule:
    id: str
    title: str
    category: str
    severity: str
    weight: int
    languages: tuple[str, ...]
    description: str
    remediation: str
    matches: Callable[[str], bool]

def has(pattern: str, flags=re.I | re.S):
    rx = re.compile(pattern, flags)
    return lambda code: bool(rx.search(code))

RULES = [
 Rule('sql-injection','Possible SQL injection','Injection','critical',18,('python','javascript','typescript'),'User-controlled data appears to be interpolated into a SQL statement.','Use parameterized queries or prepared statements.',lambda code: bool(re.search(r'f[\"\'][^\n]{0,200}(SELECT|INSERT|UPDATE|DELETE)[^\n]{0,200}\{', code, re.I)) or bool(re.search(r'(SELECT|INSERT|UPDATE|DELETE).{0,160}\$\{', code, re.I | re.S))),
 Rule('hardcoded-secret','Hard-coded secret','Secrets','high',12,('python','javascript','typescript'),'A credential-like value appears embedded in source code.','Load secrets from a managed secret store or environment variable.',has(r'(api[_-]?key|secret|password|token)\s*[:=]\s*[\"\'][A-Za-z0-9_\-]{12,}[\"\']')),
 Rule('shell-injection','Unsafe shell execution','Injection','critical',18,('python','javascript','typescript'),'Shell execution is constructed dynamically.','Avoid shell=True and dynamic command strings; use argument arrays and allowlists.',has(r'(shell\s*=\s*True|exec\s*\(.*\+|child_process\.exec\()')),
 Rule('weak-hash','Weak password hashing','Cryptography','high',12,('python','javascript','typescript'),'A fast/general-purpose hash is used in password-related code.','Use Argon2id, scrypt, or bcrypt with appropriate parameters.',has(r'(md5|sha1)\s*\(')),
 Rule('jwt-no-verify','JWT verification disabled','Authentication','critical',18,('python','javascript','typescript'),'JWT signature verification appears disabled.','Verify signature, issuer, audience, expiration, and allowed algorithms.',has(r'(verify_signature[\"\']?\s*[:=]\s*False|verify\s*:\s*false)')),
 Rule('path-traversal','Potential path traversal','File Handling','high',10,('python','javascript','typescript'),'A request-controlled path is joined or opened without an obvious boundary check.','Resolve to an allowed base directory and reject paths escaping it.',has(r'((request\.|req\.).{0,80}(filename|path).{0,120}(open\(|join\())|((open\(|join\().{0,120}(request\.|req\.).{0,80}(filename|path))')),
 Rule('xss-html','Unsafe HTML rendering','XSS','high',10,('javascript','typescript'),'HTML is injected directly into the DOM.','Prefer escaped rendering; sanitize explicitly trusted HTML.',has(r'(dangerouslySetInnerHTML|innerHTML\s*=)')),
 Rule('missing-timeout','HTTP request without explicit timeout','Reliability','medium',6,('python',),'An outbound Python HTTP request has no visible timeout.','Use a bounded timeout and deliberate retry policy.',lambda code: bool(re.search(r'requests\.(get|post|put|delete)\(',code)) and 'timeout=' not in code),
 Rule('unbounded-upload','Potential unbounded upload read','Resource Safety','medium',6,('python','javascript','typescript'),'Uploaded content is read without an obvious size boundary.','Enforce request/content limits and stream large uploads.',has(r'(UploadFile|req\.files|multer).{0,160}(read\(\)|buffer)')),
 Rule('missing-object-auth','Possible missing object-level authorization','Authorization','high',12,('python','javascript','typescript'),'An object lookup appears to rely on a request-supplied identifier without an obvious ownership or tenant constraint.','Enforce object-level authorization by scoping queries to the authenticated user or tenant.',has(r'(findById|filter\([^\n]{0,80}id\s*==|where\([^\n]{0,80}id).{0,220}(request\.|req\.|params|path_params)', re.I | re.S)),
]
