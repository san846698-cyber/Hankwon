/**
 * 양장 인쇄본 출시 알림 신청 — 자동 응답 이메일.
 */

export type WaitlistEmailArgs = {
  recipientEmail: string;
};

export function waitlistEmailHtml(_args: WaitlistEmailArgs): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>양장 인쇄본 출시 알림 신청 완료</title>
</head>
<body style="margin:0; padding:0; background:#F8F4ED; font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Apple SD Gothic Neo', sans-serif; color:#2C2826;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F8F4ED; padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; background:#FFFFFF; border-radius:24px; padding:48px 40px;">
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0; font-size:13px; letter-spacing:6px; color:#A67C5A; font-weight:700;">한 권</p>
            </td>
          </tr>
          <tr>
            <td>
              <h1 style="margin:0 0 16px; font-size:24px; font-weight:600; line-height:1.3; color:#2C2826;">알림 신청이 완료됐어요</h1>
              <p style="margin:0 0 24px; font-size:16px; line-height:1.7; color:#5C544F;">
                양장 인쇄본은 어버이날 이후 출시될 예정이에요.<br />
                출시되면 가장 먼저 이 메일 주소로 알려드릴게요.
              </p>
              <p style="margin:0 0 24px; font-size:14px; line-height:1.7; color:#8B847E;">
                그동안 디지털 PDF로 부모님 책을 받아보실 수 있어요. 가족과 단톡방에서 함께 읽기 좋아요.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:32px; border-top:1px solid #EFE4D2;">
              <p style="margin:0; font-size:12px; color:#8B847E; line-height:1.7;">
                문의: <a href="mailto:contact@hankwon.com" style="color:#A67C5A; text-decoration:underline;">contact@hankwon.com</a><br />
                © 2026 한권
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
