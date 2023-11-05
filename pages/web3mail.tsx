import { useDataProvider } from "@/context";
import {
  GrantedAccess,
  IExecDataProtector,
  ProtectedData,
} from "@iexec/dataprotector";
import { IExecWeb3mail } from "@iexec/web3mail";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAccount } from "wagmi";
import { log } from "../utils/log";

const Web3MailContext = createContext<{
  platformHasAccess: boolean;
  emailIsProtected: boolean;
  protectEmailAndGrantAccess: (email: string) => Promise<void>;
}>({
  platformHasAccess: false,
  emailIsProtected: false,
  protectEmailAndGrantAccess: async () => {
    return;
  },
});

const Web3MailProvider = ({ children }: { children: ReactNode }) => {
  const { address, connector, isConnected, status } = useAccount();
  const account = {
    address,
    connector,
    isConnected,
    status,
  };
  const { getGrantAccess, getLastReading } = useDataProvider();
  const [platformHasAccess, setPlatformHasAccess] = useState(false);
  const [emailIsProtected, setEmailIsProtected] = useState(false);
  const [dataProtector, setDataProtector] = useState<IExecDataProtector>();
  const [web3mail, setWeb3mail] = useState<IExecWeb3mail>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [protectedEmail, setProtectedEmail] = useState<
    ProtectedData | undefined
  >();
  const [emailGrantedAccess, setEmailGrantedAccess] = useState<
    GrantedAccess | undefined
  >();
  const grantAccess = getGrantAccess();
  const lastReading = getLastReading();

  log("Web3MailProvider ---- call", {
    dataProtector,
    account,
    protectedEmail,
    emailGrantedAccess,
    emailIsProtected,
    platformHasAccess,
  });

  const protectEmailAndGrantAccess = useCallback(
    async (email: string) => {
      log("Web3MailProvider ---- protectEmailAndGrantAccess", {
        account,
        protectedEmail,
        email,
      });

      if (!dataProtector) {
        console.error(
          "Web3MailProvider ---- protectEmailAndGrantAccess --- dataProtector undefined"
        );
        return;
      }

      let newProtectedEmail;

      if (!emailIsProtected) {
        newProtectedEmail = await dataProtector.protectData({
          data: {
            email: "brunofbouwman@gmail.com",
          },
        });

        log("Web3MailProvider ---- protectEmailAndGrantAccess", {
          newProtectedEmail,
        });
      } else {
        log(
          "Web3MailProvider ---- protectEmailAndGrantAccess --- email is already protected just need to grant access",
          {
            newProtectedEmail,
          }
        );
      }

      const grantedAccess = await dataProtector.grantAccess({
        protectedData: (emailIsProtected
          ? protectedEmail?.address
          : newProtectedEmail?.address) as string,
        authorizedApp: process.env.NEXT_PUBLIC_WEB3MAIL_APP_ADDRESS as string,
        authorizedUser: process.env.APP_WALLET_ADDRESS as string,
      });

      log("Web3MailProvider ---- protectEmailAndGrantAccess", {
        grantedAccess,
      });

      setProtectedEmail(newProtectedEmail);
      setEmailIsProtected(true);
      setEmailGrantedAccess(grantedAccess);
      setPlatformHasAccess(true);
    },
    [dataProtector, protectedEmail, account, emailIsProtected]
  );

  /*
   * @what: Init The dataProtector and web3mail modules
   * @when: Execute it only once after user is connected, and only if user switch wallet
   */
  useEffect(() => {
    if (
      !(account?.status === "connected") ||
      dataProtector ||
      web3mail ||
      !lastReading
    ) {
      return;
    }

    (async () => {
      log("Web3MailProvider ---- Init The dataProtector", {
        dataProtector,
        account,
      });
      const provider2 = await account.connector?.getProvider();
      setDataProtector(new IExecDataProtector(provider2));
      setWeb3mail(new IExecWeb3mail(provider2));
    })();
  }, [account, lastReading, dataProtector, web3mail]);

  /*
   * @what: Check if platform has access to the user email
   * @when: Execute it only once after the user is connected, and only if the user switches wallet
   */
  useEffect(() => {
    if (
      !dataProtector ||
      !web3mail ||
      !account?.isConnected ||
      isFetching ||
      !emailIsProtected ||
      !platformHasAccess
    )
      return;

    log("Web3MailProvider ---- check if platform has access ?", {
      dataProtector,
      web3mail,
    });

    setIsFetching(true);

    const fetchData = async () => {
      log("Web3MailProvider ----  before fetching");
      const protectedData = await dataProtector.fetchProtectedData({
        owner: account.address,
        requiredSchema: {
          email: "string",
        },
      });

      const protectedEmail = protectedData.find(
        (item) => item.name === "Untitled"
      );

      if (!protectedEmail) {
        console.warn("Web3MailProvider ----  - User has no protected email");
        return;
      }

      setProtectedEmail(protectedEmail);
      setEmailIsProtected(true);

      log("Web3MailProvider ----  - before fetchGrantedAccess", protectedEmail);
      // Stuck here: WorkflowError: Failed to fetch granted access to this data: Failed to create contracts client: Missing iExec contract default address for chain 80001
      const { grantedAccess } = await dataProtector.fetchGrantedAccess({
        protectedData: protectedEmail.address,
        authorizedApp: process.env.NEXT_PUBLIC_WEB3MAIL_APP_ADDRESS,
        authorizedUser: process.env.APP_WALLET_ADDRESS,
      });

      if (grantedAccess.length == 0) {
        console.warn(
          "Web3MailProvider ----  - User has not granted access yet"
        );
        return;
      }

      const emailGrantedAccess = grantedAccess[0];

      if (!emailGrantedAccess) {
        console.warn("Web3MailProvider ----  - User has not given access yet");
        return;
      }

      log("Web3MailProvider ---- ", {
        address: account,
        protectedData,
        protectedEmail,
        emailGrantedAccess,
        grantedAccess,
      });

      setPlatformHasAccess(true);
      setEmailGrantedAccess(emailGrantedAccess);
    };
    fetchData().then(() => {
      setIsFetching(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const value = useMemo(() => {
    return {
      platformHasAccess,
      emailIsProtected,
      protectEmailAndGrantAccess,
    };
  }, [platformHasAccess, emailIsProtected, protectEmailAndGrantAccess]);

  return (
    <Web3MailContext.Provider value={value}>
      {children}
    </Web3MailContext.Provider>
  );
};

export { Web3MailProvider };

export default Web3MailContext;
