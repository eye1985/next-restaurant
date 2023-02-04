function Login(){
    return (
        <>
            <h1>Login</h1>
            <form action="">
                <div>
                    <label htmlFor="username">
                        Username
                    </label>
                    <input id="username" type="text"/>
                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input id="password" type="password"/>
                </div>
                <button>
                    Login
                </button>
            </form>
        </>
    );
}

export default Login;
