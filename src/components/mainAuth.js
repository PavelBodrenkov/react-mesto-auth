export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/register`, {
        method:'POST',
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({password, email})
    })
    .then((respons) => {
        try {
            if(respons.status === 200) {
                return respons.json()
            }
        } catch(e) {
            return (e)
        }
    })
    .then((res) => {
        console.log(res)
        return res;
        
    })
    .catch((err) => console.log(err))
};