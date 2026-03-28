$ErrorActionPreference = 'Stop'
$f = 'C:\Users\Michał\AppData\Local\Programs\Antigravity\resources\app\out\jetskiAgent\main.js.backup-pl'
$outDir = 'C:\Users\Michał\antygravity-extensions-pl-projekt'

Write-Host "Loading file..."
$content = [System.IO.File]::ReadAllText($f)
Write-Host "Loaded: $($content.Length) chars"

# 1. children:"..."
Write-Host "`n=== SEARCHING children patterns ==="
$m = [regex]::Matches($content, 'children:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique children strings"
$r | Set-Content "$outDir\_res_children.txt" -Encoding UTF8

# 2. label:"..."
Write-Host "`n=== SEARCHING label patterns ==="
$m = [regex]::Matches($content, 'label:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique label strings"
$r | Set-Content "$outDir\_res_label.txt" -Encoding UTF8

# 3. title:"..."
Write-Host "`n=== SEARCHING title patterns ==="
$m = [regex]::Matches($content, 'title:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique title strings"
$r | Set-Content "$outDir\_res_title.txt" -Encoding UTF8

# 4. placeholder:"..."
Write-Host "`n=== SEARCHING placeholder patterns ==="
$m = [regex]::Matches($content, 'placeholder:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique placeholder strings"
$r | Set-Content "$outDir\_res_placeholder.txt" -Encoding UTF8

# 5. tooltipText:"..."
Write-Host "`n=== SEARCHING tooltipText patterns ==="
$m = [regex]::Matches($content, 'tooltipText:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique tooltipText strings"
$r | Set-Content "$outDir\_res_tooltipText.txt" -Encoding UTF8

# 6. tooltip:"..."
Write-Host "`n=== SEARCHING tooltip patterns ==="
$m = [regex]::Matches($content, 'tooltip:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique tooltip strings"
$r | Set-Content "$outDir\_res_tooltip.txt" -Encoding UTF8

# 7. text:"..." 
Write-Host "`n=== SEARCHING text patterns ==="
$m = [regex]::Matches($content, '(?<![a-zA-Z])text:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique text strings"
$r | Set-Content "$outDir\_res_text.txt" -Encoding UTF8

# 8. description:"..."
Write-Host "`n=== SEARCHING description patterns ==="
$m = [regex]::Matches($content, 'description:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique description strings"
$r | Set-Content "$outDir\_res_description.txt" -Encoding UTF8

# 9. message:"..."
Write-Host "`n=== SEARCHING message patterns ==="
$m = [regex]::Matches($content, 'message:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique message strings"
$r | Set-Content "$outDir\_res_message.txt" -Encoding UTF8

# 10. heading:"..."
Write-Host "`n=== SEARCHING heading patterns ==="
$m = [regex]::Matches($content, 'heading:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique heading strings"
$r | Set-Content "$outDir\_res_heading.txt" -Encoding UTF8

# 11. buttonText:"..."
Write-Host "`n=== SEARCHING buttonText patterns ==="
$m = [regex]::Matches($content, 'buttonText:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique buttonText strings"
$r | Set-Content "$outDir\_res_buttonText.txt" -Encoding UTF8

# 12. aria-label="..."
Write-Host "`n=== SEARCHING aria-label patterns ==="
$m = [regex]::Matches($content, '"aria-label":"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique aria-label strings"
$r | Set-Content "$outDir\_res_arialabel.txt" -Encoding UTF8

# 13. confirmText/cancelText/submitText
Write-Host "`n=== SEARCHING confirm/cancel/submit text patterns ==="
$m = [regex]::Matches($content, '(?:confirmText|cancelText|submitText|primaryButtonText|secondaryButtonText):"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique confirm/cancel/submit strings"
$r | Set-Content "$outDir\_res_confirmtext.txt" -Encoding UTF8

# 14. Also lowercase children that start with known words
Write-Host "`n=== SEARCHING children with lowercase start ==="
$m = [regex]::Matches($content, 'children:"([a-z][^"]{2,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_ -match '^[a-z]' -and $_ -notmatch '^\d' -and $_ -notmatch '^(px|em|rem|rgb|hsl|var|calc|http|data:|#|\.|\/)' -and $_.Length -gt 3 } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique lowercase children strings"
$r | Set-Content "$outDir\_res_children_lower.txt" -Encoding UTF8

Write-Host "`n=== ALL DONE ==="
