import { describe, it, expect } from 'vitest';
import { buildMailtoLink } from './mailto.js';

describe('buildMailtoLink', () => {
  describe('basic functionality', () => {
    it('should build a basic mailto link with single recipient', () => {
      const result = buildMailtoLink({
        to: 'test@example.com',
        subject: 'Test Subject',
        body: 'Test body content'
      });

      expect(result).toBe('mailto:test@example.com?subject=Test%20Subject&body=Test%20body%20content');
    });

    it('should handle multiple recipients as array', () => {
      const result = buildMailtoLink({
        to: ['test1@example.com', 'test2@example.com'],
        subject: 'Test Subject',
        body: 'Test body'
      });

      expect(result).toBe('mailto:test1@example.com,test2@example.com?subject=Test%20Subject&body=Test%20body');
    });

    it('should work with minimal parameters (only to)', () => {
      const result = buildMailtoLink({
        to: 'test@example.com'
      });

      expect(result).toBe('mailto:test@example.com');
    });
  });

  describe('optional parameters', () => {
    it('should handle CC parameter', () => {
      const result = buildMailtoLink({
        to: 'test@example.com',
        subject: 'Test',
        body: 'Content',
        cc: 'cc@example.com'
      });

      expect(result).toBe('mailto:test@example.com?subject=Test&body=Content&cc=cc%40example.com');
    });

    it('should handle BCC parameter', () => {
      const result = buildMailtoLink({
        to: 'test@example.com',
        subject: 'Test',
        body: 'Content',
        bcc: 'bcc@example.com'
      });

      expect(result).toBe('mailto:test@example.com?subject=Test&body=Content&bcc=bcc%40example.com');
    });

    it('should handle both CC and BCC as arrays', () => {
      const result = buildMailtoLink({
        to: 'test@example.com',
        subject: 'Test',
        body: 'Content',
        cc: ['cc1@example.com', 'cc2@example.com'],
        bcc: ['bcc1@example.com', 'bcc2@example.com']
      });

      expect(result).toBe(
        'mailto:test@example.com?subject=Test&body=Content&cc=cc1%40example.com%2Ccc2%40example.com&bcc=bcc1%40example.com%2Cbcc2%40example.com'
      );
    });
  });

  describe('encoding', () => {
    it('should properly encode special characters in subject', () => {
      const result = buildMailtoLink({
        to: 'test@example.com',
        subject: 'Test & Special Characters!',
        body: 'Content'
      });

      expect(result).toBe('mailto:test@example.com?subject=Test%20%26%20Special%20Characters!&body=Content');
    });

    it('should properly encode newlines and special characters in body', () => {
      const result = buildMailtoLink({
        to: 'test@example.com',
        subject: 'Test',
        body: 'Line 1\nLine 2\n\nWith special chars: & < > "'
      });

      expect(result).toBe(
        'mailto:test@example.com?subject=Test&body=Line%201%0ALine%202%0A%0AWith%20special%20chars%3A%20%26%20%3C%20%3E%20%22'
      );
    });

    it('should handle Unicode characters', () => {
      const result = buildMailtoLink({
        to: 'test@example.com',
        subject: 'Test with émojis 🚀',
        body: 'Héllo Wørld'
      });

      expect(result).toBe('mailto:test@example.com?subject=Test%20with%20%C3%A9mojis%20%F0%9F%9A%80&body=H%C3%A9llo%20W%C3%B8rld');
    });
  });

  describe('edge cases', () => {
    it('should handle empty strings gracefully', () => {
      const result = buildMailtoLink({
        to: 'test@example.com',
        subject: '',
        body: ''
      });

      expect(result).toBe('mailto:test@example.com');
    });

    it('should handle null/undefined optional parameters', () => {
      const result = buildMailtoLink({
        to: 'test@example.com',
        subject: 'Test',
        body: 'Content',
        cc: null,
        bcc: undefined
      });

      expect(result).toBe('mailto:test@example.com?subject=Test&body=Content');
    });

    it('should handle very long content', () => {
      const longBody = 'A'.repeat(1000);
      const result = buildMailtoLink({
        to: 'test@example.com',
        subject: 'Long content test',
        body: longBody
      });

      expect(result).toContain('mailto:test@example.com');
      expect(result).toContain('subject=Long%20content%20test');
      expect(result).toContain('body=' + 'A'.repeat(1000));
    });
  });

  describe('real-world scenarios', () => {
    it('should handle a typical advocacy email', () => {
      const result = buildMailtoLink({
        to: ['mayor@city.gov', 'councilmember@city.gov'],
        subject: 'Support for Climate Action Initiative',
        body: 'Dear Mayor and Council Members,\n\nI am writing to express my strong support for the proposed Climate Action Initiative.\n\nThank you for your consideration.\n\nSincerely,\nJohn Doe',
        cc: 'advocacy.group@example.org'
      });

      expect(result).toContain('mailto:mayor@city.gov,councilmember@city.gov');
      expect(result).toContain('subject=Support%20for%20Climate%20Action%20Initiative');
      expect(result).toContain('cc=advocacy.group%40example.org');
      expect(result).toContain('Dear%20Mayor%20and%20Council%20Members');
    });

    it('should handle template variables in content', () => {
      const result = buildMailtoLink({
        to: 'official@government.gov',
        subject: 'Public Comment on {{initiative_name}}',
        body: 'Hello {{recipient_name}},\n\nMy name is {{user_name}} and I live at {{user_address}}.'
      });

      expect(result).toContain('subject=Public%20Comment%20on%20%7B%7Binitiative_name%7D%7D');
      expect(result).toContain('body=Hello%20%7B%7Brecipient_name%7D%7D');
    });
  });
});
