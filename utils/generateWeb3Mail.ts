export const renderWeb3mail = (
  stepsGoal: string,
): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 80%;
      margin: auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      margin-top: 50px;
    }
    .header, .footer {
      text-align: center;
      background-color: #282c36;
      color: #ffffff;
      padding: 10px 0;
    }
    .content {
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Well Well Well... Here's your next goals!</h1>
    </div>
    <div class="content">
      <p>Hello!,</p>

      <p>Your steps goal for today is: <strong>${stepsGoal}</strong> steps. Let's achieve this goal together!</p>

    </div>
    <div class="footer">
      <p>&copy; 2023 Your Fitness Platform</p>
    </div>
  </div>
</body>
</html>
`;
};
