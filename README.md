![](https://velog.velcdn.com/images/mzhong/post/200e8bc6-c1c1-4970-a998-61b119554da6/image.png)

기존의 React로 구현한 [Cookidge](https://github.com/MzHong00/cookidge) 프로젝트를 NextJS를 사용하여 마이그레이션한 프로젝트이다.

배포: https://cookidge-next.vercel.app


## 아키텍처
![Image](https://github.com/user-attachments/assets/a4ccfe0e-c778-45b8-b082-696cd02f85d0)


## 기술 스택
- TypeScript
- SCSS
- NextJS
- Tankstack-Query
- Zustand
- Framer
- Zod

## 🏃‍ 성능 개선 기술
- NextJS의 Image API를 사용하여 이미지 최적화를 했다. 자동으로 제공하는 확장자 변형 및 width height 지정하여 이미지 로딩 속도 개선
- Masonry 레이아웃 반응형으로 행의 개수 조절 및 검색 기능에서 디바운스를 사용하여 성능 최적화
- Abort Signal을 통한 네트워크 요청 취소 기능 구현
- RSC의 초기 렌더링 속도 장점을 사용하기 위해 prefetch, de/hydrate를 사용하여 리액트 쿼리 초기 데이터 패칭을 서버에서 한 후 클라이언트로 내려주는 방식으로 초기 로딩속도 개선
- 인증을 관리하기 위해 fetch 대신 axios를 사용하여 interceptor를 사용해 클라이언트의 인증과 토큰 재발급을 관리하였다. 그러나 generateMetadata를 사용할 때, axios를 사용하면 캐싱을 사용할 수 없기 때문에 generateMetadata가 필요한 API 서비스 요청을 fetch 함수를 사용하여 axios, fetch를 유동적으로 사용하였다.
- useMemo, useCallback, memo 등을 사용하여 리렌더링 연산이 복잡한 컴포넌트에 적용하여 성능 최적화
- 낙관적 업데이트를 통한 좋아요 기능 즉각적 반응

## 👔 사용했던 NextJS의 기본적인 기능
- generateMetadata를 사용한 동적 메타 태그 변경
- Paralle Route와 Intercepting Route를 사용하여 모달 구현
- middleware.ts로 특정 루트에서 사용자 인증 수행
- Tanstack Query를 사용하여 서버 컴포넌트에서 데이터 패칭을 수행하기 위해 prefetch 및 de/hydration API를 사용

## 🔥 트러블 슈팅
> Masonry Layout 구현

**시행착오1:** CSS Flex를 사용하였다. `flex-wrap: wrap`으로 비슷하게 가로 방향으로라도 구현하려고 했지만 여백으로 인해 내가 원하는 것이 아니다.

**시행착오2:** CSS Grid의 `grid-auto-rows: 1px`, `grid-rows-end: span 400`을 사용해서 구현했다. 사진의 `height`를 얻어온 후 `grid-rows-end: span 값`을 `useRef`와 `useEffect`를 통해 `span 값`을 할당 해줬다. 기능 구현에는 성공했지만, 몇 가지 안좋은점이 생겼다.

- 성능이 굉장히 저하 된다 (스타일을 계산하고 이펙트로 리렌더링 하면서 재배치까지 해야하기 때문)
- 반응형을 위한 추가적인 코드 작업이 들어가야 한다 (안좋은 성능으로 또 리렌더링 시켜야 함)

**해결:** react-layout-masonry 라이브러리 사용법이 굉장히 간단해서 좋았다. 그러나 `display: flex`로 자체적인 계산을 하기 때문에 `grid-template-column`을 사용할 수 없었다. `column`을 직접 인자로 전달해 줘야 하는데 `useViewportDivision`커스텀 제작 후, 반응형으로 제작 완료했다. 최종적으로 반응형 masonry layout 제작 완료

그러나, 추가 에러로 document is not defined 에러가 발생했다.

> document is not defined 에러

**원인:** NextJS는 SSR이기 때문에 `document`, `window`객체에 접근할 수 없다. 두 객체는 `client` 브라우저 측에서 사용할 수 있기 때문이다.

**해결방법1:** `dynamic api` 사용하였다. `dynamic`은 `lazy` + `suspense`를 기본 제공한다. `ssr: false`를 통해 CSR로 동작하게 할 수 있고, `loading: () => <Component />`로 로딩 상태를 처리할 수 있다. `<Suspense>`로 감싸면 해당 서스펜스의 `fallback`이 안보일 것이다. `loading` 속성을 사용해야 한다.

```tsx
const RecipeList = dynamic(
  () =>
    import("@/containers/recipe/recipeList/recipeList").then(
      (m) => m.RecipeList
    ),
  { ssr: false }
);
```

**해결2:** `useState`와 `useEffect`를 사용하여 초기 렌더링에서 해당 컴포넌트를 조건부로 `null`을 반환하고 마운트 된 후에 컴포넌트를 반환할 수 있도록 구현한다.

```tsx
const [mounted, setMounted] = useState<boolean>(false);

useEffect(() => {
  setMounted(true);
    return () => setMounted(false);
}, []);

return mounted ? <Component /> : null
```

> Dialog 태그 `initial` 애니메이션 적용 불가

**원인:** `framer motion`은 컴포넌트가 마운트 될 때 `initial` 애니메이션을 발생 시키는데, `<dialog>` 태그는 `open`하면 컴포넌트가 새로 생기는게 아니라 기존에 있던게 CSS적으로 보여지고 안보여지게 작동하기 때문에 애니메이션이 발생하지 않음

**해결:** `portal`을 사용하여 재사용 가능한 모달 컴포넌트를 만들었다. 특징으로는 선언적으로 구현하였으며, 모달 버튼 컴포넌트로 만들고 `children`으로 모달창의 내용을 받도록 구현

> Skipping auto-scroll

**원인:** `<Link>`태그로 페이지 이동 시, 스크롤 위치를 유지하기 때문에 `position`속성의 `sticky`, `fixed`에 대한 위치값 계산에서 충돌이 생기는 것이다.

**해결:** Link 태그 scroll 속성 비활성화하였다. `<Link scroll={false}>`를 사용하여 페이지 전환시 스크롤 위치를 최상단에 위치하게 한다.

> 낙관적 업데이트 중 onMutate 안에서 setQueryData가 안되는 현상

**원인:** getQueryData로 쿼리키를 잘못 입력하여 me 데이터가 undefiend로 나와서 me._id를 출력할 때, 에러가 안나오고 setQueryData가 작동을 안함 (에러가 출력하지 않았다는 것이 포인트)

**해결:** 쿼리 키를 올바르게 설정하여 단순하게 해결

> 좋아요 버튼 isLike hydrate missmatch 에러

**원인:** 클라이언트 컴포넌트를 서버에서 렌더링한 값과 클라이언트에서 렌더링한 값이 달라 에러 발생

**해결:** 기존의 `useMemo`로 서버에서 렌더링할 때, me 데이터가 undefiend로 isLike가 서버측에서는 무조건 false로 됨. 따라서 `useEffect`를 사용하여 클라이언트 측의 isLike의 첫 값을 false로 시켜 서버에서 렌더링 했을 때의 값과 일치시킨다.

> NextJS zod FileList is not defined 에러

**원인:** `pictures: z.instanceof(FileList)` 검증 코드에서 FileList는 브라우저가 제공하는 API이기 떄문에 서버측에서 코드를 실행할 때, FileList를 모른다.

**해결:** 구글링을 통해 `z.custom<FileList>((val) => val instanceof FileList && val.length > 0)` 커스텀하여 해결

> 인터셉터 라우팅 적용 안됨 및 initialTree is not iterable 에러

**해결:** `.next`폴더 제거 후, 개발 서버 재실행

> 병렬 라우팅에서 하위 경로로 들어갔을 때 404에러 발생

**원인:** 특정 하위 경로로 이동했을 떄, 일치하지 않은 슬룻의 렌더링을 처리해줘야 했다.

**해결:** `/user/[name]`의 경로에서 recipe 병렬 루트가 문제였으며 `default.tsx`를 삽입하여 해결하였다.

> inActive 상태의 데이터에 queryClient.invalidateQueries를 걸었을 때, refetch가 안되는 현상

**원인:** 페이지 이동을 뒤로가기 또는 앞으로가기를 했을 때, stale 데이터를 refetch하지 않는다. 프로필 업데이트를 했을 때 `router.back()`을 사용하였기 때문에 refetch를 안하는 현상이 발생하였다.

**해결방법1:** 기존에 프로필 업데이트를 했을 때, 성공 시 `router.push()`으로 변경하여 해결 

**해결방법2:** `queryClient.invalidateQueries(queryKey, { refetchType: inactive })`에서 refetchType 속성을 통해 inActive 상태의 데이터를 백그라운드에서 페치할 수 있다다.

- 'active': refetch 조건과 일치하고 useQuery유사한 후크를 통해 적극적으로 렌더링되는 쿼리만 백그라운드에서 다시 페치됩니다. 이는 기본 동작입니다.
- 'inactive': refetch 조건자와 일치하고 현재 렌더링되지 않는 쿼리만 백그라운드에서 다시 페치됩니다.
- 'all': refetch 조건자와 일치하는 모든 쿼리는 활성 또는 비활성 상태에 관계없이 백그라운드에서 다시 페치됩니다.
- 'none': 쿼리를 다시 가져오지 않습니다. refetch 조건과 일치하는 쿼리는 무효로 표시됩니다.

> Zod + React Hook Form에서 input type="number"를 사용할 때, 폼에서 문자열로 받아와져 검증 에러가 발생

**해결:** `z.coerce.number()`를 사용하여 문자열로 값을 받아와지는 `input type="number"`의 값을 숫자로 취급할 수 있다.

> RSC에서 반환하는 인코딩된 한글 params 데이터를 한글 문자열로 출력하기

**해결:** decodeURICoponent API를 사용하여 인코딩 된 데이터를 디코딩할 수 있다.

## 🤔 궁금증 및 생각

> 모달을 구현할 때, Portal 대신 position: fixed로 해도 되지 않을까?

실제로 모달을 `position: fixed`로 바꿔봤다. CSS의 자식 선택자를 사용하는 중(ex: div>*), 모달 태그까지 CSS가 적용되는 문제가 발생했다. 이것은 모달이 최상단에 위치하지 않고 일반 컴포넌트들 사이사이에 들어가기 때문에 발생하는 것을 인지했다. 따라서 예기치 못한 CSS 선택자에 걸리지 않도록 관리하기 위해 Portal을 사용하여 최상단에 위치하도록 하는 것이 좋다.


## 🛠 DX 경험 상승

> 로그인 모달 창 모든 페이지 경로에서 `useRouter` 또는 `Link`사용 만으로 로그인 모달창 띄우기 가능

기존에는 재사용 컴포넌트인 `<DialogButton />` 컴포넌트를 사용해서 모달을 띄웠다. 해당 컴포넌트도 한 줄의 코드로 모달창을 쉽게 띄울수 있다. 그러나, 다음과 같은 한계점이 있다.

- 이벤트 핸들러 내부에서 모달창을 발생시키기 위해서 추가적인 상태 처리가 필요해져서 코드 품질을 해칠 수 있다.
- 로그인 상태가 아닐 경우 로그인 모달창을 띄어주는 상황이 꽤나 많은데, 매 번 `<DialogButton />` 컴포넌트를 호출하는 것은 가독성을 해칠 수 있다.

따라서 중첩 라우팅과 인터셉터 라우팅을 사용하여 로그인 모달 창을 구현하였으며, `useRouter`를 사용하여 어느 페이지에서든지 모달창을 호출할 수 있게 되었다.