const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                playlists: action.payload
        }
        
    }
}