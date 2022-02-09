export const API_BASE_URL = 'https://i6c101.p.ssafy.io:8082';
export const RTC_BASE_URL = 'https://i6c101.p.ssafy.io:8443';

// 로컬 테스트
// export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

// 배포용
export const OAUTH2_REDIRECT_URI = 'https://i6c101.p.ssafy.io/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;