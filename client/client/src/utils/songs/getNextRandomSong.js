const getNextRandomSong = async (token) => {
    try {
        const res = await fetch(`http://localhost:5000/api/songs/nextRandom`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return await res.json()
    } catch (e) {
        console.log(e)
        return null
    }

}
export default getNextRandomSong