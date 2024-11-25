import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

type Inputs = {
  id: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useDispatch();
  const [login, { error }] = useLoginMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);

    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input {...register("id")} id="id" />

        {errors.id && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="password">Password </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
      </div>

      <input type="submit" />
    </form>
  );
};

export default Login;
