# 시네마틱 포트폴리오 영상 만들기

사이트 코드는 이미 완성되어 있어요. 영상이 아직 없으면 사이트가 **스틸 모드**(`me.webp` 사진 사용)로 동작하고,
`public/media/film.mp4`가 생기면 자동으로 **스크롤 영상 모드**로 바뀝니다.

```
film/
├── clips/            ← Flow에서 받은 clip1.mp4 … clip6.mp4 를 여기에
├── build_film.sh     ← 6개 클립 → 1개 영상 + 웹용 파일
└── README.md         ← 지금 이 문서
public/media/         ← film.mp4, film_mobile.mp4, poster.jpg (스크립트가 생성)
components/cinematic/config.js  ← 텍스트, 타이밍, 위치 (여기만 수정)
```

---

## 1. 시작 이미지 (ChatGPT 등 이미지 AI)

> 누끼 사진을 검은 배경에 합성하는 방식은 쓰지 않아요. 원본이 야외 햇빛 사진이라 스튜디오 조명과 맞지 않아 부자연스러워요.
> 이미지 AI가 조명까지 새로 그리게 하는 게 훨씬 자연스러워요.

**업로드할 사진:** 증명사진(얼굴 참고) → 스타일 사진(머리·옷 참고) 순서로 2장. 프롬프트는 `film/chatgpt_prompts.txt`에서 복사하세요.

이미지는 **2장**을 만드세요. 시작(뒷모습)과 끝(정면) 두 프레임을 모두 지정하면 Veo가 돌아설 때 얼굴을 지어내지 않고, 사진 속 얼굴로 끝나요.

### ① 끝 이미지 (정면) → `start_front.png`  ← 먼저 만들기

```
Use the person in the uploaded photo as the exact face reference: same face shape, eyes, nose, lips,
skin tone and makeup. Same long straight black hair with a center part, small pearl earrings.

Create a NEW photo, not an edit of the original: full body, standing in the exact center of the frame,
facing the camera, arms relaxed at the sides, a confident warm smile. Head to toe visible with space above the head.

OUTFIT
Pale pink collared satin blouse, ivory high-waisted wide-leg trousers, white minimal sneakers.

LIGHT
Pure black background, completely dark empty studio. Strong warm rose-gold rim light from behind on both sides
outlining the hair, shoulders and body edges, plus a soft spotlight from above that lights the face naturally.
Realistic soft shadows. No floor texture, no props, no glowing outline.

STYLE
Photorealistic cinematic film still, 85mm lens, natural skin texture, 16:9 landscape.
```

### ② 시작 이미지 (뒷모습) → `start_back.png`
①을 만든 **같은 대화창**에서 이어서:

```
Same person, same outfit, same studio and lighting, same framing and position in the frame.
Now the person stands with their BACK to the camera, arms relaxed, head to toe visible. 16:9 landscape.
```

체크: 머리~신발 전부 프레임 안 · 얼굴이 본인 같은지(①) · 두 장의 옷, 위치, 크기가 같은지 · 16:9 가로

> 얼굴이 덜 닮았으면 같은 대화창에서 "Make the face match the uploaded photo more closely: …"처럼
> 눈매나 입술 같은 부위를 짚어서 다시 요청하세요. 증명사진에 더해 다른 정면 사진을 1~2장 함께 올리면 더 좋아져요.

**Flow Clip 1:** 첫 프레임 = `start_back.png`, 마지막 프레임 = `start_front.png`, ACTION은 아래 표의 1번 줄.

## 2. 클립 6개 (Google Flow · Veo)

**설정:** Frames to Video · 16:9 · Veo Quality(또는 Fast) · 2 outputs → 더 나은 쪽 선택 → **1080p**로 다운로드 →
`film/clips/clipN.mp4` 로 저장.

**공통 베이스** (매 클립 프롬프트 앞에 붙이기). Clip 1을 만든 뒤 실제 영상 속 옷 표현으로 `wearing …` 부분을 고쳐 쓰세요.

```
SHOT
One single continuous camera shot with no cuts, no dissolves and no transitions.

PERSON
The same young East Asian person with long straight black hair parted in the middle and small pearl earrings,
wearing a black collared satin blouse, an ivory bias-cut satin midi skirt and nude low-heel pumps.
Their face, hair and outfit stay exactly the same. Only one person in the frame.

STUDIO
A pure black empty studio. A strong warm rose-gold rim light outlines the body and hair at all times,
with a soft overhead spotlight. The background stays completely black.

SOUND
No music, no dialogue.

ACTION
<아래 표의 액션 한 줄>
```

