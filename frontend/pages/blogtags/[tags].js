import { GET_BLOGTAGS_QUERY, GETBLOG_BY_ID_QUERY } from "../../queries/blogquery";
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import { useRouter } from "next/router";
import { Container, Card } from "react-bootstrap";
import Link from "next/link";
import { getImage } from "../../utills/helpers";
import { useSelector } from "react-redux";
import ShopProducts from "../../components/shoppage/shopProducts"
import { useState, useEffect } from "react";
const BlogsTags = ({ blogTagByUrl }) => {
    const blogTag = useSelector(state => state.blogtags)
    // console.log("blogTag", blogTag)

    const router = useRouter();
    const [blogTagsDetail, setBlogTagsDetail] = useState([])

    useEffect(() => {
        setBlogTagsDetail(blogTagByUrl)
    }, [blogTagByUrl])

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    // console.log("blogTagByUrl", blogTagByUrl);
    return (
        <>
            <PageTitle title={"Blog Tags"} />
            <BreadCrumb title={"tags"} />
            <Container>
                {blogTagsDetail && blogTagsDetail?.length > 0 ? (
                    <div className="blog-page">
                        <div className="blog-section d-flex flex-row justify-content-center">
                            {blogTagsDetail.map((blog, i) => (
                                <div className="col-lg-6" key={i}>
                                    <Card>
                                        <div className="card-img"><Card.Img
                                            variant="top"
                                            src={getImage(blog.feature_image, 'original')}
                                            onError={(e) => e.type === 'error' ? e.target.src = "https://dummyimage.com/300" : null}
                                        /></div>
                                        <Card.Body>
                                            <Card.Title>{blog.title}</Card.Title>
                                            {/* <Card.Text>
                                        {blog.content}
                                    </Card.Text> */}
                                            <Link href={`/blogs/${blog.id}`}>
                                                <a>learn more <i class="fas fa-long-arrow-alt-right"></i></a>
                                            </Link>

                                        </Card.Body>
                                    </Card>
                                </div>

                            ))}

                        </div>
                        <div className="col-lg-3">
                            <ShopProducts name={"Tags"} blogTagsData={blogTag.tags} />
                        </div>
                    </div>
                ) : null}


            </Container>
        </>
    )
}
export default BlogsTags;

export async function getStaticPaths() {
    var blogTags = [];
    try {
        const { data: blogdata } = await client.query({
            query: GET_BLOGTAGS_QUERY
        });
        blogTags = blogdata.blogtags.data
    }
    catch (e) {
        console.log("Blog Error=======", e.networkError);

    }
    console.log("blogTags", blogTags);
    const paths = blogTags.map((curElem) => ({
        params: { tags: curElem.url.toString() }

    }))
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    console.log("param", params);

    const url = params.tags
    var blogTagByUrl = [];
    try {
        const { data: blogTagsByUrlData } = await client.query({
            query: GETBLOG_BY_ID_QUERY,
            variables: { url },
        })
        blogTagByUrl = blogTagsByUrlData.blogsbytagurl.data
        console.log("blogTagUrl", blogTagByUrl)
    }
    catch (e) {
        console.log("Error", e)
    }

    return {
        props: {
            blogTagByUrl
        },
        revalidate: 10,
    }
}