import pytest
from app.scanner import scan

@pytest.mark.parametrize('rule,language,code', [
 ('sql-injection','typescript','const sql = `SELECT * FROM users WHERE id = ${id}`'),
 ('hardcoded-secret','python','API_KEY = "DEMO_ONLY_NOT_A_CREDENTIAL"'),
 ('shell-injection','python','subprocess.run(user_input, shell=True)'),
 ('weak-hash','python','password_hash = hashlib.md5(password)'),
 ('jwt-no-verify','python','jwt.decode(token, options={"verify_signature": False})'),
 ('path-traversal','python','open(request.query_params["filename"])'),
 ('xss-html','typescript','node.innerHTML = userInput'),
 ('missing-timeout','python','requests.get(url)'),
 ('unbounded-upload','python','async def upload(file: UploadFile):\n return await file.read()'),
 ('missing-object-auth','typescript','db.findById(req.params.id)'),
])
def test_rule_positive_fixture(rule,language,code):
    assert rule in {f.id for f in scan(language,code).findings}

@pytest.mark.parametrize('language,code', [
 ('python','cursor.execute("SELECT * FROM users WHERE id = %s", (id,))'),
 ('python','requests.get(url, timeout=5)'),
 ('python','subprocess.run(["echo", safe_value], shell=False)'),
 ('typescript','return <p>{userInput}</p>'),
 ('python','API_KEY = os.environ["API_KEY"]'),
])
def test_clean_fixture(language,code):
    assert scan(language,code).finding_count == 0
