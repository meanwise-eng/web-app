import { h, Component } from "preact";
import axios from "axios";

import PostGallery from "../PostGallery";

type Props = {
    id: ?number
};

type State = {
    posts: ?Object,
    interests: Array<mixed>,
};

export default class UserPosts extends Component<Props, State> {
    constructor(props) {
        super(props: Props);
        this.state = {
            userTopics: null,
            interests: [],
        };
    }
    state: State;

    componentDidMount() {
        if (this.props.id) {
            axios({
                method: "get",
                url: `http://ec2-34-228-26-196.compute-1.amazonaws.com:8002/api/v4/user/${this.props.id}/user-topics/`,
                headers: {
                    "Content-Type": "application/json",
                },
            }).then( response => {
                const userTopics = response.data.results.user_topics;
                this.setState({
                    userTopics,
                    interests: [...new Set(Object.keys(userTopics).map(i => userTopics[i].interest))]
                });
            }).catch( err => {
                console.log(err);
            });
        }
    }

    renderPostGallery = () => {
        const { userTopics, interests } = this.state;
        let postGallery = {};
        let gallery = null;
        if (userTopics) {
            const arr = Object.keys(userTopics);
            gallery = arr.map((post, index) => {
                return <PostGallery post={userTopics[post]} key={index} type={userTopics[post]["topic"]} />;
            });
        }
        return gallery;
    }


    render() {
        return (
            <div className="posts-wrapper">
                {this.renderPostGallery()}
            </div>
        );
    }
}
