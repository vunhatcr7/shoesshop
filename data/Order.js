import af1 from "../assets/img/af1.jpg";
import tripleS from "../assets/img/tripleS.jpg";
import samba from "../assets/img/samba.avif";
import ultraboost from "../assets/img/ultraboost.jpg";
import Jd1 from "../assets/img/jd1b.jpg";
import RSX from "../assets/img/PUMARSX.jpg";


const orders = [
    {
        id: 1,
        date: "2024-03-26",
        status: "Đã giao",
        products: [
            { name: "Nike Air Force 1", price: "2,500,000 VND" , image: af1, rating: null},
            { name: "Adidas Ultra Boost", price: "4,500,000 VND", image: ultraboost, rating: null }
        ],
        total: "7,000,000 VND"
    },
    {
        id: 2,
        date: "2024-03-25",
        status: "Đang xử lý",
        products: [
            { name: "Puma RS-X", price: "3,200,000 VND" , image: RSX, rating: null }
        ],
        total: "3,200,000 VND"
    },
    {
        id: 3,
        date: "2024-02-25",
        status: "Đã giao",
        products: [
            { name: "Balenciaga TripleS", price: "8,000,000 VND" , image: tripleS, rating: null },
            { name: "Adidas Samba", price: "5,000,000 VND" , image: samba, rating: null },
            { name: "Jordan 1 High", price: "4,500,000 VND" , image: Jd1, rating: null }
        ],
        total:  "17,500,000 VND"
    }
];

export default orders;
