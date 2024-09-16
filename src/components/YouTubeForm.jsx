import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function YouTubeForm() {
  const form = useForm();
  const { register, control, handleSubmit } = form;

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName">UserName:</label>
        <input type="text" id="userName" {...register("userName")} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel:</label>
        <input type="text" id="channel" {...register("channel")} />

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
