from pydantic import BaseModel,Field
class ScanRequest(BaseModel):
    language: str=Field(pattern='^(python|javascript|typescript)$')
    code: str=Field(min_length=1,max_length=20000)
class Finding(BaseModel):
    id:str;title:str;category:str;severity:str;weight:int;description:str;remediation:str
class ScanResponse(BaseModel):
    score:int;grade:str;findings:list[Finding];finding_count:int;critical_count:int
