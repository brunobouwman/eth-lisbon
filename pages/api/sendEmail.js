/* eslint-disable import/no-anonymous-default-export */
import { IExecWeb3mail, getWeb3Provider } from "@iexec/web3mail";
import { IExecDataProtector } from "@iexec/dataprotector";
import { renderWeb3mail } from '../../utils/generateWeb3Mail';

// get web3 provider from a private key
const web3Provider = getWeb3Provider(process.env.APP_WALLET_PRIVATE_KEY);

// instantiate
const web3mail = new IExecWeb3mail(web3Provider);
const dataProtector = new IExecDataProtector(web3Provider);

export const config = {
    api: {
        responseLimit: "50mb",
    },
};

export default async (req, res) => {
    // Check if the request is a GET request
    if (req.method !== "POST") {
        return res.status(500).json({ error: "This needs to be a get request" });
    }

    try {
        const listProtectedData = await dataProtector.fetchProtectedData({
            owner: process.env.APP_WALLET_ADDRESS
        })

        console.log('listProtectedData >>>>>>', JSON.stringify(listProtectedData, null, 2))

        for (const data of listProtectedData) {
            const sendEmail = await web3mail.sendEmail({
                protectedData: data.address,
                emailSubject: `Well Well Well... Here's your next goals!`,
                emailContent: renderWeb3mail('10000'),
                contentType: 'text/html',
            })

            console.log('sendEmail >>>>>>', JSON.stringify(sendEmail, null, 2))
        }
    
        
        return res.status(200).json({ success: 'Emails have been sent!'});

    } catch (e) {
        return res.status(500).json({ error: JSON.stringify(e) });
    }
};