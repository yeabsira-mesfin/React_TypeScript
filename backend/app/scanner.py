from .rules import RULES
from .models import Finding,ScanResponse

def scan(language:str,code:str)->ScanResponse:
    findings=[]
    for rule in RULES:
        if language in rule.languages and rule.matches(code):
            findings.append(Finding(id=rule.id,title=rule.title,category=rule.category,severity=rule.severity,weight=rule.weight,description=rule.description,remediation=rule.remediation))
    penalty=min(100,sum(f.weight for f in findings))
    score=max(0,100-penalty)
    grade='A' if score>=90 else 'B' if score>=80 else 'C' if score>=70 else 'D' if score>=60 else 'F'
    return ScanResponse(score=score,grade=grade,findings=findings,finding_count=len(findings),critical_count=sum(1 for f in findings if f.severity=='critical'))
