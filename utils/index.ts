import axios from "axios";
import jwtDecode from "jwt-decode";

type JwtProps = {
  name: string;
  picture: string;
  sub: string;
};

export const NEXT_PUBLIC_BASE_URL = "http://localhost:3000";

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

  await axios.post(`${NEXT_PUBLIC_BASE_URL}/api/auth`, user);
};
