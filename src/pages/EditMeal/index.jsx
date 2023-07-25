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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function EditMeal() {
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
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
  async function handleDeleteMeal() {
    const confirm = window.confirm(
      "Deseja realmente deletar o prato do cardápio?"
    );

    if (confirm) {
      await api.delete(`/adminMeals/${params.id}`);
      navigate('/');
    }
  }

  async function handleEditMeal() {
    if (!imageFile) {
      return alert("Adicione uma imagem para o prato");
    }
    if (!title) {
      return alert("Adicione um titulo para o prato");
    }
    if (!description) {
      return alert("Adicione uma descrição para o prato");
    }
    if (!category) {
      return alert("Adicione um categoria para o prato");
    }
    if (!price) {
      return alert("Adicione um preço para o prato");
    }
    if (newIngredient) {
      return alert(
        "Você deixou um ingrediente no campo para adicionar, mas não clicou em adicionar.Clique para adicionar ou deixe o campo vazio."
      );
    }
    api.put(`/adminMeals/${params.id}`, {
      title,
      description,
      price,
      category,
      ingredients,
    });
    const formData = new FormData();
    formData.append("image", imageFile);
    api.patch(`/adminMeals/mealImage/${params.id}`, formData);
    alert("Prato modificado com sucesso");
    navigate("/");
  }

  useEffect(() => {
    async function fetchMeal() {
      const response = await api.get(`/meals/${params.id}`);
      const { title, description, category, price, ingredients, imageFile } =
        response.data;
      setTitle(title);
      setDescription(description);
      setCategory(category);
      setPrice(price);
      setIngredients(ingredients.map((ingredient) => ingredient.name));
      setImageFile(image);
    }
    fetchMeal();
  }, []);

  return (
    <Container>
      <Header />
      <Main>
        <ButtonBack>
          <Link to="/">
            <IoIosArrowBack size={32} />
            Voltar
          </Link>
          <h2>Editar prato</h2>
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
              value={title}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputWrapper>
          <label htmlFor="">Descrição</label>
          <TextArea>
            <textarea
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </TextArea>

          <ButtonContainer>
          <Button
              style={{ width: 200, backgroundColor: "#0D161B" }}
              className="addButton"
              title="Excluir prato"
              onClick={handleDeleteMeal}
            />
            <Button
              style={{ width: 200, backgroundColor: "#AB4D55" }}
              className="addButton"
              title="Salvar alterações"
              onClick={handleEditMeal}
            />
          </ButtonContainer>
        </Form>
      </Main>

      <Footer />
    </Container>
  );
}