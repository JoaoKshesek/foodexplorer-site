import { Container, Main } from "./styles";
import { Header } from "../../components/Header/";
import { Footer } from "../../components/Footer/";
import { Card } from "../../components/Card/";
import { Section } from "../../components/Section/";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import bannerIMG from "../../assets/main_image.png";

export function Home() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchMeals() {
      const response = await api.get(`/meals?title=${search}`);
      setMeals(response.data);
    }
    fetchMeals();
  }, [search]);
  return (
    <Container>
      <Header search={setSearch} />
      <Main>
        <section className="Banner">
          <img src={bannerIMG} alt="Macarrons" />
          <div className="Banner-background">
            <div>
              <h2>Sabores inigualáveis</h2>
              <span>
                Sinta o cuidado do preparo com ingredientes selecionados
              </span>
            </div>
          </div>
        </section>
        {meals.filter((meal) => meal.category == "meal").length > 0 && (
          <Section type="Refeições">
            {meals
              .filter((meal) => meal.category == "meal")
              .map((meal) => (
                <Card key={String(meal.id)} data={meal} />
              ))}
          </Section>
        )}
        {meals.filter((meal) => meal.category == "dessert").length > 0 && (
          <Section type="Sobremesa">
            {meals
              .filter((meal) => meal.category == "dessert")
              .map((meal) => (
                <Card key={String(meal.id)} data={meal} />
              ))}
          </Section>
        )}
        {meals.filter((meal) => meal.category == "drink").length > 0 && (
          <Section type="Bebidas">
            {meals
              .filter((meal) => meal.category == "drink")
              .map((meal) => (
                <Card key={String(meal.id)} data={meal} />
              ))}
          </Section>
        )}
      </Main>
      <Footer />
    </Container>
  );
}
