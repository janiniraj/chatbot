export function IntentsMapper(value: string, params: any){
    let id = 0;
    let intents_params: any = {};

    switch(value){
        case "sign-in":
            id = params.email && params.password ? 1 : 0;
            intents_params = {
                index: id,
                isAuth: true
            };
            return intents_params;
        case "sign-out":
            intents_params = {
                index: 2,
                isAuth: true
            };
            return intents_params;
	    case "point-details":
		    intents_params = {
			    index: 3,
			    isAuth: true
		    };
		    return intents_params;
	    case "ask-promotions":
		    intents_params = {
			    index: 4,
			    isAuth: false
		    };
		    return intents_params;
        default:
            return intents_params;
    }
};