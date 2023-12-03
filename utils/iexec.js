import AdmZip from "adm-zip";
import { IExec, utils } from "iexec";

async function initializeIExec() {
  // Initialize and configure your iExec client
  // This might involve setting up the wallet, network, etc.
  //   const provider = new ethers.providers.JsonRpcProvider(
  //     "https://bellecour.iex.ec/"
  //   );
  //   console.log("provider ", provider);
  //   const pk = "e86c83e24ac02f9f54e5ba640a1263a518a367f3bcd8985a3a5007eb7ae31558";
  //   const wallet = new ethers.Wallet(pk, provider);

  //   console.log("wallet", wallet);

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

  // const params = {
  //   iexec_args:
  //     "decryptTest 0xabcdefghijklmnopqrstuv a0123b1cb860fd8b774b22347c019657 4504d82366e7070e145bdb12e3d1738d",
  // };

  // const appOrder = await iexec.order.createApporder({
  //   app: "0xe8caE99370b917660abDEcD06a5D00719634710A",
  //   appprice: "0",
  //   volume: "1",
  // });

  // const signedAppOrder = await iexec.order.signApporder(appOrder);

  // const orderbook = await iexec.orderbook.fetchWorkerpoolOrderbook({
  //   workerpool: "0xdb214a4A444D176e22030bE1Ed89dA1b029320f2",
  // });

  // console.log("orderbook", orderbook.orders);
  // const selectedOrder = orderbook.orders[0].order;

  // console.log("Selected", selectedOrder);

  // const requestOrder = await iexec.order.createRequestorder({
  //   requester: "0x35bC01A7e00568960e158e59486de522E2b6CAF6",
  //   app: "0xe8caE99370b917660abDEcD06a5D00719634710A",
  //   appmaxprice: "0",
  //   workerpoolmaxprice: "0",
  //   volume: "1",
  //   category: "0",
  //   params: JSON.stringify(params),
  // });

  // const singedRequest = await iexec.order.signRequestorder(requestOrder);

  // console.log("signedRequest ", singedRequest);

  // const deal = await iexec.order.matchOrders({
  //   apporder: signedAppOrder,
  //   workerpoolorder: selectedOrder,
  //   requestorder: singedRequest,
  // });

  // console.log("Deal submitted", deal);

  // const dealStatus = await iexec.deal.show(deal.dealid);

  // console.log("status", dealStatus);

  // console.log("tasks", dealStatus.tasks[0]);
  const result = await iexec.task.fetchResults(
    "0xd5e8912d864266dc0ffabfc3562bca2b7f328b2c0de1cfbdec15a4951f6c3076"
  );
  // const result = await iexec.task.fetchResults(
  //   "0xcd94df53a1af61b7a11b77bf7ac902de2bb1a41dc0717b4f37fbb1585e13f823"
  // );
  console.log("result", result);
  const binary = await result.blob();
  console.log("binary", binary);

  const buffer = Buffer.from(await binary.arrayBuffer());

  // Load the ZIP file
  const zip = new AdmZip(buffer);
  const zipEntries = zip.getEntries();

  zipEntries.forEach((zipEntry) => {
    if (zipEntry.entryName === "result.txt") {
      const content = zip.readAsText(zipEntry);
      console.log("We meet again, ", content);
    }
  });

  // const result = await iexec.task.show(
  //   "0xe152d65e498f7f1124ea5927b6fa76c6bcbcf0e54c0adadb976db6f6096dbe7e"
  // );
  // console.log("result", result);

  // if (dealStatus.status === "COMPLETED") {
  //   const taskId = dealStatus.tasks[0]; // Assuming you're interested in the first task
  //   const taskResults = await iexec.task.show(taskId);
  //   console.log("Task Results:", taskResults);

  //   if (taskResults.status === "COMPLETED") {
  //     // Here you can download or access the results
  //     // The taskResults object should contain the information about the result location
  //   }
  // } else {
  //   console.log("Deal is not yet completed. Status:", dealStatus.status);
  // }

  // return task;
}

const checkTaskStatus = async (taskId) => {
  try {
    const taskStatus = await iexec.task.show(taskId);
    console.log("Task Status:", taskStatus);

    if (taskStatus.status === "COMPLETED") {
      console.log("Task completed. Fetching results...");
      const result = await iexec.task.fetchResults(taskId);
      console.log("Result", result);
      const binary = await result.blob();
      console.log("Binary", binary);
    } else {
      console.log("Task not yet completed. Waiting...");
      setTimeout(() => checkTaskStatus(taskId), 60000); // Check again after 60 seconds
    }
  } catch (error) {
    console.error("Error checking task status:", error);
    setTimeout(() => checkTaskStatus(taskId), 60000); // Retry after 60 seconds if an error occurs
  }
};

export { runTaskOnIExec };
