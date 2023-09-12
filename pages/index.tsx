import React, { useState } from "react";
import Modal from "react-modal";
import "tailwindcss/tailwind.css";
import Image from "next/image";

const LandingPage: React.FC = () => {
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
      width: "50%",
      height: "65%",
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
    <div
      style={{
        backgroundImage: `url('https://opengameart.org/sites/default/files/demo_1_12.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src="https://cdn.discordapp.com/attachments/1098664234335871068/1150462142408036392/weaponsmith.gif"
        width={150}
        height={150}
        onClick={() => openPalaceModal()}
        alt=""
      />

      <Modal
        isOpen={isPalaceModalOpen}
        onRequestClose={closePalaceModal}
        style={palaceModalStyles}
      >
        <div className="">
          <div className="flex flex-col">
            <p className="text-black text-4xl text-center font-extrabold">
              Council Palace
            </p>
            <Image
              className="m-3 self-center"
              src={
                "https://cdn.discordapp.com/attachments/1098664234335871068/1150462142408036392/weaponsmith.gif"
              }
              width={200}
              height={200}
              alt=""
            />
            <div className="flex justify-center align-middle">
              <p className="text-black text-xl font-bold p-4">
                Title: {"Soldier"}
              </p>
              <p className="text-black text-xl font-bold p-4">$GWEN: {"144"}</p>
              <p className="text-black text-xl font-bold p-4">
                Loot Score: {"1750"}
              </p>
            </div>
            <div className="flex flex-col self-center">
              <div className="flex text-black text-xl text-center p-1 font-extrabold">
                {
                  <div className="mr-3">
                    <Image
                      src={
                        "https://cdn.discordapp.com/attachments/939309405227339776/1123069416788197477/Blaze.png"
                      }
                      onClick={() => openFireModal()}
                      alt=""
                      className={`w-7`}
                      height={25}
                      width={25}
                    />
                  </div>
                }
                {"Pledge to The Fire Kingdom"}
              </div>
              <div className="flex text-black text-xl text-center p-1 font-extrabold">
                {
                  <div className="mr-3">
                    <Image
                      src={
                        "https://cdn.discordapp.com/attachments/939309405227339776/1123069417283145868/Downpour.png"
                      }
                      onClick={() => openIceModal()}
                      alt=""
                      className={`w-7`}
                      height={25}
                      width={25}
                    />
                  </div>
                }
                {"Pledge to The Ice Kingdom"}
              </div>
              <div className="flex text-black text-xl text-center p-1 font-extrabold">
                {
                  <div className="mr-3">
                    <Image
                      src={
                        "https://cdn.discordapp.com/attachments/939309405227339776/1123069417803227246/Thunderstorm.png"
                      }
                      onClick={() => openLightningModal()}
                      alt=""
                      className={`w-7`}
                      height={25}
                      width={25}
                    />
                  </div>
                }

                {"Pledge to The Lightning Kingdom"}
              </div>
              <div className="flex text-black text-xl text-center p-1 font-extrabold">
                {
                  <div className="mr-3">
                    <Image
                      src={
                        "https://cdn.discordapp.com/attachments/939309405227339776/1123069417522200597/Earthquake.png"
                      }
                      onClick={() => openEarthModal()}
                      alt=""
                      className={`w-7`}
                      height={25}
                      width={25}
                    />
                  </div>
                }
                {"Pledge to The Earth Kingdom"}
              </div>
            </div>
          </div>
          <div className="flex justify-center text-xl font-bold">
            <button
              className="bg-black text-white p-3 m-6"
              onClick={closePalaceModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isFireModalOpen}
        onRequestClose={closeFireModal}
        style={pledgeModalStyles}
      >
        <div className="flex justify-center">
          <div className="flex flex-col">
            <p className="text-black text-4xl text-center font-extrabold mb-5">
              🔥 Fire Kingdom 🔥
            </p>
            <p className="text-black text-xl text-center font-bold">
              The Fire Kingdom thanks you for your pledge!
            </p>
            <p className="text-black text-xl text-center font-bold">
              You will be rewarded for your loyalty with $GWEN!
            </p>
            <p className="text-black text-xl text-center font-bold">💰💰💰</p>
            <div className="flex justify-center text-xl font-bold">
              <button
                className="bg-black text-white p-3 mt-6"
                onClick={closeFireModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isIceModalOpen}
        onRequestClose={closeIceModal}
        style={pledgeModalStyles}
      >
        <div className="flex justify-center">
          <div className="flex flex-col">
            <p className="text-black text-4xl text-center font-extrabold mb-5">
              🧊 Ice Kingdom 🧊
            </p>
            <p className="text-black text-xl text-center font-bold">
              The Ice Kingdom thanks you for your pledge!
            </p>
            <p className="text-black text-xl text-center font-bold">
              You will be rewarded for your loyalty with $GWEN!
            </p>
            <p className="text-black text-xl text-center font-bold">💰💰💰</p>
            <div className="flex justify-center text-xl font-bold">
              <button
                className="bg-black text-white p-3 mt-6"
                onClick={closeIceModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isLightningModalOpen}
        onRequestClose={closeLightningModal}
        style={pledgeModalStyles}
      >
        <div className="flex justify-center">
          <div className="flex flex-col">
            <p className="text-black text-4xl text-center font-extrabold mb-5">
              ⚡ Lightning Kingdom ⚡
            </p>
            <p className="text-black text-xl text-center font-bold">
              The Lightning Kingdom thanks you for your pledge!
            </p>
            <p className="text-black text-xl text-center font-bold">
              You will be rewarded for your loyalty with $GWEN!
            </p>
            <p className="text-black text-xl text-center font-bold">💰💰💰</p>
            <div className="flex justify-center text-xl font-bold">
              <button
                className="bg-black text-white p-3 mt-6"
                onClick={closeLightningModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isEarthModalOpen}
        onRequestClose={closeEarthModal}
        style={pledgeModalStyles}
      >
        <div className="flex justify-center">
          <div className="flex flex-col">
            <p className="text-black text-4xl text-center font-extrabold mb-5">
              🌳 Earth Kingdom 🌳
            </p>
            <p className="text-black text-xl text-center font-bold">
              The Earth Kingdom thanks you for your pledge!
            </p>
            <p className="text-black text-xl text-center font-bold">
              You will be rewarded for your loyalty with $GWEN!
            </p>
            <p className="text-black text-xl text-center font-bold">💰💰💰</p>
            <div className="flex justify-center text-xl font-bold">
              <button
                className="bg-black text-white p-3 mt-6"
                onClick={closeEarthModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
