import { Container, Row, Col } from "reactstrap";
import Hero from "../../components/Hero";
import Image from "../../components/CustomImage";
import getConfig from "next/config";
import ReactMarkdown from "react-markdown";

export async function getServerSideProps({ query }) {
  const postSlug = query["id"];

  const { publicRuntimeConfig } = getConfig();
  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();
  const servicesRes = await fetch(
    `${publicRuntimeConfig.API_URL}/uslugi-groups`
  );
  const services = await servicesRes.json();
  const ceoPagesRes = await fetch(`${publicRuntimeConfig.API_URL}/ceo-pages`);
  const ceoPages = await ceoPagesRes.json();
  const ceoPagesGroupsRes = await fetch(
    `${publicRuntimeConfig.API_URL}/ceo-pages-groups`
  );
  const ceoPagesGroups = await ceoPagesGroupsRes.json();

  const postRes = await fetch(
    `${publicRuntimeConfig.API_URL}/posts/?slug=${postSlug}`
  );
  const post = await postRes.json();

  return {
    props: {
      navigation,
      ceoPages,
      ceoPagesGroups,
      services,
      post,
      navbarHoverLight: true,
      headerAbsolute: true,
      bgHoverPurple: true,
      fixedBottom: true,

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
            name: "Все статьи",
            link: "/articles",
            linkClass: "link-purple",
          },
          {
            name: post[0].title,
            active: true,
          },
        ],
      },
      textCenter: true,
    },
  };
}

export default function Blog(props) {
  const { post } = props;
  const heroProps = {
    textCenter: props.textCenter,
  };

  return (
    <Container>
      <section className="py-6 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col xl="10" className="mx-auto">
              <Hero
                title={post[0].title}
                breadcrumbs={props.breadcrumbs.breadcrumbs}
                {...heroProps}
              />
              <Image
                src={post[0].img.url}
                alt=""
                className="img-fluid mb-5"
                width={1000}
                height={667}
                sizes="100vw"
              />
            </Col>
          </Row>
          <Row>
            <Col lg="10" xl="8" className="mx-auto">
              <div
                className="lead mb-5 text-left"
                // dangerouslySetInnerHTML={{
                //   __html: `<p>${post[0].content}</p>`,
                // }}
              >
                <ReactMarkdown children={post[0].content} />
              </div>
            </Col>
          </Row>

          {/* <Row>
            <Col xl="8" lg="10" className="mx-auto">
              <div
                className="text-content text-lg"
                dangerouslySetInnerHTML={{ __html: post[0].content }}
              ></div>
            </Col>
          </Row> */}
        </Container>
      </section>
    </Container>
  );
}
