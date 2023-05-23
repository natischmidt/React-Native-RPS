import IP_URL from "./IP";

const authenticateUser = async (credentials) => {
    try {
        const response = await fetch(IP_URL + '/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            const data = await response.json();
            return data.token;
        } else {
            throw new Error('Failed to authenticate user');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
