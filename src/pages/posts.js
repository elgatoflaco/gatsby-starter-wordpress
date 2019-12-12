import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

class Posts extends Component {
  render() {
    const data = this.props.data

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
                </Link>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            ))}
          </div>

          <h1>Posts</h1>
          {data.allWordpressPost.edges.map(({ node }) => (
            <div key={node.slug}>
              <Link to={node.slug}>
                  <img src={node.jetpack_featured_media_url}/>
                <h2>{node.title}</h2>
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
          jetpack_featured_media_url
        }
      }
    }
  }
`
