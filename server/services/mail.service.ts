import Mailjet from 'node-mailjet';

const TemplateIds = {
  Welcome: 1234,
};
export type SendEmailOptions = {
  to: string;
  subject: string;
  variables?: Record<string, string>;
} & ({ content: HTML } | { templateId: keyof typeof TemplateIds });

type HTML = string & {};

export function createMailService(mailClient: Mailjet) {
  return {
    async sendEmail(options: SendEmailOptions) {
      return mailClient.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'noreply@unicornify.com',
              Name: 'Me',
            },
            To: [
              {
                Email: options.to,
              },
            ],
            TemplateID: 'templateId' in options ? TemplateIds[options.templateId] : undefined,
            TemplateLanguage: true,
            Subject: options.subject,
            HTMLPart: 'content' in options ? options.content : undefined,
          },
        ],
      });
    },
  };
}
