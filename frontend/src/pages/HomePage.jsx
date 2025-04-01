import { useProductStore } from '@/store/product';
import { Container, Heading, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react';
import { Card } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {

  const {fetchProducts,products} = useProductStore();
  useEffect(()=>{
    fetchProducts();
  },[fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
      <Text
      fontSize={{ base: "4px", sm: "12px", md: "18px", lg: "24px" }}

      fontWeight="extrabold"
      fontFamily="'Poppins', sans-serif"
      textTransform="uppercase"
      textAlign="center"
      background="linear-gradient(to left,#00C9FF, #92FE9D)"
      backgroundClip="text"
      textFillColor="transparent" /* For better browser support */>
        Current Products 🚀
        </Text><br></br>
        
        <SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
          spacing={6}
					w={"full"}
				>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>

        {products.length ===0 && (
        <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
            <Link href={"/create"}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
						  Create a product
            </Text>
            </Link>
					</Text>
          )}
      
      </VStack>
    </Container>
  )
}

export default HomePage