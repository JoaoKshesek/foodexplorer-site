import { Container } from "./styles";
import { TbReceipt } from "react-icons/tb";

export function HeaderButton({ title, isAdmin, ...rest }) {
  return (
    <>
      {isAdmin ? (
        <Container to="/create" {...rest}>
          {title}
        </Container>
      ) : (
        <Container {...rest}>
          <TbReceipt />
          {title}
        </Container>
      )}
    </>
  );
}