| # | 첫 프레임 | ACTION |
|---|---|---|
| 1 | start_back.png (마지막 프레임: start_front.png) | The person stands with their back to the camera, then slowly turns around to face the camera, looks into the lens and gives a confident, warm smile. Static camera, full body framing. |
| 2 | Clip 1 마지막 프레임 | The person takes two slow, confident steps toward the camera, stops, and smiles warmly at the lens with a slight nod. Static camera. |
| 3 | Clip 2 마지막 프레임 | Starting from the close-up, the camera slowly pulls back in one continuous move to a wide full-body shot. The person stays facing the camera, never turns their back, takes one small step backward and sits down on a simple modern white chair right behind them, crosses their legs and smiles. |
| 4 | Clip 3 마지막 프레임 | Static wide camera. A sleek white desk with an open silver laptop slides in smoothly from the right side of the frame on its own and stops right in front of the person. They uncross their legs, lean forward, pull the laptop closer and start typing, focused, with a small smile. |
| 5 | Clip 4 마지막 프레임 | Static wide camera. The person stops typing, stands up and steps out from behind the desk to the left. They walk slowly toward the left side of the frame in side profile, stop on the left third, fully visible from head to toe, and smile at the camera. The desk, laptop and chair stay where they are. |
| 6 | Clip 5 마지막 프레임 | The camera stays completely still. The person raises both hands above their head, grabs something invisible and smoothly pulls it down to chest height, like pulling down a screen, holds that pose, then lowers their hands, smiles and gently waves hello with their right hand. |

**마지막 프레임 저장** (다음 클립의 첫 프레임):

```bash
ffmpeg -sseof -0.2 -i film/clips/clip1.mp4 -update 1 film/clips/clip1_last.png
```

**문제가 생기면** 프롬프트 끝에 추가:
- 중간에 장면이 바뀜 → ChatGPT로 끝 포즈 이미지를 만들어 *last frame*으로도 지정
- 하얀 후광 → `Natural soft edges, no glowing outlines, no halo around the body.`
- 손이 화면 밖 → `Their hands stay inside the frame at all times. Slightly wider framing.`
- 배경이 회색/조명기구 → `The background stays completely black. No walls, no light stands, no lamps visible.`

---

## 3. 영상 합치기

```bash
cd portfoliowebsite
./film/build_film.sh watermark      # film/corner.png 로 Veo 워터마크 위치 확인 (선택)
DELOGO="x=1790:y=1010:w=110:h=50" ./film/build_film.sh   # 워터마크 없으면 DELOGO 생략
```

→ `public/media/film.mp4`(~18MB), `film_mobile.mp4`(~9MB), `poster.jpg` 생성.
클립 사이는 0.25초 크로스페이드, 어두운 회색은 순수 검정으로, 모든 프레임이 키프레임이라 스크롤 시킹이 즉시 됩니다.

## 4. 타이밍 맞추기

```bash
./film/build_film.sh frames         # film/frames/ 에 0.5초마다 한 장 (N번째 = (N-1)×0.5초)
```

프레임을 보고 아래 순간의 초를 찾아 `components/cinematic/config.js`에 반영:

| 순간 | config 항목 |
|---|---|
| 돌아서기 끝 | `segments` 의 intro 홀드, `windows.intro` |
| 클로즈업 도착 | about 홀드, `windows.about` |
| 책상 멈추고 타이핑 | work 홀드, `windows.work` |
| 걷기 시작 / 멈춤 | `windows.skills`, skills 홀드 |
| 두 손 내려옴 | `resumeDrop`, resume 홀드 |
| 손 흔들기 | `contactDraw`, contact 홀드, `contactFrame` 위치 |

`http://localhost:3000/?debug` 로 열면 왼쪽 아래에 현재 영상 시간(t)이 보여서 맞추기 쉬워요.
위치(`shiftX`, `mobileFocus`, `contactFrame`)도 같은 방식으로 조정합니다.

## 5. 실행 / 배포

```bash
nvm use 22     # Next 12는 Node 25에서 실행되지 않습니다
npm run dev    # http://localhost:3000   (이전 사이트는 /classic)
```

Vercel에 그대로 배포하면 됩니다. `public/media/*.mp4` 는 Git에 커밋해야 배포에 포함돼요 (합계 ~27MB).
