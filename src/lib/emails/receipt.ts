/**
 * 결제 영수증 이메일 HTML 템플릿.
 *
 * 인라인 CSS만 사용 — Gmail / Naver / 카카오 메일 등 호환성 우선.
 */

export type ReceiptEmailArgs = {
  recipientName: string;
  recipientEmail: string;
  toLabel: string;
  amount: number;
  orderId: string;
  paidAt: Date;
};

export function receiptEmailHtml(args: ReceiptEmailArgs): string {
  const { recipientName, toLabel, amount, orderId, paidAt } = args;
  const formattedAmount = `₩${amount.toLocaleString("ko-KR")}`;
  const formattedDate = paidAt.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>한권 결제 완료</title>
</head>
<body style="margin:0; padding:0; background:#F8F4ED; font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Apple SD Gothic Neo', sans-serif; color:#2C2826;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F8F4ED; padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; background:#FFFFFF; border-radius:24px; padding:48px 40px;">
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <p style="margin:0; font-size:13px; letter-spacing:6px; color:#A67C5A; font-weight:700;">한 권</p>
            </td>
          </tr>
          <tr>
            <td>
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; line-height:1.3; color:#2C2826;">결제가 완료됐어요</h1>
              <p style="margin:0 0 32px; font-size:16px; line-height:1.7; color:#5C544F;">
                ${recipientName}님, 한권 결제 고맙습니다.<br />
                <strong style="color:#A67C5A;">${toLabel}의 한 권</strong>은 24시간 안에 완성해서 이메일로 보내드릴게요.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FBF8F2; border:1px solid #E8DBC9; border-radius:16px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size:14px; color:#8B847E; padding:6px 0;">상품</td>
                        <td align="right" style="font-size:14px; color:#2C2826; padding:6px 0;">디지털 책 (PDF)</td>
                      </tr>
                      <tr>
                        <td style="font-size:14px; color:#8B847E; padding:6px 0;">결제일</td>
                        <td align="right" style="font-size:14px; color:#2C2826; padding:6px 0;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="font-size:14px; color:#8B847E; padding:6px 0;">주문번호</td>
                        <td align="right" style="font-size:14px; color:#2C2826; padding:6px 0; font-family: 'Menlo', monospace;">${orderId}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top:1px solid #E8DBC9; padding-top:14px; padding-bottom:6px;"></td>
                      </tr>
                      <tr>
                        <td style="font-size:16px; color:#2C2826; font-weight:600; padding:6px 0;">총 결제금액</td>
                        <td align="right" style="font-size:18px; color:#2C2826; font-weight:700; padding:6px 0;">${formattedAmount}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 0 8px;">
              <p style="margin:0 0 12px; font-size:14px; color:#A67C5A; font-weight:700;">다음 단계</p>
              <p style="margin:0 0 8px; font-size:15px; color:#2C2826; line-height:1.7;">① 한권이 50페이지 분량으로 책을 엮어요</p>
              <p style="margin:0 0 8px; font-size:15px; color:#2C2826; line-height:1.7;">② 24시간 안에 PDF가 이 메일 주소로 도착해요</p>
              <p style="margin:0; font-size:15px; color:#2C2826; line-height:1.7;">③ 가족과 단톡방에서 함께 보세요</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:40px; border-top:1px solid #EFE4D2; margin-top:32px;">
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
