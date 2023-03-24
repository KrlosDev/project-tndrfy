const Like = async ({ token, song }) => {
    try {
        if (!song._id)
            throw new Error("Song ID Es requerido");

        const res = await fetch(`http://localhost:5000/api/songs/like/${song._id}`, {
            method: "PUT",
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
export default Like