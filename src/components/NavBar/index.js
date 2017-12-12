// @flow
import { h, Component } from "preact";
import axios from "axios";

type State = {
    interest: ?Object,
    selectedInterest: ?number,
};

type Props = {
    id: ?number,
    interestList: Array<number>,
    handleFilter: Function,
};

export default class NavBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            interest: null,
        };
    };
    state: State;

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
    };

    renderNavElements = () => {
        const { interestList } = this.props;
        const { interest } = this.state;

        if (interest && interestList.length > 0) {
            const interestKeys = Object.keys(interest);
            let list = {};
            interestList.forEach((id, index) => {
                const key = interestKeys.find(item => interest[item].id === id);
                list[index] = interest[key];
            });
            return Object.keys(list).map(
                id => <li onClick={() => this.props.handleFilter(list[id].id)}>{list[id].name}</li>
            );
        }
    };

    render() {
        return (
            <nav>
                <ul>
                    <li onClick={() => this.props.handleFilter(null)}>All</li>
                    {this.renderNavElements()}
                </ul>
            </nav>
        );
    }
}
