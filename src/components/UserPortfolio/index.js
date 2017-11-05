import { h, Component } from "preact";
import axios from "axios";

import Header from "../Header";
import UserPosts from "../UserPosts";

type State = {
    user: ?Object
};

export default class UserPortfolio extends Component<State, Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: null
        }
    }
    state: State;

    componentWillMount() {
        axios({
            method: "get",
            url: "https://api.meanwise.com/api/v1.2/user/118/userprofile/",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token ca7155e3030544e29737bc5948db7a7137e548de",
            },
        }).then( response => {
            this.setState({
                user: response.data.results
            });
        }).catch( err => {
            console.log(err);
        });
    }

    componentWillUnMount() {
        this.setState({
            user: null
        });
    }


    render() {
        const { user } = this.state;
        if (user) {
            return(
                <div>
                    <Header data={this.state.user}/>
                    <UserPosts id={this.state.user.user_id}/>
                </div>
            );
        }
        return null;
    }
}
