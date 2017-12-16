import { h, Component } from "preact";
import axios from "axios";
import PostModal from "../PostModal";

type Props = {
    post: ?Object
};

export default class Post extends Component<Props> {
    constructor(props: Props) {
        super(props);
    };

    handleSelect() {
        console.log("Whoops");
        return <PostModal />;
    };

    render() {
        const { type, post } = this.props;
        let url;

        if (type === "image") {
            url = post.image_url
        } else if (type === "video") {
            url = post.video_thumb_url
        } else {
            return null;
        }

        return (
            <div className="post" onClick={() => this.handleSelect()}>
                <div className="post__thumb" style={{backgroundImage: `url(${url})`}}>
                    <div className="overlay">
                        <div className="text">{post.text}</div>
                    </div>
                </div>
            </div>
        );
    }
}
