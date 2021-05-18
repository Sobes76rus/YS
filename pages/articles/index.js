import getConfig from "next/config";
import Link from "next/link";
import { Container, Row, ListGroup, ListGroupItem } from "reactstrap";

export async function getServerSideProps() {
  const { publicRuntimeConfig } = getConfig();
  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();
  return {
    props: {
      navigation,
      title: "Блог",
      breadcrumbs: {
        title: "Блог",
        subtitle: "Блог",
        breadcrumbs: [
          {
            name: "Домой",
            link: "/",
            linkClass: "link-purple",
          },
          {
            name: "Все анкеты",
            active: true,
          },
        ],
      },
      fixedBottom: true,
    },
  };
}

const Index = (props) => {
  return (
    <>
      <Container>
        <Row>
          <ListGroup className="mt-5">
            <ListGroupItem>
              <Link href="articles/1">
                <a>Привет</a>
              </Link>
            </ListGroupItem>
            <ListGroupItem>
              <Link href="articles/2">
                <a>Пока</a>
              </Link>
            </ListGroupItem>
          </ListGroup>
        </Row>
      </Container>
    </>
  );
};

export default Index;
