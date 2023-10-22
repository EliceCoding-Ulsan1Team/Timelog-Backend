참고 영상
https://www.inflearn.com/course/lecture?courseSlug=%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8&unitId=37066

npm run backend -> 서버실행


[server] backend
1.
2.
3. 몽고DB 연결
(https://www.youtube.com/watch?v=4J4-ufnqBdU&list=PLB7CpjPWqHOvaQdLMdkWou6zordKVvLGI)
.env 하는 방법

4.
5. git
6. git hub 연결
7. bodyparser and postman
8. nodemon
8. dotenv (이미 작업함) -> 방법이 좀다름
9. Bcrypt 암호화 -> 두번째 등록부터 false 처리됨(해겵x 231019)
10. 로그인기능 with Bcrypt
11. 토큰 생성 with jsonwebtoken
12. Auth 기능 만들기
13. 로그아웃 기능

231019
전화번호 추가
내정보 api / 수정api (이름,이메일,전화번호)

-------------- (231020)
[client] react - front
port 3001
npm run start

1. create-react-app / npx 
2. CRA?? 보일러플레이트 
3. vscode -> ec7
(rfce - function componenet
 rcc - class component)
4. React Roter Dom
[components] -> [views] -> [dashboard] (profile)
5. 데이터 Flow & Axios (클라이언트가 있기때문에 POSTMAN에 의존하지 않아도된다)
npm i axios --save
axios -> 프론트와 백엔드 통신연결을 위한 메소드?
- [server] nodemon run backend
- [client] npm run start

6. CORS 이슈, Proxy 설정
보안정책(방화벽, 웹 필터 기능)
npm i http-proxy-middleware --save

7. Concurrently (프론트 백엔드 서버 한번에 켜기)
[new] npm i concurrently --save
2시간째 막히는 중... (찾았다 .env랑 충돌??일어나서 몽고서버로 인증이 안됨 -> 직접적으로 아이디:비번 입력하면 동작한다)
테스트할때 직접사용하고 git배포시에는 .env형식으로 다시 올릴것 


npm run dev

8. Antd CSS Framwork
[client] npm i antd --save

9. Redux
10. npm i redux react-redux redux-promise redux-thunk --save(뒤 2개는 middleware)
crome 웹 스토어 Redux DevTools
11. react hooks
12. 로그인 페이지 antd 적용 불가능 해결(antd 5.0 이상부터 import를 할필요가 없음)
13. 로그인 구현 (redux -> 제공된 이메일에 해당하는 유저가 없습니다.(해결)) -> history 에러(해결)

14. 회원가입 페이지 (최종 회원가입이 안됨-> 로그인페이지로 안넘어가짐) 회원가입이 
해결?? -> 몽고 db 에 현재 계정이 1개밖에 등록이 안됨(추후 해결해야함)
일단 사용하려면 몽고db collections에 등록된 계정 삭제할것

15. 로그아웃
16. 인증체크 (Auth) HOC (권한에 따라 들어갈수있는 장치)

Auth처리하는 방법이 달라짐 해겵x -> 포기 못하겠다.