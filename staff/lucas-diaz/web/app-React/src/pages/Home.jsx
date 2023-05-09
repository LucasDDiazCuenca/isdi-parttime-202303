import Posts from "../components/Posts"
import retrieveUser from "../logic/retrieveUser";
import { context } from "../ui"
import { Component } from "react";
import AddPostModal from "../components/AddPostModal";

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: null } // por defecto queremos que no muestre nada 
    }

    handleLogOutClick = () => {
        delete context.userId
        props.onLogOutClick();
    }
    handleFooterButtonClick = () => this.setState({view : "add-post"})

    handleGoToMainHome = () => this.setState({view: null})



    render() {
        let user;

        try {
            user = retrieveUser(context.userId);
        } catch (error) {
            alert(error.message)
        }


        return <div className="home">
            <header className="home-header">
                <h1 className="home-header-tittle">Home</h1>
                <div className="home-header-left-items">
                    <img className="home-header-left-items-config-icon" src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png" alt="" />
                    <button className="home-header-left-items-log-out-button button" onClick={this.handleLogOutClick} >Log out</button>
                </div>
                <div className="home-header-user">
                    <img className="home-header-user-avatar" src={user.avatar} alt="default avatar" />
                    <h2 className="home-header-user-welcome-msj"></h2>
                </div>
                <nav className="home-menu">
                    <ul>
                        <li><a href="" className="home-menu-change-pass-anchor">change password</a></li>
                        <li><a href="" className="home-menu-avatar-anchor">Avatar</a></li>
                        <li><a href="" className="home-menu-option3">option 3</a></li>
                    </ul>
                </nav>
            </header>

            <main className="home-posts-content">
                <Posts />

                {this.state.view === "add-post" && <AddPostModal onCancelClick={this.handleGoToMainHome} /> }
            </main>

            <footer className="footer">
                <button className="footer-button button" onClick={this.handleFooterButtonClick}> + </button>
            </footer>
        </div>
    }
}