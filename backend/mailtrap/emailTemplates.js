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


export const Password_Reset_Request_Template = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      background: #f3faf5;
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
      border: 1px solid #dcefe3;
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
    .button {
      display: inline-block;
      margin: 30px auto;
      padding: 14px 24px;
      background: #2ecc71;
      color: white !important;
      text-decoration: none;
      font-size: 16px;
      border-radius: 8px;
      font-weight: bold;
    }
    .button:hover {
      background: #28b463;
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
    <h1>Password Reset Request</h1>
    <p>If you requested a password reset, click the button below:</p>

    <div style="text-align:center;">
      <a href="{resetURL}" class="button">Reset Password</a>
    </div>

    <p>If you did not request this, you can safely ignore this email.</p>

    <div class="footer">This link will expire shortly.</div>
  </div>
</body>
</html>
`;


export const Password_Reset_Sucessfull_Template = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      background: #f3faf5;
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
      border: 1px solid #dcefe3;
    }
    h1 {
      font-size: 22px;
      color: #2ecc71;
      margin-bottom: 18px;
      text-align: center;
    }
    p {
      color: #555;
      font-size: 15px;
      line-height: 1.6;
      text-align: center;
      margin-bottom: 18px;
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
    <h1>Password Reset Successful</h1>

    <p>Your password has been successfully reset.</p>
    <p>If this wasn’t you, please secure your account immediately.</p>

    <div class="footer">
      If you need assistance, contact support.
    </div>
  </div>
</body>
</html>
`;

