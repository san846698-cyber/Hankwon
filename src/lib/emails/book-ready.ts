/**
 * 자서전 발송 이메일 — 책이 완성됐을 때.
 * PDF는 첨부 또는 다운로드 링크로 별도 처리, 이메일 본문은 안내문.
 */

export type BookReadyEmailArgs = {
  recipientName: string;
  toLabel: string;
  pdfUrl: string;
  shareUrl: string;
};

export function bookReadyEmailHtml(args: BookReadyEmailArgs): string {
  const { recipientName, toLabel, pdfUrl, shareUrl } = args;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${toLabel}의 한 권이 도착했어요</title>
</head>
<body style="margin:0; padding:0; background:#F8F4ED; font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Apple SD Gothic Neo', sans-serif; color:#2C2826;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F8F4ED; padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; background:#FFFFFF; border-radius:24px; padding:48px 40px;">
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0 0 24px; font-size:13px; letter-spacing:6px; color:#A67C5A; font-weight:700;">한 권</p>
              <div style="display:inline-block; width:64px; height:64px; line-height:64px; text-align:center; font-size:32px; background:#FBF8F2; border-radius:50%;">📖</div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <h1 style="margin:0; font-size:28px; font-weight:600; line-height:1.3; color:#2C2826;">${toLabel}의 한 권이<br />도착했어요</h1>
            </td>
          </tr>
          <tr>
            <td>
              <p style="margin:0 0 32px; font-size:16px; line-height:1.7; color:#5C544F; text-align:center;">
                ${recipientName}님, 정성스러운 시간이<br />
                한 권의 책으로 엮였어요.<br />
                지금 바로 받아보세요.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:8px 0 32px;">
              <a href="${pdfUrl}" style="display:inline-block; padding:0 32px; height:52px; line-height:52px; background:#A67C5A; color:#FFFFFF; font-size:16px; font-weight:600; border-radius:14px; text-decoration:none;">PDF 다운로드</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FBF8F2; border:1px solid #E8DBC9; border-radius:16px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 8px; font-size:14px; color:#A67C5A; font-weight:700;">가족과 함께 보세요</p>
                    <p style="margin:0 0 14px; font-size:14px; color:#5C544F; line-height:1.7;">
                      가족 단톡방에 공유 링크를 보내면, 다른 가족들도 미리보기를 볼 수 있어요.
                    </p>
                    <a href="${shareUrl}" style="font-size:14px; color:#A67C5A; text-decoration:underline;">공유 링크 복사 →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <p style="margin:0 0 12px; font-size:14px; color:#A67C5A; font-weight:700;">참고</p>
              <p style="margin:0 0 8px; font-size:14px; color:#5C544F; line-height:1.7;">· PDF는 평생 다시 다운로드하실 수 있어요</p>
              <p style="margin:0 0 8px; font-size:14px; color:#5C544F; line-height:1.7;">· 양장 인쇄본은 어버이날 이후 출시될 예정이에요</p>
              <p style="margin:0; font-size:14px; color:#5C544F; line-height:1.7;">· 수정이나 문의는 contact@hankwon.com으로 답장해주세요</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:40px; margin-top:32px; border-top:1px solid #EFE4D2;">
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
