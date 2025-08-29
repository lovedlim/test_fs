# AI 협업 전문가 랜딩 페이지

> AI 활용이 막막한 직장인을 위한 실무 적용 가능한 AI 협업 노하우 제공

![Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Mobile](https://img.shields.io/badge/Mobile-Optimized-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Live Demo

**[https://sideonlab.github.io/pr/](https://sideonlab.github.io/pr/)**

## ✨ 주요 기능

- 📱 **모바일 최적화**: 360px~420px 너비 기준 반응형 디자인
- 🎨 **세련된 UI**: 네이비/그레이 + 민트 포인트 컬러
- 📝 **핵심 콘텐츠**: AI 워크, AI 동료 만들기, 데이터 인사이트
- 💬 **커피챗 폼**: 구글 앱스 스크립트 연동 문의 시스템
- ⚡ **빠른 로딩**: 순수 HTML/CSS/JS로 최적화

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Fonts**: Noto Sans KR (Google Fonts)
- **Backend**: Google Apps Script (폼 데이터 처리)
- **Deploy**: GitHub Pages

## 📦 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/sideonlab/pr.git

# 디렉토리 이동
cd pr

# 로컬 서버 실행
python -m http.server 8000
# 또는
npx http-server
```

브라우저에서 `http://localhost:8000` 접속

## 📁 프로젝트 구조

```
pr/
├── index.html          # 메인 페이지
├── style.css           # 스타일시트
├── script.js           # JavaScript 로직
└── README.md           # 프로젝트 문서
```

## 🔧 커스터마이징

### 브랜딩 문구 수정
`index.html`의 `.main-title` 섹션에서 개인 브랜딩 메시지 변경

### 콘텐츠 카드 수정
각 `.content-card`의 제목, 설명, 아이콘 변경 가능

### 구글 폼 연동
`index.html`의 `action` 속성에 본인의 구글 앱스 스크립트 URL 설정:

```html
<form action="YOUR_GOOGLE_APPS_SCRIPT_URL" method="POST">
```

## 🌐 배포 방법

### GitHub Pages (추천)
1. GitHub 저장소 생성
2. 코드 푸시
3. Settings > Pages > Source: Deploy from branch (main)

### Netlify
1. [Netlify](https://netlify.com) 접속
2. 저장소 연결 또는 파일 드래그&드롭

### Vercel
1. [Vercel](https://vercel.com) 접속
2. Import Git Repository

## 📊 성능 및 SEO

- ✅ 모바일 친화적 디자인
- ✅ 시맨틱 HTML 구조
- ✅ 메타 태그 최적화
- ✅ 빠른 로딩 속도
- ✅ 접근성 고려

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일 참조

## 📞 연락처

프로젝트 관련 문의: [Issues](https://github.com/sideonlab/pr/issues)

---

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!
