// import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import { connect } from "react-redux";

// class Home extends Component {
//     render() {
//         const { isLoggedIn } = this.props;
//         let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/home";

//         return <Redirect to={linkToRedirect} />;
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         isLoggedIn: state.user.isLoggedIn,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { path } from "../utils";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkGoTo: "",
        };
    }
    async componentDidMount() {
        const { userInfo } = this.props;
        if (userInfo) {
            this.checkRoleId(userInfo.roleId);
        }
        console.log("Mount", this.state.linkGoTo);
    }

    checkRoleId(roleId) {
        let linkGoTo = "";
        if (roleId === "R1") {
            linkGoTo = path.SYSTEM;
        } else if (roleId === "R2") {
            linkGoTo = path.DOCTOR_SYSTEM;
        } else if (roleId === "R4") {
            linkGoTo = path.ADMIN_HOSPITAL_SYSTEM;
        } else {
            linkGoTo = path.HOMEPAGE;
        }
        this.setState({ linkGoTo: linkGoTo });
    }

    render() {
        const { isLoggedIn } = this.props;
        let { linkGoTo } = this.state;

        let linkToRedirect = isLoggedIn ? linkGoTo : "/home";

        console.log(linkToRedirect);
        return <Redirect to={linkToRedirect} />;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
