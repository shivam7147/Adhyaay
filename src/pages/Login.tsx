import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { api } from "../lib/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BackgroundBeams } from "../components/ui/background-beams";
import { Eye, EyeOff } from "lucide-react";
import CatPeeping from "../assets/CatPeeping.json";
import { TextReveal } from "../components/ui/TextReveal";
import { cn } from '../lib/utils';
// import { SmoothCursor } from '../components/ui/smooth-cursor';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function Login({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
  setServerError(null);
  try {
    setLoading(true);
    const res = await api.post("/auth/login", data, { withCredentials: true });

    if (res.status === 200) {
      // ✅ save token in localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setIsAuthenticated(true);
      toast.success("Login successful!");
      navigate("/adhyaay/");
    }
  } catch (error: any) {
    setServerError(error.response?.data?.message || "Login failed");
    toast.error("Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
    {/* <SmoothCursor /> */}
    <div className="relative h-screen flex overflow-hidden">
      {/* Background beams */}
      <BackgroundBeams className="absolute inset-0 w-full h-full z-0" />

      {/* Left side: welcome text */}
      <div className="hidden md:flex md:flex-1 z-10 relative flex-col items-center justify-center px-8">
        <div className="mb-4">
          <TextReveal
            className={cn(
              `bg-primary from-foreground to-primary via-rose-200 bg-clip-text text-7xl md:text-8xl font-bold text-transparent dark:bg-gradient-to-b`
            )}
            from="bottom"
            split="letter"
          >
            Welcome Back
          </TextReveal>
        </div>
      </div>

      {/* Right side: login form */}
      <div className="w-full md:w-2/5 z-10 pt-20 flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative bg-white/95 p-10 rounded-2xl shadow-xl border-2 border-black backdrop-blur-sm w-full min-h-[500px] flex flex-col justify-center"
          noValidate
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-black">Login</h1>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-black">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="text-black"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
  <label
    htmlFor="password"
    className="block mb-1 text-sm font-medium text-black"
  >
    Password
  </label>

  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      {...register("password", { required: "Password is required" })}
      className="text-black pr-10" // space for the icon
    />

    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black focus:outline-none"
      tabIndex={-1}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>

  {errors.password && (
    <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
  )}
</div>

          {/* Server error */}
          {serverError && <p className="text-red-600 mb-4">{serverError}</p>}

          {/* Submit */}
          <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* Register link */}
          <p className="text-sm mt-4 text-center text-black">
            Don’t have an account?{" "}
            <Link to="/adhyaay/register" className="text-orange-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* Peeping cat */}
      <div className="absolute left-5 w-28 h-28 bottom-22 pointer-events-none z-50">
        <Lottie animationData={CatPeeping} loop autoplay />
      </div>
    </div>
    </>
  );
}