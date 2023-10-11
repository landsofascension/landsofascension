import React, { useState } from "react"

const containerStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  position: "relative",
  userSelect: "none",
}

const cameraStyle: React.CSSProperties = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const imageStyle: React.CSSProperties = {
  width: "2048px",
  height: "2048px",
  maxWidth: "none",
  objectFit: "contain",
  userSelect: "none",
}

interface CameraViewerProps {
  imageUrl: string
  openPalaceModal: () => void
  openLumbermillModal: () => void
  openMineModal: () => void
  openBarracksModal: () => void
  openMerchantModal: () => void
}

const CameraViewer: React.FC<CameraViewerProps> = ({
  imageUrl,
  // @TODO improve way of passing this down
  openPalaceModal,
  openLumbermillModal,
  openMineModal,
  openBarracksModal,
  openMerchantModal,
}) => {
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y

      setCameraPosition((prevPosition) => {
        const newX = Math.min(
          0,
          Math.max(prevPosition.x + deltaX, -2048 + window.innerWidth)
        )
        const newY = Math.min(
          0,
          Math.max(prevPosition.y + deltaY, -2048 + window.innerHeight)
        )
        return {
          x: newX,
          y: newY,
        }
      })
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0]
      const deltaX = touch.clientX - dragStart.x
      const deltaY = touch.clientY - dragStart.y

      setCameraPosition((prevPosition) => {
        const newX = Math.min(
          0,
          Math.max(prevPosition.x + deltaX, -2048 + window.innerWidth)
        )
        const newY = Math.min(
          0,
          Math.max(prevPosition.y + deltaY, -2048 + window.innerHeight)
        )
        return {
          x: newX,
          y: newY,
        }
      })
      setDragStart({ x: touch.clientX, y: touch.clientY })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          ...cameraStyle,
          transform: `translate(${cameraPosition.x}px, ${cameraPosition.y}px)`,
        }}
      >{/* Palace Button */}
        <span
          sx={{
            position: "absolute",
            top: 550,
            left: 830,
            width: "596px",
            height: "596px",
            borderRadius: "15%",
            zIndex: 1,
            cursor: "pointer",
            ":hover": {
              background: "rgb(0 0 0 / 36%)",
            },
          }}
          onClick={() => openPalaceModal()}
        ></span>
        {/* Lumbermill Button */}
        <span
          sx={{
            position: "absolute",
            top: 1,
            left: 330,
            width: "196px",
            height: "196px",
            borderRadius: "15%",
            background: "transparent",
            zIndex: 1,
            cursor: "pointer",
            ":hover": {
              background: "rgb(0 0 0 / 34%)",
            },
          }}
          onClick={() => openLumbermillModal()}
        ></span>
        {/* Mine Button */}
        <span
          sx={{
            position: "absolute",
            top: 1,
            left: 1860,
            width: "166px",
            height: "166px",
            borderRadius: "15%",
            background: "transparent",
            zIndex: 1,
            cursor: "pointer",
            ":hover": {
              background: "rgb(0 0 0 / 34%)",
            },
          }}
          onClick={() => openMineModal()}
        ></span>
        {/* Barracks Button */}
        <span
          sx={{
            position: "absolute",
            top: 1520,
            left: 1570,
            width: "424px",
            height: "296px",
            borderRadius: "15%",
            zIndex: 1,
            cursor: "pointer",
            ":hover": {
              background: "rgb(0 0 0 / 34%)",
            },
          }}
          onClick={() => openBarracksModal()}
        ></span>
        {/* Merchant Button */}
        <span
          sx={{
            position: "absolute",
            top: 1730,
            left: 175,
            width: "372px",
            height: "272px",
            borderRadius: "15%",
            zIndex: 1,
            cursor: "pointer",
            ":hover": {
              background: "rgb(0 0 0 / 34%)",
            },
          }}
          onClick={() => openMerchantModal()}
        ></span>
        <img
          src={imageUrl}
          alt="Large Image"
          style={imageStyle}
          draggable="false" // Disable default drag behavior
          onDragStart={() => false} // Disable default drag behavior
        />
      </div>
    </div>
  )
}

export default CameraViewer
