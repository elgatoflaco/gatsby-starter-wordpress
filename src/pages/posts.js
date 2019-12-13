import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ReactFancyBox from "react-fancybox"
import "react-fancybox/lib/fancybox.css"

class Posts extends Component {
  render() {
    function FeaturedImage(image) {
      if (!image) {
        return null
      }
      console.log(image)
      return (
        <div>
          <Img
            // srcSet={image.localFile.childImageSharp.fluid.srcSet}
            fluid={image.localFile.childImageSharp.fluid}
            alt=""
          />
          {/* <ReactFancyBox
            thumbnail={image.localFile.childImageSharp.resize.src}
            image={image.source_url}
          /> */}
        </div>
      )
    }

    const data = this.props.data
    console.log(data)
    return (
      <>
        <Layout>
          <SEO title="Posts" />
          <div>
            <h1>Pages</h1>
            {data.allWordpressPage.edges.map(({ node }) => (
              <div key={node.slug}>
                <Link to={node.slug}>
                  <h2>{node.title}</h2>
                  {FeaturedImage(node.featured_media)}
                </Link>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            ))}
          </div>

          <h1>Posts</h1>
          {data.allWordpressPost.edges.map(({ node }) => (
            <div key={node.slug}>
              <Link to={node.slug}>
                {/* <img src={node.jetpack_featured_media_url}/> */}
                <h2>{node.title}</h2>
                {FeaturedImage(node.featured_media)}
              </Link>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          ))}
        </Layout>
      </>
    )
  }
}

export default Posts

export const pageQuery = graphql`
  query {
    allWordpressPage {
      edges {
        node {
          id
          title
          excerpt
          slug
        }
      }
    }
    allWordpressPost {
      edges {
        node {
          title
          excerpt
          slug
          featured_media {
            source_url
            localFile {
              childImageSharp {
                fluid(maxWidth: 400, maxHeight: 250) {
                  ...GatsbyImageSharpFluid
                }
                resize(width: 400, height: 400, jpegProgressive: true) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
