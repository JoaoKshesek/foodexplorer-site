import { Container, Main, ButtonBack, Content, Tags, Tag } from "./style";
import { Header } from "../../components/Header/";
import { Footer } from "../../components/Footer/";
import { Button } from "../../components/Button/";
import { IoIosArrowBack } from "react-icons/io";
import { BiMinus, BiPlus } from "react-icons/bi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/authContext";

export function Details() {
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const imageURL =
    data && `${api.defaults.baseURL}/files/mealFiles/${data.image}`;

  function handleAddItem() {
    setQuantity(quantity + 1);
  }

  function handleRemoveItem() {
    setQuantity(quantity - 1);
    if (quantity == 1) {
      setQuantity(1);
    }
  }

  function handleGoToEditPage() {
    navigate(`/edit/${data.id}`);
  }

  useEffect(() => {
    async function fetchMeal() {
      const responseAPI = await api.get(`/meals/${params.id}`);
      setData(responseAPI.data);
    }

    fetchMeal();
  }, []);

  return (
    <Container>
      <Header />
      {data && (
        <Main>
          <ButtonBack>
            <Link to="/">
              <IoIosArrowBack size={32} />
              Voltar
            </Link>
          </ButtonBack>
          <Content>
            <img
              src={imageURL}
              alt="Imagem do prato"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <div className="details">
              <div className="details-wrapper">
                <h2>{data.title}</h2>
                <p>{data.description}</p>
              </div>
              <Tags>
                {data.ingredients.map((ingredient) => (
                  <Tag key={ingredient.id}>{ingredient.name}</Tag>
                ))}
              </Tags>
              <div className="AmountItemsAndBuy-wrapper">
                {!user.isAdmin ? (
                  <div className="Amount">
                    <button className="MinusItem" onClick={handleRemoveItem}>
                      <BiMinus />
                    </button>
                    <span>0{quantity}</span>
                    <button className="PlusItem" onClick={handleAddItem}>
                      <BiPlus />
                    </button>
                    <Button title={`incluir ∙ R$${data.price}`} />
                  </div>
                ) : (
                  <div className="Amount">
                    <Button title="Editar prato" onClick={handleGoToEditPage} />
                  </div>
                )}
              </div>
            </div>
          </Content>
        </Main>
      )}

      <Footer />
    </Container>
  );
}
