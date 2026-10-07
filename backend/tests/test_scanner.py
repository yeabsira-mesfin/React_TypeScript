from app.scanner import scan

def test_safe_parameterized_query_scores_clean():
    r=scan('python','cursor.execute("SELECT * FROM users WHERE email = %s", (email,))')
    assert r.score==100 and r.finding_count==0

def test_detects_critical_sql_interpolation():
    r=scan('python','query = f"SELECT * FROM users WHERE email = \'{email}\'"\ncursor.execute(query)')
    assert any(f.id=='sql-injection' for f in r.findings)
    assert r.score<100

def test_detects_unsafe_html():
    r=scan('typescript','element.innerHTML = userInput')
    assert any(f.id=='xss-html' for f in r.findings)
