from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import ScanRequest,ScanResponse
from .scanner import scan
from .rules import RULES
import os
app=FastAPI(title='SecureCodeBench API',version='1.0.0')
app.add_middleware(CORSMiddleware,allow_origins=os.getenv('ALLOWED_ORIGINS','http://localhost:5173,https://yeabsira-mesfin.github.io').split(','),allow_methods=['GET','POST'],allow_headers=['Content-Type'])
@app.get('/health')
def health():return {'status':'ok','rules':len(RULES)}
@app.get('/api/rules')
def rules():return [{'id':r.id,'title':r.title,'category':r.category,'severity':r.severity,'weight':r.weight,'languages':r.languages} for r in RULES]
@app.post('/api/scan',response_model=ScanResponse)
def code_scan(req:ScanRequest):return scan(req.language,req.code)
