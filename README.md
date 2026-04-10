## GallaeMallae Project

> 위치 ∙ 날씨 기반 문화 행사 추천 서비스, 갈래말래 ?!

| 항목          | 내용                                               |
| ------------- | -------------------------------------------------- |
| 프로젝트명    | 갈래말래                                           |
| 1차 개발 기간 | 프로젝트 기획 & 개발<br />2026.02.23 ~ 2026.03.20  |
| 2차 개발 기간 | 서비스 디버깅 & 최적화<br/>2026.03.23 ~ 2026.04.10 |

<br />

<img width="1003" height="647" alt="스크린샷 2026-04-09 오후 8 11 44" src="https://github.com/user-attachments/assets/962abbab-59f8-401e-9513-1676b1c939e2" />

<br /><br />

## ⚙️ Installation

```
npm install
npm run dev
```

<br />

## 👥 Member

> 팀장 이유진 ( @uzzini )

- 공통 UI 컴포넌트 구현
- 메인 페이지 개발

<br />

> 팀원 양선효 ( @soundraven )

- 로그인 페이지 개발
- 마이 페이지 개발

<br />

> 팀원 이권우 ( @GwonWooL )

- 지도 페이지 개발
- 마커 클러스터링 구현

<br />

## ✨ Key Features

### 1️⃣ 행사 탐색 기능

- 지도 기반 행사 탐색
  - Kakao Map 지도 UI로 행사 위치를 시각화
- 내 주변 행사 탐색
  - 사용자 위치 기반으로 근처 행사 자동 탐색
- 카테고리 필터링 시스템
  - 전체 / 축제 / 전시 / 공연 / 기타 Tab을 통해 행사 분류 및 탐색 최적화
- 다가오는 행사 리스트 제공
  - 당일 / 주간 / 월간 필터링 기능 지원

<img width="576" height="341" alt="스크린샷 2026-04-09 오후 8 18 20" src="https://github.com/user-attachments/assets/724204c2-b882-452b-8870-18beb202e0dc" />

<br /><br />

### 2️⃣ 기상 데이터 기반 외출 & 행사방문 추천 기능

- 기상 데이터 연동 분석
  - 기온, 미세먼지, 풍속, 습도 데이터를 활용한 외출 및 행사방문 적합도 분석
  - 적극추천 / 추천 / 보통 / 비추천 단계별 제공

<img width="276" height="324" alt="스크린샷 2026-04-09 오후 8 17 07" src="https://github.com/user-attachments/assets/b07ff6d4-d386-4a63-8397-d4ca00c613dd" /> | <img width="246" height="191" alt="스크린샷 2026-04-09 오후 8 16 54" src="https://github.com/user-attachments/assets/7a18ad73-6441-4540-af5a-6d4eab4edcda" />
---|---|


<br />

### 3️⃣ 사용자 관리

- 간편 소셜 로그인
  - Google / Kakao 계정을 활용한 빠른 로그인 지원
- 마이페이지 관리
  - 캘린더 기반 일정 관리 서비스 제공
  - 사용자 방문 예정 행사 & 관심 행사 리스트
  - 사용자 저장 데이터를 활용한 맞춤 행사 추천
 
<img width="576" height="341" alt="스크린샷 2026-04-09 오후 8 14 31" src="https://github.com/user-attachments/assets/3c2d5d3e-b7c8-404e-bc91-16a6f08b3241" />

<br /><br />

## 🛠 Tech Stack

- **`Framework`** : Next.js (App Router)
- **`Language`** : TypeScript
- **`State Management`** : Zustand, TanStack Query
- **`Styling`** : Tailwind CSS
- **`Deployment`** : Vercel

<br />

## 📂 Folder Structure

```
src/
├── app/                              # Next.js App Router ( 페이지 진입점 )
│   ├── (auth)/                       # 인증 관련 라우트 그룹
│   ├── (main)/                       # 메인 서비스 관련 라우트 그룹
│   ├── map/                          # 지도 페이지
│   ├── api/                          # Route Handler ( 서버 API 엔드포인트 )
│   ├── globals.css                   # 전역 스타일
│   ├── layout.tsx                    # 루트 레이아웃
│   └── not-found.tsx                 # 404 페이지

├── components/                       # UI 컴포넌트
│   ├── common/                       # 공통 컴포넌트
│   ├── modal/                        # 모달 컴포넌트
│   ├── providers/                    # 전역 Context 및 외부 라이브러리 초기화 Provider
│   └── ui/                           # 디자인 시스템 ( shadcn/ui )

├── hooks/                            # 커스텀 훅
│   ├── mutations/                    # TanStack Query - 서버 데이터 변경
│   ├── queries/                      # TanStack Query - 서버 데이터 조회
│   └── ...

├── lib/                              # 외부 연동 및 공통 인프라 로직
│   ├── api/                          # fetch 함수 모음 ( API 호출만 담당 )
│   ├── supabase.ts                   # Supabase 관리자 클라이언트 설정
│   ├── constants.ts                  # 상수 관리
│   └── utils.ts                      # UI 유틸

├── stores/                           # Zustand 전역 상태 관리
│   ├── alertModalStore.ts            # 공용 Alert 모달
│   ├── visitDateModalStore.ts        # 행사 방문일 선택 모달
│   └── locationStore.ts              # 사용자 위치 상태

├── types/                            # 타입 정의
│   ├── apiResponse.ts                # API 응답 타입
│   └── common.ts                     # 공통 타입

└── utils/                            # 비즈니스 유틸
```

