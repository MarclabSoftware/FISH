import {Router} from 'express';
import {format as utilFormat} from 'util';
import {createGCF} from '../func/utils.js';

const router = Router();

router.get('/login', (req, res) => {
  return res.send(`
    <html>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <head>
      <script src="https://www.gstatic.com/firebasejs/8.0/firebase.js"></script>
      <script>
        var config = {
          apiKey: "AIzaSyAT7D3t69YC8E7g_yZ5l-pImy1kWLBaJlY",
          authDomain: "marcuson-smart-home.firebaseapp.com",
        };
        firebase.initializeApp(config);
      </script>
      </head>
      <body>
        <form action="/oauth/login" method="post">
          <input type="hidden"
            name="responseurl" value="${req.query.responseurl}" />
          <button type="submit" style="font-size:14pt">
            Link this service to Google
          </button>
        </form>
      </body>
    </html>
  `);
});

router.post('/login', (req, res) => {
  // Here, you should validate the user account.
  // In this sample, we do not do that.
  const responseurl = decodeURIComponent(req.body.responseurl);
  return res.redirect(responseurl);
});

router.get('/fakeauth', (req, res) => {
  const redirectUri = req.query.redirect_uri as string;
  const responseurl = utilFormat(
    '%s?code=%s&state=%s',
    decodeURIComponent(redirectUri),
    'xxxxxx',
    req.query.state
  );

  return res.redirect(
    `/oauth/login?responseurl=${encodeURIComponent(responseurl)}`
  );
});

router.get('/faketoken', (req, res) => {
  const grantType = req.query.grant_type
    ? req.query.grant_type
    : req.body.grant_type;
  const secondsInDay = 86400; // 60 * 60 * 24

  let obj;
  if (grantType === 'authorization_code') {
    obj = {
      token_type: 'bearer',
      access_token: '123access',
      refresh_token: '123refresh',
      expires_in: secondsInDay,
    };
  } else if (grantType === 'refresh_token') {
    obj = {
      token_type: 'bearer',
      access_token: '123access',
      expires_in: secondsInDay,
    };
  }
  return res.json(obj);
});

export default createGCF('oauth', router);
