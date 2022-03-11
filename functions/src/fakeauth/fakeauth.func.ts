import {BaseHttpController, httpGet, httpPost} from 'inversify-express-utils';
import {format as utilFormat} from 'util';
import {gcfunc} from '../func/gcfunc.decorator';

@gcfunc('oauth')
export class FakeAuthFunc extends BaseHttpController {
  constructor() {
    super();
  }

  @httpGet('/login')
  private loginGet() {
    return this.httpContext.response.send(`
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
            name="responseurl" value="${this.httpContext.request.query.responseurl}" />
          <button type="submit" style="font-size:14pt">
            Link this service to Google
          </button>
        </form>
      </body>
    </html>
  `);
  }

  @httpPost('/login')
  private loginPost() {
    // Here, you should validate the user account.
    // In this sample, we do not do that.
    const responseurl = decodeURIComponent(
      this.httpContext.request.body.responseurl
    );
    return this.redirect(responseurl);
  }

  @httpGet('/fakeauth')
  private fakeauth() {
    const redirectUri = this.httpContext.request.query.redirect_uri as string;
    const responseurl = utilFormat(
      '%s?code=%s&state=%s',
      decodeURIComponent(redirectUri),
      'xxxxxx',
      this.httpContext.request.query.state
    );

    return this.redirect(
      `/oauth/login?responseurl=${encodeURIComponent(responseurl)}`
    );
  }

  @httpPost('/faketoken')
  private faketoken() {
    const req = this.httpContext.request;
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
    this.json(obj);
  }
}
