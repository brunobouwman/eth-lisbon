import { IExecWeb3mail, getWeb3Provider as getMailProvider } from '@iexec/web3mail';
import { renderWeb3mail } from '../../utils/generateWeb3Mail';

export const sendMarketingEmailTo = async (
  goals: string,
  protectedEmailAddress: string,
) => {
  try {
    const mailWeb3Provider = getMailProvider(process.env.APP_WALLET_PRIVATE_KEY!);
    const web3mail = new IExecWeb3mail(mailWeb3Provider);

    const mailSent = await web3mail.sendEmail({
      protectedData: protectedEmailAddress,
      emailSubject: `Well Well Well... Here's your next goals!`,
      emailContent: renderWeb3mail(goals),
      contentType: 'text/html',
    });
    console.log('sent email', mailSent);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
};
