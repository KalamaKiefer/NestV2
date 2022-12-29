import axios from "axios";
import jwtDecode from "jwt-decode";

type JwtProps = {
  name: string;
  picture: string;
  sub: string;
};

export const fetchUser = async (response: any, addUser: any) => {
  const decodeJwt: JwtProps = jwtDecode(response.credential);

  const { name, picture, sub } = decodeJwt;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  addUser(user);

  await axios.post("http://localhost:3000/api/auth", user);
};
