import { h, Component } from "preact";
import axios from "axios";

import NavBar from "../NavBar";
import DetailSection from "../DetailSection";
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
            url: "http://ec2-34-228-26-196.compute-1.amazonaws.com:8002/api/v4/user/by-username/max9xs/userprofile/",
            headers: {
                "Content-Type": "application/json",
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
                    <NavBar />
                    <div className="portfolio-container">
                        <DetailSection data={user}/>
                        <UserPosts id={user.user_id} />
                    </div>
                </div>
            );
        }
        return null;
    }
}
