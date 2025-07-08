import brevo from "@getbrevo/brevo";
const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
	brevo.TransactionalEmailsApiApiKeys.apiKey,
	process.env.BREVO_API_KEY,
);

const templateIds = Object.freeze({
	confirmation: 7,
	resetPassword: 8,
});

interface UserBrevo {
	email: brevo.SendSmtpEmailToInner["email"];
	name: NonNullable<brevo.SendSmtpEmailToInner["name"]>;
}

interface EmailParams {
	[key: string]: string;
}

export async function sendEmail(
	user: UserBrevo,
	templateId: number,
	params: EmailParams,
): Promise<void> {
	const sendSmtpEmail = new brevo.SendSmtpEmail();
	sendSmtpEmail.to = [user];
	sendSmtpEmail.templateId = templateId;
	sendSmtpEmail.params = params;

	await apiInstance.sendTransacEmail(sendSmtpEmail);
}

export async function sendConfirmationEmail(
	user: UserBrevo,
	confirmationToken: string,
): Promise<void> {
	const url = new URL("/auth/verify", process.env.HOST);
	url.searchParams.append("token", confirmationToken);

	await sendEmail(user, templateIds.confirmation, {
		TOKEN_URL: url.toString(),
		FULLNAME: user.name,
	});
}

export async function sendResetPasswordEmail(
	user: UserBrevo,
	resetPasswordToken: string,
): Promise<void> {
	const url = new URL("/auth/reset-password", process.env.HOST);
	url.searchParams.append("token", resetPasswordToken);
	await sendEmail(user, templateIds.resetPassword, {
		TOKEN_URL: url.toString(),
	});
}
