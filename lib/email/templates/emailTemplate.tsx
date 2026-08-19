const BRAND = {
  name: "Unique Teaching Method",
  shortName: "UTM",
  url: "https://utmeducation.com",
  primary: "#2563EB",
  text: "#111827",
  muted: "#6B7280",
  background: "#F3F6FA",
};

function baseTemplate({
  title,
  description,
  buttonText,
  buttonUrl,
  footerText,
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  footerText: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>${title} - ${BRAND.name}</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:${BRAND.background};
    font-family:Arial,Helvetica,sans-serif;
    color:${BRAND.text};
  "
>

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background:${BRAND.background};padding:40px 16px;"
  >
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:560px;
            background:#ffffff;
            border-radius:16px;
            overflow:hidden;
            box-shadow:0 8px 30px rgba(0,0,0,0.06);
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                padding:28px 32px;
                border-bottom:1px solid #EEF0F4;
              "
            >

              <table width="100%">
                <tr>

                  <td>
                    <div
                      style="
                        font-size:22px;
                        font-weight:800;
                        color:${BRAND.primary};
                        letter-spacing:-0.5px;
                      "
                    >
                      UTM
                    </div>

                    <div
                      style="
                        margin-top:3px;
                        font-size:11px;
                        color:${BRAND.muted};
                        font-weight:600;
                        letter-spacing:0.5px;
                      "
                    >
                      UNIQUE TEACHING METHOD
                    </div>
                  </td>

                </tr>
              </table>

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 32px 32px;">

              <h1
                style="
                  margin:0;
                  font-size:26px;
                  line-height:1.3;
                  letter-spacing:-0.5px;
                  color:${BRAND.text};
                "
              >
                ${title}
              </h1>

              <p
                style="
                  margin:16px 0 0;
                  font-size:15px;
                  line-height:1.7;
                  color:${BRAND.muted};
                "
              >
                ${description}
              </p>

              <!-- Button -->
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top:28px;"
              >
                <tr>
                  <td
                    align="center"
                    style="
                      border-radius:8px;
                      background:${BRAND.primary};
                    "
                  >
                    <a
                      href="${buttonUrl}"
                      target="_blank"
                      style="
                        display:inline-block;
                        padding:13px 24px;
                        color:#ffffff;
                        text-decoration:none;
                        font-size:14px;
                        font-weight:700;
                        border-radius:8px;
                      "
                    >
                      ${buttonText}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Link fallback -->
              <p
                style="
                  margin:28px 0 0;
                  font-size:12px;
                  line-height:1.6;
                  color:#9CA3AF;
                "
              >
                If the button doesn't work, copy and paste this link into
                your browser:
              </p>

              <p
                style="
                  margin:8px 0 0;
                  word-break:break-all;
                  font-size:12px;
                  line-height:1.6;
                "
              >
                <a
                  href="${buttonUrl}"
                  style="
                    color:${BRAND.primary};
                    text-decoration:none;
                  "
                >
                  ${buttonUrl}
                </a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                padding:22px 32px;
                background:#F9FAFB;
                border-top:1px solid #EEF0F4;
              "
            >

              <p
                style="
                  margin:0;
                  font-size:12px;
                  line-height:1.6;
                  color:${BRAND.muted};
                "
              >
                ${footerText}
              </p>

              <p
                style="
                  margin:12px 0 0;
                  font-size:12px;
                  color:#9CA3AF;
                "
              >
                © ${new Date().getFullYear()} ${BRAND.name}
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
}

export function verificationEmailTemplate(url: string) {
  return baseTemplate({
    title: "Verify your email address",
    description:
      "Welcome to Unique Teaching Method. Please verify your email address to activate your account and continue learning with UTM.",
    buttonText: "Verify Email Address",
    buttonUrl: url,
    footerText:
      "If you didn't create an account with UTM, you can safely ignore this email.",
  });
}

export function resetPasswordEmailTemplate(url: string) {
  return baseTemplate({
    title: "Reset your password",
    description:
      "We received a request to reset your UTM account password. Click the button below to choose a new password.",
    buttonText: "Reset Password",
    buttonUrl: url,
    footerText:
      "If you didn't request a password reset, no action is required. Your password will remain unchanged.",
  });
}