const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
require("./server/configure/passport_configure");
const session = require("express-session");
const userDetailRou = require("./server/routes/userDetails");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const privacyPolicy = `
Privacy Policy for MindMemo

Last Updated: 11/10/2023

1. Introduction:
   Welcome to MindMemo. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Google Chrome extension.

2. Information We Collect:
   - We may collect and store the following information:
     - User email, profile information obtained through Google OAuth2

3. How We Use Your Information:
   - We use the collected information for purposes such as:
     - Power your profile in the extension, user authentication and to map your account to your Google account

4. Google OAuth2:
   - Our extension uses Google OAuth2 for user authentication. By using our extension, you agree to Google's terms of service and privacy policy, which can be found at https://www.google.com/accounts/authsub/terms.html.

5. Third-Party Services:
   - We may use third-party services for analytics or other purposes. These services may collect information sent by your browser as part of a web page request.

6. Cookies:
   - We only store cookies that are necessary for the extension to function such as Google OAuth2 cookies for authentication and authorization.

7. Security:
   - We implement reasonable security measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure.

8. User Choices:
   - You may choose to restrict the collection or use of your personal information. However, this may impact your ability to use certain features of the extension.

9. Accessing, Updating, or Deleting Your Information:
   - You can access, update, or request deletion of your information by contacting us at askmindmemo@gmail.com.
   - We are working on a profile page for you to manage your information.

10. Changes to This Privacy Policy:
    - We may update our Privacy Policy from time to time. Any changes will be posted on this page.

11. Contact Us:
    - If you have any questions or concerns about our Privacy Policy, please contact us at askmindmemo@gmail.com

By using MindMemo, you agree to the terms outlined in this Privacy Policy.

Contact email: askmindmemo@gmail.com
`;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Allow non-secure cookies for testing
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use("/userDetails", userDetailRou);
app.use("/authRoutes", require("./server/routes/authRoutes"));
app.get("/", (req, res) => {
  res.send(
    `<a href = "/authRoutes/auth/google"> Authenticate with Google </a>`
  );
});

app.get("/privacy", (req, res) => {
  res.send(privacyPolicy);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
