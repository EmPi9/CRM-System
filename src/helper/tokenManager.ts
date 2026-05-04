export const tokenManager = (() => {
    let accessToken: string | null;

    return Object.freeze({
        getAccessToken: () => accessToken,
        setAccessToken: (token: string) => { accessToken = token; },

        getRefreshToken: () => localStorage.getItem('refreshToken'),
        setRefreshToken: (token: string) => localStorage.setItem('refreshToken', token),

        clearToken: () => {
            accessToken = null
            localStorage.removeItem('refreshToken')
        }

    })
})()