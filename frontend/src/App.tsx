type Finding = {
  id: string;
  title: string;
  category: string;
  severity: string;
  weight: number;
  description: string;
  remediation: string;
};
type ScanResult = {
  score: number;
  grade: string;
  finding_count: number;
  critical_count: number;
  findings: Finding[];
};
import { request } from "./api";
import { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  ScanLine,
  TriangleAlert,
  CheckCircle2,
} from "lucide-react";

const sample = `from fastapi import FastAPI\nimport requests\n\nAPI_KEY = "DEMO_ONLY_NOT_A_CREDENTIAL"\n\ndef get_user(email):\n    query = f"SELECT * FROM users WHERE email = '{email}'"\n    cursor.execute(query)\n    return requests.get("https://vendor.example/api")`;
export default function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(sample);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function run() {
    if (loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      setResult(
        await request<ScanResult>("/api/scan", {
          method: "POST",
          body: JSON.stringify({ language, code }),
        }),
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <header>
        <div className="brand">
          <ShieldCheck />
          <b>SecureCodeBench</b>
          <span>AI-generated code security benchmark</span>
        </div>
        <div className="tag">STATIC • DETERMINISTIC • SAFE</div>
      </header>
      <main>
        {error && (
          <div role="alert" className="error">
            {error}
          </div>
        )}
        <section className="hero">
          <div>
            <span>SOFTWARE ENGINEERING × CYBERSECURITY × AI EVALS</span>
            <h1>Does the code work securely, or only look correct?</h1>
            <p>
              Evaluate generated code against high-signal security and
              reliability checks without executing untrusted submissions.
            </p>
          </div>
          <ShieldAlert size={110} />
        </section>
        <div className="workspace">
          <section className="editor">
            <div className="bar">
              <b>Candidate submission</b>
              <select
                aria-label="Code language"
                disabled={loading}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>python</option>
                <option>typescript</option>
                <option>javascript</option>
              </select>
            </div>
            <textarea
              aria-label="Candidate code"
              disabled={loading}
              maxLength={20000}
              spellCheck={false}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button disabled={loading || !code.trim()} onClick={run}>
              <ScanLine size={17} />
              {loading ? "Scanning..." : "Run security evaluation"}
            </button>
          </section>
          <section className="summary" aria-live="polite">
            <h3>Heuristic evaluation</h3>
            <p>
              Pattern checks may miss vulnerabilities or report false positives.
              Score is not a security certification.
            </p>
            {result ? (
              <>
                <div
                  className={"grade " + (result.score >= 80 ? "safe" : "risk")}
                >
                  <strong>{result.score}</strong>
                  <span>/100</span>
                  <b>Grade {result.grade}</b>
                </div>
                <div className="metrics">
                  <div>
                    <b>{result.finding_count}</b>
                    <span>Findings</span>
                  </div>
                  <div>
                    <b>{result.critical_count}</b>
                    <span>Critical</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty">
                <ShieldCheck />
                <p>
                  Run a scan to generate a security score and evidence-backed
                  findings.
                </p>
              </div>
            )}
          </section>
        </div>
        {result && (
          <section className="findings">
            <h2>Findings</h2>
            {result.findings.length === 0 ? (
              <div className="clean">
                <CheckCircle2 />
                No heuristic findings detected. This does not establish that the
                code is secure.
              </div>
            ) : (
              result.findings.map((f) => (
                <article key={f.id}>
                  <div className={"icon " + f.severity}>
                    {f.severity === "critical" ? (
                      <TriangleAlert />
                    ) : (
                      <ShieldAlert />
                    )}
                  </div>
                  <div>
                    <span>
                      {f.category} • {f.severity.toUpperCase()}
                    </span>
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                    <strong>Remediation</strong>
                    <p>{f.remediation}</p>
                  </div>
                  <b className="weight">-{f.weight}</b>
                </article>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
}
