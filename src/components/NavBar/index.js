// @flow
import { h, Component } from "preact";
import axios from "axios";

type Props = {
    id: ?number,
    interestList: Array<number>
};

export default class NavBar extends Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            interest: null
        };
    }

    componentDidMount() {
        const { interestList } = this.props;
        if (interestList) {
            axios({
                method: "get",
                url: `https://api.meanwise.com/api/v1.2/interest/`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token ca7155e3030544e29737bc5948db7a7137e548de",
                },
            }).then( response => {
                this.setState({
                    interest: response.data.results.data
                });
            }).catch( err => {
                console.log(err);
            });
        }
    }

    renderNavElements = () => {
        const { interestList } = this.props;
        const { interest } = this.state;

        if (interest && interestList) {
            const list = interestList.map(id => interest[id]);
            return Object.keys(list).map(id => <li>{list[id].name}</li>);
        }
    }

    render() {
        return (
            <nav>
                <ul>
                    {this.renderNavElements()}
                </ul>
            </nav>
        );
    }
}
