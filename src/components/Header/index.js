// @flow
import { h, Component } from "preact";
import axios from "axios";

import NavBar from "../NavBar";

type Props = {
    data: ?Object
};

export default class Header extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <div className="header">
                <div className="header__avatar">
                    <div style={{backgroundImage: `url(${data.profile_photo})` }}></div>
                    <button className="solid-btn solid-btn--round">Open in app</button>
                </div>
                <span>{data.first_name} {data.last_name}</span>
                <span className="profession">{data.profession_text}</span>
            </div>
        );
    }
}
