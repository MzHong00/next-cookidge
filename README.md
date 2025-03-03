
#### 🔥 트러블 슈팅

> **Masonry Layout**

Pinterest의 블록을 쌓아올리는 듯한 Grid Layout이 Masonry Layout이라는 것을 알게되고 이를 구현하기 시작했다.

❌ CSS Flex
`flex-wrap: wrap`으로 비슷하게 가로 방향으로라도 구현하려고 했지만 여백으로 인해 내가 원하는 것이 아니다.

❌ CSS Grid
`grid-auto-rows: 1px`, `grid-rows-end: span 400`을 사용해서 구현했다.. 사진의 `height`를 얻어온 후 `grid-rows-end: span 값`을 `useRef`와 `useEffect`를 통해 `span 값`을 할당 해줬다. 기능 구현에는 성공했지만, 몇 가지 안좋은점이 생겼다.

- 성능이 굉장히 저하 된다 (스타일을 계산하고 이펙트로 리렌더링 하면서 재배치까지 해야하기 때문)
- 반응형을 위한 추가적인 코드 작업이 들어가야 한다 (안좋은 성능으로 또 리렌더링 시켜야 함)

✔ react-layout-masonry 라이브러리
사용법이 굉장히 간단해서 좋았다. 그러나 `display: flex`로 자체적인 계산을 하기 때문에 `grid-template-column`을 사용할 수 없었다. `column`을 직접 인자로 전달해 줘야 하는데 `useViewportDivision`커스텀 제작 후, 반응형으로 제작 완료했다. 최종적으로 반응형 masonry layout 제작 완료

👉 추가 에러: document is not defined 에러 해결

</hr>

> **`<Dialog />`태그 `initial` 애니메이션 적용 불가**

원인: `framer motion`은 컴포넌트가 마운트 될 때 `initial` 애니메이션을 발생 시키는데, `<dialog>` 태그는 `open`하면 컴포넌트가 새로 생기는게 아니라 기존에 있던게 CSS적으로 보여지고 안보여지게 작동하기 때문에 애니메이션이 발생하지 않음

✔ 직접 만들기
`portal`을 사용하여 재사용 가능한 모달 컴포넌트를 만들었다. 특징으로는 선언적으로 구현하였으며, 모달 버튼 컴포넌트로 만들고 `children`으로 모달창의 내용을 받도록 구현

</hr>

> **Skipping auto-scroll**

원인: `<Link>`태그로 페이지 이동 시, 스크롤 위치를 유지하기 때문에 `position`속성의 `sticky`, `fixed`에 대한 위치값 계산에서 충돌이 생기는 것이다.

✔ Link 태그 scroll 속성 비활성화
`<Link scroll={false}>`를 사용하여 페이지 전환시 스크롤 위치를 최상단에 위치하게 한다.

</hr>

> **document is not defined 에러**

원인: NextJS는 SSR이기 때문에 `document`, `window`객체에 접근할 수 없다. 두 객체는 `client` 브라우저 측에서 사용할 수 있기 때문이다.

✔ dynamic api 사용
`dynamic`은 `lazy` + `suspense`를 기본 제공한다. `ssr: false`를 통해 CSR로 동작하게 할 수 있고, `loading: () => <Component />`로 로딩 상태를 처리할 수 있다. `<Suspense>`로 감싸면 해당 서스펜스의 `fallback`이 안보일 것이다. `loading` 속성을 사용해야 한다.

```
const RecipeList = dynamic(
  () =>
    import("@/containers/recipe/recipeList/recipeList").then(
      (m) => m.RecipeList
    ),
  { ssr: false }
);
```

✔ 상태 관리
`useState`와 `useEffect`를 사용하여 초기 렌더링에서 해당 컴포넌트를 조건부로 `null`을 반환하고 마운트 된 후에 컴포넌트를 반환할 수 있도록 구현한다.

```
const [mounted, setMounted] = useState<boolean>(false);

useEffect(() => {
  setMounted(true);
    return () => setMounted(false);
}, []);

return mounted ? <Component /> : null
```

</hr>

🤔 궁금증 및 생각

> 모달을 구현할 때, Portal 대신 position: fixed로 해도 되지 않을까?

실제로 모달을 `position: fixed`로 바꿔봤다. CSS의 자식 선택자를 사용하는 중(ex: div>*), 모달 태그까지 CSS가 적용되는 문제가 발생했다. 이것은 모달이 최상단에 위치하지 않고 일반 컴포넌트들 사이사이에 들어가기 때문에 발생하는 것을 인지했다. 따라서 예기치 못한 CSS 선택자에 걸리지 않도록 관리하기 위해 Portal을 사용하여 최상단에 위치하도록 하는 것이 좋다.