$ErrorActionPreference = 'Stop'
$f = Join-Path $env:LOCALAPPDATA 'Programs\Antigravity\resources\app\out\jetskiAgent\main.js.backup-pl'
$outFile = Join-Path $env:USERPROFILE 'antygravity-extensions-pl-projekt\_res_extra2.txt'
$content = [System.IO.File]::ReadAllText($f)
$sb = [System.Text.StringBuilder]::new()

# A. "Toggle ..." patterns
$m = [regex]::Matches($content, '"(Toggle [A-Z][^"]{3,60})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("=== TOGGLE... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# B. "New ..." patterns  
$m = [regex]::Matches($content, '"(New [A-Z][^"]{2,60})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== NEW... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# C. "Copy ..." patterns
$m = [regex]::Matches($content, '"(Copy [A-Z][^"]{2,60})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== COPY... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# D. "Close ..." patterns
$m = [regex]::Matches($content, '"(Close [A-Z][^"]{2,60})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== CLOSE... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# E. "Enable ..." patterns
$m = [regex]::Matches($content, '"(Enable [A-Z][^"]{2,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== ENABLE... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# F. "Search ..." patterns  
$m = [regex]::Matches($content, 'placeholder:"(Search[^"]{0,60})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== SEARCH PLACEHOLDERS count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# G. "Rename ..." patterns
$m = [regex]::Matches($content, '"(Rename [^"]{2,60})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== RENAME... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# H. "Add ..." patterns
$m = [regex]::Matches($content, '"(Add [A-Z][^"]{2,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== ADD... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# I. Theme-related (Choose your theme etc)
$m = [regex]::Matches($content, '"([^"]*(?:theme|Theme)[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 8 -and $_.Length -lt 100 -and $_ -notmatch '^\{' -and $_ -notmatch 'color|Color|border|background|foreground|Label|font|#' } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== THEME STRINGS count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# J. "Install ..." patterns
$m = [regex]::Matches($content, '"(Install [A-Z][^"]{2,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== INSTALL... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# K. Planning mode strings
$m = [regex]::Matches($content, '"([^"]*(?:[Pp]lanning [Mm]ode|[Pp]lan mode)[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 5 -and $_.Length -lt 150 } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== PLANNING MODE count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# L. "Confirm ..." patterns
$m = [regex]::Matches($content, '"(Confirm [A-Z][^"]{2,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== CONFIRM... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# M. "Restart ..." patterns
$m = [regex]::Matches($content, '"(Restart [A-Z][^"]{2,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== RESTART... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# N. "Loading..." patterns (children)
$m = [regex]::Matches($content, 'children:"(Loading[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== LOADING CHILDREN count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# O. "Error ..." children 
$m = [regex]::Matches($content, 'children:"(Error[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== ERROR CHILDREN count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# P. Specific interesting UI strings
$patterns = @(
    '"Proceed"',
    '"Allow"',
    '"Deny"',
    '"Blocked"',
    '"Running"',
    '"Skipped"',
    '"Analyzed"',
    '"Pending"',
    '"Active"',
    '"Completed"',
    '"Submitted..."',
    '"Generating"',
    '"Thinking"',
    '"Planning"',
    '"Reviewing"'
)
[void]$sb.AppendLine("`n=== STATUS WORDS PRESENCE CHECK ===")
foreach ($p in $patterns) {
    if ($content.Contains($p)) {
        [void]$sb.AppendLine("FOUND: $p")
    }
}

# Q. "Archive" / "Restore" patterns
$m = [regex]::Matches($content, '"((?:Archive|Restore) [^"]{2,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== ARCHIVE/RESTORE count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# R. "Export" patterns
$m = [regex]::Matches($content, '"(Export [A-Z][^"]{2,60})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== EXPORT... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# S. "Download" patterns
$m = [regex]::Matches($content, '"(Download [A-Z][^"]{2,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== DOWNLOAD... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# T. "Create ..."
$m = [regex]::Matches($content, '"(Create [A-Z][^"]{2,60})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== CREATE... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# U. Allowed/Denied Sites
$m = [regex]::Matches($content, 'children:"(Allowed [^"]*|Denied [^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== ALLOWED/DENIED CHILDREN count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# V. "Conversation mode" etc
$m = [regex]::Matches($content, '"([^"]*conversation[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 5 -and $_.Length -lt 100 -and $_ -match '^[A-Z]' } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== CONVERSATION... UI count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# W. "Purchase Credits" and AI-credit related
$m = [regex]::Matches($content, '"([^"]*(?:credit|Credit|quota|Quota|[Bb]illing|[Pp]urchase)[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 5 -and $_.Length -lt 150 -and $_ -match '^[A-Z]' } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== CREDITS/QUOTA/BILLING count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

$sb.ToString() | Set-Content $outFile -Encoding UTF8
Write-Host "Results saved to $outFile"
