// @flow
import { h, Component } from "preact";
import axios from "axios";
import { connect } from "preact-redux";

import {
    getUserData,
    getUserId
} from "../../actions";

import NavBar from "../NavBar";

type Props = {
    id: ?number,
    user: ?Object,
    getUserData: Function,
    getUserId: Function,
};

class Header extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        axios({
            method: "get",
            url: "https://api.meanwise.com/api/v1.2/user/118/userprofile/",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token ca7155e3030544e29737bc5948db7a7137e548de",
            },
        }).then( response => {
            this.props.getUserData(response.data.results);
            this.props.getUserId(response.data.results.id);
        }).catch( err => {
            console.log(err);
        });
    }

    componentWillUnMount() {
        this.props.getUserData(null);
        this.props.getUserId(null);
    }

    render() {
        const { user } = this.props;
        console.log(user);
        if (user) {
            return (
                <div className="header">
                    <div className="header__avatar">
                        <div style={{backgroundImage: `url(${user.profile_photo})` }}></div>
                        <button className="solid-btn solid-btn--round">Hire Me</button>
                    </div>
                    <span>{user.first_name} {user.last_name}</span>
                    <span className="profession">{user.profession_text}</span>
                    <NavBar />
                </div>
            );
        }
        return null;
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        id: state.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: (userObj) => dispatch(getUserData(userObj)),
        getUserId: (id) => dispatch(getUserId(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
