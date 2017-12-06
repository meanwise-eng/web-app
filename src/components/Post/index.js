import { h, Component } from "preact";
import axios from "axios";

type Props = {
    post: ?Object
};

export default class Post extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.setState = {
            interest: null
        }
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "https://api.meanwise.com/api/v1.2/interest/",
            headers: {
                "Content-Type": "application/json",
            },
        }).then( response => {
            // this.setState({
            //     interest:
            // })
        }).catch( err => {
            console.log(err);
        });
    }

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
        console.log(post);

        // const postInterests = post && post.
        return (
            <div className="post">
                <div className="post__thumb" style={{backgroundImage: `url(${url})`}}>
                    <div className="overlay">
                        <div className="text">{post.text}</div>
                    </div>
                </div>
            </div>
        );
    }
}
