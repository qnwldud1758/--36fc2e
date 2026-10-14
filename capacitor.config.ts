import type { CapacitorConfig } from '@capacitor/cli'

// 네이티브 앱은 배포된 웹앱(Netlify)을 그대로 불러옵니다.
// 웹을 배포하면 앱 스토어 재심사 없이 앱 화면도 함께 업데이트됩니다.
const config: CapacitorConfig = {
  appId: 'app.hanip.matjip',
  appName: '한입',
  webDir: 'mobile/www',
  backgroundColor: '#fbf6ef',
  server: {
    url: process.env.CAP_SERVER_URL ?? 'https://meek-genie-36fc2e.netlify.app',
    errorPath: 'index.html',
  },
  ios: { contentInset: 'never' },
}

export default config
