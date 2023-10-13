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
  const [isPalaceModalOpen, setIsPalaceModalOpen] = React.useState(true)
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

  // Styles for buttons, boxes, frames, etc
  const buttonStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1161836031985852596/button.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const hireButtonStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1162032452500463636/hire_button.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const buildingInfoStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1161848153738317954/frame.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const resourceInfoBoxStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1162047022719836320/dark_frame.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    minWidth: "175px",
  }
  const tallBoxStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1162025830449426482/tallBox.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }
  const boxStyles = {
    backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1161840285060452433/box.png')`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  }

  const buildingModalStyles = {
    content: {
      maxWidth: "80%",
      maxHeight: "90%",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      margin: "auto",
      backgroundImage: `url('https://cdn.discordapp.com/attachments/1152274140141735936/1161846691109011628/modal_bg.png')`,
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
        imageUrl="/landsofascencion_map.jpeg"
        openPalaceModal={openPalaceModal}
        openLumbermillModal={openLumbermillModal}
        openMineModal={openMineModal}
        openBarracksModal={openBarracksModal}
        openMerchantModal={openMerchantModal}
      />{" "}
      {/* Login Button */}
      <div
        className="align-top justify-end absolute top-10"
        sx={{
          zIndex: 10,
          margin: "0 auto",
        }}
      >
        {authorized === false ? (
          <Link href="/auth">
            <Button>Login</Button>
          </Link>
        ) : null}
      </div>
      {/* Resource HUD */}
      <div className="align-top justify-end absolute left-4 top-4">
        {player !== false ? (
          <div className="p-3" style={hireButtonStyles}>
            <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center font-eagle">
              <div className="flex">
                <p className="mr-3">VALOR: </p>
                <p className="font-sans">{balance}</p>
              </div>
              <div className="flex">
                <p className="mr-3">Gold: </p>
                <p className="font-sans">{player?.gold.toNumber()}</p>
              </div>
              <div className="flex">
                <p className="mr-3">Lumber: </p>
                <p className="font-sans">{player?.lumber.toNumber()}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* Palace Modal */}
      <Modal
        isOpen={isPalaceModalOpen}
        onRequestClose={closePalaceModal}
        style={buildingModalStyles}
      >
        <div className="font-eagle">
          {/* Palace name and image */}

          <div className="flex flex-col">
            <div
              style={buildingInfoStyles}
              className="self-center flex flex-col mt-2 pb-8"
            >
              <Image
                className="self-center pb-8"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161823739806228591/titlebar.png"
                }
                width={400}
                height={400}
                alt="Palace Title"
              />

              <Image
                className="self-center brightness-200"
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
                  <div className="flex self-center text-3xl mt-2">
                    <p className="mr-4">Level </p>
                    <p className="font-sans">{palace?.level}</p>
                  </div>

                  <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center">
                    {/* Upgrade Palace Button */}
                    <button
                      style={buttonStyles}
                      className="m-0.5 mb-2 px-2 py-3 text-base"
                      onClick={handleUpgradePalaceButtonClick}
                    >
                      <div className="flex justify-center items-center mx-2">
                        <p>Upgrade</p>
                      </div>
                    </button>
                    <div
                      style={resourceInfoBoxStyles}
                      className="flex p-4 justify-evenly"
                    >
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
                  </div>
                </>
              ) : null}
            </div>
            {player ? (
              <>
                <div
                  style={boxStyles}
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
                                <h3 className="text-lg">VALOR</h3>
                                <h3 className="font-sans">{balance}</h3>
                              </div>
                            </div>
                            <div>
                              {/* Collect Lumber Button */}

                              <button
                                style={buttonStyles}
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
        style={buildingModalStyles}
      >
        <div className="font-eagle">
          {/* LumberMill name and image */}

          <div className="flex flex-col">
            <div
              style={buildingInfoStyles}
              className="self-center flex flex-col mt-2 pb-10"
            >
              <Image
                className="self-center pb-8"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161823814771028038/lumbermill_title_dark.png"
                }
                width={400}
                height={400}
                alt="Lumbermill Title"
              />

              <Image
                className="self-center mb-4"
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
                    <div
                      style={resourceInfoBoxStyles}
                      className="flex p-4 justify-evenly"
                    >
                      <div className="flex flex-col self-center">
                        <p>Lumberjacks</p>
                        <p className="font-sans">
                          {player.lumberjacks.toNumber()}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {player ? (
              <>
                <div
                  style={boxStyles}
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
                                style={buttonStyles}
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
        style={buildingModalStyles}
      >
        <div className="font-eagle">
          {/* Mine name and image */}

          <div className="flex flex-col">
            <div
              style={buildingInfoStyles}
              className="self-center flex flex-col mt-2 pb-10"
            >
              <Image
                className="self-center pb-8"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161823802418794556/mine_title_dark.png"
                }
                width={400}
                height={400}
                alt="Mine Title"
              />

              <Image
                className="self-center mb-4"
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
                    <div
                      style={resourceInfoBoxStyles}
                      className="flex p-4 justify-evenly"
                    >
                      <div className="flex flex-col self-center px-8">
                        <p>Miners</p>
                        <p className="font-sans">{player.miners.toNumber()}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {player ? (
              <>
                <div
                  style={boxStyles}
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
                                style={buttonStyles}
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
        style={buildingModalStyles}
      >
        <div className="font-eagle">
          {/* Barracks name and image */}

          <div className="flex flex-col">
            <div
              style={buildingInfoStyles}
              className="self-center flex flex-col mt-2 pb-6"
            >
              <Image
                className="self-center pb-8"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161823773083840552/barracks_title_dark.png"
                }
                width={400}
                height={400}
                alt="Barracks Title"
              />

              <Image
                className="self-center mb-3"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161673027814162484/barracks.png"
                }
                width={200}
                height={200}
                alt="Barracks"
              />

              {player ? (
                <>
                  {/* VALOR */}

                  <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center">
                    <div
                      style={resourceInfoBoxStyles}
                      className="flex p-4 justify-evenly"
                    >
                      <div className="flex flex-col self-center">
                        <p>VALOR</p>
                        <p className="font-sans">{balance}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {player ? (
              <>
                <div
                  style={tallBoxStyles}
                  className="flex flex-col self-stretch items-centers p-5 mt-4 lg:mx-20"
                >
                  <div className="flex flex-col text-black text-center self-stretch items-stretch p-1 font-bold">
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
                          style={hireButtonStyles}
                          className="m-2 px-6 py-3 text-base"
                          onClick={() => handleHireButtonClick("Miner")}
                        >
                          <div className="p-0.5 text-black">
                            Hire <br />
                            (1 VALOR)
                          </div>
                        </button>
                      </div>
                      <div>
                        {/* Guards value */}

                        <h3>Guards</h3>

                        <h3 className="font-sans">{"0"}</h3>

                        {/* Hire Guards Button */}

                        <button
                          style={hireButtonStyles}
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
                          style={hireButtonStyles}
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
                          style={hireButtonStyles}
                          className="m-2 px-6 py-3 text-base"
                          onClick={() => handleHireButtonClick("Lumberjack")}
                        >
                          <div className="p-0.5 text-black">
                            Hire <br />
                            (1 VALOR)
                          </div>
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
        style={buildingModalStyles}
      >
        <div className="font-eagle">
          {/* Merchant name and image */}

          <div className="flex flex-col">
            <div
              style={buildingInfoStyles}
              className="self-center flex flex-col mt-2 pb-10"
            >
              <Image
                className="self-center pb-8"
                src={
                  "https://cdn.discordapp.com/attachments/1152274140141735936/1161823835268583585/merchant_title_dark.png"
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
                  {/* VALOR */}

                  <div className="flex flex-col text-black text-xl text-center p-2 font-bold self-center">
                    <div
                      style={resourceInfoBoxStyles}
                      className="flex p-4 justify-evenly"
                    >
                      <div className="flex flex-col self-center">
                        <p>VALOR</p>
                        <p className="font-sans">{balance}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {player ? (
              <>
                <div
                  style={boxStyles}
                  className="flex flex-col self-stretch items-center py-8 p-5 mt-4 md:mx-14"
                >
                  <h3 className="py-8 text-2xl md:text-3xl font-bold">
                    Coming Soon!
                  </h3>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Modal>
      <style jsx global>{`
        .ReactModal__Content {
          width: 329px;
        }

        @media (min-width: 1024px) {
          .ReactModal__Content {
            width: 658px;
            height: 871px;
          }
        }
      `}</style>
    </div>
  )
}

GamePage.getInitialProps = getInitialAuthProps
export default GamePage
