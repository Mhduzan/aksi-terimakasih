# Script untuk cek struktur project Aksi Terima Kasih
# Simpan hasil ke file report.txt

$outputFile = "project-report.txt"

# Mulai laporan
"=========================================" | Out-File -FilePath $outputFile -Encoding UTF8
"     REPORT STRUKTUR PROJECT" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"     Aksi Terima Kasih Bumi" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"Tanggal: $(Get-Date)" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# 1. Struktur Folder
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"1. STRUKTUR FOLDER PROJECT" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
tree /F | Out-File -FilePath $outputFile -Append -Encoding UTF8
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# 2. Semua File CSS
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"2. SEMUA FILE CSS" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
Get-ChildItem -Path "src" -Recurse -Filter "*.css" | ForEach-Object {
    "📄 $($_.FullName)" | Out-File -FilePath $outputFile -Append -Encoding UTF8
}
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# 3. Cari max-width di semua CSS
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"3. FILE YANG MENGANDUNG 'max-width'" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
Select-String -Path "src\**\*.css" -Pattern "max-width" | ForEach-Object {
    "$($_.Filename):$($_.LineNumber) -> $($_.Line.Trim())" | Out-File -FilePath $outputFile -Append -Encoding UTF8
}
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# 4. Cari width di semua CSS
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"4. FILE YANG MENGANDUNG 'width'" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
Select-String -Path "src\**\*.css" -Pattern "width" | Select-Object -First 30 | ForEach-Object {
    "$($_.Filename):$($_.LineNumber) -> $($_.Line.Trim())" | Out-File -FilePath $outputFile -Append -Encoding UTF8
}
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# 5. Isi App.css lengkap
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"5. ISI LENGKAP App.css" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
Get-Content "src\App.css" -ErrorAction SilentlyContinue | Out-File -FilePath $outputFile -Append -Encoding UTF8
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# 6. Cari container di semua JSX
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"6. FILE JSX YANG MENGANDUNG 'container'" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
Select-String -Path "src\**\*.jsx" -Pattern "container" | ForEach-Object {
    "$($_.Filename):$($_.LineNumber) -> $($_.Line.Trim())" | Out-File -FilePath $outputFile -Append -Encoding UTF8
}
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# 7. Isi HomePage.jsx
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"7. ISI HomePage.jsx" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
Get-Content "src\pages\HomePage.jsx" -ErrorAction SilentlyContinue | Out-File -FilePath $outputFile -Append -Encoding UTF8
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# 8. Isi HeroSection.jsx
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"8. ISI HeroSection.jsx" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
Get-Content "src\components\layout\HeroSection.jsx" -ErrorAction SilentlyContinue | Out-File -FilePath $outputFile -Append -Encoding UTF8
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# 9. Cari file Navbar.css
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"9. ISI Navbar.css (jika ada)" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
Get-Content "src\components\layout\Navbar.css" -ErrorAction SilentlyContinue | Out-File -FilePath $outputFile -Append -Encoding UTF8
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# 10. Cari file global.css
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"10. ISI global.css (jika ada)" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
Get-Content "src\styles\globals.css" -ErrorAction SilentlyContinue | Out-File -FilePath $outputFile -Append -Encoding UTF8
"`n" | Out-File -FilePath $outputFile -Append -Encoding UTF8

# Selesai
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"LAPORAN SELESAI" | Out-File -FilePath $outputFile -Append -Encoding UTF8
"=========================================" | Out-File -FilePath $outputFile -Append -Encoding UTF8

Write-Host "✅ Laporan telah disimpan ke file: $outputFile" -ForegroundColor Green
Write-Host "📁 Lokasi: $(Get-Location)\$outputFile" -ForegroundColor Cyan
Write-Host "`nSilakan buka file tersebut dan kirimkan isinya ke saya." -ForegroundColor Yellow