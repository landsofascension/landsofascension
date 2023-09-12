import React, { useState } from "react";
import Modal from "react-modal";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const modalStyles = {
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
      <img
        src="https://cdn.discordapp.com/attachments/1098664234335871068/1150462142408036392/weaponsmith.gif"
        onClick={() => openModal()}
      />

      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
        <div className="">
          <div className="flex flex-col">
            <p className="text-black text-4xl text-center font-extrabold">
              Council Palace
            </p>
            <img
              className="m-5 self-center"
              style={{
                maxWidth: "320px",
              }}
              src={
                "https://cdn.discordapp.com/attachments/1098664234335871068/1150462142408036392/weaponsmith.gif"
              }
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
              <div className="flex text-black text-xl text-center p-3 font-extrabold">
                {
                  <div className="mr-3">
                    <img
                      src={
                        "https://cdn.discordapp.com/attachments/939309405227339776/1123069416788197477/Blaze.png"
                      }
                      onClick={() =>
                        alert("Pledged to Fire! You will be rewarded in GWEN!")
                      }
                      alt=""
                      className={`w-7`}
                      height={25}
                    />
                  </div>
                }
                {"Click to pledge to Fire"}
              </div>
              <div className="flex text-black text-xl text-center p-3 font-extrabold">
                {
                  <div className="mr-3">
                    <img
                      src={
                        "https://cdn.discordapp.com/attachments/939309405227339776/1123069417283145868/Downpour.png"
                      }
                      onClick={() =>
                        alert("Pledged to Ice! You will be rewarded in GWEN!")
                      }
                      alt=""
                      className={`w-7`}
                      height={25}
                    />
                  </div>
                }
                {"Click to pledge to Ice"}
              </div>
              <div className="flex text-black text-xl text-center p-3 font-extrabold">
                {
                  <div className="mr-3">
                    <img
                      src={
                        "https://cdn.discordapp.com/attachments/939309405227339776/1123069417803227246/Thunderstorm.png"
                      }
                      onClick={() =>
                        alert(
                          "Pledged to Lightning! You will be rewarded in GWEN!"
                        )
                      }
                      alt=""
                      className={`w-7`}
                      height={25}
                    />
                  </div>
                }

                {"Click to pledge to Lightning"}
              </div>
              <div className="flex text-black text-xl text-center p-3 font-extrabold">
                {
                  <div className="mr-3">
                    <img
                      src={
                        "https://cdn.discordapp.com/attachments/939309405227339776/1123069417522200597/Earthquake.png"
                      }
                      onClick={() =>
                        alert("Pledged to Earth! You will be rewarded in GWEN!")
                      }
                      alt=""
                      className={`w-7`}
                      height={25}
                    />
                  </div>
                }
                {"Click to pledge to Earth"}
              </div>
            </div>
          </div>
          <div className="flex justify-center text-xl font-bold">
            <button
              className="bg-black text-white p-3 m-6"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
