import { Box, Button, Heading, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { useColorModeValue } from "./ui/color-mode";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
  const inputBorderColor = useColorModeValue("gray.300", "whiteAlpha.800");


  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      variant: "solid",
      className: success ? "bg-green-500 text-white" : "bg-red-500 text-white",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdate = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    if (success) {
      toaster.create({
        title: "Success",
        description: "Product updated successfully",
        variant: "solid",
        className: "bg-green-500 text-white",
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    } else {
      toaster.create({
        title: "Error",
        description: message,
        variant: "solid",
        className: "bg-red-500 text-white",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={isEditing ? "0 0 15px rgba(0, 123, 255, 0.5)" : "lg"}
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      display="flex"
      bg={bg}
      flexDirection="column"
      m={4}
      border={isEditing ? "2px solid blue" : "none"} // Highlight the edited card with a border
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
      <Box p={4}>
        {isEditing ? (
          <VStack spacing={2}>
            <Input
      value={updatedProduct.name}
      onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
      borderColor={inputBorderColor} // Apply dynamic border color
    />
    <Input
      type="number"
      value={updatedProduct.price}
      onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
      borderColor={inputBorderColor} // Apply dynamic border color
    />
            <Button colorScheme="blue" onClick={handleUpdate}>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </VStack>
        ) : (
          <>
            <Heading as="h3" size="md" mb={2}>
              {product.name}
            </Heading>
            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
              ${product.price}
            </Text>

            <HStack spacing={2} justifyContent="flex-end">
              <Box
                p={2}
                bg="blue.400"
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: "blue.600" }}
                onClick={() => setIsEditing(true)}
              >
                <FaEdit fontSize="20px" color="white" />
              </Box>

              <Box
                p={2}
                bg="red.400"
                borderRadius="md"
                cursor="pointer"
                _hover={{ bg: "red.600" }}
                onClick={() => handleDeleteProduct(product._id)}
              >
                <MdDelete fontSize="20px" color="white" />
              </Box>
            </HStack>
          </>
        )}
      </Box>
      <Toaster />
    </Box>
  );
};

export default ProductCard;
