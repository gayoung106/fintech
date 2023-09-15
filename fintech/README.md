# 💰오픈뱅킹 API 활용한 가영페이 프로젝트

## ⭐stack⭐

React JS
<br>
styled-components
<br>
Nest JS
<br>
오픈뱅킹 API

## ⚙️ settings

```
npx create-react-app fintech
```

```
npm start
```

## ✂️ Components Parts

- 기능으로 컴포넌트 구분

## Library

```
npm install styled-components
npm install react-router-dom
npm install axios
npm install query-string
npm install qrcode.react
npm i react-qrcode-reader
 npm install react-slick --force
 npm install react-modal --force
 npm install slick-carousel --force
```

## 오픈뱅킹 API

- 테스트API 호출 : https://testapi.openbanking.or.kr로 호출
- 오픈뱅킹에서 제공하는 인증을 사용
- 필수값이 Y인 항목만 이용

#### 사용자인증 API

```http
  GET https://testapi.openbanking.or.kr/oauth/2.0/authorize
```

| Parameter       | Type                               | Description                                                            |
| :-------------- | :--------------------------------- | :--------------------------------------------------------------------- |
| `response_type` | `고정값: code`                     | **Required**. OAuth 2.0 인증 요청 시 반환되는 형태                     |
| `client_id`     | `<client_id>`                      | **Required**. 오픈뱅킹에서 발급한 이용기관 앱의 Client ID              |
| `redirect_uri`  | `http://localhost:3000/authResult` | **Required**. 사용자인증이 성공하면 이용기관으로 연결되는 URL          |
| `scope`         | `login inquiry transfer`           | **Required**. Access Token 권한 범위                                   |
| `state`         | `12345678901234567890123456789012` | **Required**. CSRF 보안위협에 대응하기 위해 이용기관이 세팅하는 난수값 |
| `auth_type`     | `0`                                | **Required**. (0:최초인증, 1:재인증, 2:인증생략)                       |

#### 사용자 토큰발급 API

```http
  POST https://testapi.openbanking.or.kr/oauth/2.0/token
```

```http
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
```

| Parameter       | Type                               | Description                                                   |
| :-------------- | :--------------------------------- | :------------------------------------------------------------ |
| `code`          | `<authorization_code>`             | **Required**. 사용자인증 성공 후 획득한 Authorization Code    |
| `client_id`     | `<client_id>`                      | **Required**. 오픈뱅킹에서 발급한 이용기관 앱의 Client ID     |
| `client_secret` | `<client_secret>`                  | **Required**. 오픈뱅킹에서 발급한 이용기관 앱의 Client Secret |
| `redirect_uri`  | `http://localhost:3000/authResult` | **Required**. Access Token 을 전달받을 Callback URL           |
| `grant_type`    | `고정값: authorization_code`       | **Required**. 3-legged 인증을 위한 권한부여 방식 지정         |

#### 사용자정보조회 API

```http
  GET https://testapi.openbanking.or.kr/v2.0/user/me
```

| Header          | Type                    | Description                                                                 |
| :-------------- | :---------------------- | :-------------------------------------------------------------------------- |
| `Authorization` | `Bearer <access_token>` | **Required**. 오픈뱅킹으로부터 전송받은 Access Token 을 HTTP Header 에 추가 |

| Parameter     | Type           | Description                                                      |
| :------------ | :------------- | :--------------------------------------------------------------- |
| `user_seq_no` | `고정값: code` | **Required**. 사용자일련번호, 토큰 발급받은 후 응답메세지에 포함 |
