import { Icon } from "@iconify/react";
import { Button, Checkbox, Divider, Input } from "@nextui-org/react";
import type { SignInReqDto } from "@t11g/backend";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../api";
import toast from "react-hot-toast";

function SignIn() {
	const [isVisible, setIsVisible] = useState(false);
	const { register, handleSubmit } = useForm<SignInReqDto>();
	const toggleVisibility = () => setIsVisible(!isVisible);

	const onSubmit: SubmitHandler<SignInReqDto> = async (payload) => {
		const { data, error } = await api.auth["sign-in"].post(payload);

		if (error || !data) {
			toast.error(error.value);
			return;
		}

		localStorage.setItem("token", data.token);
		localStorage.setItem("member", JSON.stringify(data.member));
		toast.success("Sign in successfully");
	};

	return (
		<div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
			<p className="pb-2 text-xl font-medium">Sign In</p>
			<form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
				<Input
					label={"Email address"}
					placeholder="Enter your email"
					variant="bordered"
					{...register("email")}
				/>
				<Input
					endContent={
						<button
							aria-label="toggle password visibility"
							className="focus:outline-none"
							type="button"
							onClick={toggleVisibility}
						>
							{isVisible ? (
								<Icon
									className="text-2xl text-default-400 pointer-events-none"
									icon="solar:eye-closed-bold"
								/>
							) : (
								<Icon
									className="text-2xl text-default-400 pointer-events-none"
									icon="solar:eye-bold"
								/>
							)}
						</button>
					}
					label="Password"
					placeholder="Enter your password"
					type={isVisible ? "text" : "password"}
					variant="bordered"
					{...register("password")}
				/>
				<div className="flex items-center justify-between px-1 py-2">
					<Checkbox className="relative text-foreground select-none text-small transition-colors-opacity before:transition-width motion-reduce:transition-none">
						Remember me
					</Checkbox>
					<Link
						className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-500"
						href="#"
						role="link"
						tabIndex={0}
					>
						Forgot password?
					</Link>
				</div>
				<Button
					className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover"
					type="submit"
				>
					Log In
				</Button>
			</form>
			<div className="flex items-center justify-center gap-4 py-2">
				<Divider className="w-1/3" />
				<p className="shrink-0 text-tiny text-default-500">OR</p>
				<Divider className="w-1/3" />
			</div>
			<div className="flex flex-col gap-2">
				<Button
					startContent={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							aria-hidden="true"
							role="img"
							focusable="false"
							tabIndex={-1}
							className="iconify iconify--flat-color-icons"
							width={24}
							height={24}
							viewBox="0 0 48 48"
						>
							<path
								fill="#FFC107"
								d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
							/>
							<path
								fill="#FF3D00"
								d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
							/>
							<path
								fill="#4CAF50"
								d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
							/>
							<path
								fill="#1976D2"
								d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
							/>
						</svg>
					}
					className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-default text-foreground data-[hover=true]:opacity-hover"
					type="button"
				>
					Continue with Google
				</Button>
				<Button
					className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-default text-foreground data-[hover=true]:opacity-hover"
					startContent={
						<svg
							aria-hidden="true"
							className="text-default-500 iconify iconify--fe"
							focusable="false"
							height={24}
							role="img"
							tabIndex={-1}
							viewBox="0 0 24 24"
							width={24}
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
						>
							<path
								d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.28 9.28 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10"
								fill="currentColor"
								fillRule="evenodd"
							/>
						</svg>
					}
					type="button"
				>
					Continue with Github
				</Button>
			</div>
		</div>
	);
}

export default SignIn;
