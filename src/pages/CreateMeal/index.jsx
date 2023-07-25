import {
  Container,
  Main,
  ButtonBack,
  Form,
  InputWrapper,
  TextArea,
  SectionIngredients,
  SendFormWithImage,
  Dropdown,
  IngredientsContainer,
  ButtonContainer,
} from "./styles";

import { Header } from "../../components/Header/";
import { Footer } from "../../components/Footer/";
import { Input } from "../../components/Input";
import { Ingredient } from "../../components/Ingredient";
import { Button } from "../../components/Button";
import { IoIosArrowBack } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";

export function CreateMeal() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("meal");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [imageFile, setImageFile] = useState(null);

  function handleAddIngredient() {
    setIngredients((prevState) => [...prevState, newIngredient]);
    setNewIngredient("");
  }

  function handleRemoveIngredient(ingredientDeleted) {
    setIngredients((prevState) =>
      prevState.filter((ingredient) => ingredient !== ingredientDeleted)
    );
  }

  async function handleCreateMeal() {
    if (!title) {
      return alert("Dígite o título do prato");
    }
    if (!price) {
      return alert("Adicione um preço ao prato");
    }
    if (!category) {
      return alert("Adicione uma categoria ao prato");
    }
    if (!description) {
      return alert(
        "Adicione uma descrição para o prato que deseja adicionar ao cardápio"
      );
    }
    if (newIngredient) {
      return alert("Você deixou um ingrediente no campo para adicionar");
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    ingredients.map((ingredient) => formData.append("ingredients", ingredient));
    api.post("/adminMeals", formData);
    alert("Prato cadastrado com sucesso");
    navigate("/");
  }

  return (
    <Container>
      <Header />
      <Main>
        <ButtonBack>
          <Link to="/">
            <IoIosArrowBack size={32} />
            Voltar
          </Link>
          <h2>Adicionar prato</h2>
        </ButtonBack>
        <Form>
          <InputWrapper>
            <SendFormWithImage>
              <div className="uploadImage">
                <label id="file" htmlFor="image">
                  Imagem do prato
                  <div className="uploadImageSelect">
                    <FiUpload size={24} />
                    <span>Selecione a imagem</span>
                    <input
                      id="image"
                      type="file"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </div>
                </label>
              </div>
            </SendFormWithImage>
            <Input
              label="name"
              title="Nome do prato"
              type="text"
              placeholder="Ex.: Salada Ceasar"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Dropdown>
              <label htmlFor="">Descrição</label>
              <select
                name="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="drink">Bebidas</option>
                <option value="meal">Refeições</option>
                <option value="dessert">Sobremesas</option>
              </select>
            </Dropdown>
          </InputWrapper>
          <InputWrapper>
            <IngredientsContainer>
              <label htmlFor="">Ingredientes</label>
              <SectionIngredients>
                {ingredients.map((ingredient, index) => (
                  <Ingredient
                    key={String(index)}
                    value={ingredient}
                    onClick={() => handleRemoveIngredient(ingredient)}
                  />
                ))}
                <Ingredient
                  isNew
                  placeholder="Adicionar"
                  onChange={(e) => setNewIngredient(e.target.value)}
                  value={newIngredient}
                  onClick={handleAddIngredient}
                />
              </SectionIngredients>
            </IngredientsContainer>
            <Input
              label="name"
              title="Preço"
              type="text"
              placeholder="R$ 00,00"
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputWrapper>
          <label htmlFor="">Descrição</label>
          <TextArea>
            <textarea
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </TextArea>
          <ButtonContainer>
            <Button
              style={{ width: 200, backgroundColor: "#AB4D55" }}
              className="addButton"
              title="Salvar alterações"
              onClick={handleCreateMeal}
            />
          </ButtonContainer>
        </Form>
      </Main>
      <Footer />
    </Container>
  );
}
