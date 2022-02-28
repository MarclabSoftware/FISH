import {HttpFunction} from '@google-cloud/functions-framework';
import {format as utilFormat} from 'util';

export const login: HttpFunction = (req, res) => {
  if (req.method === 'GET') {
    res.send(`
     <html>
       <meta name="viewport" content="width=device-width, initial-scale=1">
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
  } else if (req.method === 'POST') {
    // Here, you should validate the user account.
    // In this sample, we do not do that.
    const responseurl = decodeURIComponent(req.body.responseurl);
    return res.redirect(responseurl);
  } else {
    // Unsupported method
    res.status(405);
    res.send('Method Not Allowed');
  }
};

export const fakeauth: HttpFunction = (req, res) => {
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
};

export const faketoken: HttpFunction = (req, res) => {
  const grantType = req.query.grant_type
    ? req.query.grant_type
    : req.body.grant_type;
  const secondsInDay = 86400; // 60 * 60 * 24
  const HTTP_STATUS_OK = 200;

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
  res.status(HTTP_STATUS_OK).json(obj);
};
