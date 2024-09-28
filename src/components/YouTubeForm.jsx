import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Fragment, useEffect } from "react";

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
      age: 0,
      dob: new Date(),
    },
    mode: "onTouched",
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    watch,
    reset,
  } = form;
  const {
    errors,
    dirtyFields,
    touchedFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  // الفانكشن دي بتخلني اعرض كل الاخطاء الي حصلت في الانبوتس بعد ما عملت سبمت للفورم
  const onError = (errors) => {
    console.log("Form errors", errors);
  };

  const handleGetValues = () => {
    console.log("get Values", getValues());
  };

  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  // console.log({ dirtyFields, touchedFields , isDirty, isValid});

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                // لو الايميل كان موجود قبل كده بيظهر ليا ايرور عشان يعرفني بوجوده قبل كده
                emailAvailable: async (filedValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${filedValue}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "Email already Exists";
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
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: "twitter is required",
              // من الممكن جعل الانبوت غير قابل للكتابه بالامر ديسابلد ونخليها صح وممكن نخليها مشروطه بقيمه انبوت تاني
              // وفانكشن واتش بتجيب لينا القيمه بتاعتها
              disabled: watch("channel") === "",
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook:</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        {/* phoneNumbers.0 دا شكل تعريف اسم الانبوت وربطه بي مكتبه رياكت هوك فورم في حاله لم يكون علي شكل مصفوفه */}
        <div className="form-control">
          <label htmlFor="phone_one">phone one:</label>
          <input type="text" id="phone_one" {...register("phoneNumbers.0")} />
        </div>

        <div className="form-control">
          <label htmlFor="phone_two">phone two:</label>
          <input type="text" id="phone_two" {...register("phoneNumbers.1")} />
        </div>

        {fields.map((field, index) => (
          <Fragment key={index}>
            <div className="form-control">
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
          </Fragment>
        ))}

        <button type="button" onClick={() => append({ name: "" })}>
          Add Phone Number
        </button>
        <br />
        <br />

        <div className="form-control">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              required: "Age is Required",
              // عشان تحول القيمه العاده من الانبوت من استرانج الي رقم صحيح
              valueAsNumber: true,
            })}
          />
          <p className="errors">{errors.age?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="dob">Date of birth:</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              required: "Date of birth is Required",
              // عشان تحول القيمه العاده من الانبوت من استرانج الي تاريخ
              valueAsDate: true,
            })}
          />
          <p className="errors">{errors.dob?.message}</p>
        </div>
        <button type="submit" disabled={!isDirty || isSubmitting}>
          Submit
        </button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={() => reset()}>
          reset
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
