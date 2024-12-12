import Email from 'src/email/domain/email';
import { MailerServiceImpl } from './mailer-service-impl'; // Path to your implementation

describe('MailerServiceImpl', () => {
  let mailerService: MailerServiceImpl;

  beforeEach(() => {
    mailerService = new MailerServiceImpl();
  });

  it('should create a new email and push it to the emails array', async () => {
    const to = 'test@example.com';
    const subject = 'Test Subject';
    const body = 'This is a test body';

    const email = await mailerService.sendEmail(to, subject, body);

    // Test that the email was added
    expect(mailerService['emails']).toHaveLength(1); // Emails array length should be 1
    expect(mailerService['emails'][0]).toBe(email); // The pushed email should be the same as returned

    // Check if the email properties are correct
    expect(email.id).toBe(1); // First email should have id 1
    expect(email.email).toBe(to);
    expect(email.assunto).toBe(subject);
    expect(email.mensagem).toBe(body);
  });

  it('should increment the email id for subsequent emails', async () => {
    const to1 = 'first@example.com';
    const subject1 = 'First Subject';
    const body1 = 'First body';

    const to2 = 'second@example.com';
    const subject2 = 'Second Subject';
    const body2 = 'Second body';

    // Send two emails
    await mailerService.sendEmail(to1, subject1, body1);
    const email2 = await mailerService.sendEmail(to2, subject2, body2);

    // Check that the second email has id 2
    expect(email2.id).toBe(2);
  });

  it('should resolve with the email object', async () => {
    const to = 'test@example.com';
    const subject = 'Test Subject';
    const body = 'This is a test body';

    const email = await mailerService.sendEmail(to, subject, body);

    // Check that the promise resolves to the correct email object
    expect(email).toBeInstanceOf(Email);
    expect(email.email).toBe(to);
    expect(email.assunto).toBe(subject);
    expect(email.mensagem).toBe(body);
  });
});
