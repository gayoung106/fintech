const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
var jwt = require("jsonwebtoken");
const crypto = require("crypto");
const auth = require("./lib/auth");
const axios = require("axios");
const app = express();

dotenv.config();

//mysql 라이브러리 사용 - 데이터베이스 연결
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_ACCOUNT,
  password: process.env.DB_PASSWORD,
  database: "fintech",
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", auth, function (req, res) {
  console.log(req.decoded);
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("hello");
});
// login : endpoint /login
// 구조: post 방식(endpoint, 콜백함수(req, res) => {})
app.post("/login", (req, res) => {
  //req의 body에서 userAccount, password를 추출
  //cf) req,body는 클라이언트가 post요청을 보낼 때 요청 바디에 담긴 데이터를 추출하는 부분
  //body는 프론트 부분에 body요청 임
  const { userAccount, password } = req.body;
  const sql =
    "SELECT user_id, user_account, user_password FROM fintech.user WHERE user_account = ?";
  connection.query(sql, [userAccount], (err, result) => {
    if (err) throw err;
    console.log(result);
    //클라이언트가 입력한 비밀번호 (password)를 sha256Enc 함수를 사용하여 해싱
    //해싱된 비밀번호를 encPassword 변수에 저장
    let encPassword = sha256Enc(password, "fintech");
    //데이터베이스에서 가져온 사용자 정보의 해싱된 비밀번호와 encPassword를 비교하여, 두 값이 일치하면 로그인 성공
    if (encPassword === result[0].user_password) {
      let tokenKey = "f@i#n%tne#ckfhlafkd0102test!@#%";
      //로그인이 성공하면, 사용자의 정보를 기반으로 JWT를 발급
      //jwt.sign 함수를 사용하여 토큰을 생성하고, 이 토큰은 클라이언트에게 JSON 형태로 반환
      jwt.sign(
        {
          userId: result[0].user_id,
          userEmail: result[0].user_account,
        },
        //토큰은 tokenKey를 사용하여 서명되며, 이 서명은 토큰의 유효성을 검증하는 데 사용
        tokenKey,
        {
          expiresIn: "10d",
          issuer: "fintech.admin",
          subject: "user.login.info",
        },
        //토큰이 생성되면 콜백 함수에서 오류 여부를 확인하고
        //오류가 없으면 로그인 성공 로그를 출력하고 토큰을 클라이언트에 JSON 형식으로 응답으로 전송
        function (err, token) {
          if (err) {
            console.error(err);
          }
          console.log("로그인 성공", token);
          res.json(token);
        }
      );
      //만약 encPassword와 데이터베이스에서 가져온 사용자의 해시된 비밀번호가 일치하지 않으면, "비밀번호 다릅니다."라는 메시지를 클라이언트에게 응답으로 전송하여 로그인 실패
    } else {
      res.json("비밀번호 다릅니다.");
    }
  });
});

//비밀번호 해싱: 입력된 평문 비밀번호를 해싱
const sha256Enc = (plainText, key) => {
  const secret = key;
  const hash = crypto
    //createHmac함수: 해시생성을 시작 첫번째 인자는 사용할 해시알고리즘, 두 번째 인자는 해시 생성에 사용할 키
    .createHmac("sha256", secret)
    // update함수: 입력받은 plainText를 업데이트
    .update(plainText)
    // digest함수: Base64 형식으로 해시를 생성
    .digest("base64");
  return hash;
};

app.get("/authResult", (req, res) => {
  const authCode = req.query.code;
  let requestOption = {
    url: "https://testapi.openbanking.or.kr/oauth/2.0/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data: {
      code: authCode,
      client_id: process.env.FINTECH_CLIENT_ID,
      client_secret: process.env.FINTECH_CLIENT_SECRET,
      redirect_uri: "http://localhost:4000/authResult",
      grant_type: "authorization_code",
    },
  };
  axios(requestOption).then(({ data }) => {
    if (data.rsp_code !== "O0001") {
      console.log(data);
    } else {
      console.log(data);
    }
  });
});

app.get("/account", auth, (req, res) => {
  let { userId } = req.decoded;
  console.log(req.decoded);
  const sql = "SELECT * FROM user WHERE user_id = ?";
  connection.query(sql, [userId], function (err, result) {
    console.log(result);
    const accesstoken = result[0].access_token;
    const userSeqNo = result[0].user_seq_no;
    console.log(accesstoken);
    const sendData = {
      user_seq_no: userSeqNo,
    };
    const option = {
      method: "GET",
      url: "https://testapi.openbanking.or.kr/v2.0/user/me",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: `Bearer ${accesstoken}`,
      },
      params: sendData,
    };
    axios(option).then(({ data }) => {
      res.json(data);
    });
  });
});

app.get("/balance", auth, (req, res) => {
  //계좌 잔액 가져오기 로직 작성
  let { userId } = req.decoded;
  let fintechUseNo = "120230044088951024139191";
  console.log(fintechUseNo);
  const sql = "SELECT * FROM user WHERE user_id = ?";
  connection.query(sql, [userId], function (err, result) {
    const accesstoken = result[0].access_token;
    let requestOption = {
      url: "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: `Bearer ${accesstoken}`,
      },
      params: {
        bank_tran_id: genTrasId(),
        fintech_use_num: fintechUseNo,
        tran_dtime: "20230914103600",
      },
    };

    console.log(requestOption);

    axios(requestOption).then((response) => {
      console.log(response.data);
      res.json(response.data);
    });
  });
});

function generateRandom9DigitNumber() {
  const min = 100000000; // Minimum value (smallest 9-digit number)
  const max = 999999999; // Maximum value (largest 9-digit number)

  const random9DigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return random9DigitNumber.toString();
}

const genTrasId = () => {
  return "M202300440U" + generateRandom9DigitNumber();
};

app.listen(process.env.PORT);
