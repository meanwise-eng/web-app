// @flow
import { h, Component } from "preact";

type Props = {
    id: ?number
};

export default class NavBar extends Component {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <ul>
                    <li>Design</li>
                    <li>Film</li>
                    <li>Photography</li>
                    <li>Illustration</li>
                </ul>
            </nav>
        );
    }
}
