import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode, useColorModeValue } from './ui/color-mode';
import { IoIosMoon } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
        <Text
  fontSize={{ base: "12px", sm: "22px", md: "28px", lg: "34px" }}

  fontWeight="extrabold"
  textTransform="uppercase"
  textAlign="center"
  background="linear-gradient(to left, #7928CA, #FF0080)"
  backgroundClip="text"
  textFillColor="transparent" /* For better browser support */
>
<Link to={"/"}>Product Store 🛒</Link>
</Text>

<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
            <CiSquarePlus />
						</Button>
					</Link>
          <Button onClick={toggleColorMode}>
            {colorMode==="light"?<IoIosMoon />:<IoSunnyOutline />}
          </Button>
				</HStack>

      

    </Flex>
    </Container>
  )
}

export default Navbar
