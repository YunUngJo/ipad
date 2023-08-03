// // '당신에게 맞는 iPad는? 랜더링! (임포트)
import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'


// 장바구니!
// 장바구니 관련 요소 찾기.
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(ecent){
  event.stopPropagation()
if (basketEl.classList.contains('show')) {
  // 이벤트 버블링 정지! - 버튼을 클릭했을 때 드롭다운 메뉴가 나타나야 함.
  hideBasket( )// hide
}else{
  // 이벤트 버블링 정지! - 드롭다운 메뉴 영역을 클릭했을 때 메뉴가 사라지지 않아야 함.
  showBasket()// show
}
})
basketEl.addEventListener('click', function(event){
  event.stopPropagation() // 이벤트 버블링 정지! - 드롭다운 메뉴 영역을 클릭했을 때 메뉴가 사라지지 않아야 함.
})
// 화면 전체를 클릭했을 때 메뉴가 사라짐.
window.addEventListener('click',function(){
  hideBasket()
})

// 특정 로직을 직관적인 함수 이름으로 묶음.
function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}

// 헤더 검색!
// 헤더 검색 관련 요소 찾기.
// 여기 부분 해석하는 공부하기
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowrEl = searchWrapEl.querySelector('.search-closer')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDalayEls = [...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowrEl.addEventListener('click', hideSearch)

function showSearch() {
  // 헤더 부분에 searching을 집어 넣겠다.
  headerEl.classList.add('searching')
  // html에 fixed라는 클래스를 집어 넣겠다.
  document.documentElement.classList.add('fixed')
  // 검색창 누를시 전환효과 주는방법
  headerMenuEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4  / headerMenuEls.length + 's'
  })
    // .reverse() 사용하지 않고 원래 순서대로 반복 처리.
  searchDalayEls.forEach(function(el, index){
    el.style.transitionDelay = index * .4  / searchDalayEls.length + 's'
  })
    // 검색 인풋 요소가 나타난 후 동작!
  setTimeout(function() {
    searchInputEl.focus()
  },600)
}
function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function (el, index){
    el.style.transitionDelay = index * .4  / headerMenuEls.length + 's'
  })
  searchDalayEls.reverse().forEach(function(el, index){
    el.style.transitionDelay = index * .4  / searchDalayEls.length + 's'
  })
  searchDalayEls.reverse() // 나타날 때 원래의 순서대로 처리해야 하기 때문에 다시 뒤집어서 순서 돌려놓기!
  searchInputEl.value ='' // 입력값 초기화
}

// 요소의 가시성 관찰
// 너무어렵다.. .ㅠ....
const io = new IntersectionObserver(function(entries){
  // entries는 `io.observe(el)`로 등록된 모든 관찰 대상 배열.
  entries.forEach(function(entry){
    // 사라질 때.
    if(!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})
// 관찰할 요소들 검색
const infoEls = document.querySelectorAll('.info')
// 관찰 시작!
infoEls.forEach(function(el){
  io.observe(el)
})

// 비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')
// 시작 버튼을 누를경우 비디오 시작
playBtn.addEventListener('click',function(){
  video.play()
  // 시작버튼을 누를시 시작버튼이 사라진다.
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
// 일시정지 버튼을 누를경우 일시정지
pauseBtn.addEventListener('click',function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// '당신에게 맞는 iPad는? 랜더링!
const itemsEl = document.querySelector('section.compare .items')
// ipads는 배열 데이터니깐 forEach를 써야한다.
ipads.forEach(function(ipad){
  // createElement요소를 자바스크립트로 만들떄 사용
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function(color) {
    colorList +=  `<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML =/* html */ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})

// 푸터 내비게이션 맵 랜더링!
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav){ 
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

// mapList 재할당을 의미
  let mapList = ''
  nav.maps.forEach(function(map) {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })
  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `
  navigationsEl.append(mapEl)
})

// 올해 연도를 적용!
const thisYearEl = document.querySelector('.this-year')
thisYearEl.textContent = new Date().getFullYear()
