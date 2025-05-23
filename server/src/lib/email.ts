import brevo from "@getbrevo/brevo";
const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
	brevo.TransactionalEmailsApiApiKeys.apiKey,
	process.env.BREVO_API_KEY,
);

const templateIds = Object.freeze({
	confirmation: 7,
	forgotPassword: -1, // TODO: add forgot password template id
});

interface User {
	email: string;
	fullname: string;
}

interface EmailParams {
	[key: string]: string;
}

/**
 *
 * @param {object} user
 * @param {string} user.email
 * @param {string} user.fullname
 * @param {number} templateId
 * @param {object} params
 */
export async function sendEmail(
	user: User,
	templateId: number,
	params: EmailParams,
): Promise<void> {
	const sendSmtpEmail = new brevo.SendSmtpEmail();
	sendSmtpEmail.to = [
		{
			email: user.email,
			name: user.fullname,
		},
	];
	sendSmtpEmail.templateId = templateId;
	sendSmtpEmail.params = params;

	await apiInstance.sendTransacEmail(sendSmtpEmail);
}

/**
 *
 * @param {object} user
 * @param {string} user.email
 * @param {string} user.fullname
 * @param {string} confirmationToken
 */
export async function sendConfirmationEmail(
	user: User,
	confirmationToken: string,
): Promise<void> {
	const url = new URL("/auth/verify", process.env.CLIENT_URL);
	url.searchParams.append("token", confirmationToken);

	await sendEmail(user, templateIds.confirmation, {
		TOKEN_URL: url.toString(),
		FULLNAME: user.fullname,
	});
}

/**
 *
 * @param {object} user
 * @param {string} user.email
 * @param {string} user.fullname
 * @param {string} forgotPasswordToken
 */
export async function sendForgotPasswordEmail(
	user: User,
	forgotPasswordToken: string,
): Promise<void> {
	const url = new URL("/reset-password", process.env.APP_URL);
	url.searchParams.append("token", forgotPasswordToken);
	await sendEmail(user, templateIds.forgotPassword, {
		TOKEN_URL: url.toString(),
		FULLNAME: user.fullname,
	});
}
