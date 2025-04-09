import React from "react";

import { toast } from "react-toastify";
import { withRouter } from "../data/withRouter";
import BG from "../assets/img/bglogin11.jpg"

class Login extends React.Component {
   state = {
        username: "",
        password:"",
    };
    
    handleChangeUser = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        if(!this.state.username || !this.state.password) {
            toast.error('missing required')
            return;
        }

        if(this.state.username === "admin" && this.state.password === "123456") {
            toast.success('login success!')
            this.props.navigate("/home");
        }else {
            toast.error('wrong username or password');
            
        }
        this.setState({
            username:"",
            password:""
        })
    }

    handleRegister = (e) =>{
        e.preventDefault();
        this.props.navigate("/register");

    }


    render(){
    return(
     
        <div className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: `url(${BG})`}}>
            <div className="bg-gray-900 bg-opacity-75 p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-white text-2xl font-semibold text-center mb-4">Sign in your account</h2>
                <form className="space-y-4">
                    <div>
                        <label className="font-semibold block text-gray-300">Username</label>
                        <input type="username" value={this.state.username} placeholder="username" className="w-full p-2 mt-1 mb-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => this.handleChangeUser(e)}
                        />
                    </div>
                    <div>
                        <label className="font-semibold block text-gray-300">Password</label>
                        <input type="password" value={this.state.password} placeholder="******" className="w-full p-2 mt-1 mb-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => this.handleChangePassword(e)}
                        />
                    </div>
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2"/> Remember me?
                        </label>
                        <a href="/reset" className="text-blue-500 hover:underline">forgot password?</a>
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-4 rounded"
                        onClick={(e) => this.handleLogin(e)}
                    >
                        Log in
                    </button>
                </form>
                <p className="text-gray-400 text-sm text-center mt-4">Don't have your account?<a href="/register" className="text-blue-400 hover:underline">Sign up</a></p>
            </div>
        </div>
      )

    }
}
export default withRouter(Login);
