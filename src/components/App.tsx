import { h, Component } from "preact";
import HomePage from "./HomePage";

interface Props {};
interface State {};

export default class App extends Component<Props, State> {
    render() {
        return (
            <div>
                <HomePage />
            </div>
        );
    }
}
