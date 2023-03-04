import Hero from "@/components/hero";
import ContainerLayout from "@/layout/containerLayout";
import IntroCard, { Direction } from "@/components/intro-card";

export default function Home() {
    const restaurantIntro = [
        "Welcome to our restaurant, where we specialize in the art of Chinese bun making. Our team of skilled and experienced Chinese bun chefs are dedicated to creating the perfect bun for every occasion. Whether you're in the mood for a savory pork bun or a sweet red bean paste bun, we have something to satisfy your cravings.",
        "Our buns are made with the finest ingredients and a passion for traditional Chinese cuisine. Our chefs pay attention to every detail, from the soft and fluffy texture of the dough to the flavors of the fillings. We take pride in our ability to mix and match flavors to create a delicious taste experience.",
        "We understand the demands of a busy kitchen, which is why our chefs work efficiently to bring you the freshest buns in a timely manner. Our workspace is always kept clean and organized, ensuring that each bun is made to the highest standards.",
        "So come and join us for a taste of authentic Chinese buns. We guarantee that you will be pleasantly surprised by the flavors and textures that our chefs have to offer.",
    ];

    const chefIntro = [
        "Chef Wang is a master of Chinese cuisine who has dedicated his life to perfecting the art of cooking. With years of experience in the kitchen, Chef Wang has developed a keen sense of flavor and a passion for creating delicious and authentic dishes. He is known for his innovative and artistic approach to cooking, combining traditional recipes with a contemporary twist.",
        "At our restaurant, Chef Wang leads a team of talented chefs who share his passion for cooking. He is always experimenting with new ingredients and techniques to create unique and exciting dishes. Whether it's crafting the perfect pork bun or slow-braising a savory beef dish, Chef Wang puts his heart and soul into every dish that he prepares.",
        "We are proud to have Chef Wang as the head chef of our kitchen. With his exceptional skills and dedication to the craft, he continues to amaze diners with his innovative and delicious creations. Come and taste the artistry of Chef Wang's cooking today!",
    ];

    return (
        <>
            <Hero />
            <main>
                <ContainerLayout>
                    <IntroCard
                        title="Our restaurant"
                        imageSrc="overhead.jpg"
                        alt="about our restaurant"
                        direction={Direction.Left}
                        desc={restaurantIntro}
                    />

                    <IntroCard
                        title="Our head chef"
                        imageSrc="chef.jpg"
                        alt="chef Wang"
                        direction={Direction.Right}
                        desc={chefIntro}
                        textAlign={Direction.Left}
                    />
                </ContainerLayout>
            </main>
        </>
    );
}
