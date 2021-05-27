import getConfig from "next/config";
import Image from "../../components/CustomImage";
import Link from "next/link";
import Post from "../../components/Post";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

export async function getStaticProps() {
  const { publicRuntimeConfig } = getConfig();
  const postsRes = await fetch(`${publicRuntimeConfig.API_URL}/posts`);
  const posts = await postsRes.json();
  const navRes = await fetch(`${publicRuntimeConfig.API_URL}/navigations`);
  const navigation = await navRes.json();
  return {
    props: {
      navigation,
      posts,
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

const Index = ({ posts }) => {
  const featuredPost = posts[0];
  return (
    <>
      {featuredPost && (
        <section className="position-relative py-6 mb-30px">
          {featuredPost.img && (
            <Image
              src={featuredPost.img.url}
              className="bg-image"
              alt={featuredPost.title}
              layout="fill"
            />
          )}
          <Container>
            <Row>
              <Col lg="6">
                <div className="bg-white p-5">
                  <strong className="text-uppercase text-muted d-inline-block mb-2 text-sm">
                    {featuredPost.subtitle}
                  </strong>
                  <h2 className="mb-3">{featuredPost.title}</h2>
                  <p className="text-muted">{featuredPost.content}</p>
                  <Link href="/blog/[slug]" as={`/blog/${featuredPost.slug}`}>
                    <a className="btn btn-link text-dark p-0">
                      Continue reading{" "}
                      <i className="fa fa-long-arrow-alt-right" />
                    </a>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
      <section>
        <Container>
          <Row>
            {posts &&
              posts.map((post, index) => {
                // the first post is featured
                if (index >= 1) {
                  return (
                    <Col xs="6" lg="4" key={index}>
                      <Post data={post} />
                    </Col>
                  );
                }
              })}
          </Row>

          <Pagination
            aria-label="Blog pagination"
            listClassName="d-flex justify-content-between mt-3 mb-5"
          >
            <PaginationItem>
              <PaginationLink href="#" className="page-link text-sm">
                <i className="fa fa-chevron-left mr-2" />
                Older posts
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="disabled">
              <PaginationLink href="#" className="page-link text-sm">
                Newer posts
                <i className="fa fa-chevron-right ml-2" />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Container>
      </section>
    </>
  );
};

export default Index;
