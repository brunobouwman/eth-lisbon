import AdmZip from "adm-zip";
import { IExec, utils } from "iexec";

async function initializeIExec() {
  const ethProvider = utils.getSignerFromPrivateKey(
    "https://bellecour.iex.ec/",
    "0xe7b9ca07cdebc1657192161e85d004aed8383bba3ee9f109a13de48e4e714fdf"
  );

  const iexec = new IExec({
    ethProvider,
  });

  return iexec;
}

async function runTaskOnIExec(inputData) {
  const iexec = await initializeIExec();

  const params = {
    iexec_args:
      "decryptTest 0xabcdefghijklmnopqrstuv a0123b1cb860fd8b774b22347c019657 4504d82366e7070e145bdb12e3d1738d",
  };

  const appOrder = await iexec.order.createApporder({
    app: "0xe8caE99370b917660abDEcD06a5D00719634710A",
    appprice: "0",
    volume: "1",
  });

  const signedAppOrder = await iexec.order.signApporder(appOrder);

  const orderbook = await iexec.orderbook.fetchWorkerpoolOrderbook({
    workerpool: "0xdb214a4A444D176e22030bE1Ed89dA1b029320f2",
  });

  const selectedOrder = orderbook.orders[0].order;

  const requestOrder = await iexec.order.createRequestorder({
    requester: "0x35bC01A7e00568960e158e59486de522E2b6CAF6",
    app: "0xe8caE99370b917660abDEcD06a5D00719634710A",
    appmaxprice: "0",
    workerpoolmaxprice: "0",
    volume: "1",
    category: "0",

    params: JSON.stringify(params),
  });

  const singedRequest = await iexec.order.signRequestorder(requestOrder);

  const deal = await iexec.order.matchOrders({
    apporder: signedAppOrder,
    workerpoolorder: selectedOrder,
    requestorder: singedRequest,
  });

  const submittedDeal = await iexec.deal.show(deal.dealid);

  console.log("DealSubmited", submittedDeal);

  return new Promise(async (resolve, reject) => {
    try {
      let result;

      do {
        try {
          result = await iexec.task.fetchResults(submittedDeal.tasks[0]);
        } catch (e) {}
        await new Promise((r) => setTimeout(r, 5000));
      } while (typeof result === "undefined");

      if (result) {
        const binary = await result.blob();

        const buffer = Buffer.from(await binary.arrayBuffer());

        const zip = new AdmZip(buffer);
        const zipEntries = zip.getEntries();

        zipEntries.forEach((zipEntry) => {
          if (zipEntry.entryName === "result.txt") {
            const content = zip.readAsText(zipEntry);
            resolve(content);
          }
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

export { runTaskOnIExec };
