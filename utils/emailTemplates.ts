export const resetPassword = (url: string): string => {
  return `
      <html>
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      </head>
      
      <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
            background-color: #e8ebed; height: 100%; margin: 0; padding: 0; width: 100%">
          <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
               mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
               100%; background-color: #e8ebed; height: 100%; margin: 0; padding: 0; width:
               100%" width="100%">
              <tr>
                  <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
                     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
                     height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
                        -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
                        600px; border: 0" width="100%">
                          <tr>
                              <td id="templatePreheader" style="mso-line-height-rule: exactly;
                              -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #e8ebed;
                              border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0;
                                 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
                                 min-width:100%;" width="100%">
                                      <tbody class="mcnTextBlockOuter">
                                          <tr>
                                              <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
                                          -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                      class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
                                             mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
                                             100%; min-width:100%;" width="100%">
                                                      <tbody>
                                                          <tr>
                                                              <td class="mcnTextContent" style="mso-line-height-rule: exactly;
                                                      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
                                                      color: #2a2a2a; font-family: 'Poppins', sans-serif; font-size: 12px;
                                                      line-height: 150%; text-align: left; padding-top:9px; padding-right: 18px;
                                                      padding-bottom: 9px; padding-left: 18px;" valign="top">
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td id="templateHeader" style="mso-line-height-rule: exactly;
                              -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #ffffff;
                              border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
                                 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
                                 min-width:100%;" width="100%">
                                      <tbody class="mcnImageBlockOuter">
                                          <tr>
                                              <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
                                          -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px"
                                                  valign="top">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                      class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
                                             mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
                                             100%; min-width:100%;" width="100%">
                                                      <tbody>
                                                          <tr>
                                                              <td class="mcnImageContent"
                                                                  style="mso-line-height-rule: exactly;
                                                      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
                                                      padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top">
                                                                  <div class="" href="#" style="mso-line-height-rule:
                                                         exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
                                                         #275bc3; font-weight: normal; text-decoration: none">
                                                                      <div class="" href="#" style="mso-line-height-rule:
                                                            exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
                                                            #275bc3; font-weight: normal; text-decoration: none">
                                                                          <img align="center" alt="Forgot your password?"
                                                                              class="mcnImage"
                                                                              src="https://static.lingoapp.com/assets/images/email/il-password-reset@2x.png"
                                                                              style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
                                                               text-decoration: none; vertical-align: bottom; max-width:1200px; padding-bottom:
                                                               0; display: inline !important; vertical-align: bottom;"
                                                                              width="600">
                                                                      </div>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td id="templateBody" style="mso-line-height-rule: exactly;
                              -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #ffffff;
                              border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
                                 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                      <tbody class="mcnTextBlockOuter">
                                          <tr>
                                              <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
                                          -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                      class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
                                             mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
                                             100%; min-width:100%;" width="100%">
                                                      <tbody>
                                                          <tr>
                                                              <td class="mcnTextContent" style="mso-line-height-rule: exactly;
                                                      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
                                                      color: #2a2a2a; font-family: 'Poppins', sans-serif; font-size: 16px;
                                                      line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
                                                      padding-bottom: 9px; padding-left: 18px;" valign="top">
                                                                  <h1 class="null" style="color: #2a2a2a; font-family: 'Poppins', sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height:
                                                         125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
                                                         padding: 0"><span style="text-transform:uppercase">Forgot</span>
                                                                  </h1>
                                                                  <h2 class="null" style="color: #2a2a2a; font-family: 'Poppins', sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height:
                                                         125%; letter-spacing: 1px; text-align: center; display: block; margin: 0;
                                                         padding: 0"><span style="text-transform:uppercase">your
                                                                          password?</span>
                                                                  </h2>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
                                 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
                                 min-width:100%;" width="100%">
                                      <tbody class="mcnTextBlockOuter">
                                          <tr>
                                              <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
                                          -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                      class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
                                             mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
                                             100%; min-width:100%;" width="100%">
                                                      <tbody>
                                                          <tr>
                                                              <td class="mcnTextContent" style="mso-line-height-rule: exactly;
                                                      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
                                                      color: #2a2a2a; font-family: 'Poppins', sans-serif; font-size: 16px;
                                                      line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
                                                      padding-bottom: 9px; padding-left: 18px;" valign="top">Not
                                                                  to worry, we got you! Let’s get you a new password.
                                                                  <br>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0;
                                 mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
                                 min-width:100%;" width="100%">
                                      <tbody class="mcnButtonBlockOuter">
                                          <tr>
                                              <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
                                          exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
                                          padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;"
                                                  valign="top">
                                                  <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock"
                                                      style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
                                             -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;"
                                                      width="100%">
                                                      <tbody class="mcnButtonBlockOuter">
                                                          <tr>
                                                              <td align="center" class="mcnButtonBlockInner"
                                                                  style="mso-line-height-rule:
                                                      exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
                                                      padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                                                  <table border="0" cellpadding="0" cellspacing="0"
                                                                      class="mcnButtonContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
                                                         mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
                                                         border-collapse: separate !important;border-radius: 48px;background-color:
                                                         #275bc3;">
                                                                      <tbody>
                                                                          <tr>
                                                                              <td align="center" class="mcnButtonContent"
                                                                                  style="mso-line-height-rule:
                                                                  exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
                                                                  font-family: 'Poppins', sans-serif; font-size: 16px; padding-top:24px; padding-right:48px; padding-bottom:24px;
                                                                  padding-left:48px;" valign="middle">
                                                                                  <a class="mcnButton" href=${url}
                                                                                      target="_blank" style="mso-line-height-rule: exactly;
                                                                     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block; color: #275bc3;
                                                                     font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
                                                                     1px;line-height: 100%;text-align: center;text-decoration: none;color:
                                                                     #FFFFFF; text-transform:uppercase;"
                                                                                      title="Reset your password">Reset
                                                                                      password</a>
                                                                              </td>
                                                                          </tr>
                                                                      </tbody>
                                                                  </table>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
                                 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                      <tbody class="mcnImageBlockOuter">
                                          <tr>
                                              <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
                                          -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px"
                                                  valign="top">
                                                  <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                      class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
                                             mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
                                             100%; min-width:100%;" width="100%">
                                                      <tbody>
                                                          <tr>
                                                              <td class="mcnImageContent"
                                                                  style="mso-line-height-rule: exactly;
                                                      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
                                                      padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td id="templateFooter" style="mso-line-height-rule: exactly;
                              -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #e8ebed;
                              border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
                                 -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                      <tbody class="mcnTextBlockOuter">
                                          <tr>
                                              <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
                                          -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                                                  <table align="center" bgcolor="#ffffff" border="0" cellpadding="32"
                                                      cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
                                             mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
                                             100%; background:#ffffff; margin:auto; text-align:left; max-width:600px;
                                             font-family: 'Poppins', sans-serif;" text-align="left" width="100%">
                                                      <tr>
                                                          <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                                                   -webkit-text-size-adjust: 100%">
                                                              <h3
                                                                  style="color: #3e434a; font-family: 'Poppins', sans-serif;
                                                      font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
                                                      letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
                                                      0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; ">
                                                                  Who is Kushal Gohil ?
                                                              </h3>
                                                              <p style="margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
                                                      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
                                                      font-family: 'Poppins', sans-serif; font-size: 12px; line-height: 150%;
                                                      text-align: left; text-align: left; font-size: 14px; ">A Full-Stack
                                                                  developer with Innovative ideas a team player and
                                                                  passionate about coding.
                                                              </p>
                                                              <div style="padding-bottom: 18px;">
                                                                  <a href="https://www.kushalgohil.com/" target="_blank"
                                                                      style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                                                         -webkit-text-size-adjust: 100%; color: #275bc3; font-weight: normal; text-decoration: none;
                                                         font-size: 14px; color:#275bc3; text-decoration:none;" title="Learn
                                                         More">Learn
                                                                      More ❯</a>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  </table>
                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
                                             -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;"
                                                      width="100%">
                                                      <tbody>
                                                          <tr>
                                                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                                                      -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
                                                      padding-bottom: 24px; padding-left: 18px; color: #c0ccda; font-family: 'Poppins', sans-serif; font-size: 12px;"
                                                                  valign="top">
                                                                  <div style="text-align: center;">
                                                                      Penny Wise
                                                                      <a href="#" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                                                            -webkit-text-size-adjust: 100%; color: #c0ccda; font-weight: normal; text-decoration:
                                                            none">
                                                                          <svg xmlns="http://www.w3.org/2000/svg" width="10"
                                                                              height="10" viewbox="0 0 512 512">
                                                                              <path fill="currentColor"
                                                                                  d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z">
                                                                              </path>
                                                                          </svg>
                                                                      </a>
                                                                      by
                                                                      <a href="#" style="mso-line-height-rule: exactly;
                                                            -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #e8ebed;
                                                            font-weight: normal; text-decoration: none; color:#c0ccda;"
                                                                          title="Kushal Gohil">Kushal Gohil</a>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                      <tbody></tbody>
                                                  </table>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table align="center" border="0" cellpadding="12" style="border-collapse:
                                 collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust:
                                 100%; -webkit-text-size-adjust: 100%; ">
                                      <tbody>
                                          <tr>
                                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                                          -webkit-text-size-adjust: 100%">
                                                  <a href="https://www.linkedin.com/in/2002kushalgohil/" target="_blank"
                                                      style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                                             -webkit-text-size-adjust: 100%; color: #c0ccda; font-weight: normal; text-decoration:
                                             none">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                          viewbox="0 0 448 512">
                                                          <path fill="currentColor"
                                                              d="M100.3 480H7.4V180.9h92.9V480zM53.8 140.1C24.1 140.1 0 115.5 0 85.8 0 56.1 24.1 32 53.8 32c29.7 0 53.8 24.1 53.8 53.8 0 29.7-24.1 54.3-53.8 54.3zM448 480h-92.7V334.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V480h-92.8V180.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V480z">
                                                          </path>
                                                      </svg>
                                                  </a>
                                              </td>
                                              <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                                          -webkit-text-size-adjust: 100%">
                                                  <a href="https://www.youtube.com/@kushalgohil8705" target="_blank"
                                                      style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
                                             -webkit-text-size-adjust: 100%; color: #c0ccda; font-weight: normal; text-decoration: none">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                          viewbox="0 0 576 512">
                                                          <path fill="currentColor"
                                                              d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                                                          </path>
                                                      </svg>
                                                  </a>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      
      </html>`;
};
