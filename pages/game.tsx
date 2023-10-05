"use client";

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { AnchorProvider, BN, IdlAccounts, Program } from "@coral-xyz/anchor";
import { GameCore, IDL } from "@/lib/types/game_core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { signAndSendTransactionInstructions } from "@/utils/transactions";
import Modal from "react-modal";
import "tailwindcss/tailwind.css";
import Image from "next/image";

const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false }
);
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const PROGRAM_ID = new PublicKey(
  "9LqUvkM7zkVqpYypCRsuh5KitHbZZFrcfwkRVgirnnUf"
);

const toastId = "test";

const mint = PublicKey.findProgramAddressSync(
  [Buffer.from("mint")],
  PROGRAM_ID
)[0];

export type Palace = IdlAccounts<typeof IDL>["playerPalace"];
export type Player = IdlAccounts<typeof IDL>["player"];

const LandingPage: React.FC = () => {
  const { connection } = useConnection();
  const [program, setProgram] = useState<Program<GameCore> | null>(null);
  const wallet = useAnchorWallet();
  const [balance, setBalance] = useState(0);
  const [palace, setPalace] = useState<Palace | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  const fetchUserTokenBalance = useCallback(async () => {
    if (wallet?.publicKey) {
      try {
        const ata = await getAssociatedTokenAddress(mint, wallet?.publicKey);
        const balance = Number(
          (await connection.getTokenAccountBalance(ata)).value.amount
        );

        console.log(balance);
        setBalance(balance);
      } catch (e) {
        console.error(e);
      }
    }
  }, [wallet?.publicKey]);
  const fetchUserPalace = useCallback(async () => {
    if (wallet?.publicKey) {
      try {
        const program = new Program(
          IDL,
          PROGRAM_ID,
          new AnchorProvider(connection, wallet, {})
        );

        const palaceAddress = PublicKey.findProgramAddressSync(
          [Buffer.from("palace"), wallet.publicKey.toBytes()],
          PROGRAM_ID
        )[0];

        const palace = await program.account.playerPalace.fetch(palaceAddress);
        setPalace(palace);
      } catch (e) {
        console.error(e);
      }
    }
  }, [wallet?.publicKey]);
  const fetchPlayerAccount = useCallback(async () => {
    if (wallet?.publicKey) {
      try {
        const program = new Program(
          IDL,
          PROGRAM_ID,
          new AnchorProvider(connection, wallet, {})
        );

        const playerAddress = PublicKey.findProgramAddressSync(
          [Buffer.from("player"), wallet.publicKey.toBytes()],
          PROGRAM_ID
        )[0];

        const player = await program.account.player.fetch(playerAddress);
        setPlayer(player);
      } catch (e) {
        console.error(e);
      }
    }
  }, [wallet?.publicKey]);

  useEffect(() => {
    fetchUserTokenBalance();
  }, [fetchUserTokenBalance]);

  useEffect(() => {
    fetchUserPalace();
  }, [fetchUserPalace]);

  useEffect(() => {
    fetchPlayerAccount();
  }, [fetchPlayerAccount]);

  useEffect(() => {
    if (wallet && connection) {
      const program = new Program(
        IDL,
        PROGRAM_ID,
        new AnchorProvider(connection, wallet, {})
      );

      setProgram(program);
    }
  }, [wallet]);
  // Palace Modal state variables
  const [isPalaceModalOpen, setIsPalaceModalOpen] = React.useState(false);
  const openPalaceModal = () => {
    setIsPalaceModalOpen(true);
  };
  const closePalaceModal = () => {
    setIsPalaceModalOpen(false);
  };
  // Fire Modal state variables
  const [isFireModalOpen, setIsFireModalOpen] = React.useState(false);
  const openFireModal = () => {
    setIsFireModalOpen(true);
  };
  const closeFireModal = () => {
    setIsFireModalOpen(false);
  };
  // Ice Modal state variables
  const [isIceModalOpen, setIsIceModalOpen] = React.useState(false);
  const openIceModal = () => {
    setIsIceModalOpen(true);
  };
  const closeIceModal = () => {
    setIsIceModalOpen(false);
  };
  // Lightning Modal state variables
  const [isLightningModalOpen, setIsLightningModalOpen] = React.useState(false);
  const openLightningModal = () => {
    setIsLightningModalOpen(true);
  };
  const closeLightningModal = () => {
    setIsLightningModalOpen(false);
  };
  // Earth Modal state variables
  const [isEarthModalOpen, setIsEarthModalOpen] = React.useState(false);
  const openEarthModal = () => {
    setIsEarthModalOpen(true);
  };
  const closeEarthModal = () => {
    setIsEarthModalOpen(false);
  };

  const palaceModalStyles = {
    content: {
      width: "80%",
      height: "85%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "grey",
      color: "black",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };
  const pledgeModalStyles = {
    content: {
      width: "40%",
      height: "30%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "grey",
      color: "black",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  return (
    // Main Game Page
    <div
      className="flex flex-col"
      style={{
        backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1155882003388973127/Sunntabaile_-_City_Map.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Wallet Buttons */}

      <div className="align-top justify-end">
        <WalletMultiButtonDynamic />
        <WalletDisconnectButtonDynamic />
      </div>

      {/* Palace Image/Button */}

      <Image
        src="https://cdn.discordapp.com/attachments/939309405227339776/1157085202770825276/Palace.png"
        width={275}
        height={275}
        onClick={() => openPalaceModal()}
        alt=""
      />

      {/* Palace Modal */}

      <Modal
        isOpen={isPalaceModalOpen}
        onRequestClose={closePalaceModal}
        style={palaceModalStyles}
      >
        <div className="">
          {/* Palace name and image */}

          <div className="flex flex-col">
            <p className="text-black text-4xl text-center font-extrabold">
              Palace
            </p>
            {wallet && !player ? (
              // Initialize Palace Button

              <button
                style={{
                  margin: "20px 0",
                }}
                onClick={async () => {
                  try {
                    if (!wallet || !wallet.signTransaction || !program)
                      throw new Error("Please, connect your wallet first.");

                    const palaceAddress = PublicKey.findProgramAddressSync(
                      [Buffer.from("palace"), wallet.publicKey.toBytes()],
                      PROGRAM_ID
                    )[0];

                    const ix = await program.methods
                      .initialize()
                      .accounts({
                        palace: palaceAddress,
                      })
                      .instruction();

                    await signAndSendTransactionInstructions(
                      connection,
                      wallet,
                      [ix]
                    );
                  } catch (e) {
                    console.error(e);
                  } finally {
                    fetchUserPalace();
                    fetchPlayerAccount();
                  }
                }}
              >
                initialize
              </button>
            ) : null}

            {wallet && player ? (
              <>
                {/* Palace Level */}

                <div className="flex flex-col text-black text-xl text-center p-2 font-bold">
                  <h3>Level: {palace?.level}</h3>
                  {/* Upgrade Palace Button */}

                  <button
                    className="m-0.5 border-solid border border-black"
                    onClick={async () => {
                      try {
                        if (!balance)
                          throw new Error("You don't have any coins");
                        if (!wallet || !program)
                          throw new Error("Please, connect your wallet first.");

                        const ixs = [
                          await program.methods
                            .upgradePalace()
                            .accounts({})
                            .instruction(),
                        ];

                        await signAndSendTransactionInstructions(
                          connection,
                          wallet,
                          ixs
                        );
                      } catch (e) {
                        console.error(e);
                      } finally {
                        fetchUserTokenBalance();
                        fetchUserPalace();
                        fetchPlayerAccount();
                      }
                    }}
                  >
                    Upgrade Palace for {palace!.level * 1000} Gold and{" "}
                    {palace!.level * 500} Lumber
                  </button>
                </div>
              </>
            ) : null}

            <Image
              className="m-1 self-center"
              src={
                "https://cdn.discordapp.com/attachments/939309405227339776/1157085202770825276/Palace.png"
              }
              width={200}
              height={200}
              alt=""
            />
            <div className="flex flex-col self-center">
              <div className="flex text-black text-center p-2 font-bold">
                {/* Palace Dashboard */}

                {wallet && player ? (
                  <>
                    <div className="flex flex-col content-evenly justify-evenly">
                      <div className="flex flex-col content-evenly justify-evenly">
                        <div className="flex mb-5 justify-evenly">
                          {/* GWEN Balance */}

                          <div className="">
                            <h3 className="text-xl">GWEN</h3>
                            <h3>{balance}</h3>
                            {/* Collect Tokens Button */}

                            <button
                              className="m-0.5 border-solid border border-black"
                              onClick={async () => {
                                try {
                                  if (
                                    !wallet ||
                                    !wallet.signTransaction ||
                                    !program
                                  )
                                    throw new Error(
                                      "Please, connect your wallet first."
                                    );

                                  if (!palace)
                                    throw new Error(
                                      "Please, initialize your palace first."
                                    );

                                  const destination = wallet.publicKey;
                                  const ata = await getAssociatedTokenAddress(
                                    mint,
                                    destination
                                  );
                                  const account =
                                    await program.provider.connection.getAccountInfo(
                                      ata
                                    );

                                  const ixs = [];
                                  // create associated token account if it doesn't exist
                                  if (!account) {
                                    ixs.push(
                                      createAssociatedTokenAccountInstruction(
                                        wallet.publicKey,
                                        ata,
                                        destination,
                                        mint
                                      )
                                    );
                                  }

                                  const palaceAddress =
                                    PublicKey.findProgramAddressSync(
                                      [
                                        Buffer.from("palace"),
                                        wallet.publicKey.toBytes(),
                                      ],
                                      PROGRAM_ID
                                    )[0];

                                  ixs.push(
                                    await program.methods
                                      .collectTokens()
                                      .accounts({
                                        mint,
                                        destinationAta: ata,
                                        palace: palaceAddress,
                                      })
                                      .instruction()
                                  );

                                  await signAndSendTransactionInstructions(
                                    connection,
                                    wallet,
                                    ixs
                                  );
                                } catch (e) {
                                  console.error(e);
                                } finally {
                                  fetchUserTokenBalance();
                                  fetchUserPalace();
                                }
                              }}
                            >
                              <div className="p-0.5">Collect Tokens</div>
                            </button>
                          </div>
                          <div>
                            <div className="flex justify-evenly">
                              {/* Gold Amount */}

                              <div>
                                <h3 className="text-xl">Gold</h3>
                                <h3>{player?.gold.toNumber()}</h3>
                              </div>

                              {/* Lumber Amount */}

                              <div>
                                <h3 className="text-xl">Lumber</h3>
                                <h3>{player?.lumber.toNumber()}</h3>
                              </div>
                            </div>
                            <div>
                              {/* Collect Resources Button */}

                              <button
                                className="m-0.5 border-solid border border-black"
                                onClick={async () => {
                                  try {
                                    if (!balance)
                                      throw new Error(
                                        "You don't have any coins"
                                      );
                                    if (!wallet || !program)
                                      throw new Error(
                                        "Please, connect your wallet first."
                                      );

                                    const ixs = [
                                      await program.methods
                                        .collectResources()
                                        .accounts({})
                                        .instruction(),
                                    ];

                                    await signAndSendTransactionInstructions(
                                      connection,
                                      wallet,
                                      ixs
                                    );
                                  } catch (e) {
                                    console.error(e);
                                  } finally {
                                    fetchPlayerAccount();
                                  }
                                }}
                              >
                                <div className="p-0.5">
                                  Collect {player?.lumberjacks * 3} Lumber and{" "}
                                  {player?.miners * 3} Gold
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div>
                          {/* Miners value */}

                          <h3>Miners</h3>

                          <h3>{player?.miners.toNumber()}</h3>

                          {/* Hire Miners Button */}

                          <button
                            className="m-0.5 border-solid border border-black"
                            onClick={async () => {
                              try {
                                if (!balance)
                                  throw new Error("You don't have any coins");

                                if (!wallet || !program)
                                  throw new Error(
                                    "Please, connect your wallet first."
                                  );

                                const ata = await getAssociatedTokenAddress(
                                  mint,
                                  wallet.publicKey
                                );

                                const ixs = [
                                  await program.methods
                                    .purchaseMerchantItem("Miner", new BN(10))
                                    .accounts({ fromAta: ata })
                                    .instruction(),
                                ];

                                await signAndSendTransactionInstructions(
                                  connection,
                                  wallet,
                                  ixs
                                );
                              } catch (e) {
                                console.error(e);
                              } finally {
                                fetchUserTokenBalance();
                                fetchUserPalace();
                                fetchPlayerAccount();
                              }
                            }}
                          >
                            <div className="p-0.5">
                              Hire 10 Miners for 500 GWEN
                            </div>
                          </button>
                        </div>
                        <div>
                          {/* Lumberjacks value */}

                          <h3>Lumberjacks</h3>

                          <h3>{player?.lumberjacks.toNumber()}</h3>

                          {/* Hire Lumberjacks Button */}

                          <button
                            className="m-0.5 border-solid border border-black"
                            onClick={async () => {
                              try {
                                if (!balance)
                                  throw new Error("You don't have any coins");

                                if (!wallet || !program)
                                  throw new Error(
                                    "Please, connect your wallet first."
                                  );

                                const ata = await getAssociatedTokenAddress(
                                  mint,
                                  wallet.publicKey
                                );

                                const ixs = [
                                  await program.methods
                                    .purchaseMerchantItem(
                                      "Lumberjack",
                                      new BN(10)
                                    )
                                    .accounts({ fromAta: ata })
                                    .instruction(),
                                ];

                                await signAndSendTransactionInstructions(
                                  connection,
                                  wallet,
                                  ixs
                                );
                              } catch (e) {
                                console.error(e);
                              } finally {
                                fetchUserTokenBalance();
                                fetchUserPalace();
                                fetchPlayerAccount();
                              }
                            }}
                          >
                            <div className="p-0.5">
                              Hire 10 Lumberjacks for 1000 GWEN
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
