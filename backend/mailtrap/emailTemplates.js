export const verificationEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      background: #f5f7fa;
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
    }
    .container {
      max-width: 520px;
      margin: 40px auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 14px;
      border: 1px solid #e5e8ec;
    }
    h1 {
      font-size: 22px;
      color: #1a1a1a;
      margin-bottom: 18px;
      text-align: center;
    }
    p {
      color: #555;
      font-size: 15px;
      line-height: 1.6;
      text-align: center;
    }
    .code-box {
      margin: 28px auto;
      background: #eef4ff;
      border-radius: 10px;
      padding: 20px 0;
      text-align: center;
      max-width: 240px;
      font-size: 32px;
      letter-spacing: 10px;
      font-weight: bold;
      color: #2a66f8;
    }
    .footer {
      margin-top: 35px;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Email Verification</h1>
    <p>Use the verification code below to continue:</p>

    <div class="code-box">{{code}}</div>

    <p>This code will expire shortly.</p>

    <div class="footer">If you did not request this, you can ignore this email.</div>
  </div>
</body>
</html>
`;
