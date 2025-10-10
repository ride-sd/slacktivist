/**
 * Builds a mailto link with the given parameters
 * @param {Object} options - The options for the mailto link
 * @param {string|string[]} options.to - The recipient email(s)
 * @param {string} options.subject - The email subject
 * @param {string} options.body - The email body
 * @param {string|string[]} [options.cc=null] - Carbon copy recipient(s)
 * @param {string|string[]} [options.bcc=null] - Blind carbon copy recipient(s)
 * @returns {string} The mailto link
 */
export function buildMailtoLink({ to, subject = null, body = null, cc = null, bcc = null }) {
  // Handle array of emails
  const toEmails = Array.isArray(to) ? to.join(',') : to;

  let mailto = `mailto:${toEmails}`;
  const params = [];

  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  if (cc) params.push(`cc=${encodeURIComponent(Array.isArray(cc) ? cc.join(',') : cc)}`);
  if (bcc) params.push(`bcc=${encodeURIComponent(Array.isArray(bcc) ? bcc.join(',') : bcc)}`);

  if (params.length > 0) {
    mailto += '?' + params.join('&');
  }

  return mailto;
}
