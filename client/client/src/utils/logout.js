import Cookies from "universal-cookie";
export default (history) => {
    const cookies = new Cookies();
    cookies.remove("token");

    history.push("/");
}