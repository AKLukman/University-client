import { useLoginMutation } from "../redux/features/auth/authApi";

import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UniversityForm from "../components/form/UniversityForm";
import UniversityInput from "../components/form/UniversityInput";
import { Button, Row } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { FieldValues } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    userId: "0001",
    password: "admin12345",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      if (user?.role == "superAdmin") {
        navigate("/");
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <UniversityForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <UniversityInput type="text" name="userId" label="ID:" />
        <UniversityInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </UniversityForm>
    </Row>
  );
};

export default Login;
