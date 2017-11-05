import { h, Component } from "preact";

type Props = {
    post: ?Object
};

export default class Post extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { type, post } = this.props;
        console.log(post);
        if (type == "image") {
            return (
                <div className="post">
                    <div className="post__thumb" style={{backgroundImage: `url(${post.image_url})`}}>
                        <div className="overlay">
                            <div className="text">{post.text}</div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}
