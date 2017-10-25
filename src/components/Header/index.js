// @flow
import { h, Component } from "preact";
import axios from "axios";
import { connect } from "preact-redux";

import {
    getUserData,
} from "../../actions";

type Props = {
    user: ?Object,
    getUserData: Function
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
        }).catch( err => {
            console.log(err);
        });
    }

    componentWillUnMount() {
        this.props.getUserData(null);
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
                    <div className="header__username">{user.first_name} {user.last_name}</div>
                    <div className="header__description">{user.bio}</div>
                </div>
            );
        }
        return null;
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: (userObj) => dispatch(getUserData(userObj)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
