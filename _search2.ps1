$ErrorActionPreference = 'Stop'
$f = Join-Path $env:LOCALAPPDATA 'Programs\Antigravity\resources\app\out\jetskiAgent\main.js.backup-pl'
$outDir = Join-Path $env:USERPROFILE 'antygravity-extensions-pl-projekt'

Write-Host "Loading file: $f"
$content = [System.IO.File]::ReadAllText($f)
Write-Host "Loaded: $($content.Length) chars"

# 1. children:"..."
Write-Host "`n=== SEARCHING children patterns ==="
$m = [regex]::Matches($content, 'children:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique children strings"
$r | Set-Content (Join-Path $outDir '_res_children.txt') -Encoding UTF8

# 2. label:"..."
Write-Host "`n=== SEARCHING label patterns ==="
$m = [regex]::Matches($content, 'label:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique label strings"
$r | Set-Content (Join-Path $outDir '_res_label.txt') -Encoding UTF8

# 3. title:"..."
Write-Host "`n=== SEARCHING title patterns ==="
$m = [regex]::Matches($content, 'title:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique title strings"
$r | Set-Content (Join-Path $outDir '_res_title.txt') -Encoding UTF8

# 4. placeholder:"..."
Write-Host "`n=== SEARCHING placeholder patterns ==="
$m = [regex]::Matches($content, 'placeholder:"([^"]{2,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique placeholder strings"
$r | Set-Content (Join-Path $outDir '_res_placeholder.txt') -Encoding UTF8

# 5. tooltipText:"..."
Write-Host "`n=== SEARCHING tooltipText patterns ==="
$m = [regex]::Matches($content, 'tooltipText:"([^"]{2,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique tooltipText strings"
$r | Set-Content (Join-Path $outDir '_res_tooltipText.txt') -Encoding UTF8

# 6. tooltip:"..."
Write-Host "`n=== SEARCHING tooltip patterns ==="
$m = [regex]::Matches($content, '(?<![a-zA-Z])tooltip:"([^"]{2,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique tooltip strings"
$r | Set-Content (Join-Path $outDir '_res_tooltip.txt') -Encoding UTF8

# 7. text:"..." 
Write-Host "`n=== SEARCHING text patterns ==="
$m = [regex]::Matches($content, '(?<![a-zA-Z])text:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique text strings"
$r | Set-Content (Join-Path $outDir '_res_text.txt') -Encoding UTF8

# 8. description:"..."
Write-Host "`n=== SEARCHING description patterns ==="
$m = [regex]::Matches($content, 'description:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique description strings"
$r | Set-Content (Join-Path $outDir '_res_description.txt') -Encoding UTF8

# 9. message:"..."
Write-Host "`n=== SEARCHING message patterns ==="
$m = [regex]::Matches($content, 'message:"([A-Z][^"]{1,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique message strings"
$r | Set-Content (Join-Path $outDir '_res_message.txt') -Encoding UTF8

# 10. heading:"..."
Write-Host "`n=== SEARCHING heading patterns ==="
$m = [regex]::Matches($content, 'heading:"([^"]{2,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique heading strings"
$r | Set-Content (Join-Path $outDir '_res_heading.txt') -Encoding UTF8

# 11. buttonText/primaryButton/secondaryButton etc
Write-Host "`n=== SEARCHING button-related text patterns ==="
$m = [regex]::Matches($content, '(?:buttonText|primaryButtonText|secondaryButtonText|confirmText|cancelText|submitText|actionText|linkText):"([^"]{2,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique button-related strings"
$r | Set-Content (Join-Path $outDir '_res_buttontext.txt') -Encoding UTF8

# 12. aria-label
Write-Host "`n=== SEARCHING aria-label patterns ==="
$m = [regex]::Matches($content, '"aria-label":"([^"]{2,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique aria-label strings"
$r | Set-Content (Join-Path $outDir '_res_arialabel.txt') -Encoding UTF8

# 13. lowercase children (UI words like "or", "and", etc.)
Write-Host "`n=== SEARCHING children with lowercase ==="
$m = [regex]::Matches($content, 'children:"([a-z][^"]{2,80})"')
$all = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
$r = $all | Where-Object { 
    $_ -notmatch '^\d' -and 
    $_ -notmatch '^(px|em|rem|rgb|hsl|var|calc|http|data:|#|\.|\/)' -and 
    $_ -notmatch '^[a-z]+[A-Z]' -and
    $_ -notmatch '\{' -and
    $_ -notmatch '^(true|false|null|undefined|none|auto|flex|grid|block|inline|relative|absolute|fixed|inherit|initial|normal|bold|italic|center|left|right|top|bottom|solid|dotted|dashed|hidden|visible|scroll|pointer|default|transparent|white|black|red|green|blue|gray|grey)$' -and
    $_.Length -gt 3 -and $_.Length -lt 60
}
Write-Host "Found $($r.Count) unique lowercase children strings (filtered)"
$r | Set-Content (Join-Path $outDir '_res_children_lower.txt') -Encoding UTF8

# 14. Various specific strings
Write-Host "`n=== SEARCHING for specific UI pattern strings ==="
$m = [regex]::Matches($content, '(?:headerText|subtitleText|emptyText|errorText|successText|warningText|infoText|statusText|notificationText|dialogTitle|dialogMessage|sectionTitle|sectionHeader|tabLabel|menuLabel|navLabel):"([^"]{2,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique specific UI pattern strings"
$r | Set-Content (Join-Path $outDir '_res_specific.txt') -Encoding UTF8

# 15. content:"..." (sometimes used for text)
Write-Host "`n=== SEARCHING content patterns ==="
$m = [regex]::Matches($content, '(?<![a-zA-Z])content:"([A-Z][^"]{3,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique content strings"
$r | Set-Content (Join-Path $outDir '_res_content.txt') -Encoding UTF8

# 16. name:"..." in navigation/menu context
Write-Host "`n=== SEARCHING name patterns ==="  
$m = [regex]::Matches($content, '(?:name|displayName|sidebarName|panelName):"([A-Z][^"]{1,60})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique name strings"
$r | Set-Content (Join-Path $outDir '_res_name.txt') -Encoding UTF8

# 17. hint:"..."
Write-Host "`n=== SEARCHING hint patterns ==="
$m = [regex]::Matches($content, 'hint:"([^"]{2,120})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Found $($r.Count) unique hint strings"
$r | Set-Content (Join-Path $outDir '_res_hint.txt') -Encoding UTF8

Write-Host "`n=== ALL SEARCHES DONE ==="
