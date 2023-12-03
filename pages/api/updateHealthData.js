import { runTaskOnIExec } from "../../utils/iexec";



export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extract data from request
    const { walletAddress, encryptedData, newData } = req.body;

    runTaskOnIExec();

    // TODO: Send data to iExec for encryption
    // const encryptedData = await sendToIExecForEncryption(walletAddress, originalData);

    // Respond with encrypted data
    res.status(200).json({ encryptedData });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
