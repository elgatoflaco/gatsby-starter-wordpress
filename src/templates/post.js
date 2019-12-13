import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import ReactFancyBox from "react-fancybox"
import "react-fancybox/lib/fancybox.css"
import Layout from "../components/layout"
import SEO from "../components/seo"

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
            <ReactFancyBox
              thumbnail={item.localFile.childImageSharp.resize.src}
              image={item.source_url}
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
          <ReactFancyBox
            thumbnail={image.localFile.childImageSharp.resize.src}
            image={image.source_url}
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
          {Galeria(post.acf.galeria)}
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
