#!/usr/bin/env python3
import json, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
errors=[]
try:
    data=json.loads((ROOT/'data/portfolio.json').read_text(encoding='utf-8'))
except Exception as e:
    print('JSON ERROR:', e); sys.exit(1)
for key in ['profile','skills','career','businesses','projects','site']:
    if key not in data: errors.append(f'missing top-level key: {key}')
views={v['id'] for v in data.get('site',{}).get('views',[])}
for slot in data.get('site',{}).get('autoView',{}).get('slots',[]):
    if slot.get('view') not in views: errors.append(f"unknown view in slot: {slot}")
for rel in ['index.html','assets/js/app.js','assets/js/renderers.js','assets/css/styles.css']:
    if not (ROOT/rel).exists(): errors.append(f'missing file: {rel}')
for img_key in ['heroImage','secondaryImage']:
    rel=data['profile'].get(img_key)
    if rel and not (ROOT/rel).exists(): errors.append(f'missing image: {rel}')
if errors:
    print('\n'.join('ERROR: '+e for e in errors)); sys.exit(1)
print(f"OK: {len(data['projects'])} projects, {len(data['career'])} career entries, {len(views)} views")
