// @flow
import { h, Component } from "preact";
import { connect } from "preact-redux";

type Props = {
    id: ?number
};

class NavBar extends Component {
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

const mapStateToProps = (state) => {
    return {
        id: state.id
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getPosts: (posts) => dispatch(getPosts(posts))
//     }
// }

export default connect(mapStateToProps, null)(NavBar);
