import { Container } from "./styles";
import { Button } from "../Button";
import { BiMinus, BiPlus } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/authContext";
import { api } from "../../services/api";

export function Card({ data, ...rest }) {
  const imageURL = `${api.defaults.baseURL}/files/mealFiles/${data.image}`;
  const navigate = useNavigate();
  const { user } = useAuth();
  const [counter, setCounter] = useState(1);
  const [favorite, setFavorite] = useState(false);

  const handleIncrease = () => {
    setCounter((count) => count + 1);
  };
  const handleDecrease = () => {
    if (counter > 1) {
      setCounter((count) => count - 1);
    }
  };
  const handleIncludeItemOnCart = () => {
    setCounter(1);
  };

  function handleEditMeal() {
    navigate(`/edit/${data.id}`);
  }

  return (
    <Container {...rest}>
      {!user.isAdmin ? (
        <button className="FavoriteMeal">
          <AiOutlineHeart />
        </button>
      ) : (
        <button className="EditMeal" onClick={handleEditMeal}>
          <AiOutlineEdit />
        </button>
      )}

      <img src={imageURL} alt={data.title} style={{ borderRadius: "50%", objectFit: 'cover' }} />

      <Link to={`/details/${data.id}`}>
        <h2>{data.title}</h2>
      </Link>

      <span>{data.description}</span>

      <h4>R$ {data.price}</h4>

      {!user.isAdmin && (
        <div className="AmountItemsAndBuy-wrapper">
          <div className="Amount">
            <button className="MinusItem" onClick={handleDecrease}>
              <BiMinus />
            </button>

            <span>{counter < 10 ? `0${counter}` : counter}</span>

            <button className="PlusItem" onClick={handleIncrease}>
              <BiPlus />
            </button>
          </div>
          <Button title="incluir" onClick={handleIncludeItemOnCart} />
        </div>
      )}
    </Container>
  );
}
