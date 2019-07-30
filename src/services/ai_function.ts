import { Auth } from "./config/auth";
import { Apiai } from "./config/apiai";
import { CredentialService } from "./credential/credential.service";

export class AiFunction {
    auth: any;
    cr_service: any;

    isLogin: Boolean = true;
    text_ai: any;
    action: string;

    constructor(
        private response: any,
        private isAuth: Boolean,
        private socket: any
    ) {
        this.auth = new Auth();
        this.cr_service = new CredentialService();

        this.isLogin = this.isAuth && this.auth.getAuthLogin();

        this.action = this.response.result.metadata.intentName;
    }

    aiLoginStatus() {
        if(this.isLogin) {
            this.text_ai = new Apiai("Hi "+this.auth.getUsername()+". You already login. Please logout before using another account.",
                "auth_ask",
                this.auth.getUsername());
            this.socket.emit('bot reply', this.text_ai);
        } else {
            this.cr_service.auth_login(this.response.result.parameters).then( (result: any) => {
                if(result.length) {
                    let user_name = result[0].first_name+" "+result[0].last_name;
                    this.text_ai = new Apiai(
                        "Hi "+user_name+". Welcome to our ChatBot",
                        "auth_ask",
	                    user_name
                    );
                } else {
                    this.text_ai = new Apiai(
                        "Sorry, your account is not correct.",
                        "custom_ask",
                        ""
                    );
                }
                this.socket.emit('bot reply', this.text_ai);
            });
        }
    }

    aiLogoutStatus() {
        if(this.isLogin) {
            this.text_ai = new Apiai(
                "Thank you "+this.auth.getUsername()+" for using our ChatBot.",
                "exit_ask",
                ""
            );
            this.auth.removeAuthLogin();
        } else {
            this.text_ai = new Apiai(
                "Hi there. You need to sign in first before make the request. Thank you",
                "custom_ask",
                ""
            );
        }
        this.socket.emit('bot reply', this.text_ai);
    }

    aiGeneralFunction(intentsID: number) {
        if(this.isAuth) {
            if(this.isLogin) {
                if(intentsID === 3) {
                    console.log("Already login");
                }
            } else {
                this.text_ai = new Apiai(
                    "Hi there. You need to sign in first before make the request. Thank you",
                    "custom_ask",
                    ""
                );
            }
	        this.socket.emit('bot reply', this.text_ai);
        } else {
	        if(intentsID === 3) {
		        console.log("No need login");
	        } else if(intentsID === 4) {
		        console.log("No need login number 4");
		        this.text_ai = new Apiai(
			        "Hi there, we have 5 products discount. Including electronic, car tools, accessories, storage and gps tracker.",
			        "custom_ask",
			        ""
		        );
	        } else {
                console.log("here 4");
            }
	        this.socket.emit('bot reply', this.text_ai);

        }
    }
}