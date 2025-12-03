# Deploy all Prior Authorization apps

Write-Host "Deploying Prior Authorization Apps..." -ForegroundColor Green

# App 2: ai_pa_full_modules on port 3001
Write-Host "`n[1/3] Installing ai_pa_full_modules..." -ForegroundColor Cyan
Set-Location "Prior Authorization Automation\ai_pa_full_modules\frontend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ ai_pa_full_modules dependencies installed" -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev -- -p 3001"
} else {
    Write-Host "✗ Failed to install ai_pa_full_modules" -ForegroundColor Red
}
Set-Location "..\..\..\"

# App 3: ai_pa_next_level on port 3002
Write-Host "`n[2/3] Installing ai_pa_next_level..." -ForegroundColor Cyan
Set-Location "Prior Authorization Automation\ai_pa_next_level\frontend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ ai_pa_next_level dependencies installed" -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev -- -p 3002"
} else {
    Write-Host "✗ Failed to install ai_pa_next_level" -ForegroundColor Red
}
Set-Location "..\..\..\"

# App 4: ai_pa_full on port 3003
Write-Host "`n[3/3] Installing ai_pa_full..." -ForegroundColor Cyan
Set-Location "Prior Authorization Automation\ai_pa_full\frontend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ ai_pa_full dependencies installed" -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev -- -p 3003"
} else {
    Write-Host "✗ Failed to install ai_pa_full" -ForegroundColor Red
}
Set-Location "..\..\..\"

Write-Host "`n✓ Deployment complete!" -ForegroundColor Green
Write-Host "`nRunning apps:" -ForegroundColor Yellow
Write-Host "  - full_ai_pa_app:      http://localhost:3000" -ForegroundColor White
Write-Host "  - ai_pa_full_modules:  http://localhost:3001" -ForegroundColor White
Write-Host "  - ai_pa_next_level:    http://localhost:3002" -ForegroundColor White
Write-Host "  - ai_pa_full:          http://localhost:3003" -ForegroundColor White
