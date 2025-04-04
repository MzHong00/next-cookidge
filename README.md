
## 🔥 트러블 슈팅

### 👉 Masonry Layout 구현

❌ [시행착오1] 

CSS Flex를 사용하였다. `flex-wrap: wrap`으로 비슷하게 가로 방향으로라도 구현하려고 했지만 여백으로 인해 내가 원하는 것이 아니다.

❌ [시행착오2]

CSS Grid의 `grid-auto-rows: 1px`, `grid-rows-end: span 400`을 사용해서 구현했다. 사진의 `height`를 얻어온 후 `grid-rows-end: span 값`을 `useRef`와 `useEffect`를 통해 `span 값`을 할당 해줬다. 기능 구현에는 성공했지만, 몇 가지 안좋은점이 생겼다.

- 성능이 굉장히 저하 된다 (스타일을 계산하고 이펙트로 리렌더링 하면서 재배치까지 해야하기 때문)
- 반응형을 위한 추가적인 코드 작업이 들어가야 한다 (안좋은 성능으로 또 리렌더링 시켜야 함)

✔ [해결]

react-layout-masonry 라이브러리 사용법이 굉장히 간단해서 좋았다. 그러나 `display: flex`로 자체적인 계산을 하기 때문에 `grid-template-column`을 사용할 수 없었다. `column`을 직접 인자로 전달해 줘야 하는데 `useViewportDivision`커스텀 제작 후, 반응형으로 제작 완료했다. 최종적으로 반응형 masonry layout 제작 완료

추가 에러로 document is not defined 에러가 발생했다.

### 👉 **document is not defined 에러**

❓ [원인]

NextJS는 SSR이기 때문에 `document`, `window`객체에 접근할 수 없다. 두 객체는 `client` 브라우저 측에서 사용할 수 있기 때문이다.

✔ [해결1]

`dynamic api` 사용하였다. `dynamic`은 `lazy` + `suspense`를 기본 제공한다. `ssr: false`를 통해 CSR로 동작하게 할 수 있고, `loading: () => <Component />`로 로딩 상태를 처리할 수 있다. `<Suspense>`로 감싸면 해당 서스펜스의 `fallback`이 안보일 것이다. `loading` 속성을 사용해야 한다.

```
const RecipeList = dynamic(
  () =>
    import("@/containers/recipe/recipeList/recipeList").then(
      (m) => m.RecipeList
    ),
  { ssr: false }
);
```

✔ [해결2]

`useState`와 `useEffect`를 사용하여 초기 렌더링에서 해당 컴포넌트를 조건부로 `null`을 반환하고 마운트 된 후에 컴포넌트를 반환할 수 있도록 구현한다.

```
const [mounted, setMounted] = useState<boolean>(false);

useEffect(() => {
  setMounted(true);
    return () => setMounted(false);
}, []);

return mounted ? <Component /> : null
```

### 👉 **Dialog 태그 `initial` 애니메이션 적용 불가**

❓ [원인]

`framer motion`은 컴포넌트가 마운트 될 때 `initial` 애니메이션을 발생 시키는데, `<dialog>` 태그는 `open`하면 컴포넌트가 새로 생기는게 아니라 기존에 있던게 CSS적으로 보여지고 안보여지게 작동하기 때문에 애니메이션이 발생하지 않음

✔ [해결]

`portal`을 사용하여 재사용 가능한 모달 컴포넌트를 만들었다. 특징으로는 선언적으로 구현하였으며, 모달 버튼 컴포넌트로 만들고 `children`으로 모달창의 내용을 받도록 구현

### 👉 **Skipping auto-scroll**

❓ [원인]

`<Link>`태그로 페이지 이동 시, 스크롤 위치를 유지하기 때문에 `position`속성의 `sticky`, `fixed`에 대한 위치값 계산에서 충돌이 생기는 것이다.

✔ [해결]

Link 태그 scroll 속성 비활성화하였다. `<Link scroll={false}>`를 사용하여 페이지 전환시 스크롤 위치를 최상단에 위치하게 한다.


### 👉 **낙관적 업데이트 중 onMutate 안에서 setQueryData가 안되는 현상**

