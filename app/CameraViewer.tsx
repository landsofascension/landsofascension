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
}

const CameraViewer: React.FC<CameraViewerProps> = ({
  imageUrl,
  // @TODO improve way of passing this down
  openPalaceModal,
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
      >
        <span
          sx={{
            position: "absolute",
            top: 800,
            left: 1080,
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            background: "rgb(222 145 60 / 64%)",
            border: "1px solid rgb(222 145 60)",
            zIndex: 1,
            cursor: "pointer",
          }}
          onClick={() => openPalaceModal()}
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
