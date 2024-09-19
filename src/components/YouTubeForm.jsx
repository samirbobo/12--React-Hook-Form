import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function YouTubeForm() {
  const form = useForm({
    defaultValues: {
      userName: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ name: "" }],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="userName">UserName:</label>
          <input
            type="text"
            id="userName"
            {...register("userName", { required: "UserName is Required" })}
          />
          <p className="errors">{errors.userName?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email Is Required",
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (filedValue) => {
                  return (
                    filedValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (filedValue) => {
                  return (
                    !filedValue.endsWith("baddomain.com") ||
                    "This Domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="errors">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel:</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: { value: true, message: "Channel is required" },
            })}
          />
          <p className="errors">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter:</label>
          {/* social.twitter دا شكل تعريف اسم الانبوت وربطه بي مكتبه رياكت هوك فورم في حاله لم يكون علي شكل اوبجيكت */}
          <input type="text" id="twitter" {...register("social.twitter")} />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook:</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        {/* social.twitter دا شكل تعريف اسم الانبوت وربطه بي مكتبه رياكت هوك فورم في حاله لم يكون علي شكل مصفوفه */}
        <div className="form-control">
          <label htmlFor="phone_one">phone one:</label>
          <input type="text" id="phone_one" {...register("phoneNumbers.0")} />
        </div>

        <div className="form-control">
          <label htmlFor="phone_two">phone two:</label>
          <input type="text" id="phone_two" {...register("phoneNumbers.1")} />
        </div>

        {fields.map((field, index) => (
          <>
            <div key={index} className="form-control">
              <label htmlFor={`phone_${index}`}>phone {index}:</label>
              <input
                type="text"
                id={`phone_${index}`}
                {...register(`phNumbers.${index}.name`)}
              />
            </div>
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </>
        ))}

        <button type="button" onClick={() => append({ name: "" })}>
          Add Phone Number
        </button>
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
