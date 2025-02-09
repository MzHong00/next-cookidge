
#### 🔥 트러블 슈팅

> **Masonry Layout**

Pinterest의 블록을 쌓아올리는 듯한 Grid Layout이 Masonry Layout이라는 것을 알게되고 이를 구현하기 시작했다.

❌ CSS Flex
`flex-wrap: wrap`으로 비슷하게 가로 방향으로라도 구현하려고 했지만 여백으로 인해 내가 원하는 것이 아니다.

❌ CSS Grid
`grid-auto-rows: 1px`, `grid-rows-end: span 400`을 사용해서 구현했다.. 사진의 `height`를 얻어온 후 `grid-rows-end: span 값`을 `useRef`와 `useEffect`를 통해 `span 값`을 할당 해줬다. 기능 구현에는 성공했지만, 몇 가지 안좋은점이 생겼다.

- 성능이 굉장히 저하 됨 (스타일을 계산하고 이펙트로 리렌더링 하면서 재배치까지 해야하기 때문)
- 반응형을 위한 추가적인 코드 작업이 들어가야 함 (안좋은 성능으로 또 리렌더링 시켜야 함)

✔ react-layout-masonry 라이브러리
사용법이 굉장히 간단해서 좋았다. 그러나 `display: flex`로 자체적인 계산을 하기 때문에 `grid-template-column`을 사용할 수 없었다. `column`을 직접 인자로 전달해 줘야 하는데 