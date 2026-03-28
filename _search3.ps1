$ErrorActionPreference = 'Stop'
$f = Join-Path $env:LOCALAPPDATA 'Programs\Antigravity\resources\app\out\jetskiAgent\main.js.backup-pl'
$outFile = Join-Path $env:USERPROFILE 'antygravity-extensions-pl-projekt\_res_extra.txt'
$content = [System.IO.File]::ReadAllText($f)
$sb = [System.Text.StringBuilder]::new()

# A. lowercase children that are UI words
$m = [regex]::Matches($content, 'children:"([a-z][^"]{3,80})"')
$all = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
$r = $all | Where-Object {
    ($_ -match '^(or |and |no |the |to |in |on |by |for |with |from |of |via |your |this |that |you )') -or
    ($_ -match '^(yes|okay|loading|enter|select|click|type |update|sign )') -or
    ($_ -match '^(vs |per |e\.g\.)') 
}
[void]$sb.AppendLine("=== LOWERCASE CHILDREN (UI text) count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# B. "Failed to..." messages
$m = [regex]::Matches($content, '"(Failed to [^"]{5,100})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== FAILED TO... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# C. "Are you sure..." patterns
$m = [regex]::Matches($content, '"(Are you sure[^"]{5,200})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== ARE YOU SURE... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# D. "Something went wrong" / error patterns
$m = [regex]::Matches($content, '"(Something went[^"]{3,100})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== SOMETHING WENT WRONG count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# E. "No xxx" strings (children)
$m = [regex]::Matches($content, 'children:"(No [^"]{3,100})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== NO... CHILDREN count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# F. onboarding/setup related  
$m = [regex]::Matches($content, '"([^"]*(?:onboard|setup|wizard|getting started|welcome)[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 5 -and $_.Length -lt 150 } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== ONBOARDING/SETUP count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# G. Customize/Instructions/MCP strings  
$m = [regex]::Matches($content, '"([^"]*(?:Customiz|Instruction|MCP|custom agent|skill)[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 5 -and $_.Length -lt 150 -and $_ -notmatch '^\{' -and $_ -notmatch '\\\\' } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== CUSTOMIZE/INSTRUCTIONS/MCP count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# H. Workspace/worktree/branch strings   
$m = [regex]::Matches($content, '"([^"]*(?:workspace|worktree|branch)[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 8 -and $_.Length -lt 150 -and $_ -notmatch '^\{' -and $_ -notmatch '\\\\' -and $_ -notmatch 'import|require|module|function|class ' } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== WORKSPACE/WORKTREE/BRANCH count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# I. "Open Agent Manager" + top-bar strings
$m = [regex]::Matches($content, '"(Open [A-Z][^"]{3,60})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== OPEN... STRINGS count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# J. Confirmation dialog strings
$m = [regex]::Matches($content, '"([^"]*(?:cannot be undone|permanently|confirm|are you sure)[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 10 -and $_.Length -lt 200 } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== CONFIRMATION/WARNING count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# K. "The agent..." strings
$m = [regex]::Matches($content, '"(The [aA]gent[^"]{5,200})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== THE AGENT... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# L. "When enabled/disabled..." strings
$m = [regex]::Matches($content, '"(When (?:enabled|disabled)[^"]{5,200})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== WHEN ENABLED/DISABLED count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# M. "Select..." patterns
$m = [regex]::Matches($content, '"(Select [^"]{3,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== SELECT... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# N. "Sign in..." patterns
$m = [regex]::Matches($content, '"(Sign [^"]{2,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== SIGN... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# O. "View ..." actions 
$m = [regex]::Matches($content, '"(View [^"]{3,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== VIEW... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# P. "Delete ..." actions
$m = [regex]::Matches($content, '"(Delete [^"]{3,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== DELETE... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# Q. Notification-specific strings  
$m = [regex]::Matches($content, '"([^"]*(?:notif|Notif)[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 5 -and $_.Length -lt 150 } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== NOTIFICATION STRINGS count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# R. children with special patterns - "Set up", "Learn more", etc.
$m = [regex]::Matches($content, 'children:"(Set up[^"]*|Learn [^"]*|Click [^"]*|Choose [^"]*|Configure [^"]*|Connect [^"]*|Install [^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== ACTION VERB CHILDREN count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# S. "Review..." patterns
$m = [regex]::Matches($content, '"(Review [^"]{3,80})"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== REVIEW... count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# T. Feedback modal strings
$m = [regex]::Matches($content, '"([^"]*(?:feedback|Feedback)[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 5 -and $_.Length -lt 150 } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== FEEDBACK STRINGS count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

# U: Search for Browser/allowlist strings
$m = [regex]::Matches($content, '"([^"]*(?:allowlist|Allowlist|browser)[^"]*)"')
$r = $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_.Length -gt 10 -and $_.Length -lt 200 -and $_ -notmatch '^\{' } | Sort-Object -Unique
[void]$sb.AppendLine("`n=== BROWSER/ALLOWLIST STRINGS count=$($r.Count) ===")
$r | ForEach-Object { [void]$sb.AppendLine($_) }

$sb.ToString() | Set-Content $outFile -Encoding UTF8
Write-Host "Results saved to $outFile"
Write-Host "Total lines: $($sb.ToString().Split("`n").Count)"
