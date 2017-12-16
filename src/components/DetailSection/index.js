// @flow
import { h, Component } from "preact";
import axios from "axios";

type Props = {
    data: ?Object
};

export default class DetailSection extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <div className="detail">
                <div className="detail__avatar">
                    <div style={{backgroundImage: `url(${data.profile_photo})` }}></div>
                </div>
                <span>{data.first_name} {data.last_name}</span>
                <span className="profession">{data.profession_text}</span>
                <hr />
                <p>{data.profile_story_description}</p>
            </div>
        );
    }
}
