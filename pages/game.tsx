"use client"

import { useAnchorWallet } from "@solana/wallet-adapter-react"
import dynamic from "next/dynamic"
import React from "react"
import "react-toastify/dist/ReactToastify.css"
import Modal from "react-modal"
import "tailwindcss/tailwind.css"
import Image from "next/image"
import useGameCore from "@/hooks/useGameCore"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

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

const CameraViewer = dynamic(
  async () => (await import("@/app/CameraViewer")).default,
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
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1160759896459976745/palace_title.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const initializePalaceButtonStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1159850712352702485/plank_18.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const palaceUpgradeButtonStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1159655934977650870/plank_15.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const palaceMainInfoStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1160754915199696967/frame_k_06.png')`,
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
      width: "95%",
      height: "95%",
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CameraViewer
        imageUrl="/royal_palace.jpg"
        openPalaceModal={openPalaceModal}
      />{" "}
      <div className="align-top justify-end absolute left-4 top-4">
        <WalletMultiButtonDynamic />
        <WalletDisconnectButtonDynamic />
      </div>
      {/* Palace Modal */}
      <Modal
        isOpen={isPalaceModalOpen}
        onRequestClose={closePalaceModal}
        style={palaceModalStyles}
      >
        <div className="font-eagle">
          {/* Palace name and image */}

          <div className="flex flex-col">
            <div
              style={palaceMainInfoStyles}
              className="self-center flex flex-col mt-2 pb-14"
            >
              <Image
                className="self-center mb-6"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1160769786695909407/palace_title.png"
                }
                width={400}
                height={400}
                alt="Palace Title"
              />

              <Image
                className="self-center"
                src={
                  wallet && player && palace!.level < 15
                    ? "https://cdn.discordapp.com/attachments/939309405227339776/1157085202770825276/Palace.png"
                    : wallet && player && palace!.level < 30
                    ? "https://cdn.discordapp.com/attachments/1152274140141735936/1160767190887301140/palace_2.png"
                    : wallet && player && palace!.level < 45
                    ? "https://cdn.discordapp.com/attachments/1152274140141735936/1160765588017254540/palace_3.png"
                    : "https://cdn.discordapp.com/attachments/939309405227339776/1157085202770825276/Palace.png"
                }
                width={200}
                height={200}
                alt="Palace"
              />
              {wallet && !player ? (
                // Initialize Palace Button

                <button
                  className="flex flex-col self-center px-6 py-3 text-lg text-black font-bold"
                  style={initializePalaceButtonStyles}
                  onClick={handleSignupButtonClick}
                >
                  Initialize
                </button>
              ) : null}

              {wallet && player ? (
                <>
                  {/* Palace Level */}

                  <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center">
                    <div className="flex self-center">
                      <p className="mr-3">Level: </p>
                      <p className="font-sans">{palace?.level}</p>
                    </div>
                    {/* Upgrade Palace Button */}
                    <button
                      style={palaceUpgradeButtonStyles}
                      className="m-0.5 px-6 py-3 text-base"
                      onClick={handleUpgradePalaceButtonClick}
                    >
                      <div className="flex justify-center items-center mx-2">
                        <p className="mr-2">Upgrade</p>
                        <div className="w-12 h-12 font-sans">
                          <CircularProgressbar
                            value={+player.gold + +player.lumber}
                            maxValue={palace!.level * 1500}
                            text={`${
                              Math.floor(
                                ((+player.lumber + +player.gold) /
                                  (palace!.level * 1500)) *
                                  100
                              ) <= 100
                                ? Math.floor(
                                    ((+player.lumber + +player.gold) /
                                      (palace!.level * 1500)) *
                                      100
                                  )
                                : 100
                            }%`}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </>
              ) : null}
            </div>
            {wallet && player ? (
              <>
                <div
                  style={collectAndHireBoxStyles}
                  className="flex flex-col self-center p-5 mt-4"
                >
                  <div className="flex text-gray-400 text-center p-1 font-bold">
                    {/* Resource Collection and Workforce */}
                    <div className="flex flex-col">
                      <div>
                        <div className="flex mb-1 justify-evenly">
                          {/* GWEN Balance */}

                          <div className="">
                            <h3 className="text-lg">GWEN</h3>
                            <h3 className="font-sans">{balance}</h3>
                            {/* Collect Tokens Button */}

                            <button
                              style={collectTokensButtonStyles}
                              className="m-2 px-3 py-3 text-base"
                              onClick={handleCollectTokensButtonClick}
                            >
                              <div className="flex justify-center items-center">
                                <p className="mr-2 text-black">Collect</p>
                                <div className="w-12 h-12 font-sans">
                                  <CircularProgressbar
                                    value={
                                      (Math.floor(Date.now() / 1000) -
                                        palace!.lastMintTimestamp) *
                                      10 *
                                      palace!.level
                                    }
                                    maxValue={86400 * 10 * palace!.level}
                                    text={`${Math.floor(
                                      (((Math.floor(Date.now() / 1000) -
                                        palace!.lastMintTimestamp) *
                                        10 *
                                        palace!.level) /
                                        (86400 * 10 * palace!.level)) *
                                        100
                                    )}%`}
                                  />
                                </div>
                              </div>
                            </button>
                          </div>

                          <div>
                            <div className="flex justify-evenly">
                              {/* Gold Amount */}

                              <div className="px-1">
                                <h3 className="text-lg">Gold</h3>
                                <h3 className="font-sans">
                                  {player?.gold.toNumber()}
                                </h3>
                              </div>

                              {/* Lumber Amount */}

                              <div className="px-1">
                                <h3 className="text-lg">Lumber</h3>
                                <h3 className="font-sans">
                                  {player?.lumber.toNumber()}
                                </h3>
                              </div>
                            </div>
                            <div>
                              {/* Collect Resources Button */}

                              <button
                                style={collectResourcesButtonStyles}
                                className="m-2 px-3 py-3 text-black"
                                onClick={handleCollectResourcesButtonClick}
                              >
                                <div className="flex justify-center items-center">
                                  <p className="mr-2 text-black">Collect</p>
                                  <div className="w-12 h-12 font-sans">
                                    <CircularProgressbar
                                      value={
                                        (Math.floor(Date.now() / 1000) -
                                          palace!
                                            .lastResourceCollectionTimestamp) *
                                          player!.miners || 0
                                      }
                                      maxValue={86400 * player!.miners || 1}
                                      text={`${
                                        Math.floor(
                                          (((Math.floor(Date.now() / 1000) -
                                            palace!
                                              .lastResourceCollectionTimestamp) *
                                            player!.miners) /
                                            (86400 * player!.miners)) *
                                            100
                                        ) || 0
                                      }%`}
                                    />
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex  justify-evenly">
                        <div>
                          {/* Miners value */}

                          <h3>Miners</h3>

                          <h3 className="font-sans">
                            {player?.miners.toNumber()}
                          </h3>

                          {/* Hire Miners Button */}

                          <button
                            style={hireMinersButtonStyles}
                            className="m-2 px-6 py-3 text-base"
                            onClick={() => handleHireButtonClick("Miner")}
                          >
                            <div className="p-0.5 text-black">Hire</div>
                          </button>
                        </div>
                        <div>
                          {/* Lumberjacks value */}

                          <h3>Lumberjacks</h3>

                          <h3 className="font-sans">
                            {player?.lumberjacks.toNumber()}
                          </h3>

                          {/* Hire Lumberjacks Button */}

                          <button
                            style={hireLumberjacksButtonStyles}
                            className="m-2 px-6 py-3 text-base"
                            onClick={() => handleHireButtonClick("Lumberjack")}
                          >
                            <div className="p-0.5 text-black">Hire</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LandingPage
