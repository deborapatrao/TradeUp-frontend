import React from "react";
import { Image, Center } from "native-base";
const Carousel = () => {
	return (
		<>
            <Center>
                <Image
                    source={require("../../assets/images/placeholders/ph-carousel.png")}
                    alt="carousel"
                    height={200}
                    width="100%"
                    mb={4}
                />
            </Center>
		</>
	);
};

export default Carousel;
