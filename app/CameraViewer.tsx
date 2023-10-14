import React, { useState } from "react"

const containerStyle: React.CSSProperties = {
  width: "1280px",
  height: "1280px",
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
  width: "1280px",
  height: "1280px",
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
          (1280 - window.innerWidth) / 2 > 0
            ? (1280 - window.innerWidth) / 2
            : 0,
          Math.max(prevPosition.x + deltaX, (-1280 + window.innerWidth) / 2) // divided by two because the map is in the center of the screen
        )
        const newY = Math.min(
          0,
          Math.max(prevPosition.y + deltaY, -1280 + window.innerHeight)
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
          (1280 - window.innerWidth) / 2 > 0
            ? (1280 - window.innerWidth) / 2
            : 0,
          Math.max(prevPosition.x + deltaX, (-1280 + window.innerWidth) / 2) // divided by two because the map is in the center of the screen
        )
        const newY = Math.min(
          0,
          Math.max(prevPosition.y + deltaY, -1280 + window.innerHeight)
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
      >
        {/* Palace Button */}
        <span
          sx={{
            position: "absolute",
            top: "30%",
            left: "40%",
            width: "386px",
            height: "356px",
            borderRadius: "15%",
            background: "rgb(0 0 0 / 15%)",
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
            top: "1%",
            left: "15%",
            width: "146px",
            height: "126px",
            borderRadius: "15%",
            background: "rgb(0 0 0 / 15%)",
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
            top: "1%",
            right: "1%",
            width: "146px",
            height: "113px",
            borderRadius: "15%",
            background: "rgb(0 0 0 / 15%)",
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
            bottom: "11%",
            right: "5%",
            width: "234px",
            height: "166px",
            borderRadius: "15%",
            background: "rgb(0 0 0 / 15%)",
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
            bottom: "3%",
            left: "9%",
            width: "232px",
            height: "162px",
            borderRadius: "15%",
            background: "rgb(0 0 0 / 15%)",
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
