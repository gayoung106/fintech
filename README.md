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
npm install react-qrcode-reader
npm install react-slick --force
npm install react-modal --force
npm install slick-carousel --force
npm install jsonwebtoken
npm install --save mysql2
npm install dotenv --save
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

#### 계좌조회 API

```http
  GET https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num
```

| Header          | Type                    | Description                                                                 |
| :-------------- | :---------------------- | :-------------------------------------------------------------------------- |
| `Authorization` | `Bearer <access_token>` | **Required**. 오픈뱅킹으로부터 전송받은 Access Token 을 HTTP Header 에 추가 |

| Parameter         | Type             | Description                                   |
| :---------------- | :--------------- | :-------------------------------------------- |
| `bank_tran_id`    | `거래고유번호`   | **Required**. 이용기관코드+U+이용기관부여번호 |
| `fintech_use_num` | `고정값: code`   | **Required**. 핀테크이용번호                  |
| `tran_dtime`      | `20230914101010` | **Required**. 요청일시                        |

#### 거래내역조회 API

```http
  GET https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num
```

| Header          | Type                    | Description                                                                 |
| :-------------- | :---------------------- | :-------------------------------------------------------------------------- |
| `Authorization` | `Bearer <access_token>` | **Required**. 오픈뱅킹으로부터 전송받은 Access Token 을 HTTP Header 에 추가 |

| Parameter         | Type             | Description                                              |
| :---------------- | :--------------- | :------------------------------------------------------- |
| `bank_tran_id`    | `거래고유번호`   | **Required**. 이용기관코드+U+이용기관부여번호            |
| `fintech_use_num` | `고정값: code`   | **Required**. 핀테크이용번호                             |
| `inquiry_type`    | `A`              | **Required**. 조회구분코드 - “A”:All, “I”:입금, “O”:출금 |
| `inquiry_base`    | `D`              | **Required**. 조회기준코드 - “D”:일자, “T”:시간          |
| `from_date`       | `20201212`       | **Required**. 조회시작일자                               |
| `to_date`         | `20230901`       | **Required**. 조회종료일자                               |
| `sort_order`      | `D`              | **Required**. 정렬순서 - “D”:Descending, “A”:Ascending   |
| `tran_dtime`      | `20230914101010` | **Required**. 요청일시                                   |

#### 출금이체 API

```http
  POST https://openapi.openbanking.or.kr/v2.0/transfer/withdraw/fin_num
```

```http
Content-Type: application/json; charset=UTF-8
```

| Header          | Type                    | Description                                                                 |
| :-------------- | :---------------------- | :-------------------------------------------------------------------------- |
| `Authorization` | `Bearer <access_token>` | **Required**. 오픈뱅킹으로부터 전송받은 Access Token 을 HTTP Header 에 추가 |

| Parameter                    | Type                         | Description                                                   |
| :--------------------------- | :--------------------------- | :------------------------------------------------------------ |
| `bank_tran_id`               | `거래고유번호`               | **Required**. 거래고유번호                                    |
| `cntr_account_type`          | `N`                          | **Required**. 약정 계좌/계정 구분 - “N”:계좌, “C”:계정        |
| `cntr_account_num`           | `100000000001`               | **Required**. 약정 계좌/계정 번호                             |
| `dps_print_content`          | `쇼핑몰환불`                 | **Required**. 입금계좌인자내역                                |
| `fintech_use_num`            | `fintech_use_num`            | **Required**. 출금계좌핀테크이용번호                          |
| `wd_print_content`           | `오픈뱅킹출금`               | **Required**. 오픈뱅킹에서 발급한 이용기관 앱의 Client Secret |
| `tran_amt`                   | `1000`                       | **Required**. 거래금액                                        |
| `tran_dtime`                 | `고정값: authorization_code` | **Required**. 요청일시                                        |
| `req_client_name`            | `홍길동`                     | **Required**. 요청고객성명                                    |
| `req_client_fintech_use_num` | `req_client_fintech_use_num` | 요청고객핀테크이용번호                                        |
| `req_client_num`             | `HONGGILDONG1234`            | **Required**. 요청고객회원번호                                |
| `transfer_purpose`           | `ST`                         | **Required**. 이체용도                                        |
| `recv_client_name`           | `유관우`                     | 최종수취고객성명                                              |
| `recv_client_bank_code`      | `097`                        | 최종수취고객계좌 개설기관.표준코드                            |
| `recv_client_account_num`    | `100000000001`               | 최종수취고객계좌번호                                          |

