import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from '@/store/product';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Toaster, toaster } from "@/components/ui/toaster";


const CreatePage = () => {
  const [newProduct,setNewProduct]=useState({
    name:"",
    price:"",
    image:""
  });



  const {createProduct} = useProductStore()
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
    });
    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
    }
  };
 
  return (
    <Container maxW={"container.sm"} size={"2xl"} textAlign={"center"} mb={8}>
      <VStack 
      spacing={8}>
        <Heading as={"h1"} >
          Create New Product
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white","gray.800")}
        p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
            placeholder='Product Name'
            name='name'
            value={newProduct.name}
            onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}
            />
            <Input
            placeholder='Price'
            name='price'
            type='number'
            value={newProduct.price}
            onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}
            />
            <Input
            placeholder='Image URL'
            name='image'
            value={newProduct.image}
            onChange={(e)=>setNewProduct({...newProduct,image:e.target.value})}
            />
            <Button w={"full"} bg={"blue.400"} onClick={handleAddProduct}>
              Add Product
            </Button>
            <Toaster />
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage