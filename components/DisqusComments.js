import {DiscussionEmbed} from "disqus-react"
const DisqusComments = ({ product, query }) => {
  
  const disqusShortname = "https-yourseduction-us-2";
  const disqusConfig = {
    url: `https://yourseduction.us/persons/${query}`,
    identifier: product.id,
    title: product.name,
  };

  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
export default DisqusComments;