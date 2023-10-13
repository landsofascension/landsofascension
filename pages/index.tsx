import { Box, Button, Flex, Heading, Image, Link, Text } from "theme-ui"

const Home = () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: ["center"],
        justifyContent: ["start", "center"],
        height: "100vh",
        width: "100vw",
        backgroundImage:
          'url("https://cdn.discordapp.com/attachments/1152274140141735936/1161472438501113886/bg-loa.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "auto",
      }}
    >
      <Image
        src="https://cdn.discordapp.com/attachments/1152274140141735936/1161823697456332880/loa_title_dark.png"
        alt="Lands of Ascension"
        sx={{ width: ["300", "500px"], my: 2, mx: ["8px", "0"] }}
      />

      <Text
        sx={{
          color: "black",
          textAlign: "center",
          borderRadius: "10px",
          border: "3px solid #615819",
          fontWeight: "bold",
          // black background using hex value with 50% opacity
          backgroundColor: "rgb(128, 128, 128, 0.9)",
          textShadow:
            "1px 1px 0 #615819, -1px -1px 0 #615819, 1px -1px 0 #615819, -1px 1px 0 #615819",
          fontSize: ["26px", "48px"],
          fontFamily: "devinne",
          mt: ["0", "16px"],

          px: ["4px", "16px"],
        }}
      >
        Collect, Upgrade, and Ascend!
      </Text>
      <Button
        sx={{
          width: ["156px", "213px"],
          height: ["60px", "80px"],
          backgroundColor: "transparent",
          mb: ["0px", "16px"],
        }}
      >
        <Link
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          href="/game"
        >
          <Image
            src="https://cdn.discordapp.com/attachments/1152274140141735936/1162437083688870030/play_button.png"
            alt="Feature 1"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Link>
      </Button>

      <Flex
        sx={{
          flexDirection: ["column", "row"],
          alignItems: "stretch",
          justifyContent: "stretch",
          maxWidth: "1200px",
          width: "100%",
          px: 4,
          gap: ["8px"],
        }}
      >
        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            mb: [1, 0],
            backgroundImage:
              'url("https://cdn.discordapp.com/attachments/1152274140141735936/1162405178545287208/no_border_sidebox.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            p: ["2", "4"],
            borderRadius: "10px",
            border: "3px solid #615819",
            filter: "brightness(1.1)",
            mx: ["0", "16px"],
          }}
        >
          <Text
            sx={{
              color: "black",
              fontSize: ["18px", "22px"],
              fontWeight: "bold",
              mb: 2,
              fontFamily: "sans-serif",
              px: ["4px", "16px"],
            }}
          >
            Collect VALOR, upgrade your Palace, harvest resoures and Ascend!
          </Text>
          <Image
            src="https://cdn.discordapp.com/attachments/1152274140141735936/1161672994096152576/palace.png"
            alt="Feature 1"
            sx={{
              width: ["100px", "200px"],
              m: 2,
              borderRadius: "5px",
              borderColor: "black",
              borderStyle: "inset",
              p: "4px",
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            mb: [1, 0],
            backgroundImage:
              'url("https://cdn.discordapp.com/attachments/1152274140141735936/1162405178545287208/no_border_sidebox.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            p: ["2", "4"],
            borderRadius: "10px",
            border: "3px solid #615819",
            filter: "brightness(1.1)",
            mx: ["0", "16px"],
          }}
        >
          <Text
            sx={{
              color: "black",
              fontSize: ["18px", "22px"],
              fontWeight: "bold",
              fontFamily: "sans-serif",
              px: "16px",
            }}
          >
            Built using the speed, security, and transparency of the Solana
            blockchain!
          </Text>
          <Image
            src="https://cdn.discordapp.com/attachments/1152274140141735936/1162147074230452234/solanaLogoMark.png"
            alt="Feature 1"
            sx={{
              width: ["100px", "200px"],
              m: 2,
              backgroundColor: "black",
              borderRadius: "5px",
              borderColor: "black",
              borderStyle: "inset",
              p: "4px",
              mt: ["0", "20px"],
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            mb: [1, 0],
            backgroundImage:
              'url("https://cdn.discordapp.com/attachments/1152274140141735936/1162405178545287208/no_border_sidebox.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            p: ["2", "4"],
            borderRadius: "10px",
            border: "3px solid #615819",
            filter: "brightness(1.1)",
            mx: ["0", "16px"],
          }}
        >
          <Text
            sx={{
              color: "black",
              fontSize: ["18px", "22px"],
              fontStyle: "underline",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              px: "16px",
            }}
          >
            <u>NO Wallet Needed!</u>
          </Text>
          <Text
            sx={{
              color: "black",
              fontSize: ["18px", "22px"],
              fontWeight: "bold",
              fontFamily: "sans-serif",
              px: "16px",
            }}
          >
            Bridging the gap between Web2 and Web3!
          </Text>
          <Image
            src="https://cdn.discordapp.com/attachments/1152274140141735936/1162444341701259264/bridge.png"
            alt="Feature 1"
            sx={{
              width: ["100px", "200px"],
              m: 2,
              borderRadius: "5px",
              borderColor: "black",
              borderStyle: "inset",
              p: "4px",
            }}
          />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Home
