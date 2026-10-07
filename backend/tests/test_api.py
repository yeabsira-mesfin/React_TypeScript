from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_registry_and_health():
    assert len(client.get('/api/rules').json()) == 10
    assert client.get('/health').json()['status'] == 'ok'

def test_invalid_language_empty_and_oversized_code():
    for payload in [{'language':'ruby','code':'puts 1'},{'language':'python','code':''},{'language':'python','code':'x'*20001}]:
        assert client.post('/api/scan',json=payload).status_code == 422

def test_scan_returns_evidence_and_remediation():
    r = client.post('/api/scan',json={'language':'typescript','code':'node.innerHTML = userInput'}).json()
    assert r['findings'][0]['id'] == 'xss-html'
    assert r['findings'][0]['remediation']
