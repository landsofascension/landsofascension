"use client"

import { useAnchorWallet } from "@solana/wallet-adapter-react"
import dynamic from "next/dynamic"
import React from "react"
import "react-toastify/dist/ReactToastify.css"
import Modal from "react-modal"
import "tailwindcss/tailwind.css"
import Image from "next/image"
import useGameCore from "@/hooks/useGameCore"

const WalletDisconnectButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false }
)
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
)

const LandingPage: React.FC = () => {
  const wallet = useAnchorWallet()
  const {
    balance,
    palace,
    player,
    handleSignupButtonClick,
    handleCollectTokensButtonClick,
    handleCollectResourcesButtonClick,
    handleUpgradePalaceButtonClick,
    handleHireButtonClick,
  } = useGameCore()

  // Palace Modal state variables
  const [isPalaceModalOpen, setIsPalaceModalOpen] = React.useState(false)
  const openPalaceModal = () => {
    setIsPalaceModalOpen(true)
  }
  const closePalaceModal = () => {
    setIsPalaceModalOpen(false)
  }
  // Fire Modal state variables
  const [isFireModalOpen, setIsFireModalOpen] = React.useState(false)
  const openFireModal = () => {
    setIsFireModalOpen(true)
  }
  const closeFireModal = () => {
    setIsFireModalOpen(false)
  }
  // Ice Modal state variables
  const [isIceModalOpen, setIsIceModalOpen] = React.useState(false)
  const openIceModal = () => {
    setIsIceModalOpen(true)
  }
  const closeIceModal = () => {
    setIsIceModalOpen(false)
  }
  // Lightning Modal state variables
  const [isLightningModalOpen, setIsLightningModalOpen] = React.useState(false)
  const openLightningModal = () => {
    setIsLightningModalOpen(true)
  }
  const closeLightningModal = () => {
    setIsLightningModalOpen(false)
  }
  // Earth Modal state variables
  const [isEarthModalOpen, setIsEarthModalOpen] = React.useState(false)
  const openEarthModal = () => {
    setIsEarthModalOpen(true)
  }
  const closeEarthModal = () => {
    setIsEarthModalOpen(false)
  }

  const palaceTitleStyles = {
    backgroundImage: `url('https://media.discordapp.net/attachments/1152274140141735936/1159655519401812048/title.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }

  const palaceUpgradeButtonStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1159655934977650870/plank_15.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const collectAndHireBoxStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1159682151835512893/frame.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const collectTokensButtonStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1159655518407753778/plank_13.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const collectResourcesButtonStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1159655518638448781/plank_14.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const hireMinersButtonStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1159655518873342102/plank_16.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const hireLumberjacksButtonStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1159655518873342102/plank_16.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }

  const palaceModalStyles = {
    content: {
      width: "80%",
      height: "85%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1159651293053329508/bg_01_02.png')`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      backgroundColor: "transparent",
      border: "none",
      color: "black",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  }
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
  }

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
            <div className="self-center" style={palaceTitleStyles}>
              <p className="text-black text-3xl text-center font-bold pb-5 px-24">
                Palace
              </p>
            </div>

            <Image
              className="self-center"
              src={
                "https://cdn.discordapp.com/attachments/939309405227339776/1157085202770825276/Palace.png"
              }
              width={200}
              height={200}
              alt=""
            />
            {wallet && !player ? (
              // Initialize Palace Button

              <button
                style={{
                  margin: "20px 0",
                }}
                onClick={handleSignupButtonClick}
              >
                initialize
              </button>
            ) : null}

            {wallet && player ? (
              <>
                {/* Palace Level */}

                <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center  ">
                  <p>Level: {palace?.level}</p>
                  {/* Upgrade Palace Button */}
                  <button
                    style={palaceUpgradeButtonStyles}
                    className="m-0.5 px-6 py-3 text-base"
                    onClick={handleUpgradePalaceButtonClick}
                  >
                    <p>Upgrade</p>
                  </button>

                  <p className="text-xs">Next Level Cost:</p>
                  <p className="text-xs">
                    {palace!.level * 1000} Gold + {palace!.level * 500} Lumber
                  </p>
                </div>
              </>
            ) : null}

            <div
              style={collectAndHireBoxStyles}
              className="flex flex-col self-center p-5"
            >
              <div className="flex text-gray-400 text-center p-1 font-bold">
                {/* Palace Dashboard */}

                {wallet && player ? (
                  <>
                    <div className="flex flex-col">
                      <div>
                        <div className="flex mb-1 justify-evenly">
                          {/* GWEN Balance */}

                          <div className="">
                            <h3 className="text-lg">GWEN</h3>
                            <h3>{balance}</h3>
                            {/* Collect Tokens Button */}

                            <button
                              style={collectTokensButtonStyles}
                              className="m-0.5 px-6 py-3 text-base"
                              onClick={handleCollectTokensButtonClick}
                            >
                              <div className="p-0.5 text-black">Collect</div>
                            </button>
                            <div>
                              <p className="text-xs text-gray-600">x GWEN</p>
                              <p className="text-xs text-gray-600">
                                ready to Collect
                              </p>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-evenly">
                              {/* Gold Amount */}

                              <div className="px-1">
                                <h3 className="text-lg">Gold</h3>
                                <h3>{player?.gold.toNumber()}</h3>
                              </div>

                              {/* Lumber Amount */}

                              <div className="px-1">
                                <h3 className="text-lg">Lumber</h3>
                                <h3>{player?.lumber.toNumber()}</h3>
                              </div>
                            </div>
                            <div>
                              {/* Collect Resources Button */}

                              <button
                                style={collectResourcesButtonStyles}
                                className="m-0.5 px-6 py-3 text-base"
                                onClick={handleCollectResourcesButtonClick}
                              >
                                <div className="p-0.5 text-black">Collect</div>
                              </button>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600">
                                {player?.miners * 3} Gold +{" "}
                                {player?.lumberjacks * 3} Lumber
                              </p>
                              <p className="text-xs text-gray-600">
                                each Collect
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex  justify-evenly">
                        <div>
                          {/* Miners value */}

                          <h3>Miners</h3>

                          <h3>{player?.miners.toNumber()}</h3>

                          {/* Hire Miners Button */}

                          <button
                            style={hireMinersButtonStyles}
                            className="m-0.5 px-6 py-3 text-base"
                            onClick={() => handleHireButtonClick("Miner")}
                          >
                            <div className="p-0.5 text-black">Hire</div>
                          </button>
                          <div>
                            <p className="text-xs text-gray-600">10 Miners</p>
                            <p className="text-xs text-gray-600">@ 500 Gwen</p>
                          </div>
                        </div>
                        <div>
                          {/* Lumberjacks value */}

                          <h3>Lumberjacks</h3>

                          <h3>{player?.lumberjacks.toNumber()}</h3>

                          {/* Hire Lumberjacks Button */}

                          <button
                            style={hireLumberjacksButtonStyles}
                            className="m-0.5 px-6 py-3 text-base"
                            onClick={() => handleHireButtonClick("Lumberjack")}
                          >
                            <div className="p-0.5 text-black">Hire</div>
                          </button>
                          <div>
                            <p className="text-xs text-gray-600">
                              10 Lumberjacks
                            </p>
                            <p className="text-xs text-gray-600">@ 1000 Gwen</p>
                          </div>
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
  )
}

export default LandingPage
