import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Lightbox from '../components/lightbox'

class Post extends Component {
  render() {
    function Galeria(list) {
      if (!list) {
        return null
      }
      console.log(list)
      return (
        <div>
          {list.map(item => (
            <Img
            fluid={item.localFile.childImageSharp.fluid}
            alt=""
          />
          ))}
        </div>
      )
    }
    function FeaturedImage(image) {
      if (!image) {
        return null
      }
      console.log(image)
      return (
        <div>
          <Img
            fluid={image.localFile.childImageSharp.fluid}
            alt=""
          />
        </div>
      )
    }

    const post = this.props.data.wordpressPost

    return (
      <>
        <Layout>
          <SEO title={post.title} />
          <h1>{post.title}</h1>
          {FeaturedImage(post.featured_media)}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          {/* {Galeria(post.acf.galeria)} */}
          <Lightbox images={post.acf.galeria} />
        </Layout>
      </>
    )
  }
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default Post

export const postQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      featured_media {
        source_url
        localFile {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 250) {
              ...GatsbyImageSharpFluid
            }
            resize(width: 200, height: 200) {
              src
            }
          }
        }
      }
      acf {
        galeria {
          source_url
          localFile {
            childImageSharp {
              sizes(maxWidth: 1800) {
                ...GatsbyImageSharpSizes
              }
              fluid(maxWidth: 400, maxHeight: 250) {
                ...GatsbyImageSharpFluid
              }
              resize(width: 200, height: 200) {
                src
              }
            }
          }
        }
      }
    }
  }
`
