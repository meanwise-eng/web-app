import { h, Component } from "preact";
import axios from "axios";

import NavBar from "../NavBar";
import DetailSection from "../DetailSection";

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
            return(
                <div>
                    <NavBar />
                    <div className="portfolio-container">
                        <DetailSection data={user}/>
                    </div>
                </div>
            );
        }
        return null;
    }
}
