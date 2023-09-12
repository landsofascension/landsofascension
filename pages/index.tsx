import React, { useState } from "react";
import Modal from "react-modal";
const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://cdn.discordapp.com/attachments/939309405227339776/1151175908661678151/grass-84622_1280.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="https://cdn.discordapp.com/attachments/1098664234335871068/1150462140541575268/Barracks.png"
        onClick={() => setIsModalOpen(true)}
      />

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Welcome to the Palace!</h2>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default LandingPage;
