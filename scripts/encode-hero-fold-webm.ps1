# Rebuild public/assets/video/hero-fold-chroma.webm (VP9 + alpha) from the hero MP4.
# Tune chromakey if blue fringes remain: color 0xRRGGBB, similarity (0–1), blend edge softness.
# Requires ffmpeg on PATH.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$videoDir = Join-Path $root "public\assets\video"
$inputMp4 = Join-Path $videoDir "hero-fold-desktop.mp4"
$outputWebm = Join-Path $videoDir "hero-fold-chroma.webm"

if (-not (Test-Path $inputMp4)) {
  Write-Error "Missing: $inputMp4"
}

& ffmpeg -y -i $inputMp4 -vf "chromakey=0x1a4a6e:0.52:0.1" -c:v libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0 -crf 28 -b:v 0 -an $outputWebm

Write-Host "Wrote $outputWebm"
