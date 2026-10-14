# 한입 — 오늘의 맛집

동네 숨은 맛집부터 줄 서는 노포까지, 방문자 별점과 리뷰로 고르는 맛집 가이드입니다.
같은 코드베이스로 **웹(Netlify)** 과 **iOS / Android 네이티브 앱(Capacitor)** 을 함께 제공합니다.

- 웹: https://meek-genie-36fc2e.netlify.app

## 주요 기능

- **둘러보기**: 검색(가게명·메뉴·지역·태그), 카테고리(한식·일식·양식·중식·카페·분식), 지역 필터, 평점/리뷰수/가격 정렬
- **맛집 상세**: 사진, 소개, 주소(네이버 지도 연결)·영업시간·전화 걸기, 메뉴판, 공유
- **리뷰**: 별점 + 닉네임 + 후기 작성. Netlify Database(Postgres)에 저장되고 평점에 바로 반영
- **저장한 맛집**: 하트로 찜하기 (기기에 저장, 로그인 불필요)

## 기술 스택

TanStack Start (React 19) · Tailwind CSS 4 · Netlify Database + Drizzle ORM · Netlify Image CDN · Capacitor 8

## 로컬 실행

```bash
pnpm install
netlify dev        # Netlify Database 등 플랫폼 기능 에뮬레이션 포함
```

DB 스키마(`db/schema.ts`)를 바꾼 뒤에는 `pnpm db:generate --name <변경_이름>` 으로 마이그레이션을 만듭니다. 마이그레이션은 배포 시 자동 적용됩니다.

## 모바일 앱 (App Store / Google Play)

네이티브 프로젝트는 `ios/`, `android/` 에 있습니다. 앱은 배포된 웹앱을 불러오므로, 웹을 배포하면 앱 화면도 함께 업데이트됩니다.

**Android (Google Play)**
1. Android Studio 설치 → `pnpm cap:sync && pnpm cap:android`
2. `Build > Generate Signed App Bundle` 로 `.aab` 생성
3. Google Play Console에 업로드

**iOS (App Store)** — macOS + Xcode 필요
1. `pnpm cap:sync && pnpm cap:ios`
2. Signing & Capabilities 에서 Apple Developer 팀 선택
3. `Product > Archive` → App Store Connect 업로드

앱 아이콘·스플래시 원본은 `resources/` 에 있으며 `pnpm cap:assets` 로 재생성합니다.
번들 ID는 `capacitor.config.ts` 의 `appId`(`app.hanip.matjip`)이며, 스토어 등록 전에 원하는 값으로 바꾸세요.
다른 주소(예: 커스텀 도메인)를 불러오려면 `CAP_SERVER_URL` 환경변수를 지정한 뒤 `cap sync` 하세요.

## 다음 단계 제안

- 회원가입/로그인(Netlify Identity)과 내 리뷰 관리
- 맛집 데이터를 DB로 이전하고 관리자 등록 화면 추가
- 지도 보기, 내 위치 기준 거리 정렬
- 리뷰 사진 업로드(Netlify Blobs), 푸시 알림
