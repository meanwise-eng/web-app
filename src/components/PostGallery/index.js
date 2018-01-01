import { h, Component } from "preact";
import axios from "axios";

type Props = {
    post: Object,
};

export default class PostGallery extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { post } = this.props;
        return (
            <div className="gallery-container">
                <div className="initial-image"
                    style={{background: `url(${post.top_posts[0].post_thumbnail_url}) center center / cover no-repeat`}}
                />
                <div className="image-wrapper">
                    {
                        post.top_posts.length > 1 &&
                        <div className="smaller-image" style={{background: `url(${post.top_posts[1].post_thumbnail_url}) center center / cover no-repeat`, marginRight: "10px"}}
                        />
                    }
                    {
                        post.top_posts.length > 2 &&
                        <div className="smaller-image" style={{background: `url(${post.top_posts[2].post_thumbnail_url}) center center / cover no-repeat`}}
                        />
                    }
                </div>
                <h2>{post.topic}</h2>
            </div>
        );
    }
}
