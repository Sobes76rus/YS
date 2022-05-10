import getConfig from "next/config";
import Link from "next/link";
import Image from "../components/CustomImage";
import { Container, Row, Col } from "reactstrap";

export async function getStaticProps() {
  const { publicRuntimeConfig } = getConfig();
  const contactsPhotosRes = await fetch(
    `${publicRuntimeConfig.API_URL}/contacts-photos`
  );
  const contactsPhotos = await contactsPhotosRes.json();
  const ceoPagesRes = await fetch(`${publicRuntimeConfig.API_URL}/ceo-pages`);
  const ceoPages = await ceoPagesRes.json();
  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();
  const servicesRes = await fetch(
    `${publicRuntimeConfig.API_URL}/uslugi-groups`
  );
  const ceoPagesGroupsRes = await fetch(
    `${publicRuntimeConfig.API_URL}/ceo-pages-groups`
  );
  const ceoPagesGroups = await ceoPagesGroupsRes.json();
  const services = await servicesRes.json();
  return {
    props: {
      fixedBottom: true,
      navbarHoverLight: true,
      headerAbsolute: true,
      bgHoverPurple: true,
      marginBottom: true,
      contactsPhotos,
      navigation,
      services,
      ceoPages,
      ceoPagesGroups,
      title: "Контакты",
      breadcrumbs: {
        title: "Контакты",
        subtitle: "Контакты",
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
            name: "Контакты",
            active: true,
          },
        ],
      },
    },

    revalidate: 60,
  };
}

const Contacts = (props) => {
  const { contactsPhotos } = props;

  return (
    <Container fluid className="p-0">
      <section className="mh-full-screen dark-overlay py-7 d-flex align-items-center justify-content-center">
        <Image
          className="bg-contain"
          src={contactsPhotos[0].image.url}
          alt={contactsPhotos[0].image.name}
          layout="fill"
        />
        <div className="overlay-content w-100">
          <Container>
            <Row>
              <Col xl="6" className="text-white">
                <h6 className="text-uppercase text-white letter-spacing-5">
                  РАБОТА ДЛЯ ТРАНССЕКСУАЛОК
                </h6>

                <p className="text-lg">
                  У нас всегда есть работа для транссексуалок 24/7.
                  <br />
                  <br />
                  Все анкеты проходят обязательную проверку на подлинность. На
                  нашем сайте нет автоматического размещения анкеты. Мы сами
                  обрабатываем анкеты и создаём анкеты транссексуалок. Для нас
                  важно отсутствие фейковых фотографии. Внимание, мы размещаем
                  анкеты транссексуалок. Трансвеститов мы не размещаем.
                  <br />
                  <br />
                  Если Вы хотите разместить вашу анкету на нашем сайте,
                  отправьте нам сообщение на эл. адрес:{" "}
                  <Link href="mailto:your.seduction.us@protonmail.com">
                    <a className="text-contacts">
                      your.seduction.us@protonmail.com
                    </a>
                  </Link>
                  <br />
                  <br />
                  Мы поможем Вам в проведении профессиональных фотосессий для
                  разных целей. Если Вы хотите заказать профессиональную
                  фото-сессию, отправьте нам сообщение на эл. адрес:{" "}
                  <Link href="mailto:your.seduction.us@protonmail.com">
                    <a className="text-contacts">
                      your.seduction.us@protonmail.com
                    </a>
                  </Link>
                  <br />
                  <br />
                  ВНИМАНИЕ: с 2021 года мы не размещаем в анкетах фотографии
                  порнографического характера.
                </p>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="text-center text-md-left">
                <svg className="svg-icon svg-icon-light text-primary w-3rem h-3rem mb-3 ">
                  <use
                    className="text-white"
                    xlinkHref="/icons/orion-svg-sprite.svg#navigation-map-1"
                  ></use>
                </svg>
                <h4 className="ff-base text-white">Адрес</h4>
                <p className="text-contacts w-30 ">Москва, Кремль</p>
              </Col>

              <Col md="4" className="text-center text-md-left">
                <svg className="svg-icon svg-icon-light text-primary w-3rem h-3rem mb-3">
                  <use
                    className="text-white"
                    xlinkHref="/icons/orion-svg-sprite.svg#mail-1"
                  ></use>
                </svg>
                <h4 className="ff-base text-white">Почта</h4>

                <Link href="mailto:your.seduction.us@protonmail.com">
                  <a className="text-contacts">
                    your.seduction.us@protonmail.com
                  </a>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Container>
  );
};

export default Contacts;
