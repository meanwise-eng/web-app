// @flow
import { h, Component } from "preact";
import axios from "axios";

import NavBar from "../NavBar";

type State = {
    user: ?Object
};

type Props = {};

export default class Header extends Component<Props, State> {
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
        console.log(user);
        if (user) {
            return (
                <div className="header">
                    <div className="header__avatar">
                        <div style={{backgroundImage: `url(${user.profile_photo})` }}></div>
                        <button className="solid-btn solid-btn--round">Hire Me</button>
                    </div>
                    <span>{user.first_name} {user.last_name}</span>
                    <span className="profession">{user.profession_text}</span>
                    <NavBar id={user.user_id}/>
                </div>
            );
        }
        return null;
    }
}
