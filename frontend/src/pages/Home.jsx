import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import CardComponent from "../components/CardComponent";
import sweetImages from "../constants/sweetImages";

function Home() {
  <CardComponent
  image="https://images.unsplash.com/photo-1606491956689-2ea866880c84"
  name="Test Sweet"
/>

//   const [sweets, setSweets] = useState([]);

//   useEffect(() => {
//     fetchSweets();
//   }, []);

//   const fetchSweets = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/sweets");
//       setSweets(res.data);
//     } catch (error) {
//       console.error("Error fetching sweets:", error);
//     }
//   };

//   const handlePurchase = (sweetId) => {
//     console.log("Purchase clicked for:", sweetId);
//     // later: call purchase API here
//   };

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Available Sweets</h2>

//       <Row className="g-4">
//         {sweets.map((sweet, index) => (
//           <Col key={sweet._id} xl={3} lg={4} md={6} sm={12}>
//             <CardComponent
//               image={sweetImages[index % sweetImages.length]}
//               name={sweet.name}
//               description={sweet.category}
//               price={sweet.price}
//               quantity={sweet.quantity}
//               onPurchase={() => handlePurchase(sweet._id)}
//             />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
}

export default Home;
