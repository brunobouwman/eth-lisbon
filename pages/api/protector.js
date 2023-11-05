/* eslint-disable import/no-anonymous-default-export */
import { IExecDataProtector, getWeb3Provider } from "@iexec/dataprotector";

// get web3 provider from a private key
const web3Provider = getWeb3Provider(process.env.APP_WALLET_PRIVATE_KEY);

// instantiate
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

    // Get the refreshToken from the query string
    const email = req.body.email;
    if (!email) {
        return res.status(500).json({ error: "No email provided" });
    }

    try {
        const protectedData = await dataProtector.protectData({
            data: {
                email: email,
            }
        })

        console.log('protectedData >>>>>>', JSON.stringify(protectedData, null, 2))

        const grantedAccess = await dataProtector.grantAccess({
            protectedData: protectedData.address,
            authorizedApp: process.env.NEXT_PUBLIC_WEB3MAIL_APP_ADDRESS,
            authorizedUser: process.env.APP_WALLET_ADDRESS
        })

        console.log('grantedAccess >>>>>>', JSON.stringify(grantedAccess, null, 2))

        
        return res.json({ data: protectedData });

    } catch (e) {
        return res.status(500).json({ error: JSON.stringify(e) });
    }
};