import SMTPConnection from 'nodemailer/lib/smtp-connection';

export const MailConfig: {
	smtp: SMTPConnection.Options;
	api: { api_url: any; api_user: any; api_key: any };
	general: { noreply_email: any };
} = {
	smtp: {
		host: process.env.SMTP_HOST,
		port: parseInt(process.env.SMTP_PORT || ''),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	},
	api: {
		api_url: process.env.MAIL_API_URL,
		api_user: process.env.MAIL_API_USER,
		api_key: process.env.MAIL_API_KEY,
	},
	general: {
		noreply_email: process.env.NOREPLY_EMAIL,
	},
};
