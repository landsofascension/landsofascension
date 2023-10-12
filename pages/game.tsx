"use client"

import dynamic from "next/dynamic"
import React from "react"
import "react-toastify/dist/ReactToastify.css"
import Modal from "react-modal"
import "tailwindcss/tailwind.css"
import Image from "next/image"
import useGameCore from "@/hooks/useGameCore"
import "react-circular-progressbar/dist/styles.css"
import { AuthProps, getInitialAuthProps } from "@/utils/auth"
import useAuthorization from "@/hooks/useAuthorization"
import Link from "next/link"
import { Button } from "theme-ui"

const CameraViewer = dynamic(
  async () => (await import("@/app/CameraViewer")).default,
  { ssr: false }
)

type GamePageProps = {} & AuthProps

const GamePage = ({
  authorized: serverAuthorized,
  username: serverUsername,
}: GamePageProps) => {
  const { authorized, username } = useAuthorization(
    serverAuthorized,
    serverUsername
  )

  const {
    balance,
    palace,
    player,
    handleCollectTokensButtonClick,
    handleCollectResourcesButtonClick,
    handleUpgradePalaceButtonClick,
    handleHireButtonClick,
  } = useGameCore(username)

  // Palace Modal state variables
  const [isPalaceModalOpen, setIsPalaceModalOpen] = React.useState(false)
  const openPalaceModal = () => {
    setIsPalaceModalOpen(true)
  }
  const closePalaceModal = () => {
    setIsPalaceModalOpen(false)
  }
  // Lumbermill Modal state variables
  const [isLumbermillModalOpen, setIsLumbermillModalOpen] =
    React.useState(false)
  const openLumbermillModal = () => {
    setIsLumbermillModalOpen(true)
  }
  const closeLumbermillModal = () => {
    setIsLumbermillModalOpen(false)
  }
  // Mine Modal state variables
  const [isMineModalOpen, setIsMineModalOpen] = React.useState(false)
  const openMineModal = () => {
    setIsMineModalOpen(true)
  }
  const closeMineModal = () => {
    setIsMineModalOpen(false)
  }
  // Barracks Modal state variables
  const [isBarracksModalOpen, setIsBarracksModalOpen] = React.useState(false)
  const openBarracksModal = () => {
    setIsBarracksModalOpen(true)
  }
  const closeBarracksModal = () => {
    setIsBarracksModalOpen(false)
  }
  // Merchant Modal state variables
  const [isMerchantModalOpen, setIsMerchantModalOpen] = React.useState(false)
  const openMerchantModal = () => {
    setIsMerchantModalOpen(true)
  }
  const closeMerchantModal = () => {
    setIsMerchantModalOpen(false)
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
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1159655519154339931/plank_17.png')`,
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
        openLumbermillModal={openLumbermillModal}
        openMineModal={openMineModal}
        openBarracksModal={openBarracksModal}
        openMerchantModal={openMerchantModal}
      />{" "}
      <div className="align-top justify-end absolute left-4 top-4">
        {authorized === false ? (
          <Link href="/auth">
            <Button>Login</Button>
          </Link>
        ) : null}
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
                className="self-center"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1160954821403230218/palace_title.png"
                }
                width={400}
                height={400}
                alt="Palace Title"
              />

              <Image
                className="self-center"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161672994096152576/palace.png"
                }
                width={200}
                height={200}
                alt="Palace"
              />

              {player ? (
                <>
                  {/* Palace Level */}

                  <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center">
                    <div className="flex justify-evenly">
                      {/* Gold Amount */}

                      <div className="px-1">
                        <h3 className="text-md">Gold</h3>
                        <h3 className="font-sans">{player?.gold.toNumber()}</h3>
                      </div>

                      {/* Lumber Amount */}

                      <div className="px-1">
                        <h3 className="text-md">Lumber</h3>
                        <h3 className="font-sans">
                          {player?.lumber.toNumber()}
                        </h3>
                      </div>
                    </div>
                    {/* Upgrade Palace Button */}
                    <button
                      style={palaceUpgradeButtonStyles}
                      className="m-0.5 px-6 py-3 text-base"
                      onClick={handleUpgradePalaceButtonClick}
                    >
                      <div className="flex justify-center items-center mx-2">
                        <p className="mr-2">Upgrade</p>
                      </div>
                    </button>
                    <div className="flex self-center text-3xl mt-2">
                      <p className="mr-3">Level: </p>
                      <p className="font-sans">{palace?.level}</p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {player ? (
              <>
                <div
                  style={collectAndHireBoxStyles}
                  className="flex flex-col self-stretch items-center py-8 p-5 mt-4 md:mx-14"
                >
                  <div className="flex text-gray-400 text-center p-1 font-bold">
                    {/* Resource Collection and Workforce */}
                    <div className="flex flex-col">
                      <div>
                        <div className="flex mb-1 justify-evenly">
                          <div>
                            <div className="flex justify-evenly">
                              {/* Lumber Amount */}

                              <div className="px-1">
                                <h3 className="text-lg">GWEN</h3>
                                <h3 className="font-sans">{balance}</h3>
                              </div>
                            </div>
                            <div>
                              {/* Collect Lumber Button */}

                              <button
                                style={collectResourcesButtonStyles}
                                className="m-2 px-6 py-3 text-black"
                                onClick={handleCollectTokensButtonClick}
                              >
                                <div className="flex justify-center items-center">
                                  <p className="mr-2 text-black">Collect</p>
                                </div>
                              </button>
                            </div>
                          </div>
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
      {/* Lumbermill Modal */}
      <Modal
        isOpen={isLumbermillModalOpen}
        onRequestClose={closeLumbermillModal}
        style={palaceModalStyles}
      >
        <div className="font-eagle">
          {/* LumberMill name and image */}

          <div className="flex flex-col">
            <div
              style={palaceMainInfoStyles}
              className="self-center flex flex-col mt-2 pb-14"
            >
              <Image
                className="self-center"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161690210745188372/lumbermill_title.png"
                }
                width={400}
                height={400}
                alt="Lumbermill Title"
              />

              <Image
                className="self-center"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161673065932009634/lumbermill.png"
                }
                width={200}
                height={200}
                alt="Lumbermill"
              />

              {player ? (
                <>
                  {/* Lumberjacks */}

                  <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center">
                    <div className="flex self-center">
                      <p className="mr-3">Lumberjacks: </p>
                      <p className="font-sans">
                        {player.lumberjacks.toNumber()}
                      </p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {player ? (
              <>
                <div
                  style={collectAndHireBoxStyles}
                  className="flex flex-col self-stretch items-center py-8 p-5 mt-4 md:mx-14"
                >
                  <div className="flex text-gray-400 text-center p-1 font-bold">
                    {/* Resource Collection and Workforce */}
                    <div className="flex flex-col">
                      <div>
                        <div className="flex mb-1 justify-evenly">
                          <div>
                            <div className="flex justify-evenly">
                              {/* Lumber Amount */}

                              <div className="px-1">
                                <h3 className="text-lg">Lumber</h3>
                                <h3 className="font-sans">
                                  {player?.lumber.toNumber()}
                                </h3>
                              </div>
                            </div>
                            <div>
                              {/* Collect Lumber Button */}

                              <button
                                style={collectResourcesButtonStyles}
                                className="m-2 px-6 py-3 text-black"
                                onClick={handleCollectResourcesButtonClick}
                              >
                                <div className="flex justify-center items-center">
                                  <p className="mr-2 text-black">Collect</p>
                                </div>
                              </button>
                            </div>
                          </div>
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
      {/* Mine Modal */}
      <Modal
        isOpen={isMineModalOpen}
        onRequestClose={closeMineModal}
        style={palaceModalStyles}
      >
        <div className="font-eagle">
          {/* Mine name and image */}

          <div className="flex flex-col">
            <div
              style={palaceMainInfoStyles}
              className="self-center flex flex-col mt-2 pb-14"
            >
              <Image
                className="self-center"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161690211655356477/mine_title.png"
                }
                width={400}
                height={400}
                alt="Mine Title"
              />

              <Image
                className="self-center"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161673082453377106/mine.png"
                }
                width={200}
                height={200}
                alt="Mine"
              />

              {player ? (
                <>
                  {/* Miners */}

                  <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center">
                    <div className="flex self-center">
                      <p className="mr-3">Miners: </p>
                      <p className="font-sans">{player.miners.toNumber()}</p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {player ? (
              <>
                <div
                  style={collectAndHireBoxStyles}
                  className="flex flex-col self-stretch items-center py-8 p-5 mt-4 md:mx-14"
                >
                  <div className="flex text-gray-400 text-center p-1 font-bold">
                    {/* Resource Collection and Workforce */}
                    <div className="flex flex-col">
                      <div>
                        <div className="flex mb-1 justify-evenly">
                          <div>
                            <div className="flex justify-evenly">
                              {/* Gold Amount */}

                              <div className="px-1">
                                <h3 className="text-lg">Gold</h3>
                                <h3 className="font-sans">
                                  {player?.gold.toNumber()}
                                </h3>
                              </div>
                            </div>
                            <div>
                              {/* Collect Gold Button */}

                              <button
                                style={collectResourcesButtonStyles}
                                className="m-2 px-6 py-3 text-black"
                                onClick={handleCollectResourcesButtonClick}
                              >
                                <div className="flex justify-center items-center">
                                  <p className="mr-2 text-black">Collect</p>
                                </div>
                              </button>
                            </div>
                          </div>
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
      {/* Barracks Modal */}
      <Modal
        isOpen={isBarracksModalOpen}
        onRequestClose={closeBarracksModal}
        style={palaceModalStyles}
      >
        <div className="font-eagle">
          {/* Barracks name and image */}

          <div className="flex flex-col">
            <div
              style={palaceMainInfoStyles}
              className="self-center flex flex-col mt-2 pb-14"
            >
              <Image
                className="self-center"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161690210329956482/barracks_title.png"
                }
                width={400}
                height={400}
                alt="Barracks Title"
              />

              <Image
                className="self-center"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161673027814162484/barracks.png"
                }
                width={200}
                height={200}
                alt="Barracks"
              />

              {player ? (
                <>
                  {/* Barracks Info */}

                  <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center">
                    <div className="mt-4 flex flex-col self-center">
                      <p className="mr-3">GWEN: </p>
                      <p className="font-sans">{balance}</p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {player ? (
              <>
                <div
                  style={collectAndHireBoxStyles}
                  className="flex flex-col self-stretch items-center py-8 p-5 mt-4 md:mx-14"
                >
                  <div className="flex flex-col text-gray-400 text-center self-stretch items-stretch p-1 font-bold">
                    {/* Resource Collection and Workforce */}
                    <div className="flex  justify-evenly mb-2">
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
                        {/* Guards value */}

                        <h3>Guards</h3>

                        <h3 className="font-sans">{"0"}</h3>

                        {/* Hire Guards Button */}

                        <button
                          style={hireLumberjacksButtonStyles}
                          className="m-2 px-6 py-3 text-base"
                          onClick={() => console.log("Hire Guards Clicked")}
                        >
                          <div className="p-0.5 text-black">Hire</div>
                        </button>
                      </div>
                    </div>
                    <div className="flex  justify-evenly">
                      <div>
                        {/* Warriors value */}

                        <h3>Warriors</h3>

                        <h3 className="font-sans">{"0"}</h3>

                        {/* Hire Miners Button */}

                        <button
                          style={hireMinersButtonStyles}
                          className="m-2 px-6 py-3 text-base"
                          onClick={() => console.log("Hire Warriors Clicked")}
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
              </>
            ) : null}
          </div>
        </div>
      </Modal>
      {/* Merchant Modal */}
      <Modal
        isOpen={isMerchantModalOpen}
        onRequestClose={closeMerchantModal}
        style={palaceModalStyles}
      >
        <div className="font-eagle">
          {/* Merchant name and image */}

          <div className="flex flex-col">
            <div
              style={palaceMainInfoStyles}
              className="self-center flex flex-col mt-2 pb-14"
            >
              <Image
                className="self-center"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161690211261096016/merchant_title.png"
                }
                width={400}
                height={400}
                alt="Merchant Title"
              />

              <Image
                className="self-center"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161673111259852870/Merchant.png"
                }
                width={200}
                height={200}
                alt="Merchant"
              />

              {player ? (
                <>
                  {/* Merchant Info */}

                  <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center">
                    <div className="mt-4 flex flex-col self-center">
                      <p className="mr-3">GWEN: </p>
                      <p className="font-sans">{balance}</p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {player ? (
              <>
                <div
                  style={collectAndHireBoxStyles}
                  className="flex flex-col self-stretch items-center py-8 p-5 mt-4 md:mx-14"
                >
                  <h3 className="py-8 text-3xl font-bold">Coming Soon!</h3>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Modal>
    </div>
  )
}

GamePage.getInitialProps = getInitialAuthProps
export default GamePage
