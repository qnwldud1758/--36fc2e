// 큐레이션된 맛집 목록. 리뷰는 Netlify Database(reviews 테이블)에 저장되며,
// 아래 baseRating/baseReviews 는 큐레이터 평가로 실제 리뷰와 합산되어 표시됩니다.

export type Category = '한식' | '일식' | '양식' | '중식' | '카페' | '분식'

export interface MenuItem {
  name: string
  price: number
  signature?: boolean
}

export interface Restaurant {
  id: string
  name: string
  category: Category
  area: string
  address: string
  phone: string
  hours: string
  priceRange: 1 | 2 | 3
  image: string
  tagline: string
  description: string
  tags: string[]
  baseRating: number
  baseReviews: number
  menu: MenuItem[]
}

export const CATEGORIES: { label: Category; emoji: string }[] = [
  { label: '한식', emoji: '🍚' },
  { label: '일식', emoji: '🍣' },
  { label: '양식', emoji: '🍝' },
  { label: '중식', emoji: '🥟' },
  { label: '카페', emoji: '☕' },
  { label: '분식', emoji: '🌶️' },
]

export const AREAS = ['전체', '마포', '종로', '성수', '강남', '부산'] as const

export const restaurants: Restaurant[] = [
  {
    id: 'yeonnam-sutbul',
    name: '연남 숯불집',
    category: '한식',
    area: '마포',
    address: '서울 마포구 연남로 23',
    phone: '02-332-1023',
    hours: '매일 16:00 – 24:00',
    priceRange: 2,
    image: '/img/samgyeopsal.png',
    tagline: '참숯에 굽는 두툼한 생삼겹',
    description:
      '매일 아침 들여오는 국내산 생삼겹을 참숯에 초벌해 내어줍니다. 직접 담근 묵은지와 멜젓이 고기 맛을 한층 끌어올려요.',
    tags: ['단체석', '주차가능', '웨이팅'],
    baseRating: 4.6,
    baseReviews: 312,
    menu: [
      { name: '생삼겹살 (200g)', price: 17000, signature: true },
      { name: '목살 (200g)', price: 17000 },
      { name: '묵은지 김치찌개', price: 8000 },
      { name: '볶음밥', price: 3000 },
    ],
  },
  {
    id: 'jongno-myeonok',
    name: '종로 면옥',
    category: '한식',
    area: '종로',
    address: '서울 종로구 수표로 18',
    phone: '02-2265-0151',
    hours: '11:00 – 21:00 · 월 휴무',
    priceRange: 2,
    image: '/img/naengmyeon.png',
    tagline: '삼대째 이어온 평양냉면',
    description:
      '메밀 함량 80%의 면과 한우 양지로 우린 맑은 육수. 첫 모금은 슴슴하지만 마지막 한 모금이 가장 맛있는 집입니다.',
    tags: ['노포', '혼밥', '포장'],
    baseRating: 4.8,
    baseReviews: 521,
    menu: [
      { name: '물냉면', price: 15000, signature: true },
      { name: '비빔냉면', price: 15000 },
      { name: '제육 반접시', price: 18000 },
      { name: '녹두전', price: 12000 },
    ],
  },
  {
    id: 'seongsu-omakase',
    name: '스시 하루',
    category: '일식',
    area: '성수',
    address: '서울 성동구 연무장길 41 2층',
    phone: '02-469-7711',
    hours: '런치 12:00 · 디너 18:00 / 20:30',
    priceRange: 3,
    image: '/img/sushi.png',
    tagline: '카운터 10석, 제철 오마카세',
    description:
      '산지에서 직송한 제철 생선으로 매일 구성이 바뀌는 오마카세. 셰프와 마주 앉아 한 점씩 받아 먹는 경험을 선사합니다.',
    tags: ['예약필수', '데이트', '기념일'],
    baseRating: 4.9,
    baseReviews: 188,
    menu: [
      { name: '런치 오마카세', price: 70000 },
      { name: '디너 오마카세', price: 150000, signature: true },
      { name: '사케 페어링', price: 60000 },
    ],
  },
  {
    id: 'hannam-trattoria',
    name: '트라토리아 몬티',
    category: '양식',
    area: '강남',
    address: '서울 강남구 도산대로45길 10',
    phone: '02-545-2290',
    hours: '11:30 – 22:00 · 브레이크 15–17시',
    priceRange: 3,
    image: '/img/pasta.png',
    tagline: '매일 반죽하는 생면 파스타',
    description:
      '이탈리아 볼로냐 출신 셰프가 매일 아침 직접 뽑는 생면. 6시간 끓인 라구 소스 탈리아텔레는 꼭 맛보세요.',
    tags: ['와인', '데이트', '테라스'],
    baseRating: 4.5,
    baseReviews: 264,
    menu: [
      { name: '라구 탈리아텔레', price: 26000, signature: true },
      { name: '카초 에 페페', price: 22000 },
      { name: '부라타 샐러드', price: 21000 },
      { name: '티라미수', price: 11000 },
    ],
  },
  {
    id: 'mangwon-banjeom',
    name: '망원 반점',
    category: '중식',
    area: '마포',
    address: '서울 마포구 포은로 87',
    phone: '02-338-4482',
    hours: '11:00 – 21:30 · 화 휴무',
    priceRange: 1,
    image: '/img/jjajang.png',
    tagline: '손으로 뽑는 수타 짜장면',
    description:
      '주문이 들어오면 그때 반죽을 때려 면을 뽑습니다. 바삭하게 두 번 튀긴 찹쌀 탕수육은 이 동네 명물이에요.',
    tags: ['가성비', '배달', '혼밥'],
    baseRating: 4.4,
    baseReviews: 437,
    menu: [
      { name: '수타 짜장면', price: 8000, signature: true },
      { name: '짬뽕', price: 10000 },
      { name: '찹쌀 탕수육 (소)', price: 18000, signature: true },
      { name: '군만두', price: 7000 },
    ],
  },
  {
    id: 'seongsu-roasters',
    name: '오후의 로스터리',
    category: '카페',
    area: '성수',
    address: '서울 성동구 서울숲2길 32',
    phone: '02-6012-3300',
    hours: '매일 10:00 – 22:00',
    priceRange: 1,
    image: '/img/cafe.png',
    tagline: '직접 볶은 원두와 바스크 치즈케이크',
    description:
      '매장 한켠에서 매일 원두를 로스팅합니다. 겉은 그을리고 속은 크리미한 바스크 치즈케이크와 플랫화이트 조합을 추천해요.',
    tags: ['디저트', '작업하기좋은', '반려동물'],
    baseRating: 4.6,
    baseReviews: 359,
    menu: [
      { name: '플랫화이트', price: 6000, signature: true },
      { name: '핸드드립 (싱글오리진)', price: 7500 },
      { name: '바스크 치즈케이크', price: 7500, signature: true },
    ],
  },
  {
    id: 'tongin-tteokbokki',
    name: '통인 할매떡볶이',
    category: '분식',
    area: '종로',
    address: '서울 종로구 자하문로15길 18',
    phone: '02-735-0940',
    hours: '10:00 – 20:00 · 일 휴무',
    priceRange: 1,
    image: '/img/tteokbokki.png',
    tagline: '40년 된 시장 떡볶이',
    description:
      '통인시장 골목에서 40년째 같은 자리를 지키는 떡볶이집. 달큰 매콤한 국물에 튀김을 찍어 먹는 게 정석입니다.',
    tags: ['노포', '가성비', '포장'],
    baseRating: 4.3,
    baseReviews: 602,
    menu: [
      { name: '떡볶이 1인분', price: 5000, signature: true },
      { name: '모둠 튀김', price: 6000 },
      { name: '꼬마김밥', price: 4000 },
      { name: '어묵', price: 1000 },
    ],
  },
  {
    id: 'busan-dwaeji-gukbap',
    name: '서면 돼지국밥',
    category: '한식',
    area: '부산',
    address: '부산 부산진구 서면로 68',
    phone: '051-806-2299',
    hours: '24시간 영업',
    priceRange: 1,
    image: '/img/gukbap.png',
    tagline: '뽀얀 사골 육수의 부산 국밥',
    description:
      '돼지 사골을 18시간 고아 낸 진한 육수에 수육을 듬뿍 올렸습니다. 부추와 새우젓을 넣어 입맛대로 즐기세요.',
    tags: ['24시간', '혼밥', '해장'],
    baseRating: 4.7,
    baseReviews: 890,
    menu: [
      { name: '돼지국밥', price: 10000, signature: true },
      { name: '순대국밥', price: 10000 },
      { name: '수육 백반', price: 13000 },
    ],
  },
]

export function getRestaurant(id: string) {
  return restaurants.find((r) => r.id === id)
}

export function imageUrl(src: string, w: number) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}&fm=webp&q=75`
}

export const priceLabel = (p: 1 | 2 | 3) => '₩'.repeat(p)
