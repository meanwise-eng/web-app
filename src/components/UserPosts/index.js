import { h, Component } from "preact";
import axios from "axios";

import Post from "../Post";
import NavBar from "../NavBar";

type Props = {
    id: ?number
};

type State = {
    posts: ?Object,
    interests: Array<mixed>,
    selectedInterestId: ?number,
};

export default class UserPosts extends Component<Props, State> {
    constructor(props) {
        super(props: Props);
        this.state = {
            posts: null,
            interests: [],
            selectedInterestId: null,
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
                },
            }).then( response => {
                const posts = response.data.results.data;
                this.setState({
                    posts: posts,
                    interests: [...new Set(Object.keys(posts).map(i => posts[i].interest_id))]
                });
            }).catch( err => {
                console.log(err);
            });
        }
    }

    handleSelectedInterest = (id) => {
        this.setState({
            selectedInterestId: id,
        });
    }

    renderPosts = () => {
        const { posts } = this.state;
        if (posts) {
            const arr = Object.keys(posts);
            return arr.map(post => {
                if (this.state.selectedInterestId) {
                    if (posts[post].interest_id === this.state.selectedInterestId) {
                        return <Post post={posts[post]} key={posts[post].id} type={posts[post].post_type} />;
                    }
                    else {
                        return null;
                    }
                }
                return <Post post={posts[post]} key={posts[post].id} type={posts[post].post_type} />
            });
        }
        return null;
    }


    render() {
        return (
            <div>
                <div className="posts-wrapper">
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}