❓ [원인]

getQueryData로 쿼리키를 잘못 입력하여 me 데이터가 undefiend로 나와서 me._id를 출력할 때, 에러가 안나오고 setQueryData가 작동을 안함 (에러가 출력하지 않았다는 것이 포인트)

✔ [해결]

쿼리 키를 올바르게 설정하여 단순하게 해결

### 👉 **좋아요 버튼 isLike hydrate missmatch 에러**

❓ [원인]

클라이언트 컴포넌트를 서버에서 렌더링한 값과 클라이언트에서 렌더링한 값이 달라 에러 발생

✔ [해결]

기존의 `useMemo`로 서버에서 렌더링할 때, me 데이터가 undefiend로 isLike가 서버측에서는 무조건 false로 됨. 따라서 `useEffect`를 사용하여 클라이언트 측의 isLike의 첫 값을 false로 시켜 서버에서 렌더링 했을 때의 값과 일치시킨다.

### 👉 **NextJS zod FileList is not defined 에러**

❓ [원인]

`pictures: z.instanceof(FileList)` 검증 코드에서 FileList는 브라우저가 제공하는 API이기 떄문에 서버측에서 코드를 실행할 때, FileList를 모른다.

✔ [해결] 

구글링을 통해 `z.custom<FileList>((val) => val instanceof FileList && val.length > 0` 커스텀하여 해결

### 👉 **인터셉터 라우팅 적용 안됨 및 initialTree is not iterable 에러**

✔ [해결] 

`.next`폴더 제거 후, 개발 서버 재실행

### 👉 **커스텀 useSearchParams로 인한 불필요한 리렌더링 발생**

❓ [원인] 

커스텀 훅스의 setSearchParams를 사이드 이펙트의 종속성 배열에 삽입하고 사용할 경우 searchParams가 바뀔 때, setSearchParams도 재할당 되어버려서 불필요한 리렌더링이 한번 더 발생한다. `const params = new URLSearchParams(searchParams.toString());` 에서 params가 매 번 재할당 되어 setSearchParams도 재할당 되게 된다.

✔ [해결]

`const paramsRef = useRef(new URLSearchParams(searchParams.toString()));` useRef를 사용하여 컴포넌트가 재실행 되더라도 params의 값이 유지되도록 하여 setSearchParams 함수로 인해 사이드 이펙트를 재실행 하는 것을 방지했다.

## 🤔 궁금증 및 생각

> 모달을 구현할 때, Portal 대신 position: fixed로 해도 되지 않을까?

실제로 모달을 `position: fixed`로 바꿔봤다. CSS의 자식 선택자를 사용하는 중(ex: div>*), 모달 태그까지 CSS가 적용되는 문제가 발생했다. 이것은 모달이 최상단에 위치하지 않고 일반 컴포넌트들 사이사이에 들어가기 때문에 발생하는 것을 인지했다. 따라서 예기치 못한 CSS 선택자에 걸리지 않도록 관리하기 위해 Portal을 사용하여 최상단에 위치하도록 하는 것이 좋다.


## 🛠 DX 경험 상승

> **로그인 모달 창 모든 페이지 경로에서 `useRouter` 또는 `Link`사용 만으로 로그인 모달창 띄우기 가능**

기존에는 재사용 컴포넌트인 `<DialogButton />` 컴포넌트를 사용해서 모달을 띄웠다. 해당 컴포넌트도 한 줄의 코드로 모달창을 쉽게 띄울수 있다. 그러나, 다음과 같은 한계점이 있다.

- 이벤트 핸들러 내부에서 모달창을 발생시키기 위해서 추가적인 상태 처리가 필요해져서 코드 품질을 해칠 수 있다.
- 로그인 상태가 아닐 경우 로그인 모달창을 띄어주는 상황이 꽤나 많은데, 매 번 `<DialogButton />` 컴포넌트를 호출하는 것은 가독성을 해칠 수 있다.

따라서 중첩 라우팅과 인터셉터 라우팅을 사용하여 로그인 모달 창을 구현하였으며, `useRouter`를 사용하여 어느 페이지에서든지 모달창을 호출할 수 있게 되었다.