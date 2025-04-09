import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "../data/CartContext";

export default function ProductCarousel({ products }) {
    const { addToCart } = useCart();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="w-full px-6 bg-black-100">
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className="px-3 ">
                        <ProductCard product={product} addToCart={addToCart} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
