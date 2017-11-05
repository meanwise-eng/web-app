import { h, Component } from "preact";
import axios from "axios";

import Post from "../Post";

type Props = {
    id: ?number
};

type State = {
    posts: ?Object
};

export default class UserPosts extends Component<Props, State> {
    constructor(props) {
        super(props: Props);
        this.state = {
            posts: null
        };
    }
    state: State;

    componentDidMount() {
        if (this.props.id) {
            axios({
                method: "get",
                url: `https://api.meanwise.com/api/v1.2/user/${this.props.id}/posts/`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token ca7155e3030544e29737bc5948db7a7137e548de",
                },
            }).then( response => {
                this.setState({
                    posts: response.data.results.data
                });
            }).catch( err => {
                console.log(err);
            });
        }
    }

    renderPosts = () => {
        const { posts } = this.state;
        if (posts) {
            const arr = Object.keys(posts);
            return arr.map(post => <Post post={posts[post]} key={posts[post].id} type={posts[post].post_type} />)
        }
        return null;
    }

    render() {
        console.log(this.state.posts);
        return (
            <div className="posts-wrapper">
                {this.renderPosts()}
            </div>
        );
    }
}
