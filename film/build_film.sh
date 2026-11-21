#!/usr/bin/env bash
# Joins film/clips/clip1.mp4 … clip6.mp4 into one continuous film and writes
# the web versions to public/media/.
#
#   ./film/build_film.sh            build everything
#   ./film/build_film.sh frames     export one frame every 0.5s (for timing)
#   ./film/build_film.sh watermark  save the bottom-right corner to find the logo
#
# Watermark: set DELOGO="x=1780:y=1010:w=120:h=50" (from the watermark step)
# to paint it out. Leave empty to skip.
set -euo pipefail
cd "$(dirname "$0")"

# Uses clip1.mp4, clip2.mp4, … in order, up to the first missing number
# (so 4 clips work too while 5–6 are still being made).
CLIPS=()
for n in 1 2 3 4 5 6 7 8 9; do
  [ -f "clips/clip$n.mp4" ] || break
  CLIPS+=("clips/clip$n.mp4")
done
[ ${#CLIPS[@]} -gt 0 ] || { echo "no clips/clip1.mp4"; exit 1; }
XF="${XF:-0.25}"            # cross-fade length at every join (s)
BLACK=0.045                 # dark greys → pure black
DELOGO="${DELOGO:-}"
MEDIA=../public/media

command -v ffmpeg >/dev/null || { echo "ffmpeg missing: brew install ffmpeg"; exit 1; }

case "${1:-build}" in
  frames)
    mkdir -p frames && rm -f frames/*.jpg
    ffmpeg -hide_banner -filters 2>/dev/null | grep -q drawtext && ffmpeg -loglevel error -y -i film_master.mp4 -vf "fps=2,scale=480:-2,drawtext=text='%{pts\:hms}':x=10:y=10:fontcolor=white:fontsize=22:box=1:boxcolor=black@0.6" frames/f_%04d.jpg \
      || ffmpeg -loglevel error -y -i film_master.mp4 -vf "fps=2,scale=480:-2" frames/f_%04d.jpg
    echo "frames/ written: frame N is at (N-1)*0.5 s"
    exit 0 ;;
  watermark)
    ffmpeg -loglevel error -y -sseof -1 -i "${CLIPS[0]}" -frames:v 1 -vf "crop=480:220:iw-480:ih-220" corner.png
    echo "corner.png = bottom-right 480x220 of clip1 (offset x=iw-480, y=ih-220)"
    exit 0 ;;
esac

echo "▶ ${#CLIPS[@]} clips: ${CLIPS[*]}"

# ── 1. join with cross-fades ─────────────────────────────────
inputs=() ; filter="" ; offset=0
for i in "${!CLIPS[@]}"; do
  inputs+=(-i "${CLIPS[$i]}")
  filter+="[$i:v]fps=24,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p,settb=AVTB[c$i];"
done
prev="c0"
for ((i=1; i<${#CLIPS[@]}; i++)); do
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "${CLIPS[$((i-1))]}")
  offset=$(echo "$offset + $d - $XF" | bc -l)
  filter+="[$prev][c$i]xfade=transition=fade:duration=$XF:offset=$offset[x$i];"
  prev="x$i"
done
post="colorlevels=rimin=$BLACK:gimin=$BLACK:bimin=$BLACK"
[ -n "$DELOGO" ] && post="delogo=$DELOGO,$post"
filter+="[$prev]$post[out]"

echo "▶ film_master.mp4"
ffmpeg -loglevel error -stats -y "${inputs[@]}" -filter_complex "$filter" -map "[out]" \
  -c:v libx264 -crf 17 -preset slow -pix_fmt yuv420p -an film_master.mp4

# ── 2. web versions: every frame a keyframe so scroll-seeking is instant ──
#    Resolution follows the clips: 1080p clips → 1920 wide, 720p clips → 1280 wide
#    (upscaling 720p adds file size, not detail).
mkdir -p "$MEDIA"
SRC_H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "${CLIPS[0]}")
if [ "$SRC_H" -ge 1000 ]; then WEB_W=1920; else WEB_W=1280; fi
CRF_DESK="${CRF_DESK:-20}"
CRF_MOB="${CRF_MOB:-23}"
SHARP="unsharp=5:5:0.45:5:5:0"   # light luma sharpening, offsets encoder softness
echo "▶ film.mp4 (desktop, ${WEB_W}px, crf $CRF_DESK)"
ffmpeg -loglevel error -stats -y -i film_master.mp4 -vf "scale=${WEB_W}:-2:flags=lanczos,$SHARP" \
  -c:v libx264 -preset slow -crf "$CRF_DESK" -g 1 \
  -pix_fmt yuv420p -an -movflags +faststart "$MEDIA/film.mp4"
# mobile shows a full-height centre crop of the film, so it needs the full height too
echo "▶ film_mobile.mp4 (1280px, crf $CRF_MOB)"
ffmpeg -loglevel error -stats -y -i film_master.mp4 -vf "scale=1280:-2:flags=lanczos,$SHARP" \
  -c:v libx264 -preset slow -crf "$CRF_MOB" -g 1 \
  -pix_fmt yuv420p -an -movflags +faststart "$MEDIA/film_mobile.mp4"
ffmpeg -loglevel error -y -i film_master.mp4 -frames:v 1 -q:v 3 "$MEDIA/poster.jpg"

# ── 3. report ────────────────────────────────────────────────
len=$(ffprobe -v error -show_entries format=duration -of csv=p=0 film_master.mp4)
echo "✓ film length: ${len}s  (update film.duration + segments in components/cinematic/config.js)"
ls -lh "$MEDIA"/film.mp4 "$MEDIA"/film_mobile.mp4 | awk '{print "  " $5 "  " $9}'
echo "Next: ./film/build_film.sh frames  → find your timing, then open the site with ?debug"