#### 입금이체 API

```http
  POST https://testapi.openbanking.or.kr/v2.0/transfer/deposit/fin_num
```

```http
Content-Type: application/json; charset=UTF-8
```

| Header          | Type                    | Description                                                                 |
| :-------------- | :---------------------- | :-------------------------------------------------------------------------- |
| `Authorization` | `Bearer <access_token>` | **Required**. 오픈뱅킹으로부터 전송받은 Access Token 을 HTTP Header 에 추가 |

- 단, scope: oob으로 토큰을 재발급

| Parameter                      | Type                         | Description                                                                             |
| :----------------------------- | :--------------------------- | :-------------------------------------------------------------------------------------- |
| `cntr_account_type`            | `N`                          | **Required**. 약정 계좌/계정 구분 - “N”:계좌, “C”:계정                                  |
| `cntr_account_num`             | `200000000001`               | **Required**. 약정 계좌/계정 번호                                                       |
| `wd_pass_phrase`               | `NONE`                       | **Required**. 입금이체용 암호문구                                                       |
| `wd_print_content`             | `환불금액`                   | **Required**. 출금계좌인자내역                                                          |
| `name_check_option`            | `off`                        | **Required**. 수취인성명 검증 여부 - “on”:검증함, “off”:미검증 (미지정 시 기본값: "on") |
| `tran_dtime`                   | `20230812130000`             | **Required**. 요청일시                                                                  |
| `req_cnt`                      | `1`                          | **Required**. 입금요청건수 - 입금요청건수는 1 건만 신청이 가능함.                       |
| `req_list`                     | ``                           | **Required**. 입금요청목록                                                              |
| `--tran_no`                    | `1`                          | **Required**. 거래순번                                                                  |
| `--bank_tran_id`               | `bank_tran_id`               | **Required**. 거래고유번호                                                              |
| `--fintech_use_num`            | `fintech_use_num`            | **Required**. 핀테크이용번호                                                            |
| `--print_content`              | `오픈서비스캐시백`           | **Required**. 입금계좌인자내역                                                          |
| `--tran_amt`                   | `1000`                       | **Required**. 거래금액                                                                  |
| `--req_client_name`            | `홍길동`                     | **Required**. 요청고객성명                                                              |
| `--req_client_fintech_use_num` | `req_client_fintech_use_num` | 요청고객핀테크이용번호주                                                                |
| `--req_client_num`             | `HONGGILDONG1234`            | **Required**. 요청고객회원번호                                                          |
| `--transfer_purpose`           | `ST`                         | **Required**. 이체용도                                                                  |

#### 2legged (scope: oob으로 토큰을 재발급)

```http
  POST https://testapi.openbanking.or.kr/oauth/2.0/token
```

```http
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
```

| Parameter       | Type                        | Description                                            |
| :-------------- | :-------------------------- | :----------------------------------------------------- |
| `client_id`     | `client_id`                 | **Required**. 거래고유번호                             |
| `client_secret` | `client_secret`             | **Required**. 약정 계좌/계정 구분 - “N”:계좌, “C”:계정 |
| `scope`         | `고정값 oob`                | **Required**. Access token 권한 범위                   |
| `grant_type`    | `고정값 client_credentials` | **Required**. 2-legged 인증을 위한 권한부여 방식 지정  |
