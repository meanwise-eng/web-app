// @flow
import { h, Component } from "preact";
import axios from "axios";

type Props = {
    data: ?Object
};

export default class PostModal extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        console.log("Whoops");
    }

    render() {
        return (
            <div className="post-modal">
                <div className="overlay"></div>
                <div className="post-modal__view"></div>
                <div className="post-modal__content"></div>
            </div>
        );
    }
}
